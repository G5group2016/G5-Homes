import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import custom2 from '../assets/custom3.webp';

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

const processSteps = [
    {
        num: '01',
        title: 'Consultation',
        desc: 'We understand your vision, requirements, budget, and design preferences.',
        icon: '💬',
    },
    {
        num: '02',
        title: 'Design & Planning',
        desc: 'Our architects and designers create customized concepts, layouts, and detailed plans.',
        icon: '📐',
    },
    {
        num: '03',
        title: 'Construction & Execution',
        desc: 'Our experienced construction team executes every stage with quality control and professional project management.',
        icon: '🏗️',
    },
    {
        num: '04',
        title: 'Final Handover',
        desc: 'We complete detailed inspections and deliver your dream home on time with uncompromised quality.',
        icon: '🔑',
    },
];

const coreValues = [
    { icon: '🏆', title: 'Quality Excellence', desc: 'We maintain the highest standards in construction materials, engineering practices, and project execution.' },
    { icon: '🔍', title: 'Transparency', desc: 'Clear communication, honest pricing, and professional project management define every project we undertake.' },
    { icon: '💡', title: 'Innovation', desc: 'We adopt modern architecture, smart home concepts, and sustainable construction practices to build future-ready homes.' },
    { icon: '🤝', title: 'Customer Commitment', desc: "Every home is designed around the client's vision, lifestyle, and expectations." },
    { icon: '⏰', title: 'Timely Delivery', desc: 'We value your time and ensure projects are completed within committed schedules.' },
];

const missionPoints = [
    'To deliver premium quality homes with modern architectural excellence',
    'To provide transparent and customer-focused construction services',
    'To create eco-friendly and sustainable residential projects',
    'To ensure timely project completion with uncompromised quality standards',
    'To build long-term relationships through trust, reliability, and innovation',
];

export default function AboutUs() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [cursorActive, setCursorActive] = useState(false);
    const [visible, setVisible] = useState({});
    const [hoveredValue, setHoveredValue] = useState(null);
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

        /* Hero Entrance */
        @keyframes heroFadeSlideUp {
            0% { opacity:0; transform: translateY(60px); }
            100% { opacity:1; transform: translateY(0); }
        }
        @keyframes heroFadeSlideLeft {
            0% { opacity:0; transform: translateX(-60px); }
            100% { opacity:1; transform: translateX(0); }
        }
        @keyframes heroScaleIn {
            0% { opacity:0; transform: scale(0.9); }
            100% { opacity:1; transform: scale(1); }
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

        .value-card { transition: all 0.45s cubic-bezier(0.22,1,0.36,1); }
        .value-card:hover { transform: translateY(-10px); }

        .process-step { transition: all 0.4s cubic-bezier(0.22,1,0.36,1); }
        .process-step:hover { transform: translateY(-6px); }

        .mission-item {
            opacity: 0;
            transform: translateX(-30px);
            transition: all 0.5s cubic-bezier(0.22,0.85,0.36,1);
        }
        .mission-item.visible {
            opacity: 1;
            transform: translateX(0);
        }

        @media (max-width: 1024px) {
            .about-intro-grid { grid-template-columns: 1fr !important; }
            .vision-grid { grid-template-columns: 1fr !important; }
            .values-grid { grid-template-columns: repeat(2,1fr) !important; }
            .process-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 768px) {
            .about-section { padding: 80px 28px !important; }
            .hero-about { padding: 0 24px !important; }
            .values-grid { grid-template-columns: 1fr !important; }
            .process-grid { grid-template-columns: 1fr !important; }
            .hero-about-stats { flex-direction: column; gap: 20px !important; }
        }
        @media (max-width: 480px) {
            .hero-about h1 { font-size: clamp(2.2rem, 11vw, 3rem) !important; }
        }
      `}</style>

            <Navbar scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} setCursorActive={setCursorActive} />

            {/* ── HERO ── */}
            <section style={{
                minHeight: '72vh',
                background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyMid} 60%, #0D1A3A 100%)`,
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                paddingTop: 110,
            }}>
                {/* Background grid */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize: '60px 60px', pointerEvents: 'none' }} />
                {/* Radial glow */}
                <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: `radial-gradient(circle, rgba(192,41,42,0.12) 0%, transparent 65%)`, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '350px', height: '350px', borderRadius: '50%', background: `radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%)`, pointerEvents: 'none' }} />

                <div className="hero-about" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 60px 60px', position: 'relative', zIndex: 2, width: '100%' }}>
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
                            G5 GROUP · Est. 2019
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
                        Building Dreams,<br />
                        <span style={{ color: C.gold, fontWeight: 400, fontStyle: 'italic' }}>Crafting Legacies</span>
                    </h1>

                    <div className="hero-line" style={{
                        height: 3,
                        width: 0,
                        background: `linear-gradient(90deg, ${C.red}, ${C.gold})`,
                        margin: '24px 0 20px',
                        borderRadius: 2,
                    }} />

                    <p className="hero-subtitle" style={{
                        fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
                        color: 'rgba(255,255,255,0.75)',
                        fontStyle: 'italic',
                        fontFamily: "'Playfair Display', serif",
                        marginBottom: 16,
                        maxWidth: 600,
                    }}>
                        Leading Home Builders and Developers in Trivandrum
                    </p>

                    <p className="hero-desc" style={{
                        fontSize: 14,
                        lineHeight: 1.95,
                        color: 'rgba(255,255,255,0.6)',
                        maxWidth: 620,
                        marginBottom: 48,
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                    }}>
                        G5 Homes is committed to delivering modern residential spaces with innovative architecture, premium construction quality, and customer-centric solutions — creating elegant living spaces that combine luxury, sustainability, and functionality.
                    </p>

                    {/* Inline stats */}
                    <div className="hero-about-stats hero-stats" style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
                        {[['350+', 'Projects Completed'], ['6+', 'Years of Excellence'], ['320+', 'Happy Clients']].map(([val, label], i) => (
                            <div key={i} style={{ borderLeft: `2px solid rgba(201,168,76,0.4)`, paddingLeft: 20 }}>
                                <div style={{ fontSize: '2rem', fontWeight: 700, color: C.white, fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>{val}</div>
                                <div style={{ fontSize: 10, color: C.gold, letterSpacing: 2, marginTop: 6, textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── MARQUEE ── */}
            <div style={{ background: `linear-gradient(90deg,${C.navy},${C.navyMid},${C.navy})`, padding: '13px 0', overflow: 'hidden', borderTop: `1px solid rgba(201,168,76,0.2)`, borderBottom: `1px solid rgba(201,168,76,0.2)` }}>
                <div className="marquee-inner">
                    {[...Array(2)].map((_, r) => (
                        ['Quality Construction', '◆', 'Luxury Villas', '◆', 'Smart Homes', '◆', 'Interior Design', '◆', 'Turnkey Projects', '◆', 'Est. 2019', '◆','Strong Trust', '◆', 'Trivandrum, Kerala', '◆'].map((t, i) => (
                            <span key={`${r}-${i}`} style={{ marginRight: 48, fontSize: 11, letterSpacing: 3, color: t === '◆' ? C.gold : 'rgba(255,255,255,0.45)', fontWeight: t === '◆' ? 700 : 400, textTransform: 'uppercase', whiteSpace: 'nowrap', fontFamily: "'Inter', sans-serif" }}>{t}</span>
                        ))
                    ))}
                </div>
            </div>

            {/* ── INTRO ── */}
            <section className="about-section" style={{ padding: '110px 60px', background: C.white, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: `radial-gradient(ellipse at 100% 50%, rgba(192,41,42,0.03), transparent 70%)`, pointerEvents: 'none' }} />
                <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <div className="about-intro-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
                        <div ref={ref('introLeft')} style={slideLeft('introLeft')}>
                            <div style={{ fontSize: 10, letterSpacing: 6, color: C.red, textTransform: 'uppercase', marginBottom: 14, fontWeight: 700, fontFamily: "'Inter', sans-serif", background: 'rgba(192,41,42,0.07)', display: 'inline-block', padding: '5px 16px', borderRadius: 30 }}>Who We Are</div>
                            <h2 style={{ fontSize: 'clamp(2rem,3.8vw,3rem)', fontWeight: 700, color: C.navy, fontFamily: "'Playfair Display', serif", lineHeight: 1.15, marginTop: 18, marginBottom: 24 }}>
                                Redefining Home<br /><span style={{ fontStyle: 'italic', color: C.red, fontWeight: 400 }}>Construction in Kerala</span>
                            </h2>
                            <div style={{ width: 60, height: 3, background: `linear-gradient(90deg,${C.red},${C.gold})`, borderRadius: 2, marginBottom: 28 }} />
                            <p style={{ fontSize: 15, lineHeight: 2, color: '#5A6380', marginBottom: 20, fontFamily: "'Inter', sans-serif" }}>
                                As one of the best home builders in Trivandrum for villas and custom homes, we focus on creating elegant living spaces that combine luxury, sustainability, and functionality.
                            </p>
                            <p style={{ fontSize: 15, lineHeight: 2, color: '#5A6380', marginBottom: 28, fontFamily: "'Inter', sans-serif" }}>
                                Our expertise includes affordable house construction, premium villa development, smart home building, interior design, outdoor planning, and complete turnkey home construction services in Kerala.
                            </p>
                            <p style={{ fontSize: 15, lineHeight: 2, color: '#5A6380', fontFamily: "'Inter', sans-serif" }}>
                                From affordable family homes to premium villas and smart luxury residences, G5 Homes is committed to deliver exceptional results with professionalism and precision.
                            </p>
                        </div>

                        <div ref={ref('introRight')} style={{ ...slideRight('introRight'), position: 'relative' }}>
                            <div style={{ borderRadius: 28, overflow: 'hidden', boxShadow: '0 32px 60px rgba(10,21,53,0.14)', position: 'relative' }}>
                                <img
                                    src={custom2}
                                    alt="G5 Homes Construction"
                                    style={{ width: '100%', height: 480, objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,21,53,0.5), transparent 50%)' }} />
                                <div style={{ position: 'absolute', bottom: 28, left: 28, right: 28 }}>
                                    <div style={{ background: 'rgba(10,21,53,0.85)', backdropFilter: 'blur(12px)', borderRadius: 16, padding: '18px 24px', border: '1px solid rgba(201,168,76,0.2)' }}>
                                        <div style={{ fontSize: 13, color: C.gold, fontWeight: 600, marginBottom: 4, fontFamily: "'Inter', sans-serif" }}>Premium Construction Quality</div>
                                        {/* <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontFamily: "'Inter', sans-serif" }}>RERA Registered · ISO 9001:2015 Certified</div> */}
                                    </div>
                                </div>
                            </div>
                            {/* Decorative rings */}
                            <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, border: `2px solid ${C.gold}`, borderRadius: '50%', opacity: 0.15, zIndex: -1 }} />
                            <div style={{ position: 'absolute', bottom: -10, left: -10, width: 60, height: 60, border: `2px solid ${C.red}`, borderRadius: '50%', opacity: 0.12, zIndex: -1 }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── VISION & MISSION ── */}
            <section className="about-section" style={{ padding: '110px 60px', background: C.offWhite, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(14,27,77,0.035) 1px, transparent 0)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />
                <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <div ref={ref('vmHeader')} style={{ textAlign: 'center', marginBottom: 64, ...fadeUp('vmHeader') }}>
                        <div style={{ fontSize: 10, letterSpacing: 6, color: C.red, textTransform: 'uppercase', marginBottom: 14, fontWeight: 700, fontFamily: "'Inter', sans-serif", background: 'rgba(192,41,42,0.07)', display: 'inline-block', padding: '5px 16px', borderRadius: 30 }}>Our Foundation</div>
                        <h2 style={{ fontSize: 'clamp(2rem,3.8vw,3rem)', fontWeight: 700, color: C.navy, fontFamily: "'Playfair Display', serif", marginTop: 18 }}>
                            Vision & <span style={{ fontStyle: 'italic', color: C.red, fontWeight: 400 }}>Mission</span>
                        </h2>
                        <div style={{ width: 60, height: 3, background: `linear-gradient(90deg,${C.red},${C.gold})`, borderRadius: 2, margin: '20px auto 0' }} />
                    </div>

                    <div className="vision-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
                        {/* Vision */}
                        <div ref={ref('visionCard')} style={{ ...slideLeft('visionCard'), background: C.white, borderRadius: 28, padding: '44px 40px', boxShadow: '0 16px 40px rgba(10,21,53,0.06)', border: '1px solid rgba(14,27,77,0.07)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg,${C.red},${C.gold})` }} />
                            <div style={{ width: 56, height: 56, background: `linear-gradient(135deg,${C.red},${C.redDark})`, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, marginBottom: 28, boxShadow: `0 10px 24px rgba(192,41,42,0.2)` }}>🎯</div>
                            <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: C.navy, fontFamily: "'Playfair Display', serif", marginBottom: 18 }}>Our Vision</h3>
                            <p style={{ fontSize: 15, lineHeight: 2, color: '#5A6380', fontFamily: "'Inter', sans-serif" }}>
                                To become one of the most trusted and innovative home builders and developers in Kerala by creating sustainable, modern, and future-ready living spaces.
                            </p>
                        </div>

                        {/* Mission */}
                        <div ref={ref('missionCard')} style={{ ...slideRight('missionCard'), background: C.navy, borderRadius: 28, padding: '44px 40px', boxShadow: '0 16px 40px rgba(10,21,53,0.15)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg,${C.gold},${C.red})` }} />
                            <div style={{ width: 56, height: 56, background: `linear-gradient(135deg,${C.gold},${C.goldLight})`, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, marginBottom: 28, boxShadow: `0 10px 24px rgba(201,168,76,0.2)` }}>🚀</div>
                            <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: C.white, fontFamily: "'Playfair Display', serif", marginBottom: 24 }}>Our Mission</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                {missionPoints.map((point, i) => (
                                    <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                                        <div style={{ width: 22, height: 22, background: `rgba(201,168,76,0.15)`, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                                            <div style={{ width: 6, height: 6, background: C.gold, borderRadius: '50%' }} />
                                        </div>
                                        <span style={{ fontSize: 13.5, lineHeight: 1.75, color: 'rgba(255,255,255,0.72)', fontFamily: "'Inter', sans-serif" }}>{point}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CONSTRUCTION PROCESS ── */}
            <section className="about-section" style={{ padding: '110px 60px', background: C.white, position: 'relative', overflow: 'hidden' }}>
                <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                    <div ref={ref('processHeader')} style={{ textAlign: 'center', marginBottom: 72, ...fadeUp('processHeader') }}>
                        <div style={{ fontSize: 10, letterSpacing: 6, color: C.red, textTransform: 'uppercase', marginBottom: 14, fontWeight: 700, fontFamily: "'Inter', sans-serif", background: 'rgba(192,41,42,0.07)', display: 'inline-block', padding: '5px 16px', borderRadius: 30 }}>How We Work</div>
                        <h2 style={{ fontSize: 'clamp(2rem,3.8vw,3rem)', fontWeight: 700, color: C.navy, fontFamily: "'Playfair Display', serif", marginTop: 18 }}>
                            Our Construction <span style={{ fontStyle: 'italic', color: C.red, fontWeight: 400 }}>Process</span>
                        </h2>
                        <div style={{ width: 60, height: 3, background: `linear-gradient(90deg,${C.red},${C.gold})`, borderRadius: 2, margin: '20px auto 0' }} />
                        <p style={{ fontSize: 15, color: '#6A7290', maxWidth: 550, margin: '20px auto 0', fontFamily: "'Inter', sans-serif" }}>
                            A seamless journey from your first idea to the final key handover
                        </p>
                    </div>

                    <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28, position: 'relative' }}>
                        {/* Connector line */}
                        <div style={{ position: 'absolute', top: 52, left: '12.5%', right: '12.5%', height: 2, background: `linear-gradient(90deg, ${C.red}, ${C.gold}, ${C.red})`, opacity: 0.25, zIndex: 0 }} />

                        {processSteps.map((step, idx) => (
                            <div
                                key={idx}
                                ref={ref(`process${idx}`)}
                                className="process-step"
                                onMouseEnter={() => setHoveredStep(idx)}
                                onMouseLeave={() => setHoveredStep(null)}
                                style={{
                                    ...scaleIn(`process${idx}`, idx * 0.1),
                                    background: hoveredStep === idx ? C.navy : C.white,
                                    borderRadius: 24,
                                    padding: '36px 28px',
                                    textAlign: 'center',
                                    boxShadow: hoveredStep === idx ? '0 24px 50px rgba(10,21,53,0.18)' : '0 10px 30px rgba(10,21,53,0.06)',
                                    border: `1px solid ${hoveredStep === idx ? C.navy : 'rgba(14,27,77,0.08)'}`,
                                    cursor: 'default',
                                    position: 'relative',
                                    zIndex: 2,
                                }}
                            >
                                {/* Number */}
                                <div style={{
                                    width: 50,
                                    height: 50,
                                    background: hoveredStep === idx ? `linear-gradient(135deg,${C.red},${C.redDark})` : `linear-gradient(135deg,rgba(192,41,42,0.1),rgba(201,168,76,0.1))`,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 20px',
                                    fontSize: '1.5rem',
                                    transition: 'all 0.4s ease',
                                    boxShadow: hoveredStep === idx ? `0 8px 20px rgba(192,41,42,0.3)` : 'none',
                                }}>
                                    {step.icon}
                                </div>
                                <div style={{ fontSize: 11, letterSpacing: 3, color: hoveredStep === idx ? C.gold : C.red, fontWeight: 700, marginBottom: 12, fontFamily: "'Inter', sans-serif" }}>STEP {step.num}</div>
                                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: hoveredStep === idx ? C.white : C.navy, fontFamily: "'Playfair Display', serif", marginBottom: 14, lineHeight: 1.3 }}>{step.title}</h3>
                                <p style={{ fontSize: 13, lineHeight: 1.75, color: hoveredStep === idx ? 'rgba(255,255,255,0.65)' : '#6A7290', fontFamily: "'Inter', sans-serif", transition: 'color 0.3s ease' }}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CORE VALUES ── */}
            <section className="about-section" style={{ padding: '110px 60px', background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyMid} 100%)`, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle at 70% 30%, rgba(201,168,76,0.07) 0%, transparent 50%)`, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)`, backgroundSize: '48px 48px', pointerEvents: 'none' }} />

                <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <div ref={ref('valuesHeader')} style={{ textAlign: 'center', marginBottom: 64, ...fadeUp('valuesHeader') }}>
                        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, textTransform: 'uppercase', marginBottom: 14, fontWeight: 700, fontFamily: "'Inter', sans-serif", background: 'rgba(201,168,76,0.1)', display: 'inline-block', padding: '5px 16px', borderRadius: 30 }}>What Drives Us</div>
                        <h2 style={{ fontSize: 'clamp(2rem,3.8vw,3rem)', fontWeight: 700, color: C.white, fontFamily: "'Playfair Display', serif", marginTop: 18 }}>
                            Our Core <span style={{ fontStyle: 'italic', color: C.gold, fontWeight: 400 }}>Values</span>
                        </h2>
                        <div style={{ width: 60, height: 3, background: `linear-gradient(90deg,${C.gold},${C.red})`, borderRadius: 2, margin: '20px auto 0' }} />
                    </div>

                    <div className="values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20 }}>
                        {coreValues.map((val, idx) => (
                            <div
                                key={idx}
                                ref={ref(`value${idx}`)}
                                className="value-card"
                                onMouseEnter={() => setHoveredValue(idx)}
                                onMouseLeave={() => setHoveredValue(null)}
                                style={{
                                    ...scaleIn(`value${idx}`, idx * 0.08),
                                    background: hoveredValue === idx ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
                                    border: `1px solid ${hoveredValue === idx ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.08)'}`,
                                    borderRadius: 24,
                                    padding: '36px 24px',
                                    textAlign: 'center',
                                    cursor: 'default',
                                    backdropFilter: 'blur(8px)',
                                    boxShadow: hoveredValue === idx ? '0 20px 40px rgba(0,0,0,0.2)' : 'none',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${C.red},${C.gold})`, transform: hoveredValue === idx ? 'scaleX(1)' : 'scaleX(0)', transition: 'transform 0.4s ease', transformOrigin: 'center' }} />
                                <div style={{ fontSize: '2.2rem', marginBottom: 20 }}>{val.icon}</div>
                                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: C.white, fontFamily: "'Playfair Display', serif", marginBottom: 12, lineHeight: 1.3 }}>{val.title}</h4>
                                <p style={{ fontSize: 12.5, lineHeight: 1.75, color: 'rgba(255,255,255,0.55)', fontFamily: "'Inter', sans-serif" }}>{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CLOSING CTA ── */}
            <section className="about-section" style={{ padding: '110px 60px', background: C.offWhite, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', fontSize: '30vw', color: 'rgba(10,21,53,0.02)', lineHeight: 1, fontFamily: "'Playfair Display', serif", fontWeight: 700, pointerEvents: 'none', userSelect: 'none' }}>G5</div>
                <div ref={ref('ctaAbout')} style={{ maxWidth: 760, margin: '0 auto', position: 'relative', zIndex: 2, ...fadeUp('ctaAbout') }}>
                    <div style={{ fontSize: 10, letterSpacing: 6, color: C.red, textTransform: 'uppercase', marginBottom: 14, fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>Ready to Begin?</div>
                    <h2 style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 700, color: C.navy, fontFamily: "'Playfair Display', serif", lineHeight: 1.2, marginBottom: 20 }}>
                        Creating Dream Homes<br />
                        <span style={{ fontStyle: 'italic', color: C.red, fontWeight: 400 }}>with Lasting Value</span>
                    </h2>
                    <div style={{ width: 60, height: 3, background: `linear-gradient(90deg,${C.red},${C.gold})`, borderRadius: 2, margin: '0 auto 28px' }} />
                    <p style={{ fontSize: 15, lineHeight: 2, color: '#5A6380', marginBottom: 44, fontFamily: "'Inter', sans-serif" }}>
                        Our commitment to quality construction, creative design, and customer satisfaction has made us a trusted name among modern house builders and developers in Kerala. Whether you are planning a luxury villa, premium family residence, or smart modern home, G5 Homes is ready to bring your vision to life.
                    </p>
                    <div style={{ display: 'flex', gap: 18, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="/contact" style={{
                            padding: '16px 44px', fontSize: 11, borderRadius: 40,
                            background: `linear-gradient(135deg,${C.red},${C.redDark})`,
                            color: C.white, textDecoration: 'none', fontFamily: "'Inter', sans-serif",
                            fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase',
                            display: 'inline-flex', alignItems: 'center',
                            transition: 'all 0.35s ease',
                            boxShadow: `0 8px 24px rgba(192,41,42,0.3)`,
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 36px rgba(192,41,42,0.35)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 24px rgba(192,41,42,0.3)`; }}>
                            Get Free Consultation
                        </a>
                        <a href="/" style={{
                            padding: '16px 44px', fontSize: 11, borderRadius: 40,
                            background: 'transparent', color: C.navy,
                            border: `1.5px solid rgba(10,21,53,0.25)`,
                            textDecoration: 'none', fontFamily: "'Inter', sans-serif",
                            fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase',
                            display: 'inline-flex', alignItems: 'center',
                            transition: 'all 0.35s ease',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.background = C.navy; e.currentTarget.style.color = C.white; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.navy; }}>
                            Back to Home
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}