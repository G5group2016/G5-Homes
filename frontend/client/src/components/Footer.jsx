// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import G5Logo from './G5Logo';
import { FaInstagram, FaXTwitter, FaLinkedinIn, FaFacebookF } from "react-icons/fa6";

const C = {
    navy: '#0A1535',
    red: '#C0292A',
    gold: '#C9A84C',
    white: '#FFFFFF',
};

export default function Footer() {

    const footerLinks = {
        services: [
            { name: 'Home Construction', path: '/services' },
            { name: 'Luxury Villa Construction', path: '/services' },
            { name: 'Interior Design', path: '/services' },
            { name: 'Architecture & Planning', path: '/services' },
            { name: 'Turnkey Projects', path: '/services' },
        ],

        locations: [
            'Kovalam',
            'Varkala',
            'Thiruvananthapuram',
            'Kochi',
            'Alappuzha',
            'Munnar'
        ],

        company: [
            { name: 'About G5 Homes', path: '/about' },
            { name: 'Services', path: '/services' },
            // { name: 'Careers', path: '/careers' },
            { name: 'Blog', path: '/blog' },
            { name: 'Contact Us', path: '/contact' },
        ],
    };

    return (
        <footer
            style={{
                background: C.navy,
                padding: '68px 60px 38px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >

            <style>{`

                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');

                *{
                    box-sizing:border-box;
                }

                .footer-link{
                    display:block;
                    font-size:12.5px;
                    color:rgba(255,255,255,0.38);
                    margin-bottom:14px;
                    cursor:pointer;
                    transition:all 0.3s ease;
                    letter-spacing:0.5px;
                    font-family:'Inter',sans-serif;
                    text-decoration:none;
                }

                .footer-link:hover{
                    color:#FFFFFF;
                    padding-left:6px;
                }

                .footer-bottom-link{
                    font-size:11px;
                    color:rgba(255,255,255,0.25);
                    transition:0.3s ease;
                    text-decoration:none;
                    font-family:'Inter',sans-serif;
                }

                .footer-bottom-link:hover{
                    color:${C.gold};
                }

                @media (max-width: 900px) {

                    .footer-main-grid{
                        grid-template-columns:1fr 1fr !important;
                        gap:40px !important;
                    }

                    .footer-brand-col{
                        grid-column:1 / -1 !important;
                    }
                }

                @media (max-width: 600px) {

                    .footer-outer{
                        padding:52px 24px 32px !important;
                    }

                    .footer-main-grid{
                        grid-template-columns:1fr !important;
                        gap:32px !important;
                    }

                    .footer-brand-col{
                        grid-column:auto !important;
                    }

                    .footer-bottom-bar{
                        flex-direction:column !important;
                        align-items:flex-start !important;
                        gap:16px !important;
                    }

                    .footer-bottom-links{
                        flex-wrap:wrap !important;
                        gap:14px !important;
                    }

                    .footer-logo-wrap img,
.footer-logo-wrap svg{
    height:64px !important;
    width:auto !important;
}
                }

                @media (max-width: 400px) {

                    .footer-outer{
                        padding:44px 18px 28px !important;
                    }
                }

            `}</style>

            {/* TOP GRADIENT LINE */}

            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: `linear-gradient(90deg,${C.red},${C.gold},${C.red})`
                }}
            />

            {/* GLOW */}

            <div
                style={{
                    position: 'absolute',
                    top: '-120px',
                    right: '-120px',
                    width: 320,
                    height: 320,
                    borderRadius: '50%',
                    background: 'rgba(201,168,76,0.06)',
                }}
            />

            <div
                className="footer-outer"
                style={{
                    maxWidth: 1140,
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 2,
                }}
            >

                {/* MAIN GRID */}

                <div
                    className="footer-main-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 1fr 1fr 1fr',
                        gap: 56,
                        marginBottom: 52,
                    }}
                >

                    {/* BRAND */}

                    <div className="footer-brand-col">

                        <div
                            className="footer-logo-wrap"
                            style={{ marginBottom: 20 }}
                        >
                            <G5Logo height={98} />
                        </div>

                        <p
                            style={{
                                fontSize: 12.5,
                                lineHeight: 1.95,
                                color: 'rgba(255,255,255,0.4)',
                                maxWidth: 260,
                                marginBottom: 18,
                                fontFamily: "'Inter', sans-serif"
                            }}
                        >
                            G5 Homes is a trusted home construction company in Kerala,
                            specializing in luxury villas, custom homes, interiors,
                            and turnkey residential projects with premium quality
                            and modern architectural excellence.
                        </p>

                        <div
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: 14,
                                color: C.gold,
                                fontStyle: 'italic',
                                opacity: 0.9
                            }}
                        >
                            "Strong Structures, Stronger Trust."
                        </div>


                        <div
                            style={{
                                display: 'flex',
                                gap: '14px',
                                marginTop: '24px',
                                alignItems: 'center',
                            }}
                        >
                            <a
                                href="https://www.instagram.com/g5homesbuilders/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    width: 38,
                                    height: 38,
                                    borderRadius: '50%',
                                    border: `1px solid rgba(255,255,255,0.15)`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#FFFFFF',
                                    transition: '0.3s ease',
                                    textDecoration: 'none',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#C9A84C';
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.transform = 'translateY(0px)';
                                }}
                            >
                                <FaInstagram size={16} />
                            </a>


                            <a
                                href="https://www.facebook.com/share/18QZi7uC7V/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    width: 38,
                                    height: 38,
                                    borderRadius: '50%',
                                    border: `1px solid rgba(255,255,255,0.15)`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#FFFFFF',
                                    transition: '0.3s ease',
                                    textDecoration: 'none',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#C9A84C';
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.transform = 'translateY(0px)';
                                }}
                            >
                                <FaFacebookF size={15} />
                            </a>

                            <a
                                href="https://x.com/g5homesbuilders?s=21"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    width: 38,
                                    height: 38,
                                    borderRadius: '50%',
                                    border: `1px solid rgba(255,255,255,0.15)`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#FFFFFF',
                                    transition: '0.3s ease',
                                    textDecoration: 'none',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#C9A84C';
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.transform = 'translateY(0px)';
                                }}
                            >
                                <FaXTwitter size={15} />
                            </a>

                            <a
                                href="https://share.google/vHqwEY0i7ue0vDRrC"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    width: 38,
                                    height: 38,
                                    borderRadius: '50%',
                                    border: `1px solid rgba(255,255,255,0.15)`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#FFFFFF',
                                    transition: '0.3s ease',
                                    textDecoration: 'none',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#C9A84C';
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.transform = 'translateY(0px)';
                                }}
                            >
                                <FaLinkedinIn size={15} />
                            </a>
                        </div>

                    </div>

                    {/* SERVICES */}

                    <div>

                        <div
                            style={{
                                fontSize: 9,
                                letterSpacing: 3,
                                color: C.gold,
                                textTransform: 'uppercase',
                                marginBottom: 22,
                                fontWeight: 700,
                                opacity: 0.9,
                                fontFamily: "'Inter', sans-serif"
                            }}
                        >
                            Services
                        </div>

                        {footerLinks.services.map((item, j) => (

                            <Link
                                key={j}
                                to={item.path}
                                className="footer-link"
                            >
                                {item.name}
                            </Link>

                        ))}

                    </div>

                    {/* LOCATIONS */}

                    <div>

                        <div
                            style={{
                                fontSize: 9,
                                letterSpacing: 3,
                                color: C.gold,
                                textTransform: 'uppercase',
                                marginBottom: 22,
                                fontWeight: 700,
                                opacity: 0.9,
                                fontFamily: "'Inter', sans-serif"
                            }}
                        >
                            Locations
                        </div>

                        {footerLinks.locations.map((link, j) => (

                            <div
                                key={j}
                                className="footer-link"
                            >
                                {link}
                            </div>

                        ))}

                    </div>

                    {/* COMPANY */}

                    <div>

                        <div
                            style={{
                                fontSize: 9,
                                letterSpacing: 3,
                                color: C.gold,
                                textTransform: 'uppercase',
                                marginBottom: 22,
                                fontWeight: 700,
                                opacity: 0.9,
                                fontFamily: "'Inter', sans-serif"
                            }}
                        >
                            Company
                        </div>

                        {footerLinks.company.map((item, j) => (

                            <Link
                                key={j}
                                to={item.path}
                                className="footer-link"
                            >
                                {item.name}
                            </Link>

                        ))}

                    </div>

                </div>

                {/* BOTTOM BAR */}

                <div
                    style={{
                        borderTop: '1px solid rgba(255,255,255,0.07)',
                        paddingTop: 28,
                    }}
                >

                    <div
                        className="footer-bottom-bar"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: 12,
                        }}
                    >

                        <div
                            style={{
                                fontSize: 11,
                                color: 'rgba(255,255,255,0.25)',
                                letterSpacing: 0.5,
                                fontFamily: "'Inter', sans-serif"
                            }}
                        >
                            © 2026 G5 Homes. All rights reserved.
                        </div>

                        <div
                            className="footer-bottom-links"
                            style={{
                                display: 'flex',
                                gap: 20,
                            }}
                        >

                            <Link
                                to="/privacy-policy"
                                className="footer-bottom-link"
                            >
                                Privacy Policy
                            </Link>

                            <Link
                                to="/terms-and-conditions"
                                className="footer-bottom-link"
                            >
                                Terms of Use
                            </Link>

                        </div>

                        <div
                            style={{
                                fontSize: 11,
                                color: 'rgba(255,255,255,0.25)',
                                letterSpacing: 0.5,
                                fontFamily: "'Inter', sans-serif"
                            }}
                        >
                            Thiruvananthapuram, Kerala
                        </div>

                    </div>

                </div>

            </div>

        </footer>
    );
}