from flask import Flask
from flask_restx import Api
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from models import Pet, User
from exts import db
from pets import pet_ns
from auth import auth_ns
from flask_cors import CORS
from config import DevConfig

def create_app(config = DevConfig):
    app = Flask(__name__)
    app.config.from_object(config)

    CORS(app)

    db.init_app(app)

    migrate = Migrate(app, db)
    JWTManager(app)

    api = Api(app, doc = '/docs')

    api.add_namespace(pet_ns)
    api.add_namespace(auth_ns)

    # ====================================== shell context processor ======================================
    @app.shell_context_processor
    def make_shell_context():
        return {
            "db":db,
            "Pet":Pet,
            "User":User
        }

    # ====================================== app ======================================

    return app      