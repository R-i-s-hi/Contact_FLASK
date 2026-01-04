from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


# CORS Config
app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173", "https://contact-flask-67sx.onrender.com"])


# DB Config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flask.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
