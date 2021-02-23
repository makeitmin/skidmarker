from flask import Flask
from flask_restful import reqparse, abort, Api, Resource

import pymysql

from flask import jsonify
from flask import request
from flask import session

app = Flask(__name__)
api = Api(app)

# MySQL DB 연결
db = pymysql.connect(
        user = 'root',
        passwd = '1234',
        host = '127.0.0.1',
        port = 3306,
        db = 'skidmarker',
        charset = 'utf8'
    )
cursor = db.cursor()

# 회원가입/로그인 API 구현하기

if __name__ == '__main__':
    app.run()