import React from "react";

const NAVY = "#0E1B4D";
const RED = "#C0292A";
const WHITE = "#FFFFFF";

const texts = [
  "Luxury Villas Across Kerala",
  "Trusted by 2,400+ Families",
  "Prime Locations · Verified Listings",
  "Strong Structures · Stronger Trust",
  "Buy · Rent · Invest with Confidence",
];

export default function TextSlider() {
  return (
    <div style={{
      width: "100%",
      overflow: "hidden",
      background: NAVY,
      borderTop: `2px solid ${RED}`,
      borderBottom: `2px solid ${RED}`,
    }}>
      <div className="ticker">
        {[...texts, ...texts].map((text, i) => (
          <span key={i} className="ticker-item">
            {text}
          </span>
        ))}
      </div>

      <style>{`
        .ticker {
          display: flex;
          width: max-content;
          animation: scrollText 25s linear infinite;
        }

        .ticker-item {
          font-family: 'DM Sans', sans-serif;
          color: ${WHITE};
          font-size: 13px;
          letter-spacing: 2px;
          padding: 16px 40px;
          white-space: nowrap;
          text-transform: uppercase;
          opacity: 0.9;
        }

        @keyframes scrollText {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}