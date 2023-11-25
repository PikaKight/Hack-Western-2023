import os

from flask import Flask, jsonify, request
from flask_bcrypt import Bcrypt
from flask_cors import CORS

from dotenv import load_dotenv
from database import insertOne, getOne, checkExist

load_dotenv('.env')

FORMAT = 'utf-8'

app = Flask(__name__)

CORS(app, origins="*", supports_credentials=True)

bcrypt = Bcrypt(app)

@app.route("/signup", methods=["POST"])
def signup():

    reqData = request.json

    isExist = checkExist('Account', {
        'Email': reqData['Email']
    })

    if isExist:
        res = {
            'msg': 'Account already Exist'
        }

        return res

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

    isExist = checkExist('Account', {
        'Email': reqData['Email']
    })

    if not isExist:
        res = {
            'msg': 'Account does not Exist'
        }

        return res

    user = getOne('Account', {
        'Email': reqData['Email']
    })

    isValid = bcrypt.check_password_hash(user['Password'], reqData['Password'])

    if isValid == True:
        res = jsonify({
            'msg': 'Logged In',
            'UserData': {
                'Name': user['Name'],
                'Email': user['Email'],
                'Phone': user['Phone'],
                'Applicant': user['Applicant']
            } 
        })

    else:
        res = jsonify({
            'msg': 'Logged In Failed'
        })

    return res

@app.route('/addProfile', methods=["POST"])
def addProfile():
    reqData = request.json

    isExist = checkExist('Company', {
        'Name': reqData['Name']
    })

    if isExist:
        res = {
            'msg': 'Company Profile Already Exist'
        }

        return res
    
    company = {
        'Name': reqData['Name'],
        'Loc': reqData['Loc'],
        'Type': reqData['Type'],
        'Tech Stack': reqData['Tech'],
        'Bio': reqData['Bio']
    }

    insertOne('Company', company)

    res = {
        'msg': 'Company Profile Created'
    }

    return res

@app.route('/addUser', methods=["POST"])
def addUser():
    reqData = request.json

    isExist = checkExist('Applicant', {
        'Email': reqData['Email']
    })

    if isExist:
        res = {
            'msg': 'Applicant Profile Already Exist'
        }

        return res
    
    applicant = {
        'Email': reqData['Email'],
        'Code': reqData['Code']
    }

    insertOne('Applicant', applicant)

    res = {
        'msg': 'Applicant Profile Created'
    }

    return res

if __name__ == "__main__":
    app.run(debug=True, port=5050)