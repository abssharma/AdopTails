import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const Pet = ({ name, type, breed, age, personality, activity, toy, treat, centre, medical, vaccine, isFavorite, onToggleFavorite, onClick, onDelete }) => {
  const [imagePreview, setImagePreview] = useState(null);


  const renderVaccinationRecords = (vaccine) => {
    if (!vaccine) return null;
    return vaccine.split(/,|'/).map((item, index) => (
      <p key={index}>{item.trim()}</p>
    ));
  };

  const handleToggleFavorite = () => {
    onToggleFavorite(id, isFavorite);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
      <div>
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white mb-2 text-center">{name}</h1>
      </div>

      <h1 className="text-gray-600 dark:text-gray-300 text-center"><strong>Pet Type:</strong> {type}</h1>
      <h1 className="text-gray-600 dark:text-gray-300 text-center"><strong>Pet Breed:</strong> {breed}</h1>
      <h1 className="text-gray-600 dark:text-gray-300 text-center"><strong>Pet Age (yrs):</strong> {age}</h1>
      <br></br>
      <h1 className="text-gray-600 dark:text-gray-300 text-center"><strong>Pet Personality:</strong> {personality}</h1>
      <h1 className="text-gray-600 dark:text-gray-300 text-center"><strong>Fav Activity:</strong> {activity}</h1>
      <h1 className="text-gray-600 dark:text-gray-300 text-center"><strong>Fav Toy:</strong> {toy}</h1>
      <h1 className="text-gray-600 dark:text-gray-300 text-center"><strong>Fav Treat:</strong> {treat}</h1>
      <br></br>
      <h1 className="text-gray-600 dark:text-gray-300 text-center"><strong>Location:</strong> {centre}</h1>
      <br></br>
      <h1 className="text-gray-600 dark:text-gray-300 text-center"><strong>Medical Conditions:</strong> {medical}</h1>
      <br></br>
      <h1 className="text-gray-600 dark:text-gray-300 text-center"><strong>Vaccination Records:</strong></h1>
      <div className="text-gray-600 dark:text-gray-300 text-center">{renderVaccinationRecords(vaccine)}</div>

      <div className="flex justify-center mt-4">
        <Button className="bg-green-600 text-black mr-2" onClick={onClick}>Update</Button>
        <Button className="bg-red-600 text-white mr-2" onClick={onDelete}>Assigned?</Button>
      </div>
    </div>
  );
};

export default Pet;
