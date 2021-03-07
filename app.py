from flask import Flask, render_template
from flask_jwt_extended import *
from flask_jwt_extended import JWTManager
from flask_restful import reqparse, abort, Resource

import pymysql
# from flask_migrate import Migrate
# from flask_sqlalchemy import SQLAlchemy

# from models import User

# import config

from flask import jsonify
from flask import request
from flask import session
from flask_cors import CORS

from werkzeug.security import check_password_hash
from werkzeug.security import generate_password_hash

# db = SQLAlchemy()
# migrate = Migrate()

app = Flask(__name__)
# app.config.from_object(config)
# db.init_app(app)
# migrate.init_app(app, db)

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
    
    if request.method == 'POST':
        
        # user_email, user_password 받아오기
        data = request.get_json()

        error = None

        email = data.get('user_email')
        password = data.get('user_password')
        name = data.get('user_name')

        # 유효성 검증 - null 일 경우
        if not email:
            error = 'Email이 유효하지 않습니다.'
        
        elif not password:
            error = 'Password가 유효하지 않습니다.'

        # 유효성 검증 - 기존 회원일 경우
        sql = 'SELECT `id` FROM `user` WHERE `email`=%s'
        cursor.execute(sql, (email,))
        result = cursor.fetchone()

        if result is not None:
            error = '{} 계정은 이미 등록된 계정입니다.'.format(email)

        # 유효성 검증 통과 시 DB에 회원정보 등록
        if error is None:
            sql = "INSERT INTO `user` (`email`, `password`,`name`) VALUES (%s, %s, %s)"
            cursor.execute(sql, (email, generate_password_hash(password), name,)) # user_password 암호화
            db.commit()
            return jsonify(status = "success", result = {"user_email": email, "user_password": password, "user_name": name})

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
        
        email = data.get('user_email')
        password = data.get('user_password')

        sql = 'SELECT `email`, `password`, `name` FROM `user` WHERE `email` = %s'
        cursor.execute(sql, (email,))
        user = cursor.fetchone()
        
        # 유효성 검증 - null 일 경우
        if user is None:
            error = '등록되지 않은 계정입니다.'
        
        # 유효성 검증 - 비밀번호가 틀렸을 경우
        # user는 tuple 타입으로 데이터 반환, user[0]은 email user[1]은 password 
        if not (user == None or check_password_hash(user[1], password)):
            error = 'password가 틀렸습니다.'
        
        if error is None:
            access_token = create_access_token(identity = user[0])
            return jsonify(result = "success", access_token = access_token, user_email = email)
        
    # 유효성 검증 미통과 시 에러 메세지 반환
    return jsonify(status = "fail", result = {"error": error})

# 사용자 인증 API

@app.route("/auth/info", methods=["GET"])
@jwt_required()
def protected():

    current_user = get_jwt_identity()

    sql = 'SELECT `id`, `email`, `name` FROM `user` WHERE `email` = %s'
    cursor.execute(sql, (current_user,))
    user_auth = cursor.fetchone()
    
    # 홈 화면에서 사용자 정보 표시를 위해 user_id, user_name, user_email 반환
    return jsonify(user_id=user_auth[0], user_email=user_auth[1], user_name=user_auth[2])

# 사용자 포트폴리오 API

## CREATE API
@app.route('/user/portfolio/create', methods=['GET', 'POST'])
def create():
    
    if request.method == 'POST':
        
        # user 포트폴리오 정보 받아오기
        data = request.get_json()
        group = data.get('group')

        error = None

        # form_header(폼 종류)에 따라 분기
        if group == "education":

            user_id = data.get('user_id')
            univ_name = data.get('school')
            major = data.get('major')
            degree = data.get('degree')

            # 유효성 검증 - null 일 경우
            if not univ_name:
                error = '학교명이 유효하지 않습니다.'

            if not major:
                error = '전공명이 유효하지 않습니다.'

            if not degree:
                error = '학위가 유효하지 않습니다.'
            
            # 유효성 검증 통과 시 DB에 학력 등록
            if error is None:
                sql = "INSERT INTO `education` (`univ_name`, `major`,`degree`,`user_id`) VALUES (%s, %s, %s, %s)"
                cursor.execute(sql, (univ_name, major, degree, user_id,))
                db.commit()
                return jsonify(status = "success", result = {"school": univ_name, "major": major, "degree": degree, "user_id": user_id})

        elif group == "award":

            user_id = data.get('user_id')
            name = data.get('award')
            detail = data.get('award_detail')

            # 유효성 검증 - null 일 경우
            if not name:
                error = '수상내역이 유효하지 않습니다.'

            if not detail:
                error = '상세내역이 유효하지 않습니다.'
            
            # 유효성 검증 통과 시 DB에 수상이력 등록
            if error is None:
                sql = "INSERT INTO `award` (`name`, `detail`,`user_id`) VALUES (%s, %s, %s)"
                cursor.execute(sql, (name, detail, user_id,))
                db.commit()
                return jsonify(status = "success", result = {"award": name, "award_detail": detail, "user_id": user_id})

        elif group == "project":

            user_id = data.get('user_id')
            name = data.get('project')
            detail = data.get('project_detail')
            start_date = data.get('project_start')
            start_date = start_date.split("T")[0]
            end_date = data.get('project_end')
            end_date = end_date.split("T")[0]

            # 유효성 검증 - null 일 경우
            if not name:
                error = '프로젝트명이 유효하지 않습니다.'

            if not detail:
                error = '상세내역이 유효하지 않습니다.'

            if not start_date:
                error = '시작일이 유효하지 않습니다.'

            if not end_date:
                error = '마감일이 유효하지 않습니다.'
            
            # 유효성 검증 통과 시 DB에 프로젝트 이력 등록
            if error is None:
                sql = "INSERT INTO `project` (`name`, `detail`,`start_date`,`end_date`,`user_id`) VALUES (%s, %s, %s, %s, %s)"
                cursor.execute(sql, (name, detail, start_date, end_date, user_id,))
                db.commit()
                return jsonify(status = "success", result = {"project": name, "project_detail": detail, "project_start": start_date, "project_end": end_date, "user_id": user_id})
            
        elif group == "certificate":
            user_id = data.get('user_id')
            name = data.get('certi')
            organization = data.get('certi_detail')
            acq_date = data.get('certi_date')
            acq_date = acq_date.split("T")[0]

            # 유효성 검증 - null 일 경우
            if not name:
                error = '자격증명이 유효하지 않습니다.'

            if not organization:
                error = '공급기관이 유효하지 않습니다.'
            
            # 유효성 검증 통과 시 DB에 자격증 등록
            if error is None:
                sql = "INSERT INTO `certificate` (`name`, `organization`,`acq_date`,`user_id`) VALUES (%s, %s, %s, %s)"
                cursor.execute(sql, (name, organization, acq_date, user_id,))
                db.commit()
                return jsonify(status = "success", result = {"certi": name, "certi_detail": organization, "certi_date": acq_date, "user_id": user_id})

    # 유효성 검증 미통과 시 에러 메세지 반환
    return jsonify(status = "fail", result = {"error": error})

## READ API
@app.route('/user/portfolio/read', methods=['GET', 'POST'])
def read():

    data = request.get_json()
    user_id = data.get('userId')
    
    sql_education = "SELECT `id`, `univ_name`, `major`, `degree` FROM `education` WHERE `user_id`= %s"
    cursor.execute(sql_education, (user_id,))
    education = cursor.fetchall()
    db.commit()

    sql_award = "SELECT `id`, `name`, `detail` FROM `award` WHERE `user_id`= %s"
    cursor.execute(sql_award, (user_id,))
    award = cursor.fetchall()
    db.commit()

    sql_project = "SELECT `id`, `name`, `detail`, DATE_FORMAT(`start_date`, '%%Y-%%m-%%d'), DATE_FORMAT(`end_date`, '%%Y-%%m-%%d') FROM `project` WHERE `user_id`= %s"
    cursor.execute(sql_project, (user_id,))
    project = cursor.fetchall()
    db.commit()

    sql_certificate = "SELECT `id`, `name`, `organization`, DATE_FORMAT(`acq_date`, '%%Y-%%m-%%d') FROM `certificate` WHERE `user_id`= %s"
    cursor.execute(sql_certificate, (user_id,))
    certificate = cursor.fetchall()
    db.commit()

    return jsonify(status = "success", education = education, award = award, project = project, certificate = certificate)

## UPDATE API
@app.route('/user/portfolio/update', methods=['GET', 'POST'])
def update():

    data = request.get_json()

    id = int(data.get('id'))
    group = data.get('group')
    
    if group == "education":
        univ_name = data.get('univ_name')
        major = data.get('major')
        degree = data.get('degree')

        sql_education = "UPDATE `education` SET `univ_name`=%s, `major`=%s, `degree`=%s WHERE `id` = %s"
        cursor.execute(sql_education, (univ_name, major, degree, id,))
        db.commit()

    elif group == "award":
        name = data.get('name')
        detail = data.get('detail')

        sql_award = "UPDATE `award` SET `name`=%s, `detail`=%s WHERE `id` = %s"
        cursor.execute(sql_award, (name, detail, id,))
        db.commit()

    elif group == "project":

        name = data.get('project')
        detail = data.get('project_detail')
        start_date = data.get('project_start')
        start_date = start_date.split("T")[0]
        end_date = data.get('project_end')
        end_date = end_date.split("T")[0]

        sql_project = "UPDATE `project` SET `name`=%s, `detail`=%s,`start_date`=%s,`end_date`=%s WHERE `id` = %s"
        cursor.execute(sql_project, (name, detail, start_date, end_date, id,))
        db.commit()

    elif group == "certificate":

        name = data.get('name')
        organization = data.get('organization')
        acq_date = data.get('acq_date')
        acq_date = acq_date.split("T")[0]

        sql_certificate = "UPDATE `certificate` SET `name`=%s,`organization`=%s,`acq_date`=%s WHERE `id` = %s"
        cursor.execute(sql_certificate, (name, organization, acq_date, id, ))
        db.commit()

    return jsonify(status = "update success")

## DELETE API
@app.route('/user/portfolio/delete', methods=['GET', 'POST'])
def delete():

    data = request.get_json()

    id = data.get('id')
    group = data.get('group')
    
    if group == "education":
        sql_education = "DELETE FROM `education` WHERE `id` = %s"
        cursor.execute(sql_education, (id,))
        db.commit()

    elif group == "award":
        sql_award = "DELETE FROM `award` WHERE `id` = %s"
        cursor.execute(sql_award, (id,))
        db.commit()

    elif group == "project":
        sql_project = "DELETE FROM `project` WHERE `id` = %s"
        cursor.execute(sql_project, (id,))
        db.commit()

    elif group == "certificate":
        sql_certificate = "DELETE FROM `certificate` WHERE `id` = %s"
        cursor.execute(sql_certificate, (id,))
        db.commit()

    return jsonify(status = "delete success")

# 사용자 네트워크 API

@app.route('/network', methods=['GET', 'POST'])
def readAll():
    
    data = request.get_json();
    user_id = data.get('userId')

    sql = "SELECT `id`, `name`, `email` FROM `user` WHERE `id` != %s";
    cursor.execute(sql, (user_id))
    result = cursor.fetchall()
    db.commit()

    return jsonify(status = "success", result = result)

@app.route('/network/other', methods=['POST'])
def readOne():
        
    data = request.get_json();
    user_id = int(data.get('userId'))

    sql = "SELECT `id`, `name`, `email` FROM `user` WHERE `id` = %s";
    cursor.execute(sql, (user_id))
    result = cursor.fetchall()
    db.commit()

    return jsonify(status = "success", result = result)

if __name__ == '__main__':
    app.run("0.0.0.0", port=5000, threaded = False)