export const SelectTravelersList = [
    {
      id: 1,
      title: 'Solo',
      desc: 'Explore the world at your own pace',
      icon: '🧍',
      people: '1 Person'
    },
    {
      id: 2,
      title: 'Couple',
      desc: 'A romantic getaway for two',
      icon: '👫',
      people: '2 People'
    },
    {
      id: 3,
      title: 'Family',
      desc: 'A fun-filled adventure for the whole family',
      icon: '👨‍👩‍👧‍👦🏠',
      people: 'Family'
    },
    {
      id: 4,
      title: 'Friends',
      desc: 'A thrilling trip with your best buddies',
      icon: '🎉🍻',
      people: 'Group of Friends'
    },
    {
      id: 5,
      title: 'Work Retreat',
      desc: 'A mix of business and leisure travel',
      icon: '🏢✈️',
      people: 'Colleagues'
    }
];
  

export const SelectBudgetOptions = [
    {
      id: 1,
      title: 'Budget-Friendly',
      desc: 'Travel on a shoestring budget with affordable stays and experiences'
    },
    {
      id: 2,
      title: 'Moderate',
      desc: 'A balanced trip with comfortable stays and enjoyable activities'
    },
    {
      id: 3,
      title: 'Luxury',
      desc: 'Indulge in premium experiences, fine dining, and high-end stays'
    }
];
  
export const TripTypeOptions = [
    { title: 'Best Attractions', desc: 'Visit must-see landmarks, iconic sites, and popular tourist hotspots.' },
    { title: 'Adventure', desc: 'Experience thrilling activities like hiking, rafting, and safaris.' },
    { title: 'Relaxation', desc: 'Unwind with spa retreats, beach resorts, and peaceful nature escapes.' },
    { title: 'Party & Nightlife', desc: 'Enjoy vibrant clubs, bars, and music festivals for a lively night out.' },
    { title: 'Religious & Spiritual', desc: 'Visit temples, churches, mosques, and pilgrimage sites for spiritual fulfillment.' },
    { title: 'Romantic Getaway', desc: 'Perfect for couples looking for a charming and intimate experience.' },
    { title: 'Nature & Wildlife', desc: 'Explore national parks, wildlife safaris, and nature reserves.' },
    { title: 'Cultural & Heritage', desc: 'Discover historical landmarks, museums, and cultural festivals.' },
    { title: 'Road Trip', desc: 'Drive through scenic routes, stopping at iconic spots along the way.' },
    { title: 'Shopping Spree', desc: 'Shop at bustling markets, luxury malls, and unique local stores.' },
    { title: 'Food & Culinary', desc: 'Indulge in local cuisine, food tours, and gourmet dining experiences.' },
    { title: 'Wellness & Retreat', desc: 'Detox with yoga retreats, meditation centers, and holistic healing.' },
];


export const AI_PROMPT = `Generate a travel plan for Location: {location} for {totalDays} days for {traveler} with a {budget} budget, prioritizing {tripTypes} experiences while also including top attractions, activities, and dining options.Provide a list of hotel options with details including the hotel name, address, price per night, geo-coordinates (latitude and longitude), rating, and description. Create a detailed itinerary for each day, specifying the place name, place details, place image URL, geo-coordinates, best time to visit within the day, ticket pricing if applicable, and travel time needed between locations. Suggest restaurant options for each day breakfast, lunch & dinner , along with the restaurant name, address, price per person and description. Additionally, provide the best months or seasons to visit {location}. Return the response in JSON format.`;
