import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [PopularStays, setPopularStays] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [adults, setAdults] = useState('');
  const [child, setChild] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [currentPropertyId, setCurrentPropertyId] = useState('');
    const [currentPropertyDetails, setCurrentPropertyDetails] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const myHeaders = {
          authtoken: '7eaa8958a9f8047951d1ef23348abc3f',
          visitortoken: 'e454-4ea5-e226-223c-b5ea-798d-8563-95ec',
          'Content-Type': 'application/json',
        };

        const requestPayload = {
          action: 'getPropertyDetails',
          getPropertyDetails: {
            propertyCode: currentPropertyId,
          },
        };

        const response = await axios.post(
          'https://api.mytravaly.com/testing/v1/',
          requestPayload,
          { headers: myHeaders }
        );
        setCurrentPropertyDetails(response.data.data)
        console.log(response.data);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, [currentPropertyId]);

  const getPopularStays = async () => {
    try {
      const myHeaders = {
        authtoken: '7eaa8958a9f8047951d1ef23348abc3f',
        visitortoken: 'e454-4ea5-e226-223c-b5ea-798d-8563-95ec',
        'Content-Type': 'application/json',
      };

      const requestPayload = {
        action: 'popularStay',
        popularStay: {
          limit: 10,
          entityType: 'Any',
          filter: {
            searchType: 'byRandom',
            searchTypeInfo: {
              country: 'India',
            },
          },
        },
      };

      const response = await axios.post(
        'https://api.mytravaly.com/testing/v1/',
        requestPayload,
        { headers: myHeaders }
      );

      console.log(response.data.data);
      setPopularStays(response.data.data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    getPopularStays();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        PopularStays,
        searchResults,
        setSearchResults,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        adults,
        setAdults,
        child,
        setChild,
        selectedOption,
        setSelectedOption,
        setCurrentPropertyId,
        currentPropertyDetails 
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
