import React from 'react'
import './feature.css'

const Feature = (props) => {
    return (
        <div className="feature-feature">
            <div className="feature-heading">
                <image alt="image" src={props.Icon} className="feature-icon" />
                <h3 className="feature-header">{props.Header}</h3>
            </div>
            <p className="feature-description">{props.Description}</p>
        </div>
    )
}





export default Feature
