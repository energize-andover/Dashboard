from flask import Flask
from web.main import build_app

flask_app = build_app(Flask(__name__))

if __name__ == '__main__':
    flask_app.run()
