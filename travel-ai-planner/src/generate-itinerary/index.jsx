import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelersList, TripTypeOptions } from '@/constants/options';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function GenerateItinerary() {
  const [place, setPlace] = useState();
  const [selectedTripTypes, setSelectedTripTypes] = useState([]);

  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

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

  // const login = useGoogleLogin({
  //   onSuccess:(codeResp)=>GetUserProfile(codeResp),
  //   onError:(error)=>console.log(error)
  // })
  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
        console.log("Google Login Successful:", codeResp);
        GetUserProfile(codeResp);
    },
    onError: (error) => console.log("Google Login Error:", error),
    flow: "implicit",  // Ensure correct OAuth flow
  });


  const OnGenerateTrip=async()=>{
    const user = localStorage.getItem('user');
    if(!user) {
      setOpenDialog(true);
      return;
    }
    if(formData?.noOfDays>5 && !formData?.location && !formData?.location || !formData?.budget || !formData?.traveler) {
      
      toast("Please fill all details");
      return;
    }

    const FINAL_PROMPT = AI_PROMPT
    .replace('{location}', formData?.location?.label)
    .replace('{totalDays}', formData?.noOfDays)
    .replace('{traveler}', formData?.traveler)
    .replace('{budget}', formData?.budget)
    .replace('{tripTypes}', selectedTripTypes.length ? selectedTripTypes.join(", ") : "General");

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT)
    console.log(result?.response?.text());
  }

  const GetUserProfile =(tokenInfo) => {
    
      axios.get(`https://www.googleapis.com/oauth/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'Application/json'
        }
      }).then((resp)=>{
        console.log(resp);
      })
    
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
              
              className={`p-4 border cursor-pointer
              rounded-lg hover:shadow-lg
              ${formData?.budget == item.title && 'border-black shadow-lg'}
              `}>
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
              onClick={()=>handleInputChange('traveler',item.title)}
              className={`p-4 border cursor-pointer
                rounded-lg hover:shadow-lg
                ${formData?.traveler == item.title && 'border-black shadow-lg'}
                `}>
                {/* <h2 className="text-2xl">{item.icon}</h2> */}
                <h2 className="text-lg my-3 font-bold">{item.title}</h2>
                <h2 className="text-sm text-gray-700">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Trip Type Selection (Checkboxes) */}
        <div>
          <h2 className="text-xl my-3 font-medium">What type of trip are you planning?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-5">
            {TripTypeOptions.map((item, index) => (
              <label key={index} className="flex flex-col gap-2 cursor-pointer p-3 border rounded-lg hover:shadow-lg">
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={selectedTripTypes.includes(item.title)}
                  onChange={() => handleTripTypeChange(item)}
                />
                <h2 className="text-lg my-3 font-bold">{item.title}</h2>
                {/* <p className="text-sm text-gray-700">{item.desc}</p> */}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button onClick={OnGenerateTrip}>Generate Trip</Button>

      </div>
      <Dialog open={openDialog}>
        
      <DialogContent className="flex items-center justify-between p-6">
        {/* Left side - Image */}
        <div className="w-1/2">
          <img
            src="src\assets\Travelers-rafiki.svg"
            alt="Sign In"
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Right side - Sign in with Google */}
        <div className="w-1/2 flex flex-col items-center">
          <DialogHeader>
            <h2 className="text-xl font-semibold">Sign in with Google</h2>
          </DialogHeader>
          <DialogDescription className="text-center text-gray-500">
            Continue with your Google account to access your dashboard.
          </DialogDescription>
          
          <Button 
          onClick={login}
            className="bg-white text-black mt-8 flex items-center gap-2 border border-gray-300 p-2 rounded-lg hover:cursor-pointer">
            <FcGoogle size={24} />
            Sign in with Google
          </Button>
        </div>
      </DialogContent>
      </Dialog>
    </div>
  );
}

export default GenerateItinerary;
