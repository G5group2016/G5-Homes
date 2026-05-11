import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ── VALIDATION HELPERS ────────────────────────────────────────────────────

const validateName = (value) => {
  if (!value.trim()) return "Name is required.";
  if (/[^a-zA-Z\s]/.test(value)) return "Name must not contain numbers or special characters.";
  if (value.trim().length < 2) return "Name must be at least 2 characters.";
  return "";
};

const validateEmail = (value) => {
  if (!value.trim()) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email address.";
  return "";
};

const validatePhone = (value) => {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "Phone number is required.";
  if (digits.length !== 10) return "Phone number must be exactly 10 digits.";
  if (!/^[6-9]/.test(digits)) return "Enter a valid Indian mobile number (starts with 6–9).";
  return "";
};

// ── ERROR MESSAGE COMPONENT ───────────────────────────────────────────────
function ErrorMsg({ msg }) {
  if (!msg) return null;
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginTop: 6,
      fontSize: 11.5,
      color: "#C0292A",
      fontFamily: "'Inter', sans-serif",
      fontWeight: 500,
    }}>
      <span style={{ fontSize: 12 }}>⚠</span>
      {msg}
    </div>
  );
}

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
    lightGray: '#EEF0F5',
    midGray: '#8A93A8',
    darkText: '#0A1130',
};

const contactInfo = [
    { icon: '📍', label: 'Location', value: 'Head Office: G5 Homes, NH 66, Edavilakam, Pachalloor, Tvm, Kerala, India- 695027', sub: 'Visit our office' },
    { icon: '📞', label: 'Phone', value: '+91 9562100007', sub: 'Mon – Sat: 9AM – 5:30PM IST' },
    { icon: '📧', label: 'Email', value: 'info@g5homes.in', sub: 'We reply within 24 hours' },
    { icon: '🌐', label: 'Website', value: 'www.g5homes.in', sub: 'Explore our projects' },
];

const servicesList = [
    'Custom home construction consultations',
    'Luxury villa planning and design',
    'Interior design and landscaping services',
    'Construction cost estimation',
    'Turnkey home construction solutions',
    'Smart and sustainable home development',
];

const whyContactUs = [
    { icon: '⚡', title: 'Quick Response', desc: 'Our team responds to every inquiry within 24 hours with personalized attention.' },
    { icon: '🎯', title: 'Expert Guidance', desc: 'Get professional advice from experienced architects and construction specialists.' },
    { icon: '💰', title: 'Free Consultation', desc: 'We offer complimentary initial consultations to understand your vision and requirements.' },
    { icon: '🔒', title: 'Confidential', desc: 'Your project details and personal information are always kept strictly confidential.' },
];

export default function Contact() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [cursorActive, setCursorActive] = useState(false);
    const [visible, setVisible] = useState({});
    const [hoveredInfo, setHoveredInfo] = useState(null);
    const [hoveredWhy, setHoveredWhy] = useState(null);
    
    // ── REPLACED formData state with validation ──
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });
    const [errors, setErrors] = useState({ name: "", email: "", phone: "" });
    const [touched, setTouched] = useState({ name: false, email: false, phone: false });
    const [formFocus, setFormFocus] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const sectionRefs = useRef({});

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

    // ── FIELD CHANGE HANDLERS ──
    const handleNameChange = (e) => {
        const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
        setFormData((prev) => ({ ...prev, name: value }));
        if (touched.name) setErrors((prev) => ({ ...prev, name: validateName(value) }));
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 10);
        setFormData((prev) => ({ ...prev, phone: value }));
        if (touched.phone) setErrors((prev) => ({ ...prev, phone: validatePhone(value) }));
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, email: value }));
        if (touched.email) setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    };

    const handleBlur = (field) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        const validators = { name: validateName, email: validateEmail, phone: validatePhone };
        setErrors((prev) => ({ ...prev, [field]: validators[field](formData[field]) }));
    };

    // ── REPLACED handleSubmit with validation ──
    const handleSubmit = async (e) => {
        e.preventDefault();

        const nameErr = validateName(formData.name);
        const emailErr = validateEmail(formData.email);
        const phoneErr = validatePhone(formData.phone);

        setErrors({ name: nameErr, email: emailErr, phone: phoneErr });
        setTouched({ name: true, email: true, phone: true });

        if (nameErr || emailErr || phoneErr) return;

        try {
            const res = await fetch("https://g5homes.in/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    phone: formData.phone.trim(),
                    service: formData.service,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Submission failed");

            setSubmitted(true);
            setFormData({ name: "", email: "", phone: "", service: "", message: "" });
            setErrors({ name: "", email: "", phone: "" });
            setTouched({ name: false, email: false, phone: false });
            setTimeout(() => setSubmitted(false), 5000);
        } catch (err) {
            alert("Something went wrong: " + err.message);
        }
    };

    const inputStyle = (field) => ({
        width: '100%',
        padding: '15px 18px',
        borderRadius: 14,
        border: `1.5px solid ${errors[field] && touched[field] ? '#C0292A' : (formFocus === field ? C.red : 'rgba(14,27,77,0.15)')}`,
        fontFamily: "'Inter', sans-serif",
        fontSize: 13.5,
        color: C.darkText,
        background: formFocus === field ? C.white : C.offWhite,
        outline: 'none',
        transition: 'all 0.3s ease',
        boxShadow: errors[field] && touched[field] ? '0 0 0 3px rgba(192,41,42,0.1)' : (formFocus === field ? '0 0 0 3px rgba(192,41,42,0.08)' : 'none'),
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

        @keyframes heroFadeUp { 0%{opacity:0;transform:translateY(60px)} 100%{opacity:1;transform:translateY(0)} }
        @keyframes heroFadeLeft { 0%{opacity:0;transform:translateX(-50px)} 100%{opacity:1;transform:translateX(0)} }
        @keyframes lineGrow { 0%{width:0} 100%{width:80px} }
        @keyframes successPop { 0%{opacity:0;transform:scale(0.85)} 100%{opacity:1;transform:scale(1)} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .marquee-inner { display:flex; animation:marquee 30s linear infinite; width:max-content; }

        .contact-hero-badge { animation: heroFadeLeft 0.7s cubic-bezier(0.22,0.85,0.36,1) 0.2s both; }
        .contact-hero-title { animation: heroFadeUp 0.9s cubic-bezier(0.22,0.85,0.36,1) 0.35s both; }
        .contact-hero-line { animation: lineGrow 0.8s cubic-bezier(0.22,0.85,0.36,1) 0.65s both; }
        .contact-hero-sub { animation: heroFadeUp 0.8s cubic-bezier(0.22,0.85,0.36,1) 0.8s both; }
        .contact-hero-desc { animation: heroFadeUp 0.8s cubic-bezier(0.22,0.85,0.36,1) 1s both; }

        .info-card { transition: all 0.45s cubic-bezier(0.22,1,0.36,1); }
        .info-card:hover { transform: translateY(-8px); }

        .why-card { transition: all 0.45s cubic-bezier(0.22,1,0.36,1); }
        .why-card:hover { transform: translateY(-8px); }

        .success-msg { animation: successPop 0.5s cubic-bezier(0.22,0.85,0.36,1) forwards; }

        @media (max-width: 1024px) {
            .contact-main-grid { grid-template-columns: 1fr !important; }
            .why-grid-contact { grid-template-columns: repeat(2,1fr) !important; }
            .contact-info-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 768px) {
            .contact-section { padding: 80px 28px !important; }
            .contact-hero-wrap { padding: 0 24px 60px !important; }
            .why-grid-contact { grid-template-columns: 1fr !important; }
            .contact-info-grid { grid-template-columns: 1fr !important; }
            .form-row { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
            .contact-hero-wrap h1 { font-size: clamp(2.2rem,11vw,3rem) !important; }
        }
      `}</style>

            <Navbar scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} setCursorActive={setCursorActive} />

            {/* ── HERO ── */}
            <section style={{
                minHeight: '65vh',
                background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyMid} 60%, #0D1A3A 100%)`,
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                paddingTop: 110,
            }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize: '60px 60px', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: '450px', height: '450px', borderRadius: '50%', background: `radial-gradient(circle, rgba(192,41,42,0.1) 0%, transparent 65%)`, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-15%', left: '5%', width: '300px', height: '300px', borderRadius: '50%', background: `radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%)`, pointerEvents: 'none' }} />

                <div className="contact-hero-wrap" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 60px 60px', position: 'relative', zIndex: 2, width: '100%' }}>
                    <div className="contact-hero-badge" style={{ marginBottom: 18 }}>
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
                            G5 Homes · Get In Touch
                        </span>
                    </div>

                    <h1 className="contact-hero-title" style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                        fontWeight: 700,
                        color: C.white,
                        lineHeight: 1.08,
                        letterSpacing: '-1px',
                        maxWidth: '70vw',
                    }}>
                        Let's Build Your<br />
                        <span style={{ color: C.gold, fontWeight: 400, fontStyle: 'italic' }}>Dream Home Together</span>
                    </h1>

                    <div className="contact-hero-line" style={{
                        height: 3, width: 0,
                        background: `linear-gradient(90deg, ${C.red}, ${C.gold})`,
                        margin: '24px 0 20px', borderRadius: 2,
                    }} />

                    <p className="contact-hero-sub" style={{
                        fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
                        color: 'rgba(255,255,255,0.75)',
                        fontStyle: 'italic',
                        fontFamily: "'Playfair Display', serif",
                        marginBottom: 16,
                        maxWidth: 600,
                    }}>
                        Have a Project in Mind?
                    </p>

                    <p className="contact-hero-desc" style={{
                        fontSize: 14,
                        lineHeight: 1.95,
                        color: 'rgba(255,255,255,0.6)',
                        maxWidth: 600,
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 300,
                    }}>
                        Looking for reliable home builders and developers in Trivandrum? The team at G5 Homes is here to help. Our team is committed to delivering personalized service, transparent communication, and expert guidance throughout every stage of your project.
                    </p>
                </div>
            </section>

            {/* ── MARQUEE ── */}
            <div style={{ background: `linear-gradient(90deg,${C.navy},${C.navyMid},${C.navy})`, padding: '13px 0', overflow: 'hidden', borderTop: `1px solid rgba(201,168,76,0.2)`, borderBottom: `1px solid rgba(201,168,76,0.2)` }}>
                <div className="marquee-inner">
                    {[...Array(2)].map((_, r) => (
                        ['Free Consultation', '◆', 'Custom Homes', '◆', 'Luxury Villas', '◆', 'Interior Design', '◆', 'Smart Homes', '◆', 'Trivandrum', '◆', 'Kerala', '◆', 'RERA Registered', '◆'].map((t, i) => (
                            <span key={`${r}-${i}`} style={{ marginRight: 48, fontSize: 11, letterSpacing: 3, color: t === '◆' ? C.gold : 'rgba(255,255,255,0.45)', fontWeight: t === '◆' ? 700 : 400, textTransform: 'uppercase', whiteSpace: 'nowrap', fontFamily: "'Inter', sans-serif" }}>{t}</span>
                        ))
                    ))}
                </div>
            </div>

            {/* ── CONTACT INFO CARDS ── */}
            <section className="contact-section" style={{ padding: '100px 60px', background: C.white, position: 'relative', overflow: 'hidden' }}>
                <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                    <div ref={ref('infoHeader')} style={{ textAlign: 'center', marginBottom: 60, ...fadeUp('infoHeader') }}>
                        <div style={{ fontSize: 10, letterSpacing: 6, color: C.red, textTransform: 'uppercase', marginBottom: 14, fontWeight: 700, fontFamily: "'Inter', sans-serif", background: 'rgba(192,41,42,0.07)', display: 'inline-block', padding: '5px 16px', borderRadius: 30 }}>Reach Us</div>
                        <h2 style={{ fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 700, color: C.navy, fontFamily: "'Playfair Display', serif", marginTop: 16 }}>
                            Contact <span style={{ fontStyle: 'italic', color: C.red, fontWeight: 400 }}>Information</span>
                        </h2>
                        <div style={{ width: 60, height: 3, background: `linear-gradient(90deg,${C.red},${C.gold})`, borderRadius: 2, margin: '20px auto 0' }} />
                    </div>

                    <div className="contact-info-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
                        {contactInfo.map((info, idx) => (
                            <div
                                key={idx}
                                ref={ref(`info${idx}`)}
                                className="info-card"
                                onMouseEnter={() => setHoveredInfo(idx)}
                                onMouseLeave={() => setHoveredInfo(null)}
                                style={{
                                    ...scaleIn(`info${idx}`, idx * 0.1),
                                    background: hoveredInfo === idx ? C.navy : C.offWhite,
                                    borderRadius: 24,
                                    padding: '36px 28px',
                                    textAlign: 'center',
                                    border: `1px solid ${hoveredInfo === idx ? C.navy : 'rgba(14,27,77,0.08)'}`,
                                    boxShadow: hoveredInfo === idx ? '0 24px 48px rgba(10,21,53,0.2)' : '0 8px 24px rgba(10,21,53,0.04)',
                                    cursor: 'default',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${C.red},${C.gold})`, transform: hoveredInfo === idx ? 'scaleX(1)' : 'scaleX(0)', transition: 'transform 0.4s ease', transformOrigin: 'left' }} />
                                <div style={{ fontSize: '2.5rem', marginBottom: 18 }}>{info.icon}</div>
                                <div style={{ fontSize: 10, letterSpacing: 3, color: hoveredInfo === idx ? C.gold : C.red, textTransform: 'uppercase', fontWeight: 700, marginBottom: 10, fontFamily: "'Inter', sans-serif" }}>{info.label}</div>
                                <div style={{ fontSize: 14, fontWeight: 600, color: hoveredInfo === idx ? C.white : C.navy, fontFamily: "'Inter', sans-serif", marginBottom: 6, lineHeight: 1.4 }}>{info.value}</div>
                                <div style={{ fontSize: 11.5, color: hoveredInfo === idx ? 'rgba(255,255,255,0.5)' : C.midGray, fontFamily: "'Inter', sans-serif" }}>{info.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── MAIN FORM + SERVICES LIST (UPDATED WITH VALIDATION) ── */}
            <section className="contact-section" style={{ padding: '100px 60px', background: C.offWhite, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(14,27,77,0.04) 1px, transparent 0)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />

                <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <div className="contact-main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>

                        {/* Left: Services we help with */}
                        <div ref={ref('servicesLeft')} style={slideLeft('servicesLeft')}>
                            <div style={{ fontSize: 10, letterSpacing: 6, color: C.red, textTransform: 'uppercase', marginBottom: 14, fontWeight: 700, fontFamily: "'Inter', sans-serif", background: 'rgba(192,41,42,0.07)', display: 'inline-block', padding: '5px 16px', borderRadius: 30 }}>What We Help With</div>
                            <h2 style={{ fontSize: 'clamp(1.8rem,3.2vw,2.6rem)', fontWeight: 700, color: C.navy, fontFamily: "'Playfair Display', serif", lineHeight: 1.2, marginTop: 18, marginBottom: 22 }}>
                                Contact us<br /><span style={{ fontStyle: 'italic', color: C.red, fontWeight: 400 }}>today for:</span>
                            </h2>
                            <div style={{ width: 60, height: 3, background: `linear-gradient(90deg,${C.red},${C.gold})`, borderRadius: 2, marginBottom: 32 }} />

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 44 }}>
                                {servicesList.map((service, i) => (
                                    <div key={i} style={{
                                        display: 'flex', gap: 16, alignItems: 'center',
                                        background: C.white, borderRadius: 14, padding: '16px 20px',
                                        border: '1px solid rgba(14,27,77,0.07)',
                                        boxShadow: '0 4px 16px rgba(10,21,53,0.03)',
                                        transition: 'all 0.35s ease',
                                    }}
                                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(6px)'; e.currentTarget.style.borderColor = 'rgba(192,41,42,0.2)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(10,21,53,0.08)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.borderColor = 'rgba(14,27,77,0.07)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(10,21,53,0.03)'; }}
                                    >
                                        <div style={{ width: 32, height: 32, background: `linear-gradient(135deg,${C.red},${C.redDark})`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <div style={{ width: 8, height: 8, background: C.white, borderRadius: '50%' }} />
                                        </div>
                                        <span style={{ fontSize: 13.5, color: '#4A5270', fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>{service}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Quote block */}
                            <div style={{
                                background: C.navy, borderRadius: 20, padding: '32px 28px',
                                position: 'relative', overflow: 'hidden',
                                border: `1px solid rgba(201,168,76,0.15)`
                            }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${C.red},${C.gold})` }} />
                                <div style={{ fontSize: '2.5rem', color: C.gold, opacity: 0.3, fontFamily: "'Playfair Display', serif", lineHeight: 1, marginBottom: -10 }}>"</div>
                                <p style={{ fontSize: 14.5, fontStyle: 'italic', color: 'rgba(255,255,255,0.8)', lineHeight: 1.85, fontFamily: "'Playfair Display', serif" }}>
                                    Let's build your dream with one of the most reliable home builders and developers in Kerala.
                                </p>
                                <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ width: 40, height: 40, background: `linear-gradient(135deg,${C.red},${C.gold})`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: C.white, fontSize: 16 }}>G</div>
                                    <div>
                                        <div style={{ fontSize: 12, fontWeight: 600, color: C.white, fontFamily: "'Inter', sans-serif" }}>G5 Homes Team</div>
                                        <div style={{ fontSize: 11, color: C.gold, fontFamily: "'Inter', sans-serif" }}>Trivandrum, Kerala</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Updated Form with Validation */}
                        <div ref={ref('formRight')} style={slideRight('formRight')}>
                            <div style={{
                                background: C.white, borderRadius: 28, padding: '48px 44px',
                                boxShadow: '0 24px 80px rgba(10,21,53,0.09)',
                                border: '1px solid rgba(14,27,77,0.08)',
                                position: 'relative', overflow: 'hidden'
                            }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg,${C.red},${C.gold},${C.red})` }} />

                                {submitted ? (
                                    <div className="success-msg" style={{ textAlign: 'center', padding: '60px 0' }}>
                                        <div style={{ fontSize: '4rem', marginBottom: 20 }}>✅</div>
                                        <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: C.navy, fontFamily: "'Playfair Display', serif", marginBottom: 14 }}>Message Sent!</h3>
                                        <p style={{ fontSize: 14, color: '#6A7290', lineHeight: 1.85, fontFamily: "'Inter', sans-serif" }}>
                                            Thank you for reaching out. Our team will contact you within 24 hours with personalized guidance.
                                        </p>
                                        <div style={{ width: 60, height: 3, background: `linear-gradient(90deg,${C.red},${C.gold})`, borderRadius: 2, margin: '24px auto 0' }} />
                                    </div>
                                ) : (
                                    <>
                                        <h3 style={{ fontSize: '1.7rem', fontWeight: 700, color: C.navy, fontFamily: "'Playfair Display', serif", marginBottom: 6 }}>Send an Inquiry</h3>
                                        <p style={{ fontSize: 13, color: C.midGray, marginBottom: 32, fontFamily: "'Inter', sans-serif" }}>We'll respond within 24 hours with expert guidance.</p>

                                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                                <div>
                                                    <label style={{ fontSize: 11, fontWeight: 600, color: '#4A5270', letterSpacing: 1, textTransform: 'uppercase', fontFamily: "'Inter', sans-serif", display: 'block', marginBottom: 6 }}>Full Name *</label>
                                                    <input
                                                        placeholder="Your full name"
                                                        value={formData.name}
                                                        onChange={handleNameChange}
                                                        onBlur={() => handleBlur('name')}
                                                        onFocus={() => setFormFocus('name')}
                                                        required
                                                        style={inputStyle('name')}
                                                    />
                                                    <ErrorMsg msg={touched.name && errors.name} />
                                                </div>
                                                <div>
                                                    <label style={{ fontSize: 11, fontWeight: 600, color: '#4A5270', letterSpacing: 1, textTransform: 'uppercase', fontFamily: "'Inter', sans-serif", display: 'block', marginBottom: 6 }}>Email *</label>
                                                    <input
                                                        type="email"
                                                        placeholder="your@email.com"
                                                        value={formData.email}
                                                        onChange={handleEmailChange}
                                                        onBlur={() => handleBlur('email')}
                                                        onFocus={() => setFormFocus('email')}
                                                        required
                                                        style={inputStyle('email')}
                                                    />
                                                    <ErrorMsg msg={touched.email && errors.email} />
                                                </div>
                                            </div>

                                            <div>
                                                <label style={{ fontSize: 11, fontWeight: 600, color: '#4A5270', letterSpacing: 1, textTransform: 'uppercase', fontFamily: "'Inter', sans-serif", display: 'block', marginBottom: 6 }}>Phone Number *</label>
                                                <input
                                                    placeholder="10-digit mobile number"
                                                    value={formData.phone}
                                                    onChange={handlePhoneChange}
                                                    onBlur={() => handleBlur('phone')}
                                                    onFocus={() => setFormFocus('phone')}
                                                    inputMode="numeric"
                                                    maxLength={10}
                                                    required
                                                    style={inputStyle('phone')}
                                                />
                                                <ErrorMsg msg={touched.phone && errors.phone} />
                                            </div>

                                            <div>
                                                <label style={{ fontSize: 11, fontWeight: 600, color: '#4A5270', letterSpacing: 1, textTransform: 'uppercase', fontFamily: "'Inter', sans-serif", display: 'block', marginBottom: 6 }}>Service Interested In</label>
                                                <select
                                                    value={formData.service}
                                                    onChange={e => setFormData({ ...formData, service: e.target.value })}
                                                    onFocus={() => setFormFocus('service')}
                                                    onBlur={() => setFormFocus('')}
                                                    style={inputStyle('service')}
                                                >
                                                    <option value="">Select a service</option>
                                                    <option value="custom-home">Custom Home Construction</option>
                                                    <option value="luxury-villa">Luxury Villa Planning & Design</option>
                                                    <option value="interior">Interior Design & Landscaping</option>
                                                    <option value="cost-estimate">Construction Cost Estimation</option>
                                                    <option value="turnkey">Turnkey Home Construction</option>
                                                    <option value="smart-home">Smart & Sustainable Home Development</option>
                                                    <option value="renovation">Renovation Home</option>
                                                </select>
                                            </div>

                                            <button
                                                type="submit"
                                                style={{
                                                    padding: '17px', fontSize: 11, width: '100%',
                                                    borderRadius: 40, marginTop: 4, border: 'none',
                                                    cursor: 'pointer', color: C.white,
                                                    background: `linear-gradient(135deg,${C.red},${C.redDark})`,
                                                    fontFamily: "'Inter', sans-serif", fontWeight: 600,
                                                    letterSpacing: 2.5, textTransform: 'uppercase',
                                                    transition: 'all 0.4s ease',
                                                    boxShadow: `0 8px 24px rgba(192,41,42,0.3)`,
                                                }}
                                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 36px rgba(192,41,42,0.4)'; }}
                                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 24px rgba(192,41,42,0.3)`; }}
                                            >
                                                Send Inquiry →
                                            </button>

                                            <p style={{ fontSize: 11, color: C.midGray, textAlign: 'center', letterSpacing: 0.5, fontFamily: "'Inter', sans-serif", marginTop: 4 }}>
                                                🔒 Your information is kept strictly confidential
                                            </p>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── WHY CONTACT US ── */}
            <section className="contact-section" style={{ padding: '100px 60px', background: C.white, position: 'relative', overflow: 'hidden' }}>
                <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                    <div ref={ref('whyHeader')} style={{ textAlign: 'center', marginBottom: 60, ...fadeUp('whyHeader') }}>
                        <div style={{ fontSize: 10, letterSpacing: 6, color: C.red, textTransform: 'uppercase', marginBottom: 14, fontWeight: 700, fontFamily: "'Inter', sans-serif", background: 'rgba(192,41,42,0.07)', display: 'inline-block', padding: '5px 16px', borderRadius: 30 }}>Why Choose Us</div>
                        <h2 style={{ fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 700, color: C.navy, fontFamily: "'Playfair Display', serif", marginTop: 16 }}>
                            The G5 Homes <span style={{ fontStyle: 'italic', color: C.red, fontWeight: 400 }}>Experience</span>
                        </h2>
                        <div style={{ width: 60, height: 3, background: `linear-gradient(90deg,${C.red},${C.gold})`, borderRadius: 2, margin: '20px auto 0' }} />
                    </div>

                    <div className="why-grid-contact" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
                        {whyContactUs.map((item, idx) => (
                            <div
                                key={idx}
                                ref={ref(`why${idx}`)}
                                className="why-card"
                                onMouseEnter={() => setHoveredWhy(idx)}
                                onMouseLeave={() => setHoveredWhy(null)}
                                style={{
                                    ...scaleIn(`why${idx}`, idx * 0.1),
                                    background: hoveredWhy === idx ? C.navy : C.offWhite,
                                    borderRadius: 24,
                                    padding: '36px 28px',
                                    textAlign: 'center',
                                    border: `1px solid ${hoveredWhy === idx ? C.navy : 'rgba(14,27,77,0.08)'}`,
                                    boxShadow: hoveredWhy === idx ? '0 24px 48px rgba(10,21,53,0.18)' : '0 8px 24px rgba(10,21,53,0.04)',
                                    cursor: 'default',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${C.red},${C.gold})`, transform: hoveredWhy === idx ? 'scaleX(1)' : 'scaleX(0)', transition: 'transform 0.4s ease', transformOrigin: 'center' }} />
                                <div style={{
                                    width: 60, height: 60,
                                    background: hoveredWhy === idx ? `linear-gradient(135deg,${C.red},${C.redDark})` : `rgba(192,41,42,0.08)`,
                                    borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.8rem', margin: '0 auto 22px',
                                    transition: 'all 0.4s ease',
                                    boxShadow: hoveredWhy === idx ? `0 8px 20px rgba(192,41,42,0.3)` : 'none',
                                }}>
                                    {item.icon}
                                </div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: hoveredWhy === idx ? C.white : C.navy, fontFamily: "'Playfair Display', serif", marginBottom: 12 }}>{item.title}</h4>
                                <p style={{ fontSize: 13, lineHeight: 1.75, color: hoveredWhy === idx ? 'rgba(255,255,255,0.6)' : '#6A7290', fontFamily: "'Inter', sans-serif", transition: 'color 0.3s ease' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA BAND ── */}
            <section style={{
                background: `linear-gradient(135deg,${C.red} 0%,${C.redDark} 50%,${C.navy} 100%)`,
                padding: '80px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden'
            }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ fontSize: 10, letterSpacing: 6, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: 14, fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>Building Smart, Sustainable Spaces</div>
                    <h2 style={{ fontSize: 'clamp(2rem,4.5vw,3.2rem)', fontWeight: 600, color: C.white, marginBottom: 14, fontFamily: "'Playfair Display', serif" }}>
                        G5 Homes — <em style={{ fontWeight: 300 }}>Your Dream Home Awaits</em>
                    </h2>
                    <div style={{ width: 48, height: 1, background: `linear-gradient(90deg,transparent,${C.gold},transparent)`, margin: '16px auto 28px' }} />
                    <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', maxWidth: 500, margin: '0 auto 44px', lineHeight: 1.8, fontFamily: "'Inter', sans-serif" }}>
                        Join 200+ happy families who built their dream home with G5 Homes across Kerala.
                    </p>
                    <div style={{ display: 'flex', gap: 18, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="/about" style={{
                            padding: '17px 52px', fontSize: 11, borderRadius: 40,
                            background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.4)',
                            color: C.white, textDecoration: 'none', fontFamily: "'Inter', sans-serif",
                            fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase',
                            border: '1.5px solid rgba(255,255,255,0.4)',
                            transition: 'all 0.35s ease', display: 'inline-flex', alignItems: 'center'
                        }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
                            About Us
                        </a>
                        <a href="/" style={{
                            padding: '17px 52px', fontSize: 11, borderRadius: 40,
                            border: 'none', background: C.white, color: C.red,
                            cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontWeight: 600,
                            letterSpacing: 2, textTransform: 'uppercase', transition: 'all 0.35s ease',
                            display: 'inline-flex', alignItems: 'center', textDecoration: 'none'
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.2)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            Back to Home
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}