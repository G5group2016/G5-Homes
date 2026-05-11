import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import G5Logo from './G5Logo';

const C = {
    navy: '#0A1535',
    navyMid: '#0E1B4D',
    red: '#C0292A',
    redLight: '#D93A3B',
    redDark: '#A01F20',
    gold: '#C9A84C',
    white: '#FFFFFF',
    goldLight: '#E2C97E',
};

export default function Navbar({ scrolled, menuOpen, setMenuOpen, setCursorActive }) {

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 60);
        const handleResize = () => setIsMobile(window.innerWidth <= 992);
        handleResize();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Nav links with routes
    const navLinks = [
        { label: 'Home', path: '/' },
        { label: 'About Us', path: '/about' },
        { label: 'Our Services', path: '/services' },
        { label: 'Blog', path: '/blog' },
        { label: 'Contact', path: '/contact' },
    ];

    const isActive = (path) => {
        if (path.startsWith('/#')) return location.pathname === '/';
        return location.pathname === path;
    };

    const linkStyle = (path) => ({
        color: isActive(path) ? C.gold : C.white,
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        fontFamily: "'Inter', sans-serif",
        fontSize: 12,
        fontWeight: isActive(path) ? 600 : 500,
        letterSpacing: 2.5,
        textTransform: 'uppercase',
        transition: 'color 0.3s ease',
        position: 'relative',
    });

    return (
        <>
            {/* ================= MOBILE NAVIGATION ================= */}
            <nav
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: C.navy,
                    zIndex: 2000,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 32,
                    transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
                    transition: '0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
            >
                <button
                    onClick={() => setMenuOpen(false)}
                    style={{
                        position: 'absolute', top: 28, right: 28,
                        background: 'none', border: 'none', color: C.white,
                        fontSize: 32, cursor: 'pointer', lineHeight: 1, opacity: 0.8,
                        transition: 'opacity 0.3s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}
                >
                    ✕
                </button>

                <div style={{ marginBottom: 8 }}>
                    <G5Logo height={100} />
                </div>

                <div style={{
                    width: 50, height: 2,
                    background: `linear-gradient(90deg,${C.red},${C.gold})`,
                    margin: '0 auto 20px', borderRadius: 2
                }} />

                {navLinks.map(({ label, path }) => (
                    <Link
                        key={label}
                        to={path}
                        onClick={() => setMenuOpen(false)}
                        style={{
                            color: isActive(path) ? C.gold : C.white,
                            fontSize: 22, letterSpacing: 5,
                            textDecoration: 'none', fontWeight: 500,
                            fontFamily: "'Inter', sans-serif",
                            transition: 'color 0.3s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = C.gold}
                        onMouseLeave={e => e.currentTarget.style.color = isActive(path) ? C.gold : C.white}
                    >
                        {label}
                    </Link>
                ))}

                <Link
                    to="/contact"
                    style={{
                        padding: '16px 48px', fontSize: 11, fontWeight: 600,
                        letterSpacing: 3, borderRadius: 40, marginTop: 16,
                        background: `linear-gradient(135deg, ${C.red}, #A01F20)`,
                        color: C.white, textDecoration: 'none',
                        transition: 'all 0.3s ease', display: 'inline-block'
                    }}
                    onClick={() => setMenuOpen(false)}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 16px 32px rgba(192,41,42,0.3)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    <span>Talk to an Agent</span>
                </Link>
            </nav>

            {/* ================= DESKTOP NAVBAR ================= */}
            <nav
                style={{
                    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
                    padding: isMobile ? '16px 24px' : '20px 60px',
                    background: isScrolled ? C.navy : 'transparent',
                    backdropFilter: isScrolled ? 'blur(12px)' : 'none',
                    borderBottom: isScrolled ? '1px solid rgba(201,168,76,0.2)' : 'none',
                    transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}
            >
                {/* Luxury Top Border */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                    background: `linear-gradient(90deg,transparent,${C.gold},${C.red},${C.gold},transparent)`,
                    opacity: isScrolled ? 0.8 : 0, transition: 'opacity 0.5s ease'
                }} />

                {/* Logo */}
                <Link
                    to="/"
                    style={{ display: 'block', lineHeight: 0, flexShrink: 0, transition: 'transform 0.3s ease' }}
                    onMouseEnter={() => setCursorActive && setCursorActive(true)}
                    onMouseLeave={() => setCursorActive && setCursorActive(false)}
                >
                    <G5Logo height={isMobile ? 56 : 70} />
                </Link>

                {/* Desktop Nav Links */}
                {!isMobile && (
                    <div style={{ display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'nowrap' }}>
                        {navLinks.map(({ label, path }) => (
                            <Link
                                key={label}
                                to={path}
                                className="g5-nav-link"
                                style={linkStyle(path)}
                                onMouseEnter={(e) => {
                                    setCursorActive && setCursorActive(true);
                                    e.currentTarget.style.color = C.gold;
                                    const underline = e.currentTarget.querySelector('.nav-underline');
                                    if (underline) underline.style.transform = 'scaleX(1)';
                                }}
                                onMouseLeave={(e) => {
                                    setCursorActive && setCursorActive(false);
                                    e.currentTarget.style.color = isActive(path) ? C.gold : C.white;
                                    const underline = e.currentTarget.querySelector('.nav-underline');
                                    if (underline && !isActive(path)) underline.style.transform = 'scaleX(0)';
                                }}
                            >
                                {label}
                                <span
                                    className="nav-underline"
                                    style={{
                                        position: 'absolute', bottom: -6, left: 0, right: 0,
                                        height: 1.5, background: C.gold,
                                        transform: isActive(path) ? 'scaleX(1)' : 'scaleX(0)',
                                        transformOrigin: 'left',
                                        transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
                                        display: 'block'
                                    }}
                                />
                            </Link>
                        ))}

                        <Link
                            to="/contact"
                            style={{
                                padding: '12px 32px', fontSize: 11, fontWeight: 600,
                                letterSpacing: 2.5, borderRadius: 40, whiteSpace: 'nowrap',
                                background: `linear-gradient(135deg, ${C.red}, #A01F20)`,
                                color: C.white, textDecoration: 'none',
                                transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                                display: 'inline-block',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}
                            onMouseEnter={(e) => {
                                setCursorActive && setCursorActive(true);
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 12px 28px rgba(192,41,42,0.35)';
                            }}
                            onMouseLeave={(e) => {
                                setCursorActive && setCursorActive(false);
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                            }}
                        >
                            <span>Get in Touch →</span>
                        </Link>
                    </div>
                )}

                {/* Hamburger */}
                {isMobile && (
                    <button
                        onClick={() => setMenuOpen(o => !o)}
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            display: 'flex', flexDirection: 'column', gap: 6,
                            padding: 8, flexShrink: 0, zIndex: 1001
                        }}
                    >
                        {[0, 1, 2].map(i => (
                            <span key={i} style={{
                                width: 26, height: 2, background: C.white, display: 'block',
                                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                                transformOrigin: 'center'
                            }} />
                        ))}
                    </button>
                )}
            </nav>
        </>
    );
}