import React from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const CreatePet = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const createPet = (data) => {
    setLoading(true);  // Start the spinner
    const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
    
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(token)}`
      },
      body: JSON.stringify(data)
    };
    
    fetch('http://127.0.0.1:5000/pet/pets', requestOptions)
      .then(res => res.json())
      .then(() => {
        reset();
        setLoading(false);  
      })
      .catch(err => {
        console.log(err);
        setLoading(false);  
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-16">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md transition-all transform hover:scale-105">
        <h1 className="text-black text-4xl font-bold mb-6 text-center">Add a New Listing</h1>
        <form onSubmit={handleSubmit(createPet)}> 

          {/* Name */}
          <Form.Group className="mb-4">
            <Form.Label className="text-black">Name of Pet</Form.Label>
            <Form.Control
              type="text"
              {...register('name', { required: true, maxLength: 25 })}
              placeholder="Enter name of pet"
              className={`p-2 border rounded-md text-black ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.name && <small className="text-red-500">Name is required</small>}
          </Form.Group>

          {/* Type */}
          <Form.Group className="mb-4">
            <Form.Label className="text-black">Type of Pet</Form.Label>
            <Form.Control
              type="text"
              {...register('type', { required: true, maxLength: 25 })}
              placeholder="Enter type of pet"
              className={`p-2 border rounded-md text-black ${errors.type ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.type && <small className="text-red-500">Type is required</small>}
          </Form.Group>

          {/* Breed */}
          <Form.Group className="mb-4">
            <Form.Label className="text-black">Breed of Pet</Form.Label>
            <Form.Control
              type="text"
              {...register('breed', { required: true, maxLength: 25 })}
              placeholder="Enter breed of pet"
              className={`p-2 border rounded-md text-black ${errors.breed ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.breed && <small className="text-red-500">Breed is required</small>}
          </Form.Group>

          {/* Age */}
          <Form.Group className="mb-4">
            <Form.Label className="text-black">Age of Pet (yrs)</Form.Label>
            <Form.Control
              type="text"
              {...register('age', { required: true })}
              placeholder="Enter age of pet"
              className={`p-2 border rounded-md text-black ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.age && <small className="text-red-500">Age is required</small>}
          </Form.Group>

          {/* Medical */}
          <Form.Group className="mb-4">
            <Form.Label className="text-black">Medical Conditions of Pet</Form.Label>
            <Form.Control
              type="text"
              {...register('medical', { required: true })}
              placeholder="Enter medical conditions of pet"
              className={`p-2 border rounded-md text-black ${errors.medical ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.medical && <small className="text-red-500">Medical is required)</small>}
          </Form.Group>

          {/* Centre */}
          <Form.Group className="mb-4">
            <Form.Label className="text-black">Adoption Centre of Pet</Form.Label>
            <Form.Control
              type="text"
              {...register('centre', { required: true })}
              placeholder="Enter adoption centre of pet"
              className={`p-2 border rounded-md text-black ${errors.centre ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.centre && <small className="text-red-500">Adoption Centre is required</small>}
          </Form.Group>

          {/* Vaccine */}
          <Form.Group className="mb-4">
            <Form.Label className="text-black">Vaccination Records of Pet</Form.Label>
            <Form.Control
              type="text"
              {...register('vaccine', { required: true })}
              placeholder="Enter vaccination records of pet"
              className={`p-2 border rounded-md text-black ${errors.vaccine ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.vaccine && <small className="text-red-500">Vaccination Records is required</small>}
          </Form.Group>

          {/* Personality */}
          <Form.Group className="mb-4">
            <Form.Label className="text-black">Personality of Pet</Form.Label>
            <Form.Control
              type="text"
              {...register('personality', { required: true })}
              placeholder="Enter personality of pet"
              className={`p-2 border rounded-md text-black ${errors.personality ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.personality && <small className="text-red-500">Personality is required</small>}
          </Form.Group>

          {/* Activity */}
          <Form.Group className="mb-4">
            <Form.Label className="text-black">Favorite Activity of Pet</Form.Label>
            <Form.Control
              type="text"
              {...register('activity', { required: true })}
              placeholder="Enter favorite activity of pet"
              className={`p-2 border rounded-md text-black ${errors.activity ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.activity && <small className="text-red-500">Favorite Activity is required</small>}
          </Form.Group>

          {/* Toy */}
          <Form.Group className="mb-4">
            <Form.Label className="text-black">Favorite Toy of Pet</Form.Label>
            <Form.Control
              type="text"
              {...register('toy', { required: true })}
              placeholder="Enter favorite toy of pet"
              className={`p-2 border rounded-md text-black ${errors.toy ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.toy && <small className="text-red-500">Favorite Toy is required</small>}
          </Form.Group>

          {/* Treat */}
          <Form.Group className="mb-4">
            <Form.Label className="text-black">Favorite Treat of Pet</Form.Label>
            <Form.Control
              type="text"
              {...register('treat', { required: true })}
              placeholder="Enter favorite treat records of pet"
              className={`p-2 border rounded-md text-black ${errors.treat ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.treat && <small className="text-red-500">Favorite Treat is required</small>}
          </Form.Group>

          {/* Save Button */}
          <Form.Group>
            <Button variant="primary" className="w-full py-2 flex justify-center items-center" type="submit" disabled={loading}>
              {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Save'}
            </Button>
          </Form.Group>
        </form>
      </div>
    </div>
  );
};

export default CreatePet;
