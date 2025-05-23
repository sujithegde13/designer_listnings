from flask_sqlalchemy import SQLAlchemy
import uuid

db = SQLAlchemy()

class Designer(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(100), nullable=False)
    specialty = db.Column(db.String(100), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    projects = db.Column(db.Integer, nullable=False)
    rate = db.Column(db.String(20), nullable=False)
    profile_img = db.Column(db.String(200), nullable=False)
    availability = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'specialty': self.specialty,
            'rating': self.rating,
            'projects': self.projects,
            'rate': self.rate,
            'profile_img': self.profile_img,
            'availability': self.availability
        } 