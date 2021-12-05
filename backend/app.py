from flask import Flask, json, request
import os
from dotenv import load_dotenv
import finnhub
from flask_cors import CORS

import requests
import csv

app = Flask(__name__)
load_dotenv()

CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"

API_KEY = os.environ.get("API_KEY")
finnhub_client = finnhub.Client(api_key=API_KEY)

SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
SITE_FOLDER = "static/data"


@app.route("/")
def hello():
    return "Hello, World!"


@app.route("/api/profile/me")
def profile():
    json_url = os.path.join(SITE_ROOT, SITE_FOLDER, "data.json")
    data = json.load(open(json_url))
    return data


@app.route("/api/profile/me/stock/<symbol>", methods=["GET"])
def getShares(symbol):
    json_url = os.path.join(SITE_ROOT, SITE_FOLDER, "data.json")
    data = json.load(open(json_url))
    shares = data["shares"]
    for share in shares:
        if share["symbol"] == symbol:
            return json.dumps({"stock": share})
    return json.dumps([{"stock": {}}])


@app.route("/api/get-top", methods=["GET"])
def top():
    json_url = os.path.join(SITE_ROOT, SITE_FOLDER, "data.json")
    profile = json.load(open(json_url))
    shares = profile["shares"]
    top_shares = []
    for share in shares:
        symbol = share["symbol"]
        request_url = f"https://finnhub.io/api/v1/quote?symbol={symbol}&token={API_KEY}"
        response = requests.get(request_url)
        if response.status_code != 404:
            response_json = response.json()
            top_shares.append(
                {"symbol": symbol, "price": response_json, "shares": share["shares"]}
            )

    return json.dumps(top_shares)


@app.route("/api/buy", methods=["POST"])
def buy():
    symbol = request.json["symbol"]
    shares = request.json["shares"]
    unit_price = request.json["unitPrice"]
    dollar = request.json["dollar"]
    stock_name = request.json["stockName"]

    json_url = os.path.join(SITE_ROOT, SITE_FOLDER, "data.json")
    profile = json.load(open(json_url))

    total_price = float(unit_price) * int(shares) * float(dollar)
    # update cash
    if profile["cash"] - total_price < 0:
        return json.dumps({"message": "Not enough funds"}), 400
    profile["cash"] -= total_price

    # update shares
    sharess = profile["shares"]
    found = False
    for stock in sharess:
        if stock["symbol"] == symbol:
            stock["shares"] += int(shares)
            # Netting
            stock["unit_price"] = (stock["total_price"] + total_price) / stock["shares"]
            stock["total_price"] = stock["unit_price"] * stock["shares"]
            found = True
            print("found")
            break
    if not found:
        sharess.append(
            {
                "name": stock_name,
                "symbol": symbol,
                "shares": int(shares),
                "unit_price": unit_price * dollar,
                "total_price": unit_price * int(shares) * dollar,
            }
        )

    json.dump(profile, open(json_url, "w"))
    return json.dumps(profile)


@app.route("/api/sell", methods=["POST"])
def sell():
    symbol = request.json["symbol"]
    shares = request.json["shares"]
    dollar = request.json["dollar"]
    share_price = request.json["sharePrice"]

    json_url = os.path.join(SITE_ROOT, SITE_FOLDER, "data.json")
    profile = json.load(open(json_url))

    total = int(shares) * float(share_price) * float(dollar)

    # update cash
    profile["cash"] += total

    # update shares
    sharess = profile["shares"]
    sharesToAppend = []
    found = False
    for stock in sharess:
        if stock["symbol"] == symbol:
            stock["shares"] -= int(shares)
            stock["total_price"] = stock["shares"] * stock["unit_price"]
            found = True
            if stock["shares"] == 0:
                continue
        sharesToAppend.append(stock)
    if not found:
        return json.dumps({}), 404
    profile["shares"] = sharesToAppend
    json.dump(profile, open(json_url, "w"))
    return json.dumps(profile)


@app.route("/api/v1/get-quote/<symbol>", methods=["GET"])
def get_stock(symbol):
    quote = finnhub_client.quote(symbol)
    return json.dumps(quote)


@app.route("/api/var", methods=["POST"])
def get_var():
    dollar_records = os.path.join(SITE_ROOT, SITE_FOLDER, "usd_mxn.csv")

    tc_today = request.json["tc_today"]
    usd_position = request.json["usd_position"]

    tc_today = float(tc_today)
    usd_position = float(usd_position)

    with open(dollar_records) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=",")
        spots = []
        for row in csv_reader:
            spots.append(row[0])
        spots = reversed(spots)
        table = []
        for spot in spots:
            table.append([spot])

        # adding fluctuations
        table[0][0] = float(table[0][0])
        table[0].append(0)
        table[-1][0] = 21.273
        for i in range(1, len(table)):
            table[i][0] = float(table[i][0])
            fluctuation = round(((table[i][0] / table[i - 1][0]) - 1) * 100, 2)
            table[i].append(fluctuation)

        # adding TC tomorrow and val tomorrow
        # tc_today = table[-1][0]
        # usd_position = 1000000
        mxn_posiotion = usd_position * tc_today
        profit_and_loss = []
        for i in range(1, len(table)):
            tc_estimated = tc_today * (1 + table[i][1] / 100)
            val_tomorrow = usd_position * tc_estimated
            p_and_l = val_tomorrow - mxn_posiotion
            table[i].append(round(tc_estimated, 4))
            table[i].append(round(val_tomorrow, 4))
            table[i].append(round(p_and_l, 4))
            profit_and_loss.append(round(p_and_l, 4))

        profit_and_loss.sort()
        # to see where is var at 99 and var at 95
        var_table = []
        for i in range(16):
            var_table.append([round(((i + 1) / 282) * 100, 2), profit_and_loss[i]])

        var_99 = profit_and_loss[2]
        var_95 = profit_and_loss[14]
        return json.dumps({"var99": var_99, "var95": var_95, "table": var_table})


@app.route("/api/buy/bonds", methods=["POST"])
def buy_bonds():
    investment = float(request.json["investment"])
    rate = float(request.json["rate"])

    json_url = os.path.join(SITE_ROOT, SITE_FOLDER, "data.json")
    profile = json.load(open(json_url))

    # update cash
    if profile["cash"] - investment < 0:
        return json.dumps({"message": "Not enough funds"}), 400
    profile["cash"] -= investment

    subtotal_profit = investment * rate / 100

    isr = subtotal_profit * 0.16

    profit = subtotal_profit - isr

    profile["bonds"].append(
        {"investment": investment, "rate": rate, "isr": isr, "profit": profit}
    )

    json.dump(profile, open(json_url, "w"))
    return json.dumps({"isr": isr, "profit": profit})


@app.route("/api/collect/bonds", methods=["POST"])
def collect_bonds():
    json_url = os.path.join(SITE_ROOT, SITE_FOLDER, "data.json")
    profile = json.load(open(json_url))

    bond = profile["bonds"].pop()

    profit = bond["profit"]
    investment = bond["investment"]
    # update cash
    profile["cash"] += investment
    profile["cash"] += profit

    json.dump(profile, open(json_url, "w"))
    return json.dumps({"profit": profit})


@app.route("/api/forward", methods=["POST"])
def forward():
    symbol = request.json["symbol"]
    shares = request.json["shares"]
    unit_price = request.json["unitPrice"]
    dollar = request.json["dollar"]
    stock_name = request.json["stockName"]
    forward_price = float(request.json["forwardPrice"])
    term = float(request.json["term"])

    json_url = os.path.join(SITE_ROOT, SITE_FOLDER, "data.json")
    profile = json.load(open(json_url))

    # update shares
    forwards = profile["forwards"]
    forwards.append(
        {
            "name": stock_name,
            "symbol": symbol,
            "shares": int(shares),
            "term": term,
            "unit_price": unit_price * dollar,
            "forward_price": forward_price * dollar,
            "total_price": forward_price * dollar * int(shares),
        }
    )

    json.dump(profile, open(json_url, "w"))
    return json.dumps(profile)


@app.route("/api/exercise", methods=["POST"])
def exercise():
    symbol = request.json["symbol"]
    price_today = request.json["priceToday"]

    json_url = os.path.join(SITE_ROOT, SITE_FOLDER, "data.json")
    profile = json.load(open(json_url))

    # update forward obtain profit loss
    forwards = profile["forwards"]

    forwardsToProfile = []
    for forward in forwards:
        if forward["symbol"] == symbol:
            shares = forward["shares"]
            forward_price = forward["forward_price"]
            profitLoss = (price_today - forward_price) * int(shares)
            stock_name = forward["name"]
            continue
        forwardsToProfile.append(forward)

    profile["forwards"] = forwardsToProfile

    ######## buy shares #######
    total_price = float(forward_price) * int(shares)

    # update cash
    profile["cash"] -= total_price

    # update shares
    sharess = profile["shares"]
    found = False
    for stock in sharess:
        if stock["symbol"] == symbol:
            stock["shares"] += int(shares)
            # Netting
            stock["unit_price"] = (stock["total_price"] + total_price) / stock["shares"]
            stock["total_price"] = stock["unit_price"] * stock["shares"]
            found = True
            print("found")
            break
    if not found:
        sharess.append(
            {
                "name": stock_name,
                "symbol": symbol,
                "shares": int(shares),
                "unit_price": forward_price,
                "total_price": forward_price * int(shares),
            }
        )

    json.dump(profile, open(json_url, "w"))
    return json.dumps({"profitLoss": profitLoss})
