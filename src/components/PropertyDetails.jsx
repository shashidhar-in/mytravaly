import React, { useContext } from 'react';
import { GlobalContext } from '../GlobalContext';
import './propertyDetails.css';
import ReactImageGallery from 'react-image-gallery';
import Headerline from './Headerline';

export default function PropertyDetails() {
    const { currentPropertyDetails } = useContext(GlobalContext);

    if (!currentPropertyDetails) {
        return null;
    }

    const {
        propertyName,
        propertyAddress,
        propertyStar,
        googleReview,
        propertyCode,
        propertyImage,
        propertyType,
        propertyPoliciesAndAmmenities,
        propertyWebsiteUrl,
        propertyView,
        isFavorite,
        subscriptionStatus
    } = currentPropertyDetails;

    if (
        !propertyAddress ||
        !googleReview ||
        !propertyPoliciesAndAmmenities ||
        !propertyImage ||
        !propertyWebsiteUrl ||
        !subscriptionStatus
    ) {
        return null;
    }

    const {
        street,
        city,
        state,
        country,
        zipcode,
        map_address,
        latitude,
        longitude
    } = propertyAddress;

    const { arrayOfReviews } = googleReview;

    const {
        cancelPolicy,
        refundPolicy,
        childPolicy,
        damagePolicy,
        propertyRestriction,
        petsAllowed,
        coupleFriendly,
        suitableForChildren,
        bachularsAllowed,
        freeWifi,
        freeCancellation,
        payAtHotel,
        payNow,
        lastUpdatedOn
    } = propertyPoliciesAndAmmenities;


    const { fullUrl, location, imageName } = propertyImage;
    const images = [
        {
            original: fullUrl,
            thumbnail: fullUrl, 
            originalAlt: 'Property Image', 
            thumbnailAlt: 'Property Image Thumbnail', 
            description: 'Image Description' 
        },
 
    ];
    const { status } = subscriptionStatus;
    const headline = `Welcome to ${propertyName}`;
    const subline = `Discover the beauty and luxury of ${propertyName}`;

    return (
        <>
            <Headerline headline={headline} subline={subline} />

        <div className="property-details-container">
            <div className="property-image full-width">
                <img src={fullUrl}  />
                 </div>
            <div>   <div className="property-address">
                <h2>Address</h2>
                <p>Street: {street}</p>
                <p>City: {city}</p>
                <p>State: {state}</p>
                <p>Country: {country}</p>
                <p>Zipcode: {zipcode}</p>
                <p>Map Address: {map_address}</p>
                <p>Latitude: {latitude}</p>
                <p>Longitude: {longitude}</p>
            </div>
                <div className="property-details">
                    <h2>Property Details</h2>
                    <p>Star Rating: {propertyStar}</p>
                    <p>Property Code: {propertyCode}</p>
                    <p>Property Type: {propertyType}</p>
                    <p>Property View: {propertyView}</p>
                    <p>Is Favorite: {isFavorite ? 'Yes' : 'No'}</p>
                    <p>Subscription Status: {status ? 'Active' : 'Inactive'}</p>
                </div></div>
         
            <div>   <div className="property-policies">
                <h2>Property Policies and Amenities</h2>
                <p>Cancel Policy: {cancelPolicy}</p>
                <p>Refund Policy: {refundPolicy}</p>
                <p>Child Policy: {childPolicy}</p>
                <p>Damage Policy: {damagePolicy}</p>
                <p>Property Restriction: {propertyRestriction}</p>
                <p>Pets Allowed: {petsAllowed ? 'Yes' : 'No'}</p>
                <p>Couple Friendly: {coupleFriendly ? 'Yes' : 'No'}</p>
                <p>Suitable for Children: {suitableForChildren ? 'Yes' : 'No'}</p>
                <p>Bachulars Allowed: {bachularsAllowed ? 'Yes' : 'No'}</p>
                <p>Free WiFi: {freeWifi ? 'Yes' : 'No'}</p>
                <p>Free Cancellation: {freeCancellation ? 'Yes' : 'No'}</p>
                <p>Pay at Hotel: {payAtHotel ? 'Yes' : 'No'}</p>
                <p>Pay Now: {payNow ? 'Yes' : 'No'}</p>
                <p>Last Updated On: {lastUpdatedOn}</p>
            </div>
                <div className="property-website">
                    <h2>Property Website</h2>
                    <a href={propertyWebsiteUrl}>{propertyWebsiteUrl}</a>
                </div></div>
   
         
        </div>
        </>

    );
}
