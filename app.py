from flask import Flask
from flask_restful import reqparse, abort, Api, Resource

import pymysql

from flask import jsonify
from flask import request
from flask import session

from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash

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

## 회원가입 API
@app.route('/auth/register', methods=('GET', 'POST'))
def register():
    
    if request.method == 'POST':
        
        user_email = request.form['user_email']
        user_password = request.form['user_password']
        
        error = None

        # 유효성 검증 - null 일 경우
        if not user_email:
            error = 'Email이 유효하지 않습니다.'
        
        elif not user_password:
            error = 'Password가 유효하지 않습니다.'

        # 유효성 검증 - 기존 회원일 경우
        sql = 'SELECT user_id FROM user WHERE user_email = %s'
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

if __name__ == '__main__':
    app.run()