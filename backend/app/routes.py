from flask import Blueprint, jsonify
from .models import db, Designer

main = Blueprint('main', __name__)

@main.route('/api/listings', methods=['GET'])
def get_listings():
    designers = Designer.query.all()
    return jsonify([designer.to_dict() for designer in designers])

# Add some sample data if the database is empty
@main.before_app_first_request
def add_sample_data():
    if Designer.query.count() == 0:
        sample_designers = [
            Designer(
                name='Sarah Johnson',
                specialty='Modern Interiors',
                rating=4.5,
                projects=42,
                rate='$120/hr',
                profile_img='https://randomuser.me/api/portraits/women/1.jpg',
                availability='2 weeks'
            ),
            Designer(
                name='Michael Chen',
                specialty='Minimalist Design',
                rating=4.8,
                projects=35,
                rate='$150/hr',
                profile_img='https://randomuser.me/api/portraits/men/1.jpg',
                availability='1 week'
            ),
            Designer(
                name='Emma Wilson',
                specialty='Scandinavian Design',
                rating=4.7,
                projects=28,
                rate='$130/hr',
                profile_img='https://randomuser.me/api/portraits/women/2.jpg',
                availability='3 weeks'
            )
        ]
        db.session.add_all(sample_designers)
        db.session.commit() 