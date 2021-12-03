from flask import Flask, json, request
import os
from dotenv import load_dotenv
import finnhub
from flask_cors import CORS

import requests

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
