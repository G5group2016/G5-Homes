import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import custom2 from '../assets/Customhome.webp';
import luxvilla from '../assets/villa3.webp';
import apartment from '../assets/apartment.webp';
import interior from '../assets/interiors.webp';
import smart from '../assets/smarthome2.webp';
import renovation from '../assets/renovation2.webp';
import outdoor from '../assets/outdoor2.webp';

// Image optimization helper
const ResponsiveImage = ({ src, alt, style, onMouseEnter, onMouseLeave, priority = false }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={style}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding={priority ? "sync" : "async"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};

const C = {
    navy: '#0A1535',
    navyMid: '#0E1B4D',
    navyLight: '#1B2F6E',
    red: '#C0292A',
    redLight: '#D93A3B',
    redDark: '#A01F20',
    gold: '#C9A84C',
    goldLight: '#E2C97E',
    white: '#FFFFFF',
    offWhite: '#F8F6F1',
    cream: '#F2EFE8',
    lightGray: '#EEF0F5',
    midGray: '#8A93A8',
    darkText: '#0A1130',
};

const services = [
    {
        num: '01',
        title: 'Custom Home Construction',
        desc: 'Luxury custom homes designed around your lifestyle with premium quality construction and modern architecture.',
        points: ['Personalized architecture', 'Turnkey home solutions', 'Premium quality materials', 'Modern luxury finishes'],
        image: custom2,
    },
    {
        num: '02',
        title: 'Luxury Villa Construction',
        desc: 'Elegant villas crafted with world-class design concepts and sophisticated living experiences.',
        points: ['Premium villa concepts', 'Luxury landscaping', 'Contemporary elevations', 'Smart luxury interiors'],
        image: luxvilla,
    },
    {
        num: '03',
        title: 'Apartment Development',
        desc: 'Modern apartment communities designed for comfort, elegance, and future-ready living.',
        points: ['Community planning', 'Modern architecture', 'Functional layouts', 'Premium amenities'],
        image: apartment,
    },
    {
        num: '04',
        title: 'Interior & Outdoor Design',
        desc: 'Elegant interiors and sophisticated outdoor concepts designed with creativity and luxury.',
        points: ['Luxury interiors', 'Outdoor living spaces', 'Lighting concepts', 'Landscape design'],
        image: outdoor,
    },
    {
        num: '05',
        title: 'Smart Home Solutions',
        desc: 'AI-powered smart living with sustainable and future-ready construction technologies.',
        points: ['Smart automation', 'Energy efficiency', 'Advanced security', 'Sustainable systems'],
        image: smart,
    },
    {
        num: '06',
        title: 'Renovation & Remodeling',
        desc: 'Transform existing homes into modern elegant living spaces with premium renovation solutions.',
        points: ['Interior remodeling', 'Exterior redesign', 'Space optimization', 'Structural upgrades'],
        image: renovation,
    },
];

const processSteps = [
    { num: '01', title: 'Consultation', desc: 'Understanding your vision, requirements, and dream lifestyle.', icon: '💬' },
    { num: '02', title: 'Planning & Design', desc: 'Premium architectural planning with elegant concepts.', icon: '📐' },
    { num: '03', title: 'Construction', desc: 'Professional execution with uncompromised quality.', icon: '🏗️' },
    { num: '04', title: 'Project Handover', desc: 'Delivering luxury spaces with complete satisfaction.', icon: '🔑' },
];

export default function ServicesPage() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [cursorActive, setCursorActive] = useState(false);
    const [visible, setVisible] = useState({});
    const [hoveredService, setHoveredService] = useState(null);
    const [hoveredStep, setHoveredStep] = useState(null);
    const [heroLoaded, setHeroLoaded] = useState(false);
    const sectionRefs = useRef({});

    useEffect(() => {
        const timer = setTimeout(() => setHeroLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);

    useEffect(() => {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) setVisible(v => ({ ...v, [e.target.dataset.id]: true }));
            });
        }, { threshold: 0.15 });
        Object.values(sectionRefs.current).forEach(el => el && obs.observe(el));
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const ref = id => el => {
        if (el) { el.dataset.id = id; sectionRefs.current[id] = el; }
    };

    const fadeUp = (id, delay = 0) => ({
        opacity: visible[id] ? 1 : 0,
        transform: visible[id] ? 'translateY(0)' : 'translateY(48px)',
        transition: `opacity 0.85s cubic-bezier(0.22,0.85,0.36,1) ${delay}s, transform 0.85s cubic-bezier(0.22,0.85,0.36,1) ${delay}s`,
    });

    const slideLeft = (id, delay = 0) => ({
        opacity: visible[id] ? 1 : 0,
        transform: visible[id] ? 'translateX(0)' : 'translateX(-60px)',
        transition: `opacity 0.8s cubic-bezier(0.22,0.85,0.36,1) ${delay}s, transform 0.8s cubic-bezier(0.22,0.85,0.36,1) ${delay}s`,
    });

    const slideRight = (id, delay = 0) => ({
        opacity: visible[id] ? 1 : 0,
        transform: visible[id] ? 'translateX(0)' : 'translateX(60px)',
        transition: `opacity 0.8s cubic-bezier(0.22,0.85,0.36,1) ${delay}s, transform 0.8s cubic-bezier(0.22,0.85,0.36,1) ${delay}s`,
    });

    const scaleIn = (id, delay = 0) => ({
        opacity: visible[id] ? 1 : 0,
        transform: visible[id] ? 'scale(1)' : 'scale(0.93)',
        transition: `opacity 0.7s cubic-bezier(0.22,0.85,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,0.85,0.36,1) ${delay}s`,
    });

    return (
        <div style={{ fontFamily: "'Inter','Poppins',sans-serif", background: C.white, color: C.darkText, overflowX: 'hidden' }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
                *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
                html { scroll-behavior:smooth; }
                ::-webkit-scrollbar { width:4px; }
                ::-webkit-scrollbar-track { background:#0A1535; }
                ::-webkit-scrollbar-thumb { background:linear-gradient(${C.red},${C.gold}); border-radius:2px; }

                @keyframes heroFadeSlideUp {
                    0% { opacity:0; transform: translateY(60px); }
                    100% { opacity:1; transform: translateY(0); }
                }
                @keyframes heroFadeSlideLeft {
                    0% { opacity:0; transform: translateX(-60px); }
                    100% { opacity:1; transform: translateX(0); }
                }
                @keyframes lineGrow {
                    0% { width: 0; }
                    100% { width: 80px; }
                }
                @keyframes marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
                .marquee-inner { display:flex; animation:marquee 30s linear infinite; width:max-content; }

                .hero-badge { animation: heroFadeSlideLeft 0.7s cubic-bezier(0.22,0.85,0.36,1) 0.2s both; }
                .hero-title { animation: heroFadeSlideUp 0.9s cubic-bezier(0.22,0.85,0.36,1) 0.4s both; }
                .hero-line { animation: lineGrow 0.8s cubic-bezier(0.22,0.85,0.36,1) 0.7s both; }
                .hero-subtitle { animation: heroFadeSlideUp 0.8s cubic-bezier(0.22,0.85,0.36,1) 0.9s both; }
                .hero-desc { animation: heroFadeSlideUp 0.8s cubic-bezier(0.22,0.85,0.36,1) 1.1s both; }
                .hero-stats { animation: heroScaleIn 0.8s cubic-bezier(0.22,0.85,0.36,1) 1.3s both; }

                .service-card { transition: all 0.45s cubic-bezier(0.22,1,0.36,1); cursor: pointer; }
                .service-card:hover { transform: translateY(-10px); }

                .process-step { transition: all 0.4s cubic-bezier(0.22,1,0.36,1); }
                .process-step:hover { transform: translateY(-6px); }

                @media (max-width: 1024px) {
                    .services-grid { grid-template-columns: 1fr !important; }
                    .process-grid { grid-template-columns: repeat(2,1fr) !important; }
                }
                @media (max-width: 768px) {
                    .services-section, .process-section, .cta-section { padding: 80px 28px !important; }
                    .hero-services { padding: 0 24px !important; }
                    .services-grid { grid-template-columns: 1fr !important; }
                    .process-grid { grid-template-columns: 1fr !important; }
                    .hero-buttons { flex-direction: column; width: 100%; }
                    .hero-buttons a { text-align: center; width: 100%; }
                }
                @media (max-width: 480px) {
                    .hero-services h1 { font-size: clamp(2.2rem, 11vw, 3rem) !important; }
                }
            `}</style>

            <Navbar scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} setCursorActive={setCursorActive} />

            {/* ── HERO SECTION ── */}
            <section style={{
                minHeight: '85vh',
                background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyMid} 60%, #0D1A3A 100%)`,
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                paddingTop: 110,
            }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize: '60px 60px', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: `radial-gradient(circle, rgba(192,41,42,0.12) 0%, transparent 65%)`, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '350px', height: '350px', borderRadius: '50%', background: `radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%)`, pointerEvents: 'none' }} />

                <div className="hero-services" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 60px 60px', position: 'relative', zIndex: 2, width: '100%' }}>
                    <div className="hero-badge" style={{ marginBottom: 18 }}>
                        <span style={{
                            display: 'inline-block',
                            fontSize: 10,
                            letterSpacing: 6,
                            color: C.gold,
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            background: 'rgba(201,168,76,0.12)',
                            padding: '6px 18px',
                            borderRadius: 30,
                            fontFamily: "'Inter', sans-serif"
                        }}>
                            G5 HOMES · Premium Services
                        </span>
                    </div>

                    <h1 className="hero-title" style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                        fontWeight: 700,
                        color: C.white,
                        lineHeight: 1.08,
                        letterSpacing: '-1px',
                        marginBottom: 0,
                        maxWidth: '70vw',
                    }}>
                        Premium Home<br />
                        <span style={{ color: C.gold, fontWeight: 400, fontStyle: 'italic' }}>Construction & Luxury Living</span>
                    </h1>

                    <div className="hero-line" style={{
                        height: 3,
                        width: 0,
                        background: `linear-gradient(90deg, ${C.red}, ${C.gold})`,
                        margin: '24px 0 20px',
                        borderRadius: 2,
                    }} />

                    <p className="hero-desc" style={{
                        fontSize: 15,
                        lineHeight: 1.95,
                        color: 'rgba(255,255,255,0.6)',
                        maxWidth: 620,
                        marginBottom: 48,
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                    }}>
                        We deliver premium construction, elegant architecture, luxury interiors, and future-ready smart homes designed around your dream lifestyle.
                    </p>

                    <div className="hero-buttons hero-stats" style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
                        <a
                            href="/contact"
                            style={{
                                padding: '16px 38px',
                                borderRadius: 40,
                                textDecoration: 'none',
                                background: `linear-gradient(135deg, ${C.red}, ${C.redDark})`,
                                color: C.white,
                                fontSize: 11,
                                letterSpacing: 2,
                                textTransform: 'uppercase',
                                fontWeight: 700,
                                boxShadow: '0 12px 30px rgba(192,41,42,0.35)',
                                transition: 'all 0.35s ease',
                                display: 'inline-block',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 18px 40px rgba(192,41,42,0.45)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(192,41,42,0.35)'; }}
                        >
                            Free Consultation
                        </a>
                        <a
                            href="#services"
                            style={{
                                padding: '16px 38px',
                                borderRadius: 40,
                                textDecoration: 'none',
                                border: '1px solid rgba(255,255,255,0.25)',
                                color: C.white,
                                fontSize: 11,
                                letterSpacing: 2,
                                textTransform: 'uppercase',
                                fontWeight: 700,
                                backdropFilter: 'blur(10px)',
                                transition: 'all 0.35s ease',
                                display: 'inline-block',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = C.gold; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
                        >
                            Explore Services
                        </a>
                    </div>
                </div>
            </section>

            {/* ── MARQUEE ── */}
            <div style={{ background: `linear-gradient(90deg,${C.navy},${C.navyMid},${C.navy})`, padding: '13px 0', overflow: 'hidden', borderTop: `1px solid rgba(201,168,76,0.2)`, borderBottom: `1px solid rgba(201,168,76,0.2)` }}>
                <div className="marquee-inner">
                    {[...Array(2)].map((_, r) => (
                        ['Custom Homes', '◆', 'Luxury Villas', '◆', 'Smart Living', '◆', 'Interior Design', '◆', 'Renovation', '◆', 'Turnkey Projects', '◆', 'Premium Quality', '◆', 'Trivandrum', '◆'].map((t, i) => (
                            <span key={`${r}-${i}`} style={{ marginRight: 48, fontSize: 11, letterSpacing: 3, color: t === '◆' ? C.gold : 'rgba(255,255,255,0.45)', fontWeight: t === '◆' ? 700 : 400, textTransform: 'uppercase', whiteSpace: 'nowrap', fontFamily: "'Inter', sans-serif" }}>{t}</span>
                        ))
                    ))}
                </div>
            </div>

            {/* ── SERVICES GRID ── */}
            <section id="services" className="services-section" style={{ padding: '110px 60px', background: C.offWhite, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: `radial-gradient(ellipse at 100% 50%, rgba(192,41,42,0.03), transparent 70%)`, pointerEvents: 'none' }} />
                <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <div ref={ref('servicesHeader')} style={{ textAlign: 'center', marginBottom: 64, ...fadeUp('servicesHeader') }}>
                        <div style={{ fontSize: 10, letterSpacing: 6, color: C.red, textTransform: 'uppercase', marginBottom: 14, fontWeight: 700, fontFamily: "'Inter', sans-serif", background: 'rgba(192,41,42,0.07)', display: 'inline-block', padding: '5px 16px', borderRadius: 30 }}>What We Offer</div>
                        <h2 style={{ fontSize: 'clamp(2rem,3.8vw,3rem)', fontWeight: 700, color: C.navy, fontFamily: "'Playfair Display', serif", marginTop: 18 }}>
                            Luxury Services For Your <span style={{ fontStyle: 'italic', color: C.red, fontWeight: 400 }}>Dream Home</span>
                        </h2>
                        <div style={{ width: 60, height: 3, background: `linear-gradient(90deg,${C.red},${C.gold})`, borderRadius: 2, margin: '20px auto 0' }} />
                    </div>

                    <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 36 }}>
                        {services.map((service, idx) => (
                            <div
                                key={idx}
                                ref={ref(`service${idx}`)}
                                className="service-card"
                                onMouseEnter={() => setHoveredService(idx)}
                                onMouseLeave={() => setHoveredService(null)}
                                style={{
                                    ...scaleIn(`service${idx}`, idx * 0.08),
                                    background: C.white,
                                    borderRadius: 28,
                                    overflow: 'hidden',
                                    boxShadow: hoveredService === idx ? '0 30px 60px rgba(10,21,53,0.16)' : '0 10px 30px rgba(10,21,53,0.07)',
                                    border: `1px solid ${hoveredService === idx ? C.navy : 'rgba(14,27,77,0.06)'}`,
                                    cursor: 'default',
                                }}
                            >
                                <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.6s ease',
                                        }}
                                        loading="lazy"
                                        decoding="async"
                                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        top: 20,
                                        left: 20,
                                        width: 52,
                                        height: 52,
                                        borderRadius: '50%',
                                        background: C.navy,
                                        color: C.gold,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 700,
                                        fontFamily: "'Playfair Display', serif",
                                        fontSize: '1.2rem',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                    }}>
                                        {service.num}
                                    </div>
                                </div>
                                <div style={{ padding: '32px 34px 38px' }}>
                                    <h3 style={{
                                        fontSize: '1.6rem',
                                        fontWeight: 700,
                                        color: C.navy,
                                        fontFamily: "'Playfair Display', serif",
                                        marginBottom: 16,
                                        transition: 'color 0.3s ease',
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.color = C.red}
                                        onMouseLeave={e => e.currentTarget.style.color = C.navy}
                                    >
                                        {service.title}
                                    </h3>
                                    <p style={{ fontSize: 14, lineHeight: 1.85, color: '#6A7290', marginBottom: 24, fontFamily: "'Inter', sans-serif" }}>
                                        {service.desc}
                                    </p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        {service.points.map((point, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                <div style={{
                                                    width: 22,
                                                    height: 22,
                                                    borderRadius: '50%',
                                                    background: 'rgba(192,41,42,0.1)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: C.red,
                                                    fontSize: 11,
                                                    flexShrink: 0,
                                                }}>✓</div>
                                                <span style={{ fontSize: 13.5, color: '#4E5671', fontFamily: "'Inter', sans-serif" }}>{point}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PROCESS SECTION ── */}
            <section className="process-section" style={{ padding: '110px 60px', background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyMid} 100%)`, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)`, backgroundSize: '48px 48px', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: `radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)`, pointerEvents: 'none' }} />

                <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <div ref={ref('processHeader')} style={{ textAlign: 'center', marginBottom: 64, ...fadeUp('processHeader') }}>
                        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, textTransform: 'uppercase', marginBottom: 14, fontWeight: 700, fontFamily: "'Inter', sans-serif", background: 'rgba(201,168,76,0.1)', display: 'inline-block', padding: '5px 16px', borderRadius: 30 }}>Our Process</div>
                        <h2 style={{ fontSize: 'clamp(2rem,3.8vw,3rem)', fontWeight: 700, color: C.white, fontFamily: "'Playfair Display', serif", marginTop: 18 }}>
                            From Vision To <span style={{ fontStyle: 'italic', color: C.gold, fontWeight: 400 }}>Reality</span>
                        </h2>
                        <div style={{ width: 60, height: 3, background: `linear-gradient(90deg,${C.gold},${C.red})`, borderRadius: 2, margin: '20px auto 0' }} />
                    </div>

                    <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
                        {processSteps.map((step, idx) => (
                            <div
                                key={idx}
                                ref={ref(`process${idx}`)}
                                className="process-step"
                                onMouseEnter={() => setHoveredStep(idx)}
                                onMouseLeave={() => setHoveredStep(null)}
                                style={{
                                    ...scaleIn(`process${idx}`, idx * 0.1),
                                    background: hoveredStep === idx ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                                    border: `1px solid ${hoveredStep === idx ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.08)'}`,
                                    borderRadius: 28,
                                    padding: '40px 28px',
                                    textAlign: 'center',
                                    backdropFilter: 'blur(12px)',
                                    cursor: 'default',
                                    transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                                    transform: hoveredStep === idx ? 'translateY(-8px)' : 'translateY(0)',
                                }}
                            >
                                <div style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: '50%',
                                    margin: '0 auto 24px',
                                    background: hoveredStep === idx ? `linear-gradient(135deg, rgba(192,41,42,0.3), rgba(201,168,76,0.3))` : `linear-gradient(135deg, rgba(192,41,42,0.15), rgba(201,168,76,0.15))`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2rem',
                                    transition: 'all 0.3s ease',
                                }}>
                                    {step.icon}
                                </div>
                                <div style={{ fontSize: 11, letterSpacing: 3, color: C.gold, fontWeight: 700, marginBottom: 14, fontFamily: "'Inter', sans-serif" }}>STEP {step.num}</div>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: C.white, fontFamily: "'Playfair Display', serif", marginBottom: 14 }}>{step.title}</h3>
                                <p style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', fontFamily: "'Inter', sans-serif" }}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA SECTION ── */}
            <section className="cta-section" style={{ padding: '110px 60px', background: C.white, position: 'relative' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                    <div ref={ref('ctaServices')} style={{
                        ...scaleIn('ctaServices'),
                        background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyMid} 100%)`,
                        borderRadius: 40,
                        padding: '80px 48px',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'rgba(201,168,76,0.06)', top: -150, right: -100 }} />
                        <div style={{ position: 'absolute', width: 250, height: 250, borderRadius: '50%', background: 'rgba(192,41,42,0.04)', bottom: -100, left: -80 }} />

                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(2rem,4vw,3.5rem)',
                            color: C.white,
                            marginBottom: 20,
                            lineHeight: 1.2,
                            position: 'relative',
                            zIndex: 2,
                        }}>
                            Let's Build Your<br />
                            <span style={{ color: C.gold, fontStyle: 'italic', fontWeight: 400 }}>Dream Home</span>
                        </h2>

                        <p style={{
                            color: 'rgba(255,255,255,0.7)',
                            maxWidth: 550,
                            margin: '0 auto 36px',
                            lineHeight: 1.9,
                            fontSize: 14,
                            position: 'relative',
                            zIndex: 2,
                            fontFamily: "'Inter', sans-serif"
                        }}>
                            Get in touch with G5 Homes today and begin your journey toward premium luxury living.
                        </p>

                        <a
                            href="/contact"
                            style={{
                                display: 'inline-block',
                                padding: '16px 42px',
                                borderRadius: 40,
                                textDecoration: 'none',
                                background: `linear-gradient(135deg, ${C.red}, ${C.redDark})`,
                                color: C.white,
                                fontSize: 11,
                                letterSpacing: 2,
                                textTransform: 'uppercase',
                                fontWeight: 700,
                                position: 'relative',
                                zIndex: 2,
                                transition: 'all 0.35s ease',
                                boxShadow: '0 8px 24px rgba(192,41,42,0.3)',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 36px rgba(192,41,42,0.4)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(192,41,42,0.3)'; }}
                        >
                            Start Your Project
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}