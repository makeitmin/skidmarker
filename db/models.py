from app import db

class User(db.Model):
    __tablename__ = 'user'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(45), nullable=False)
    
    def __init__(self, email, password, name):
        self.email = email
        self.password = password
        self.name = name
    
    def __repr__(self):
        return 'user_id : %s, user_name : %s, profile_url : %s' % (self.user_id, self.user_name, self.profile_url)

    def as_dict(self):
        return {x.name: getattr(self, x.name) for x in self.__table__.columns}

class Education(db.Model):
    __tablename__ = 'education'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    univ_name = db.Column(db.String(45), nullable=False)
    major = db.Column(db.String(45), nullable=False)
    degree = db.Column(db.String(45), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    
    def __init__(self, univ_name, major, degree, user_id):
        self.univ_name = univ_name
        self.major = major
        self.degree = degree
        self.user_id = user_id

class Award(db.Model):
    __tablename__ = 'award'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(45), nullable=False)
    detail = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    
    def __init__(self, name, detail, user_id):
        self.id = id
        self.name = name
        self.detail = detail
        self.user_id = user_id

class Project(db.Model):
    __tablename__ = 'project'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(45), nullable=False)
    detail = db.Column(db.String(255), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    
    def __init__(self, name, detail, user_id):
        self.id = id
        self.name = name
        self.detail = detail
        self.start_date = start_date
        self.end_date = end_date
        self.user_id = user_id

class Certificate(db.Model):
    __tablename__ = 'certificate'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(45), nullable=False)
    organization = db.Column(db.String(255), nullable=False)
    acq_date = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    
    def __init__(self, name, organization, acq_date, user_id):
        self.id = id
        self.name = name
        self.organization = organization
        self.acq_date = acq_date
        self.user_id = user_id