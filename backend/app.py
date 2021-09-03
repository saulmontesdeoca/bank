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


@app.route("/api/profile")
def profile():
    json_url = os.path.join(SITE_ROOT, SITE_FOLDER, "data.json")
    data = json.load(open(json_url))
    return data


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
            top_shares.append({"symbol": symbol, "price": response_json})

    return json.dumps(top_shares)


@app.route("/api/buy", methods=["POST"])
def buy():
    symbol = request.json["symbol"]
    shares = request.json["shares"]
    price = request.json["price"]
    dollar = 19.97

    json_url = os.path.join(SITE_ROOT, SITE_FOLDER, "data.json")
    profile = json.load(open(json_url))

    profile["cash"] -= price * shares * dollar
    shares = profile["shares"]
    found = False
    # "shares": [
    # {
    #     "symbol": "TSLA",
    #     "name": "Tesla Inc.",
    #     "shares": 8
    # },]
    for stock in shares:
        if stock["symbol"] == symbol:
            stock["shares"] += shares
            found = True
            break
    if not found:
        shares.append({"symbol": symbol, "shares": shares, "price": price})

    json.dump(profile, open(json_url, "w"))
    return json.dumps(profile)


@app.route("/api/v1/get-quote/<symbol>", methods=["GET"])
def get_stock(symbol):
    quote = finnhub_client.quote(symbol)
    return json.dumps(quote)
