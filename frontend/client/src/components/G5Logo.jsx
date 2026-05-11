// components/G5Logo.jsx
import React from 'react';

export default function G5Logo({ height = 72 }) {
    return (
        <img 
            src="/logo.webp.png" 
            alt="G5 Homes" 
            style={{ 
                height: `clamp(80px, 7vw, ${height}px)`,
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
            }} 
        />
    );
}