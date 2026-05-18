// components/G5Logo.jsx
import React from 'react';

export default function G5Logo({ height = 72 }) {
    return (
        // <img 
        //     src="/G5-Homes-Logo.webp" 
        //     alt="G5 Homes" 
        //     style={{ 
        //         height: `clamp(80px, 7vw, ${height}px)`,
        //         width: 'auto',
        //         objectFit: 'contain',
        //         display: 'block',
        //     }}
        //     fetchPriority="high"
        //     loading="eager"
        //     decoding="sync"
        // />

        <img
            src="/G5-Homes-Logo.webp"
            alt="G5 Homes"
            width="120"
            height="120"
            fetchPriority="high"
            loading="eager"
            decoding="sync"
            style={{
                height: `clamp(80px, 7vw, ${height}px)`,
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
            }}
        />
    );
}