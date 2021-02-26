from flask import Flask, render_template
from flask_jwt_extended import *
from flask_jwt_extended import JWTManager
from flask_restful import reqparse, abort, Resource

import pymysql

from flask import jsonify
from flask import request
from flask import session
from flask_cors import CORS

from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash

app = Flask(__name__)
CORS(app)

app.config.update(DEBUG = True, JWT_SECRET_KEY = "adminSeongmin")

jwt = JWTManager(app)

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

@app.route('/')
def index():
    return ''

# 홈 API 구현하기
@app.route('/home')
def home():

    return ''

# 회원가입/로그인 API 구현하기

## 회원가입 API
@app.route('/auth/register', methods=['GET', 'POST'])
def register():
    print(request)
    if request.method == 'POST':
        
        # user_email, user_password 받아오기
        data = request.get_json()

        error = None

        user_email = data.get('user_email')
        user_password = data.get('user_password')

        # 유효성 검증 - null 일 경우
        if not user_email:
            error = 'Email이 유효하지 않습니다.'
        
        elif not user_password:
            error = 'Password가 유효하지 않습니다.'

        # 유효성 검증 - 기존 회원일 경우
        sql = 'SELECT `user_id` FROM `user` WHERE `user_email`=%s'
        cursor.execute(sql, (user_email,))
        result = cursor.fetchone()

        if result is not None:
            error = '{} 계정은 이미 등록된 계정입니다.'.format(user_email)

        # 유효성 검증 통과 시 DB에 회원정보 등록
        if error is None:
            sql = "INSERT INTO `user` (`user_email`, `user_password`) VALUES (%s, %s)"
            cursor.execute(sql, (user_email, generate_password_hash(user_password))) # user_password 암호화
            db.commit()
            return jsonify(status = "success", result = {"user_email": user_email, "user_password": user_password})

    # 유효성 검증 미통과 시 에러 메세지 반환
    return jsonify(status = "fail", result = {"error": error})

## 로그인 API

@app.route('/auth/login', methods=['GET', 'POST'])
def login():
    
    access_token = None

    if request.method == 'POST':

         # user_email, user_password 받아오기
        data = request.get_json()
        
        error = None
        
        user_email = data.get('user_email')
        user_password = data.get('user_password')

        sql = 'SELECT `user_email`, `user_password` FROM `user` WHERE `user_email` = %s'
        cursor.execute(sql, (user_email,))
        user = cursor.fetchone()
        
        # 유효성 검증 - null 일 경우
        if user is None:
            error = '등록되지 않은 계정입니다.'
        
        # 유효성 검증 - 비밀번호가 틀렸을 경우
        # user는 tuple 타입으로 데이터 반환, user[0]은 email user[1]은 password 
        if not (user == None or check_password_hash(user[1], user_password)):
            error = 'password가 틀렸습니다.'
        
        if error is None:
            access_token = create_access_token(identity = user_email, expires_delta = False)
            return jsonify(result = "success", access_token = access_token, user_email = user_email)
        
    # 유효성 검증 미통과 시 에러 메세지 반환
    return jsonify(status = "fail", result = {"error": error})

@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user)
    

if __name__ == '__main__':
    app.run()