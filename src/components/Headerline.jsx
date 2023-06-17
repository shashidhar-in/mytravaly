import React from 'react'

export default function Headerline({ headline, subline }) {
    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "1rem",
                margin: "1rem"
            }}
        >
            <h1 style={{ fontFamily: "Cormorant Infant", fontSize: "4rem", width: "70%", textAlign: "center" }}>
                {headline}
            </h1>
            <p style={{ fontFamily: "Karla", fontSize: "1.2rem" }}>
                {subline}
            </p>
        </div>
    )
}
