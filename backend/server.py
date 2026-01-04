from flask import request, jsonify
from config import app, db
from models import Contact

@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()
    json_contacts = list(map(lambda contact: contact.to_json(), contacts))
    return (
        jsonify({"contacts": json_contacts}),
        200
    )

@app.route("/create_contact", methods=["POST"])
def create_contact():
    first_name = request.json.get("first_name")
    last_name = request.json.get("last_name")
    email = request.json.get("email")

    if not first_name or not last_name or not email:
        return (
            jsonify({"error": "Missing required fields"}),
            400
        )

    new_contact = Contact(first_name=first_name, last_name=last_name, email=email)
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return (
            jsonify({"error": f"Failed to add the contact: {str(e)}"}),
            400
        )

    return (
        jsonify({"message": "User created successfully!"}),
        201
    )

@app.route("/contact/<int:id>", methods=["GET"])
def get_contact(id):
    contact = Contact.query.get(id)
    if not contact:
        return jsonify(
            {"error": "Contact not found!"},
            404
        )
    return jsonify({
        "id": contact.id,
        "firstName": contact.first_name,
        "lastName": contact.last_name,
        "email": contact.email
    })

@app.route("/update_contact/<int:contact_id>", methods=["PUT"])
def update_contact(contact_id):
    contact = Contact.query.get(contact_id)

    if not contact:
        return jsonify(
            {"error": "Contact not found!"},
            404
        )
    
    data = request.json

    contact.first_name = data.get("first_name", contact.first_name)
    contact.last_name = data.get("last_name", contact.last_name)
    contact.email = data.get("email", contact.email)

    db.session.commit()

    return (
        jsonify({"message": "Contact updated successfully!"}),
        200
    )

@app.route("/delete_contact/<int:contact_id>", methods=["DELETE"])
def delete_contact(contact_id):
    contact = Contact.query.get(contact_id)

    if not contact:
        return jsonify(
            {"error": "Contact not found!"},
            404
        )

    db.session.delete(contact)
    db.session.commit()

    return (
        jsonify({"message": "Contact deleted successfully!"}),
        200
    )

if __name__ == "__main__":

    # create models
    with app.app_context():
        db.create_all()

    app.run(debug=True, port=5000)