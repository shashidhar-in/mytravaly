import React, { useContext } from 'react'
import './card.css'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../GlobalContext'

const Card = ({ Image, Hotelname, Location, Price, Id }) => {
    const{setCurrentPropertyId}=useContext(GlobalContext);
    const navigate = useNavigate();
    function handleBookNow(){
        setCurrentPropertyId(Id);
        navigate(`/property-details/${Id}`);
    }   
    return (
        <div className="offer-offer">
            <img src={Image} alt="Logo" className='offer-image' />
            <div className="offer-content">
                <div className="offer-details"><span className="offer-text">{Hotelname}</span>
                    <span className="offer-text">{Location}</span>
                    <span className="offer-price">{Price}/Night</span>
                </div>
                <span className='book-btn' onClick={handleBookNow}>Book Now</span>

            </div>
        </div>
    )
}


export default Card
