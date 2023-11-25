import os

from flask import Flask, jsonify, request
from flask_bcrypt import Bcrypt

from dotenv import load_dotenv
from database import insertOne

load_dotenv('.env')

FORMAT = 'utf-8'

app = Flask(__name__)

bcrypt = Bcrypt(app)

@app.route("/createAccount", methods=["POST"])
def createAccount():

    reqData = request.json

    psw = bcrypt.generate_password_hash(reqData['Password']).decode(FORMAT)

    acc = {
        'Name': reqData['Name'],
        'Email': reqData['Email'],
        'Password': psw,
        'Phone': reqData['Phone'],
        'Applicant': reqData['Applicant'] #Bool of True or False
    }


    insertOne('Account', acc)

    response = jsonify({
        'msg': 'Account Created'
    })

    return response

if __name__ == "__main__":
    app.run(debug=True, port=5050)