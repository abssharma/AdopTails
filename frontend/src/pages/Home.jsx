import React, { useEffect, useState } from 'react';
import backgroundImage1 from '../assets/petbg.gif'; 
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import Pet from './Pet';
import { Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Search from './Search';  // Import Search and Filter

const LoggedInHome = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [petId, setPetId] = useState(0);


  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = () => {
    fetch('http://127.0.0.1:5000/pet/pets')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setPets(data);
        setFilteredPets(data); 
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetching pets failed:', err);
        setError(true);
        setLoading(false);
      });
  };
  

  const closeModal = () => {
    setShow(false);
    reset();
  };

  const showModal = (id) => {
    setShow(true);
    setPetId(id);

    const selectedPet = pets.find((pet) => pet.id === id);
    if (selectedPet) {
      setValue('name', selectedPet.name);
      setValue('type', selectedPet.type);
      setValue('breed', selectedPet.breed);
      setValue('age', selectedPet.age);
      setValue('medical', selectedPet.medical);
      setValue('centre', selectedPet.centre);
      setValue('vaccine', selectedPet.vaccine);
      setValue('personality', selectedPet.personality);
      setValue('activity', selectedPet.activity);
      setValue('toy', selectedPet.toy);
      setValue('treat', selectedPet.treat);
    }
  };

  let token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');

  const updatePet = (data) => {
    console.log(data);
    
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(token)}` 
      },
      body: JSON.stringify(data)
    };

    fetch(`http://127.0.0.1:5000/pet/pet/${petId}`, requestOptions)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to update the pet');
        }
        return res.json();
      })
      .then(data => {
        console.log('Pet updated:', data);
        fetchPets();  
        setPets((prevPets) =>
          prevPets.map((pet) => (pet.id === petId ? { ...pet, ...data } : pet))
        );
        closeModal();
      })
      .catch(err => {
        console.error('Error updating pet:', err);
      });
  };

  const deletePet = (id) => {
    console.log(id);
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(token)}` 
      }
    };
    fetch(`http://127.0.0.1:5000/pet/pet/${id}`, requestOptions)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to delete the pet');
        }
        return res.json();
      })
      .then(data => {
        console.log('Pet deleted:', data);
        fetchPets(); 
      })
      .catch(err => console.log('Error deleting pet:', err));
  };

  const handleFilter = (filters) => {
    let filtered = pets;

    if (filters.searchQuery) {
      filtered = filtered.filter(pet =>
        pet.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    if (filters.breed) {
      filtered = filtered.filter(pet => pet.breed === filters.breed);
    }

    const AGE_THRESHOLD = 1;

    if (filters.age) {
      filtered = filtered.filter(pet => {
        const petAge = Number(pet.age); 
        if (isNaN(petAge)) return false;  
        if (filters.age === "Puppy/Kitten") {
          return petAge <= AGE_THRESHOLD;  
        } else if (filters.age === "Adult") {
          return petAge > AGE_THRESHOLD;  
        }
        return true;
      });
    }

    if (filters.centre) {
      filtered = filtered.filter(pet => pet.centre === filters.centre);
    }

    setFilteredPets(filtered);
    reset()
  };

  return (
    <div className="min-h-screen bg-black py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Search Component */}
        <Search onFilter={handleFilter} />

        <Modal show={show} size="lg" onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title className="text-black">Update Listings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(updatePet)}>
              {/* Name */}
          <Form.Group className="mb-4">
            <Form.Label className="text-white">Name of Pet</Form.Label>
            <Form.Control
              type="text"
              {...register('name', { required: true, maxLength: 25 })}
              placeholder="Enter name of pet"
              className="p-2 border border-gray-300 rounded-md bg-white text-black"
            />
            {errors.name && <p style={{ color: 'red' }}><small>Name is required</small></p>}
            {errors.name?.type === "maxLength" && <p style={{ color: 'red' }}><small>Maximum 25 characters</small></p>}
          </Form.Group>

          {/* Type */}
          <Form.Group className="mb-4">
            <Form.Label className="text-white">Type of Pet</Form.Label>
            <Form.Control
              type="text"
              {...register('type', { required: true, maxLength: 25 })}
              placeholder="Enter type of pet"
              className="p-2 border border-gray-300 rounded-md bg-white text-black"
            />
            {errors.type && <p style={{ color: 'red' }}><small>Type is required</small></p>}
            {errors.type?.type === "maxLength" && <p style={{ color: 'red' }}><small>Maximum 25 characters</small></p>}
          </Form.Group>

          {/* Breed */}
          <Form.Group className="mb-4">
            <Form.Label className="text-white">Breed of Pet</Form.Label>
            <Form.Control
              type="text"
              {...register('breed', { required: true, maxLength: 25 })}
              placeholder="Enter breed of pet"
              className="p-2 border border-gray-300 rounded-md bg-white text-black"
            />
            {errors.breed && <p style={{ color: 'red' }}><small>Breed is required</small></p>}
            {errors.breed?.type === "maxLength" && <p style={{ color: 'red' }}><small>Maximum 25 characters</small></p>}
          </Form.Group>

          {/* Age */}
          <Form.Group className="mb-4">
            <Form.Label className="text-white">Age of Pet (yrs)</Form.Label>
            <Form.Control
              type="text"
              {...register('age', { required: true, maxLength: 25 })}
              placeholder="Enter age of pet"
              className="p-2 border border-gray-300 rounded-md bg-white text-black"
            />
            {errors.age && <p style={{ color: 'red' }}><small>Age is required</small></p>}
            {errors.age?.type === "maxLength" && <p style={{ color: 'red' }}><small>Maximum 25 characters</small></p>}
          </Form.Group>

          {/* Medical */}
          <Form.Group className="mb-4">
            <Form.Label className="text-white">Medical Conditions of Pet</Form.Label>
            <Form.Control
              type="text"
              {...register('medical', { required: true, maxLength: 500 })}
              placeholder="Enter medical conditions of pet"
              className="p-2 border border-gray-300 rounded-md bg-white text-black"
            />
            {errors.medical && <p style={{ color: 'red' }}><small>Medcial is required</small></p>}
            {errors.medical?.type === "maxLength" && <p style={{ color: 'red' }}><small>Maximum 500 characters</small></p>}
          </Form.Group>

          {/* Centre */}
          <Form.Group className="mb-4">
            <Form.Label className="text-white">Adoption Centre of Pet</Form.Label>
            <Form.Control
              type="text"
              {...register('centre', { required: true, maxLength: 200 })}
              placeholder="Enter adoption centre of pet"
              className="p-2 border border-gray-300 rounded-md bg-white text-black"
            />
            {errors.centre && <p style={{ color: 'red' }}><small>Adoption Centre is required</small></p>}
            {errors.centre?.type === "maxLength" && <p style={{ color: 'red' }}><small>Maximum 200 characters</small></p>}
          </Form.Group>

          {/* Vaccine */}
          <Form.Group className="mb-4">
            <Form.Label className="text-white">Vaccination Records of Pet</Form.Label>
            <Form.Control
              type="text"
              {...register('vaccine', { required: true, maxLength: 1000 })}
              placeholder="Enter vaccination records of pet"
              className="p-2 border border-gray-300 rounded-md bg-white text-black"
            />
            {errors.vaccine && <p style={{ color: 'red' }}><small>Vaccination Records is required</small></p>}
            {errors.vaccine?.type === "maxLength" && <p style={{ color: 'red' }}><small>Maximum 1000 characters</small></p>}
          </Form.Group>

          {/* Personality */}
          <Form.Group className="mb-4">
            <Form.Label className="text-white">Personality of Pet</Form.Label>
            <Form.Control
              type="text"
              {...register('personality', { required: true, maxLength: 1000 })}
              placeholder="Enter personality of pet"
              className="p-2 border border-gray-300 rounded-md bg-white text-black"
            />
            {errors.personality && <p style={{ color: 'red' }}><small>Personality is required</small></p>}
            {errors.personality?.type === "maxLength" && <p style={{ color: 'red' }}><small>Maximum 1000 characters</small></p>}
          </Form.Group>

          {/* Activity */}
          <Form.Group className="mb-4">
            <Form.Label className="text-white">Favorite Activity of Pet</Form.Label>
            <Form.Control
              type="text"
              {...register('activity', { required: true, maxLength: 1000 })}
              placeholder="Enter favorite activity of pet"
              className="p-2 border border-gray-300 rounded-md bg-white text-black"
            />
            {errors.activity && <p style={{ color: 'red' }}><small>Favorite Activity is required</small></p>}
            {errors.activity?.type === "maxLength" && <p style={{ color: 'red' }}><small>Maximum 1000 characters</small></p>}
          </Form.Group>

          {/* Toy */}
          <Form.Group className="mb-4">
            <Form.Label className="text-white">Favorite Toy of Pet</Form.Label>
            <Form.Control
              type="text"
              {...register('toy', { required: true, maxLength: 1000 })}
              placeholder="Enter favorite toy of pet"
              className="p-2 border border-gray-300 rounded-md bg-white text-black"
            />
            {errors.toy && <p style={{ color: 'red' }}><small>Favorite Toy is required</small></p>}
            {errors.toy?.type === "maxLength" && <p style={{ color: 'red' }}><small>Maximum 1000 characters</small></p>}
          </Form.Group>

          {/* Treat */}
          <Form.Group className="mb-4">
            <Form.Label className="text-white">Favorite Treat of Pet</Form.Label>
            <Form.Control
              type="text"
              {...register('treat', { required: true, maxLength: 1000 })}
              placeholder="Enter favorite treat of pet"
              className="p-2 border border-gray-300 rounded-md bg-white text-black"
            />
            {errors.treat && <p style={{ color: 'red' }}><small>Favorite Treat is required</small></p>}
            {errors.treat?.type === "maxLength" && <p style={{ color: 'red' }}><small>Maximum 1000 characters</small></p>}
          </Form.Group>

              <Form.Group>
                <Button variant="primary" className="w-full py-2" type="submit">
                  Save Preference
                </Button>
              </Form.Group>
            </form>
          </Modal.Body>
        </Modal>

        <h1 className="text-4xl font-bold text-white text-center mb-12"> Pet Listings</h1>

        {loading && (
          <div className="flex justify-center items-center">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500">
            <p>Failed to load pets. Please try again later.</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {filteredPets.length === 0 ? (
              <div className="text-center text-gray-600">
                <p>No pets available at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredPets.map((pet) => (
                  <Pet
                    key={pet.id}
                    name={pet.name}
                    type={pet.type}
                    breed={pet.breed}
                    age={pet.age}
                    personality={pet.personality}
                    activity={pet.activity}
                    toy={pet.toy}
                    treat={pet.treat}
                    medical={pet.medical}
                    centre={pet.centre}
                    vaccine={pet.vaccine}
                    onClick={() => showModal(pet.id)}
                    onDelete={() => deletePet(pet.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const LoggedOutHome = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat relative text-white"
      style={{ backgroundImage: `url(${backgroundImage1})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <h1 className="text-5xl font-bold mb-6">Welcome to AdopTails</h1>
        <p className="mb-10 text-lg max-w-2xl">
        Discover Friends with Ease, and Find a Forever Home for Every Paw in Need!
        </p>
        <Link
          to="/signup"
          className="px-12 py-3 bg-white text-black font-semibold rounded-md shadow-lg hover:bg-blue-700 hover:text-white transition duration-300"
        >
          Start
        </Link>
      </div>
    </div>
  );
};

const Home = () => {
  const [logged] = useAuth();
  return <div>{logged ? <LoggedInHome /> : <LoggedOutHome />}</div>;
};

export default Home;