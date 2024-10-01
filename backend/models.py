from exts import db

class Pet(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(), nullable=False)
    type = db.Column(db.String(), nullable=False)
    breed = db.Column(db.String(), nullable=False)
    age = db.Column(db.Integer(), nullable=False)
    medical = db.Column(db.String(), nullable=False)
    centre = db.Column(db.String(), nullable=False)
    vaccine = db.Column(db.String(), nullable=False)
    personality = db.Column(db.String(), nullable=False)
    activity = db.Column(db.String(), nullable=False)
    treat = db.Column(db.String(), nullable=False)
    toy = db.Column(db.String(), nullable=False)
    
    def __repr__(self):
        return f"<Pet {self.name}>"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, name, type, breed, age, medical, centre, vaccine, personality, activity, toy, treat):
        self.name = name
        self.type = type
        self.breed = breed
        self.age = age
        self.medical = medical
        self.centre = centre
        self.vaccine = vaccine
        self.personality = personality
        self.activity = activity
        self.toy = toy
        self.treat = treat

        db.session.commit()

# user model
class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(25), nullable=False, unique=True)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.Text(), nullable=False)

    def __repr__(self):
        return f"<User {self.username}>"

    def save(self):
        db.session.add(self)
        db.session.commit()