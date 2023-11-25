import os

from flask import Flask, jsonify, request
from flask_bcrypt import Bcrypt

from dotenv import load_dotenv
from database import insertOne, getOne

load_dotenv('.env')

FORMAT = 'utf-8'

app = Flask(__name__)

bcrypt = Bcrypt(app)

@app.route("/signup", methods=["POST"])
def signup():

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

@app.route("/login", methods=["POST"])
def login():
    reqData = request.json

    user = getOne({
        'Email': reqData['Email']
    })

    isValid = bcrypt.check_password_hash(user['Password'], reqData['Password'])

    if isValid == True:
        res = jsonify({
            'msg': 'Logged In'
        })

    else:
        res = jsonify({
            'msg': 'Logged In Failed'
        })

    return res
    

if __name__ == "__main__":
    app.run(debug=True, port=5050)