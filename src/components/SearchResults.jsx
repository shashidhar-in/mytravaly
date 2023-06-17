import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../GlobalContext';
import Card from './card';
import Headerline from './Headerline';
import { useNavigate } from 'react-router-dom';

export default function SearchResults() {
  const { searchResults, startDate, endDate, adults, child, selectedOption } = useContext(GlobalContext);
  const navigate = useNavigate();

 useEffect(()=>{
   if (searchResults.length === 0) {
     navigate('/');
   }
 })

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  return (
    <div>
      <div>
        <Headerline
          headline={`Discover Your Perfect Getaway: ${selectedOption}`}
          subline={`Experience the Ultimate Escape from ${formattedStartDate} to ${formattedEndDate}! We've Found ${searchResults.length} Spectacular Options for Your Party of ${adults} Adults and ${child} Children`}
        />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          padding: '1rem',
        }}
      >
        {searchResults.map((stay) => (
          <Card
            key={stay.propertyCode}
            Id={stay.propertyCode}
            Hotelname={stay.propertyName}
            Image={stay.propertyImage.fullUrl}
            Price={stay.simplPriceList.simplPrice.displayAmount}
            Location={stay.propertyAddress.city}
          />
        ))}
      </div>
    </div>
  );
}
