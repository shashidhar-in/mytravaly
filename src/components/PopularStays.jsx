import React, { useContext } from 'react';
import Card from './card';
import { GlobalContext } from '../GlobalContext';
import Headerline from './Headerline';

export default function PopularStays() {
    const { PopularStays } = useContext(GlobalContext);
    return (
        <div style={{
        }}>
            <Headerline headline="See the world like a local with our popular stays"
                subline="    Popular stays are one of our best-selling and highest-booked hotels" />
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "20px",
                    padding: "1rem",
                }}
            >
                {PopularStays.map((stay) => {
                    return (
                        <Card
                            key={stay.propertyCode}
                            Id={stay.propertyCode}
                            Hotelname={stay.propertyName}
                            Image={stay.propertyImage}
                            Price={stay.staticPrice.displayAmount}
                            Location={stay.propertyAddress.city}
                        />
                    );
                })}
            </div>
        </div>
    );
}
