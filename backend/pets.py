from flask_restx import Namespace, Resource, fields
from flask import Flask, request
from flask_jwt_extended import jwt_required
from models import Pet
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename


pet_ns = Namespace('pet', description = 'A namesapce for Pets')


# ====================================== model (serializer) ======================================
pet_model = pet_ns.model(
   "Pet",
   {
       "id":fields.Integer(),
       "name":fields.String(),
       "type":fields.String(),
       "breed":fields.String(),
       "age":fields.Integer(),
       "medical":fields.String(),
       "centre":fields.String(),
       "vaccine":fields.String(),
       "personality":fields.String(),
       "activity":fields.String(),
       "toy":fields.String(),
       "treat":fields.String()
   }
)


# ====================================== hello ======================================
@pet_ns.route('/hello')
class HelloResource(Resource):
   def get(self):
       return {"message": "Hello World"}


# ====================================== pets ======================================
@pet_ns.route('/pets')
class PetsResource(Resource):


   @pet_ns.marshal_list_with(pet_model)
   def get(self):
       """Get all pets"""
       pets = Pet.query.all()
       return pets


   @pet_ns.marshal_with(pet_model)
   @pet_ns.expect(pet_model)
   @jwt_required()
   def post(self):
       """Create a new pet listing"""
       data = request.get_json()
       new_pet = Pet(
           name = data.get('name'),
           type = data.get('type'),
           breed = data.get('breed'),
           age = data.get('age'),
           medical = data.get('medical'),
           centre = data.get('centre'),
           vaccine = data.get('vaccine'),
           personality = data.get('personality'),
           activity = data.get('activity'),
           treat = data.get('treat'),
           toy = data.get('toy')
       )
       new_pet.save()
       return new_pet, 201


# ====================================== pet/<> ======================================
@pet_ns.route('/pet/<int:id>')
class PetResource(Resource):


   @pet_ns.marshal_with(pet_model)
   def get(self, id):
       """Get a pet by id"""
       pet = Pet.query.get_or_404(id)
       return pet


   @pet_ns.marshal_with(pet_model)
   @jwt_required()
   def put(self, id):
       """Update a pet by id"""
       pet_to_update = Pet.query.get_or_404(id)
       data = request.get_json()
       pet_to_update.update(data.get('name'), data.get('type'), data.get('breed'), data.get('age'), data.get('medical'), data.get('centre'), data.get('vaccine'), data.get('personality'), data.get('activity'), data.get('treat'), data.get('toy'))
       return pet_to_update


   @pet_ns.marshal_with(pet_model)
   @jwt_required()
   def delete(self, id):
       """Delete a pet by id"""
       pet_to_delete = Pet.query.get_or_404(id)
       pet_to_delete.delete()
       return pet_to_delete

