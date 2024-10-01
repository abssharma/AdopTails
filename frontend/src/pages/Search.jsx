import React, { useState, useEffect } from 'react';

const Search = ({ onFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    animalType: '',
    breed: '',
    age: '',
    centre: ''
  });
  const [showFields, setShowFields] = useState(false);  // To control visibility of other fields

  const dogBreeds = [
    'Labrador Retriever', 'Bulldog', 'German Shepherd', 'French Bulldog', 'Golden Retriever',
    'Poodle', 'Beagle', 'Rottweiler', 'Pug', 'Yorkshire Terrier', 'Boxer', 'Dachshund',
    'Shih Tzu', 'Pembroke Welsh Corgi', 'Siberian Husky', 'Cavalier King Charles Spaniel'
  ];

  const catBreeds = [
    'Persian', 'Maine Coon', 'Ragdoll', 'Bengal', 'Siamese', 'British Shorthair', 'Sphynx',
    'Scottish Fold', 'Abyssinian', 'American Shorthair', 'Birman', 'Russian Blue', 'Devon Rex',
    'Norwegian Forest Cat', 'Savannah'
  ];

  const handleAnimalTypeChange = (e) => {
    const newAnimalType = e.target.value;

    const resetFilters = {
      animalType: newAnimalType,
      breed: '',
      age: '',
      centre: ''
    };

    setFilters(resetFilters);
    setShowFields(newAnimalType !== '');  
    onFilter({ searchQuery: '', ...resetFilters });  
    setSearchQuery('');  
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onFilter({ searchQuery: e.target.value, ...filters });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    onFilter({ searchQuery, ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 ml-4">
      {/* Animal Type Dropdown */}
      <select 
        name="animalType" 
        onChange={handleAnimalTypeChange} 
        value={filters.animalType}
        className="p-2 border rounded mb-4 mr-4 "
      >
        <option value="">Select Animal Type</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
      </select>

      {/* Conditional rendering: show other fields only when a valid animal type is selected */}
      {showFields && (
        <>
          <input
            type="text"
            placeholder="Search pets..."
            value={searchQuery}
            onChange={handleSearch}
            className="p-2 border rounded mb-4"
          />

          <select name="breed" onChange={handleFilterChange} value={filters.breed} className="p-2 border rounded mb-4 mr-4">
            <option value="">All Breeds</option>
            {(filters.animalType === 'dog' ? dogBreeds : catBreeds).map((breed, index) => (
              <option key={index} value={breed}>{breed}</option>
            ))}
          </select>

          <select name="age" onChange={handleFilterChange} value={filters.age} className="p-2 border rounded mb-4">
            <option value="">All Ages</option>
            <option value="Puppy/Kitten">Puppy/Kitten</option>
            <option value="Adult">Adult</option>
          </select>

          <select name="centre" onChange={handleFilterChange} value={filters.centre} className="p-2 border rounded mb-4">
            <option value="">All Centres</option>
            <option value="Arizona Animal Welfare League">Arizona Animal Welfare League</option>
            <option value="Friends for Life Animal Rescue">Friends for Life Animal Rescue</option>
            <option value="Halo Animal Rescue">Halo Animal Rescue</option>
            <option value="Pima Animal Care Center">Pima Animal Care Center</option>
            <option value="Humane Society of Southern Arizona">Humane Society of Southern Arizona</option>
            <option value="Lost Our Home Pet Rescue">Lost Our Home Pet Rescue</option>
            <option value="Maricopa County Animal Care & Control">Maricopa County Animal Care & Control</option>
            <option value="Humane Society of Yuma">Humane Society of Yuma</option>
            <option value="Foothills Animal Rescue">Foothills Animal Rescue</option>
            <option value="Desert Tails Shelter">Desert Tails Shelter</option>
          </select>
        </>
      )}
    </div>
  );
};

export default Search;
