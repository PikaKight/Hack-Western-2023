import os
import certifi

from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient

load_dotenv('.env')

client = MongoClient(os.environ.get("URL"), tlsCAFile=certifi.where())

db = client['HW23']

def insertOne(collection, data) -> None:
    col = db[collection]

    col.insert_one(data)

def getOne(collection, query) -> dict:
    col = db[collection]

    data = col.find_one(query)

    return data

def checkExist(collection, query) -> bool:
    col = db[collection]
    
    isExist = col.count_documents(query, limit=1) != 0

    return isExist