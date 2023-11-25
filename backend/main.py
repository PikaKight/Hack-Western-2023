import os

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask.ext.bcrypt import Bcrypt

from dotenv import load_dotenv
from database import insertOne

load_dotenv('.env')

app = Flask(__name__)

CORS(app, origins="*", supports_credentials=True)

@app.route("/createAcc", methods=["POST"])
def createAccount():

    reqData = request.json

    psw = reqData['Password']

    acc = {
        'Name': reqData['Name'],
        'Email': reqData['Email'],
        'Password': psw,
        'Phone': reqData['Phone'],
        'Company': reqData['Compay'] #Bool of True or False
    }


    return "Hello, World!"

if __name__ == "__main__":
    app.run(debug=True, port=8080)