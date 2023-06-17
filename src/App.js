import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './App.css';
import logo from './mytravaly-logo.png';
import locationIcon from './Icons/location.svg';
import searchIcon from './Icons/search.svg';
import PopularStays from './components/PopularStays';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from './GlobalContext';

function App() {
  const { setSearchResults,
    startDate, setStartDate,
    endDate, setEndDate,
    adults, setAdults,
    child, setChild,selectedOption, setSelectedOption } = useContext(GlobalContext);
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);
  const [query, setQuery] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedTomorrow = tomorrow.toISOString().split('T')[0];
    setStartDate(today.toISOString().split('T')[0]);
    setEndDate(formattedTomorrow);
  }, []);

  const fetchAutocompleteSuggestions = async (inputText) => {
    try {
      const response = await axios.post(
        'https://api.mytravaly.com/testing/v1/',
        {
          action: 'searchAutoComplete',
          searchAutoComplete: {
            inputText,
            searchType: ['byPropertyName'],
            limit: 10,
          },
        },
        {
          headers: {
            authtoken: '7eaa8958a9f8047951d1ef23348abc3f',
            visitortoken: 'e454-4ea5-e226-223c-b5ea-798d-8563-95ec',
            'Content-Type': 'application/json',
          },
        }
      );

      const suggestions = response.data;
      console.log(suggestions.data.autoCompleteList.byPropertyName.listOfResult);
      setAutocompleteOptions(suggestions.data.autoCompleteList.byPropertyName.listOfResult);
      setShowOptions(true);
    } catch (error) {
      console.error('Error fetching autocomplete suggestions:', error);
    }
  };

  const handleInputChange = (event) => {
    const inputText = event.target.value;
    if (inputText.length >= 3) {
      fetchAutocompleteSuggestions(inputText);
    } else {
      setAutocompleteOptions([]);
      setShowOptions(false);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option.valueToDisplay);
    setQuery(option.searchArray.query[0])
    document.getElementById('searchBox').value = option.valueToDisplay;
    setShowOptions(false);
  };

  const handleStartDateChange = (event) => {
    const selectedStartDate = new Date(event.target.value);
    const nextDay = new Date(selectedStartDate);
    nextDay.setDate(nextDay.getDate() + 1);

    setStartDate(event.target.value);
    setEndDate(nextDay.toISOString().split('T')[0]);
  };

  const handleEndDateChange = (event) => {
    const selectedEndDate = new Date(event.target.value);
    const selectedStartDate = new Date(startDate);
    const nextDay = new Date(selectedStartDate);
    nextDay.setDate(nextDay.getDate() + 1);

    if (selectedEndDate < nextDay) {
      // Show an error message if the selected end date is less than the next day of the start date
      alert('Please select a date at least 1 day after the start date.');
    } else {
      setEndDate(event.target.value);
    }
  };

  const handleSearchClick = async () => {
    if (!selectedOption || startDate === '' || endDate === '' || !adults || !child) {
      alert('Please fill in all the required fields.');
    } else {
      try {

        const response = await axios.post(
          'https://api.mytravaly.com/testing/v1/',
          {
            action: 'getSearchResultListOfHotels',
            getSearchResultListOfHotels: {
              searchCriteria: {
                checkIn: startDate,
                checkOut: endDate,
                rooms: 1,
                adults: parseInt(adults),
                children: parseInt(child),
                searchType: 'hotelIdSearch',
                searchQuery: [query],
                accommodation: ['all', 'hotel'],
                arrayOfExcludedSearchType: ['street'],
                highPrice: '3000000',
                lowPrice: '0',
                limit: 5,
                preloaderList: [],
                currency: 'INR',
                rid: 0,
              },
            },
          },
          {
            headers: {
              authtoken: '7eaa8958a9f8047951d1ef23348abc3f',
              visitortoken: 'e454-4ea5-e226-223c-b5ea-798d-8563-95ec',
              'Content-Type': 'application/json',
            },
          }
        );

        const searchResults = response.data;
        // Process and handle the search results as needed
        console.log(searchResults);
        setSearchResults(searchResults.data.arrayOfHotelList);
        navigate("/search-results");
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  };


  return (
    <div className="home-container">
      <section className="home-section">
        <div className="header">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="subheaders">
            <span>Features</span>
            <span>How it Works</span>
            <span>Prices</span>
            <span>Contact</span>
          </div>
        </div>
        <div className="search-area">
          <h1 className="home-header">Stay Wherever You Want!</h1>
          <p className="home-caption">
            Book hotels, local stays whenever you want and wherever you want with My Travaly
          </p>
          <div className="home-border">
            <div className="home-filter">
              <img alt="Location" src={locationIcon} className="home-image" />
              <input
                id="searchBox"
                type="text"
                placeholder="Location"
                className="home-textinput input"
                onChange={handleInputChange}
                required
              />
              <input
                required
                type="date"
                placeholder="Date"
                className="home-textinput1 input startdate"
                min={new Date().toISOString().split('T')[0]}
                value={startDate}
                onChange={handleStartDateChange}
              />
              <input
                required
                type="date"
                placeholder="Date"
                className="home-textinput2 input enddate"
                min={startDate}
                value={endDate}
                onChange={handleEndDateChange}
              />
              <input
                required
                type="number"
                placeholder="Adults"
                className="home-input input"
                value={adults}
                onChange={(event) => setAdults(event.target.value)}
              />
              <input
                required
                type="number"
                placeholder="Children"
                className="home-input input"
                value={child}
                onChange={(event) => setChild(event.target.value)}
              />
              <div className="home-search" onClick={handleSearchClick}>
                <img alt="Search" src={searchIcon} className="home-icon10" />
              </div>
            </div>
            {showOptions && (
              <div className="autocomplete-options">
                {autocompleteOptions.map((option, index) => (
                  <div
                    key={index}
                    className="autocomplete-option"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.valueToDisplay}
                    <p className="list-subitems">
                      {option.address.city}, {option.address.state}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="popular-stays">
        <PopularStays />
      </section>
    </div>
  );
}

export default App;
