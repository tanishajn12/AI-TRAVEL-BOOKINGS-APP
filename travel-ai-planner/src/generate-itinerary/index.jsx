import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { SelectBudgetOptions, SelectTravelersList, TripTypeOptions } from '@/constants/options';

function GenerateItinerary() {
  const [place, setPlace] = useState();
  const [selectedTripTypes, setSelectedTripTypes] = useState([]);
  const [formData, setFormData] = useState({});

  const handleInputChange=(name, value)=>{
    setFormData({
      ...formData,
      [name]:value
    })
  }

  useEffect(()=>{
    console.log(formData);

  },[formData])

  // Handle checkbox selection
  const handleTripTypeChange = (option) => {
    const updatedTripTypes = selectedTripTypes.includes(option.title)
      ? selectedTripTypes.filter((item) => item !== option.title)
      : [...selectedTripTypes, option.title];
  
    setSelectedTripTypes(updatedTripTypes);
    handleInputChange('tripTypes', updatedTripTypes); // Update formData
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Kindly enter travel preferences to curate the best itinerary</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam accusamus hic ex itaque.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        {/* Destination Selection */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange('location',v)
              }
            }}
          />
        </div>

        {/* Number of Days */}
        <div>
          <h2 className="text-xl my-3 font-medium">Please input number of days</h2>
          <Input placeholder="Ex: 3" type="number" 
          onChange={(e)=>handleInputChange('noOfDays', e.target.value)}
          />
        </div>

        {/* Budget Selection */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is the Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div key={index} 
                onClick={()=>handleInputChange('budget',item.title)}
              
              className="p-4 border rounded-lg hover:shadow-lg">
                <h2 className="text-lg my-3 font-bold">{item.title}</h2>
                <h2 className="text-sm text-gray-700">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Travelers Selection */}
        <div>
          <h2 className="text-xl my-3 font-medium">With whom are you traveling on your trip?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelersList.map((item, index) => (
              <div key={index} 
              onClick={()=>handleInputChange('people',item.title)}
              className="p-4 border rounded-lg hover:shadow-lg">
                <h2 className="text-2xl">{item.icon}</h2>
                <h2 className="text-lg my-3 font-bold">{item.title}</h2>
                <h2 className="text-sm text-gray-700">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Trip Type Selection (Checkboxes) */}
        <div>
          <h2 className="text-xl my-3 font-medium">What type of trip are you planning?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-5">
            {TripTypeOptions.map((item, index) => (
              <label key={index} className="flex flex-col gap-2 cursor-pointer p-3 border rounded-lg hover:shadow-lg">
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={selectedTripTypes.includes(item.title)}
                  onChange={() => handleTripTypeChange(item)}
                />
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="text-sm text-gray-700">{item.desc}</p>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateItinerary;
