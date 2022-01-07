from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin
from bson import ObjectId
import json

app = Flask(__name__)
CORS(app, support_credentials=True)
app.config["MONGO_URI"] = "mongodb://localhost:27017/tasksDB"
mongodb_client = PyMongo(app)
db = mongodb_client.db.tasksDB

@app.route("/", methods=["POST", "GET"])
@cross_origin(supports_credentials=True)
def insert_task():
    if request.method == "POST":
        text = request.json["text"]
        reminder = request.json["reminder"]
        id = db.insert({"text": text, "reminder": reminder})
        return jsonify(str(ObjectId(id)))

    elif request.method == "GET":
        o = []
        for i in db.find():
            o.append({"_ID":str(ObjectId(i["_id"])), "text":i["text"], "reminder":i["reminder"]})
        return jsonify(o)

@app.route("/<id>", methods=["DELETE","PUT"])
def deleteput_task(id):
    if request.method == "DELETE":
        db.delete_one({"_id":ObjectId(id)})
        return jsonify({"message":"deleted"})

    elif request.method == "PUT":
        db.update({"_id":ObjectId(id)}, {"$set":{
            "text": request.json["text"],
            "reminder": request.json["reminder"]
        }})
        return jsonify({"message":"updated"})


if __name__ == '__main__':
    app.run(debug=True)