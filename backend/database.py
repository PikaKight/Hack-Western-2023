import os

from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient

load_dotenv('.env')

client = MongoClient(os.environ.get("URL"))

db = client['HW23']

def insertOne(collection, data):
    col = db[collection]

    col.insert_one(data)