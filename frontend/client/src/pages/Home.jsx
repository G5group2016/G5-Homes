import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import hero1 from '../assets/villaa.webp';
import hero2 from '../assets/pexels-deepak-dk-197763-4933643.webp';
import hero3 from '../assets/apartment-ghomes.webp';
import hero4 from '../assets/interior.webp';
import custom1 from '../assets/custom2.webp';
import luxvilla from '../assets/luxvilla.webp';
import smart from '../assets/smarthome.webp';
import interior from '../assets/interiors.webp';
import abouthome from '../assets/abouthome.webp';

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

// ── DESIGN TOKENS ──────────────────────────────────────────────
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

// ── DATA ───────────────────────────────────────────────────────

// New "What We Offer" Services Data
const services = [
    {
        icon: '🏠',
        title: 'Residential Home Construction',
        desc: "We build modern, functional, and aesthetically refined homes that match your vision and lifestyle.",
        features: ['Custom Designs', 'Quality Materials', 'Timely Delivery']
    },
    {
        icon: '🏛️',
        title: 'Luxury Villa Construction',
        desc: "As premium villa builders in Kerala, we create elegant villas with contemporary design, spacious layouts, and premium finishes.",
        features: ['Premium Locations', 'Smart Layouts', 'Luxury Finishes']
    },
    {
        icon: '📐',
        title: 'Architecture & Planning',
        desc: "Our creative architects and planners develop smart, practical, and visually striking designs for residential and commercial projects.",
        features: ['3D Visualization', 'Vastu Compliance', 'Sustainable Design']
    },
    {
        icon: '🛋️',
        title: 'Interior Design Solutions',
        desc: "Recognized among top interior designers in Trivandrum, we create stylish and comfortable interiors that enhance everyday living.",
        features: ['Modular Kitchens', 'Smart Storage', 'Aesthetic Lighting']
    },
    {
        icon: '🔧',
        title: 'Turnkey Construction Projects',
        desc: "From concept to completion, our turnkey construction services ensure a seamless and stress-free building experience.",
        features: ['Project Management', 'Quality Assurance', 'Warranty Support']
    },
    {
        icon: '🌿',
        title: 'Landscaping & Outdoor Design',
        desc: "We design beautiful outdoor spaces, gardens, patios, and recreational landscapes that complement modern homes.",
        features: ['Eco-Friendly', 'Low Maintenance', 'Aesthetic Appeal']
    }
];

// Projects Data
const projectsData = [
    {
        title: 'Custom Family Homes',
        icon: '🏡',
        desc: 'Tailored to your unique lifestyle and family needs.',
        image: custom1
    },
    {
        title: 'Luxury Villas',
        icon: '🏰',
        desc: 'Elegant living spaces with premium finishes and design.',
        image: luxvilla
    },
    {
        title: 'Smart & Sustainable Homes',
        icon: '⚡',
        desc: 'Energy-efficient homes with modern smart technology.',
        image: smart
    },
    {
        title: 'Interior & Landscape Projects',
        icon: '🌺',
        desc: 'Beautiful interiors and outdoor spaces that inspire.',
        image: interior
    }
];

// Why Choose G5 - 6 Key Points
const whyChoosePoints = [
    {
        title: 'Complete Design & Build Solutions',
        desc: 'We provide end-to-end home construction services including architectural planning, construction, interior design, project management, and landscaping.',
        icon: '🎯'
    },
    {
        title: 'Premium Quality Construction',
        desc: 'Our experienced engineers and creative architects ensure superior workmanship, durable materials, and modern construction standards.',
        icon: '🏗️'
    },
    {
        title: 'Custom Home Builders in Trivandrum',
        desc: 'Every family is unique, and every home should reflect that. We specialize in custom home construction tailored to your lifestyle, design preferences, and future needs.',
        icon: '🔨'
    },
    {
        title: 'Transparent Pricing & Timely Delivery',
        desc: 'We maintain complete transparency throughout the construction process with clear project planning, accurate cost estimation, and on-time project completion.',
        icon: '💰'
    },
    {
        title: 'Smart & Sustainable Homes',
        desc: 'As eco-friendly home builders, we integrate sustainable construction methods, energy-efficient planning, natural ventilation, and smart technology solutions.',
        icon: '🌱'
    },
    {
        title: 'Luxury Villas & Premium Living Spaces',
        desc: 'From elegant villas to modern premium residences, G5 Homes creates refined living environments with contemporary architecture and timeless aesthetics.',
        icon: '✨'
    }
];

const stats = [
    { value: '200+', label: 'Projects Completed', icon: '🏛' },
    { value: '100%', label: 'Professional', icon: '⭐' },
    { value: '6+', label: 'Years of Excellence', icon: '🏆' },
    { value: '100%', label: 'Satisfied Clients', icon: '💎' },
];

const features = [
    { icon: '◈', title: 'Premium Listings', desc: "Curated luxury villas, apartments, and commercial spaces across Kerala's finest coastal and city locations." },
    { icon: '⬡', title: 'Expert Agents', desc: 'Our certified agents bring decades of Kerala market expertise to every property transaction.' },
    { icon: '◉', title: 'Secure Transactions', desc: 'End-to-end verified deals with legal support and transparent pricing. No hidden fees, ever.' },
    { icon: '⬢', title: 'Virtual Tours', desc: 'Explore Kerala properties from anywhere with our immersive 3D walkthrough technology.' },
];

const heroSlides = [
    { id: 1, title: 'Strong Structures Strong Trust', subtitle: "Build Your Dream Home with G5 Homes ", description: "G5 Homes is a reputed home construction company in Trivandrum, Kerala, offering well-designed residential and commercial spaces. As one of the best home builders and developers in Trivandrum, we specialize in custom home construction, premium villa projects, interior design, and turnkey residential solutions across Kerala.", ctaText: 'View Apartments', img: hero3, color: C.offWhite },
    { id: 2, title: 'Premium Homes & Apartments', subtitle: 'Creating Spaces Families Love', description: "G5 Homes develops premium homes and modern apartments with contemporary architecture, sustainable construction, and thoughtfully designed living spaces for modern families in Kerala.", ctaText: 'Discover Premium', img: hero2, color: C.offWhite },
    { id: 3, title: 'Luxury Villas', subtitle: 'Elegant Villas Designed for Comfort and Class', description: "G5 Homes is one of the leading luxury villa builders in Kerala delivering elegant custom villas, contemporary designs, premium interiors, and high-quality residential craftsmanship.", ctaText: 'Explore Villas', img: hero1, color: C.offWhite },
    { id: 4, title: 'Interior & Outdoor Design', subtitle: "Designed to Elevate Every Space", description: "G5 Homes delivers premium interior and outdoor design solutions in Kerala, creating aesthetic living spaces, elegant landscapes, modern exteriors, and functional interiors tailored for comfort, beauty, and modern lifestyles.", ctaText: 'Explore Design', img: hero4, color: C.offWhite },
];

// Story Milestones
const storyMilestones = [
    { year: '2019', title: 'The Beginning', description: 'G5 Homes was founded with a vision to bring transparency and quality to home construction in Kerala.' },
    { year: '2021', title: 'First Major Project', description: 'Completed our flagship villa project in Kovalam, setting new standards for luxury living.' },
    { year: '2023', title: 'Expansion Across Kerala', description: 'Extended our services to Kochi, Thrissur, and Kozhikode, helping more families build their dreams.' },
    { year: '2025', title: 'Smart Homes Pioneer', description: 'Launched Kerala\'s first fully integrated smart home series, redefining modern living.' },
];

// Updated Testimonials Data
const clientTestimonials = [
    {
        name: 'Arun S.',
        role: 'Villa Owner, Trivandrum',
        text: 'Choosing G5 Homes for our villa construction project in Trivandrum was the best decision we made. Their team handled everything professionally — from architectural planning to interiors and final execution. The quality, transparency, and timely delivery truly make them one of the best home builders and developers in Trivandrum.',
        rating: 5
    },
    {
        name: 'Neethu & Rahul',
        role: 'Homeowners, Trivandrum',
        text: 'We wanted a modern yet affordable family home with smart design features, and G5 Homes exceeded our expectations. Their architects and construction team were highly supportive throughout the project. If you are looking for reliable custom home builders in Trivandrum, I would highly recommend G5 Homes.',
        rating: 5
    },
    {
        name: 'Dr. Vivek Menon',
        role: 'Property Owner, Kerala',
        text: 'G5 Homes transformed our vision into a beautiful luxury residence with elegant interiors and excellent outdoor landscaping. Their attention to detail, premium construction quality, and customer service stand out among premium home developers in Kerala.',
        rating: 5
    },
    {
        name: 'Anjali Krishnan',
        role: 'Homeowner, Trivandrum',
        text: 'We were searching for a professional home construction company that could deliver a sustainable and modern home within our budget. G5 Homes provided exceptional design, quality workmanship, and clear communication from start to finish. Truly one of the most trusted residential home builders in Kerala.',
        rating: 5
    }
];

// ── ANIMATED COUNTER ───────────────────────────────────────────
function AnimCounter({ target, inView }) {
    const [val, setVal] = useState(0);
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ''));
    const prefix = target.match(/^[^0-9]*/)?.[0] || '';
    const suffix = target.match(/[^0-9.]+$/)?.[0] || '';

    useEffect(() => {
        if (!inView) {
            setVal(0);
            return;
        }
        let start = 0;
        const dur = 1800;
        const step = 16;
        const inc = numeric / (dur / step);
        const t = setInterval(() => {
            start += inc;
            if (start >= numeric) {
                setVal(numeric);
                clearInterval(t);
            }
            else setVal(start);
        }, step);
        return () => clearInterval(t);
    }, [inView, numeric]);

    const display = numeric % 1 === 0 ? Math.round(val).toLocaleString() : val.toFixed(1);
    return <span>{prefix}{display}{suffix}</span>;
}

// ── MAIN COMPONENT ─────────────────────────────────────────────
export default function G5HomesPage() {
    const [scrolled, setScrolled] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [activeTest, setActiveTest] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [prevSlide, setPrevSlide] = useState(null);
    const [visible, setVisible] = useState({});
    const [hoveredMilestone, setHoveredMilestone] = useState(null);
    const [cursorActive, setCursorActive] = useState(false);
    // ── UPDATED formData state with validation ──
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', type: 'buy', message: '', service: '' });
    const [errors, setErrors] = useState({ name: "", email: "", phone: "" });
    const [touched, setTouched] = useState({ name: false, email: false, phone: false });
    const [statsInView, setStatsInView] = useState(false);
    const [heroAnimComplete, setHeroAnimComplete] = useState(false);
    const [hoveredService, setHoveredService] = useState(null);
    const [hoveredProject, setHoveredProject] = useState(null);
    const [hoveredWhy, setHoveredWhy] = useState(null);

    const sectionRefs = useRef({});
    const statsRef = useRef(null);
    const slideInterval = useRef(null);

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

    // Scroll
    useEffect(() => {
        const fn = () => { setScrolled(window.scrollY > 60); setScrollY(window.scrollY); };
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);

    // Intersection observer
    useEffect(() => {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) setVisible(v => ({ ...v, [e.target.dataset.id]: true }));
            });
        }, { threshold: 0.2 });
        Object.values(sectionRefs.current).forEach(el => el && obs.observe(el));
        return () => obs.disconnect();
    }, []);

    // Stats observer
    useEffect(() => {
        if (!statsRef.current) return;
        const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) setStatsInView(true); }, { threshold: 0.3 });
        obs.observe(statsRef.current);
        return () => obs.disconnect();
    }, []);

    // Slideshow
    const startSlide = useCallback(() => {
        if (slideInterval.current) clearInterval(slideInterval.current);
        slideInterval.current = setInterval(() => {
            setCurrentSlide(p => { setPrevSlide(p); return (p + 1) % heroSlides.length; });
        }, 5500);
    }, []);

    useEffect(() => { startSlide(); return () => clearInterval(slideInterval.current); }, [startSlide]);

    const goToSlide = i => {
        setPrevSlide(currentSlide);
        setCurrentSlide(i);
        startSlide();
    };

    // Testimonials
    useEffect(() => {
        const t = setInterval(() => setActiveTest(p => (p + 1) % clientTestimonials.length), 6000);
        return () => clearInterval(t);
    }, []);

    // Hero animation trigger
    useEffect(() => {
        const timer = setTimeout(() => setHeroAnimComplete(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    // Body scroll lock
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const ref = id => el => { if (el) { el.dataset.id = id; sectionRefs.current[id] = el; } };

    // Enhanced scroll animations
    const fadeUp = (id, delay = 0) => ({
        opacity: visible[id] ? 1 : 0,
        transform: visible[id] ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.96)',
        transition: `opacity 0.8s cubic-bezier(0.22, 0.85, 0.36, 1) ${delay}s, transform 0.8s cubic-bezier(0.22, 0.85, 0.36, 1) ${delay}s`,
    });

    const slideInLeft = (id, delay = 0) => ({
        opacity: visible[id] ? 1 : 0,
        transform: visible[id] ? 'translateX(0)' : 'translateX(-60px)',
        transition: `opacity 0.7s cubic-bezier(0.22, 0.85, 0.36, 1) ${delay}s, transform 0.7s cubic-bezier(0.22, 0.85, 0.36, 1) ${delay}s`,
    });

    const slideInRight = (id, delay = 0) => ({
        opacity: visible[id] ? 1 : 0,
        transform: visible[id] ? 'translateX(0)' : 'translateX(60px)',
        transition: `opacity 0.7s cubic-bezier(0.22, 0.85, 0.36, 1) ${delay}s, transform 0.7s cubic-bezier(0.22, 0.85, 0.36, 1) ${delay}s`,
    });

    const scaleIn = (id, delay = 0) => ({
        opacity: visible[id] ? 1 : 0,
        transform: visible[id] ? 'scale(1)' : 'scale(0.92)',
        transition: `opacity 0.6s cubic-bezier(0.22, 0.85, 0.36, 1) ${delay}s, transform 0.6s cubic-bezier(0.22, 0.85, 0.36, 1) ${delay}s`,
    });

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
                    service: formData.service || formData.type,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Submission failed");

            alert("Thank you! Our team will contact you within 24 hours.");
            setFormData({ name: "", email: "", phone: "", type: "buy", message: "", service: "" });
            setErrors({ name: "", email: "", phone: "" });
            setTouched({ name: false, email: false, phone: false });
        } catch (err) {
            alert("Something went wrong: " + err.message);
        }
    };

    const slide = heroSlides[currentSlide];

    // Input style helper
    const inputStyle = (field) => ({
        width: '100%',
        padding: '15px 18px',
        borderRadius: 12,
        border: `1.5px solid ${errors[field] && touched[field] ? '#C0292A' : 'rgba(14,27,77,0.15)'}`,
        fontFamily: "'Inter', sans-serif",
        fontSize: 13.5,
        color: C.darkText,
        background: C.white,
        outline: 'none',
        transition: 'all 0.3s ease',
        boxShadow: errors[field] && touched[field] ? '0 0 0 3px rgba(192,41,42,0.1)' : 'none',
    });

    return (
        <div style={{ fontFamily: "'Inter', 'Poppins', sans-serif", background: C.white, color: C.darkText, overflowX: 'hidden' }}>

            {/* ── GLOBAL STYLES ── */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');

        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:#0A1535; }
        ::-webkit-scrollbar-thumb { background:linear-gradient(${C.red},${C.gold}); border-radius:2px; }

        /* Hero Text Entrance Animations */
        @keyframes slideFromLeft {
            0% { opacity: 0; transform: translateX(-70px); }
            100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideFromRight {
            0% { opacity: 0; transform: translateX(70px); }
            100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideFromTop {
            0% { opacity: 0; transform: translateY(-40px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeScaleIn {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
        }
        
        .hero-brand {
            animation: slideFromLeft 0.8s cubic-bezier(0.22, 0.85, 0.36, 1) forwards;
        }
        .hero-title {
            animation: slideFromRight 0.8s cubic-bezier(0.22, 0.85, 0.36, 1) 0.15s forwards;
            opacity: 0;
        }
        .hero-accent-line {
            animation: slideFromTop 0.6s cubic-bezier(0.22, 0.85, 0.36, 1) 0.35s forwards;
            opacity: 0;
        }
        .hero-subtitle {
            animation: slideFromLeft 0.7s cubic-bezier(0.22, 0.85, 0.36, 1) 0.5s forwards;
            opacity: 0;
        }
        .hero-description {
            animation: fadeScaleIn 0.8s cubic-bezier(0.22, 0.85, 0.36, 1) 0.7s forwards;
            opacity: 0;
        }
        .hero-buttons-container {
            animation: slideFromRight 0.7s cubic-bezier(0.22, 0.85, 0.36, 1) 0.9s forwards;
            opacity: 0;
        }

        /* Premium Button Styles */
        .btn-premium {
          background:linear-gradient(135deg,${C.red},${C.redDark});
          color:${C.white}; border:none; cursor:pointer;
          font-family:'Inter',sans-serif; font-weight:600; letter-spacing:2px; text-transform:uppercase;
          transition:all 0.4s cubic-bezier(0.22,1,0.36,1);
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          text-decoration:none; position:relative; overflow:hidden;
          border-radius:40px;
        }
        .btn-premium::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,${C.gold},${C.goldLight});
          opacity:0; transition:opacity 0.4s ease;
          border-radius:40px;
        }
        .btn-premium:hover::before { opacity:0.15; }
        .btn-premium:hover { transform:translateY(-3px); box-shadow:0 20px 35px rgba(192,41,42,0.35); }

        .btn-outline-premium {
          background:transparent; color:${C.white};
          border:1.5px solid rgba(255,255,255,0.5);
          cursor:pointer; font-family:'Inter',sans-serif; font-weight:500; letter-spacing:2px; text-transform:uppercase;
          transition:all 0.4s cubic-bezier(0.22,1,0.36,1);
          display:inline-flex; align-items:center; justify-content:center;
          text-decoration:none; backdrop-filter:blur(8px);
          border-radius:40px;
        }
        .btn-outline-premium:hover { background:rgba(255,255,255,0.15); border-color:${C.white}; transform:translateY(-3px); }

        /* HERO SLIDES */
        .hero-bg {
          position:absolute; inset:0;
          background-size:cover; background-position:center 30%;
          opacity:0; transition:opacity 1.2s cubic-bezier(0.4,0,0.2,1), transform 8s ease;
          transform:scale(1.02);
        }
        .hero-bg.entering { opacity:1; transform:scale(1); }
        .hero-bg.leaving  { opacity:0; transform:scale(1.06); }

        /* Story Timeline Cards */
        .milestone-card {
          background:${C.white};
          border-radius:16px;
          padding:28px 24px;
          position:relative;
          transition:all 0.45s cubic-bezier(0.22,1,0.36,1);
          cursor:default;
          border:1px solid rgba(14,27,77,0.08);
          box-shadow:0 10px 30px rgba(10,21,53,0.02);
        }
        .milestone-card:hover {
          transform:translateY(-8px);
          box-shadow:0 32px 48px -20px rgba(10,21,53,0.16);
          border-color:rgba(201,168,76,0.25);
        }

        /* FEATURE CARDS */
        .feat-card {
          padding:32px 28px; border:1px solid rgba(14,27,77,0.08); background:${C.white};
          border-radius:16px; cursor:default; position:relative; overflow:hidden;
          transition:all 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .feat-card:hover { transform:translateY(-6px); box-shadow:0 20px 40px rgba(10,21,53,0.08); border-color:rgba(192,41,42,0.2); }

        /* LOCATION TILES */
        .loc-tile {
          padding:28px 16px; border:1px solid rgba(255,255,255,0.1);
          border-radius:12px; background:rgba(255,255,255,0.04);
          text-align:center; cursor:pointer; transition:all 0.4s ease;
        }
        .loc-tile:hover { transform:translateY(-5px); background:rgba(255,255,255,0.08); border-color:${C.red}; }

        /* MARQUEE */
        @keyframes marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        .marquee-inner { display:flex; animation:marquee 30s linear infinite; width:max-content; }
        .marquee-inner:hover { animation-play-state:paused; }

        /* SCROLL INDICATOR */
        @keyframes scrollBob { 0%,100% { transform:translateY(0); } 50% { transform:translateY(8px); } }
        .scroll-bob { animation:scrollBob 2s ease-in-out infinite; }

        /* New Card Animations */
        @keyframes shine {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
        }
        .service-card, .project-card, .why-card {
            transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .service-card:hover, .project-card:hover, .why-card:hover {
            transform: translateY(-12px);
        }
        .gradient-border {
            position: relative;
            background: linear-gradient(135deg, ${C.white}, ${C.offWhite});
        }
        .gradient-border::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 24px;
            padding: 1.5px;
            background: linear-gradient(135deg, ${C.red}, ${C.gold}, ${C.red});
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.4s ease;
        }
        .gradient-border:hover::before {
            opacity: 1;
        }

        /* RESPONSIVE */
        @media (max-width:1024px) {
            .hero-content-wrap {
                top: 120px !important;
                bottom: auto !important;
                padding: 0 40px !important;
                min-height: calc(100vh - 120px) !important;
                justify-content: center !important;
            }
            .hero-main-title { max-width: 90% !important; }
            .stats-grid { grid-template-columns:repeat(2,1fr) !important; }
            .milestones-grid { grid-template-columns:repeat(2,1fr) !important; gap:24px !important; }
            .services-grid { grid-template-columns:repeat(2,1fr) !important; }
            .why-grid-new { grid-template-columns:repeat(2,1fr) !important; gap:32px !important; }
        }

        @media (max-width:768px) {
            .hero-content-wrap {
                top: 110px !important;
                padding: 0 24px !important;
                min-height: calc(100vh - 110px) !important;
            }
            .hero-main-title {
                font-size: clamp(2.6rem, 10vw, 4rem) !important;
                line-height: 1.12 !important;
                max-width: 100% !important;
            }
            .hero-subtitle, .hero-content-wrap p { max-width: 100% !important; }
            .hero-ctas { width: 100%; flex-direction: column; align-items: stretch !important; }
            .hero-ctas a { width: 100%; justify-content: center; }
            .milestones-grid { grid-template-columns:1fr !important; gap:20px !important; }
            .story-image { display: none !important; }
            .story-grid { grid-template-columns: 1fr !important; }
            .services-grid { grid-template-columns:1fr !important; }
            .projects-grid { grid-template-columns:1fr !important; gap:24px !important; }
            .why-grid-new { grid-template-columns:1fr !important; }
        }

        @media (max-width:960px) {
            .why-grid { grid-template-columns:1fr !important; gap:56px !important; }
            .contact-grid { grid-template-columns:1fr !important; gap:52px !important; }
            .footer-grid { grid-template-columns:1fr 1fr !important; gap:40px !important; }
            .hero-content-wrap { padding-left: 32px !important; padding-right: 32px !important; }
        }
        @media (max-width:640px) {
            .g5-section { padding: 80px 24px !important; }
            .features-grid { grid-template-columns:1fr !important; }
            .loc-grid { grid-template-columns:repeat(2,1fr) !important; }
            .hero-main-title { font-size: clamp(2.5rem, 10vw, 3.5rem) !important; max-width:100% !important; }
            .hero-ctas { flex-direction:column; width:100%; align-items:stretch !important; }
            .hero-ctas a { text-align:center; }
            .story-highlight { flex-direction:column !important; text-align:center !important; gap:20px !important; }
            .stats-grid { grid-template-columns:1fr !important; }
        }
        
        /* ===== CRITICAL 320px SPECIFIC FIXES ===== */
        @media (max-width: 380px) {
            /* Section padding overrides */
            section:not(.g5-hero) {
                padding-left: 16px !important;
                padding-right: 16px !important;
            }
            .g5-section {
                padding-left: 16px !important;
                padding-right: 16px !important;
            }
            
            /* Hero section tight padding */
            .hero-content-wrap {
                padding: 0 16px !important;
                top: 90px !important;
                min-height: calc(100vh - 90px) !important;
            }
            .hero-main-title {
                font-size: clamp(1.8rem, 9vw, 2.5rem) !important;
                max-width: 100% !important;
            }
            .hero-subtitle {
                font-size: 0.85rem !important;
            }
            .hero-description {
                font-size: 12px !important;
                line-height: 1.6 !important;
                max-width: 100% !important;
            }
            .hero-buttons-container {
                flex-direction: column;
                width: 100%;
                gap: 12px !important;
            }
            .hero-buttons-container a {
                width: 100%;
                text-align: center;
                padding: 12px 20px !important;
                min-width: unset !important;
            }
            
            /* Stats grid 1 column */
            .stats-grid {
                grid-template-columns: 1fr !important;
                gap: 0 !important;
            }
            .stats-grid > div {
                border-right: none !important;
                border-bottom: 1px solid rgba(255,255,255,0.08);
                padding: 32px 16px !important;
            }
            .stat-val {
                font-size: 1.8rem !important;
            }
            
            /* Services grid */
            .services-grid {
                gap: 20px !important;
            }
            .service-card {
                padding: 0 !important;
            }
            .service-card > div:first-child {
                padding: 24px 20px 0 20px !important;
            }
            .service-card h3 {
                font-size: 1.2rem !important;
            }
            
            /* Projects grid - single column cards */
            .projects-grid {
                gap: 20px !important;
            }
            .project-card {
                margin: 0 !important;
            }
            .project-card > div:first-child {
                height: 180px !important;
            }
            
            /* Why choose grid */
            .why-grid-new {
                gap: 20px !important;
            }
            .why-card {
                padding: 24px 20px !important;
            }
            .why-card h3 {
                font-size: 1rem !important;
            }
            
            /* Contact section */
            .contact-grid {
                gap: 40px !important;
            }
            .contact-grid > div:last-child {
                padding: 32px 20px !important;
            }
            .contact-grid input,
            .contact-grid select,
            .contact-grid button {
                font-size: 13px !important;
                padding: 12px 16px !important;
            }
            .contact-grid .btn-premium {
                padding: 12px !important;
            }
            
            /* Location tiles */
            .loc-grid {
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 10px !important;
            }
            .loc-tile {
                padding: 18px 8px !important;
            }
            .loc-tile div:first-child {
                font-size: 1.2rem !important;
                margin-bottom: 6px !important;
            }
            .loc-tile div:last-child {
                font-size: 10px !important;
            }
            
            /* Story section */
            .story-highlight {
                flex-direction: row !important;
                flex-wrap: wrap;
                justify-content: center !important;
                gap: 20px !important;
                padding: 16px 20px !important;
            }
            .story-highlight > div {
                flex: 1;
                min-width: 80px;
            }
            .story-highlight > div:not(:last-child) {
                border-right: 1px solid ${C.lightGray};
                padding-right: 20px;
            }
            
            /* Testimonials */
            .testimonial-text {
                font-size: 0.9rem !important;
                padding: 0 8px !important;
            }
            
            /* Footer adjustments (if Footer component exists) */
            .footer-grid {
                grid-template-columns: 1fr !important;
                gap: 30px !important;
                text-align: center !important;
            }
            
            /* CTA section */
            .cta-buttons {
                flex-direction: column !important;
                gap: 12px !important;
            }
            .cta-buttons a {
                width: 100% !important;
                text-align: center !important;
                padding: 12px 20px !important;
            }
            
            /* General text adjustments */
            h2 {
                font-size: clamp(1.6rem, 6vw, 2rem) !important;
            }
            .section-subtitle {
                font-size: 0.75rem !important;
            }
            p {
                font-size: 13px !important;
                line-height: 1.6 !important;
            }
            
            /* Marquee ticker */
            .marquee-inner span {
                font-size: 8px !important;
                letter-spacing: 2px !important;
                margin-right: 24px !important;
            }
            
            /* Scroll indicator - hide on very small to save space */
            .scroll-bob {
                display: none !important;
            }
            
            /* Slide indicators */
            .slide-indicators {
                bottom: 16px !important;
            }
            .slide-indicators button {
                width: 6px !important;
                height: 6px !important;
            }
            .slide-indicators button:first-child {
                width: 24px !important;
            }
        }

        @media (max-width: 320px) {
            /* Extreme edge case fine-tuning */
            .hero-main-title {
                font-size: 1.7rem !important;
            }
            .btn-premium, .btn-outline-premium {
                font-size: 9px !important;
                letter-spacing: 1.5px !important;
            }
            .story-highlight > div:not(:last-child) {
                border-right: none !important;
                padding-right: 0 !important;
            }
            .story-highlight {
                flex-direction: column !important;
                gap: 15px !important;
            }
            .story-highlight > div {
                border-bottom: 1px solid ${C.lightGray};
                padding-bottom: 12px;
            }
            .story-highlight > div:last-child {
                border-bottom: none;
                padding-bottom: 0;
            }
            .loc-grid {
                grid-template-columns: 1fr !important;
            }
            .why-card .why-number {
                width: 28px !important;
                height: 28px !important;
                font-size: 12px !important;
            }
            .service-card .service-icon {
                width: 50px !important;
                height: 50px !important;
                font-size: 2rem !important;
            }
        }
      `}</style>

            {/* Navbar Component */}
            <Navbar
                scrolled={scrolled}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                setCursorActive={setCursorActive}
            />

            {/* ══════════════════════════════════════════════════════════
          HERO SECTION - WITH ENTRANCE ANIMATIONS
      ══════════════════════════════════════════════════════════ */}
            <section className="g5-hero" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', background: C.navy, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start' }}>

                {/* Slide backgrounds */}
                {heroSlides.map((s, i) => (
                    <div key={s.id} className={`hero-bg ${i === currentSlide ? 'entering' : (i === prevSlide ? 'leaving' : '')}`}
                        style={{
                            backgroundImage: `url(${s.img})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center 30%',
                            transform: `translateY(${scrollY * 0.1}px) scale(${i === currentSlide ? 1 : 1.02})`
                        }} />
                ))}

                {/* Overlays */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,21,53,0.35) 0%, rgba(10,21,53,0.5) 50%, rgba(10,21,53,0.7) 100%)', zIndex: 1 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 40% at 30% 70%, rgba(192,41,42,0.08), transparent 70%)', zIndex: 1 }} />
                <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.03, backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

                {/* Hero Content with individual animations */}
                <div
                    className="hero-content-wrap"
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        zIndex: 2,
                        width: '100%',
                        top: scrolled ? 120 : 140,
                        bottom: 'auto',
                        padding: '0 60px 0 100px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        minHeight: 'calc(100vh - 140px)',
                    }}
                >
                    {/* Brand - G5 GROUP */}
                    <div className="hero-brand" style={{ marginBottom: 12, opacity: 0 }}>
                        <span style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(1rem, 2.2vw, 1.8rem)',
                            fontWeight: 500,
                            letterSpacing: '8px',
                            color: C.gold,
                            textTransform: 'uppercase',
                            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                        }}>
                            G5 HOMES
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="hero-main-title hero-title" style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(3rem, 7vw, 6rem)',
                        fontWeight: 700,
                        lineHeight: 1.05,
                        marginBottom: 0,
                        color: C.white,
                        letterSpacing: '-1px',
                        textShadow: '0 4px 30px rgba(0,0,0,0.25)',
                        maxWidth: '65vw',
                        opacity: 0,
                    }}>
                        {currentSlide === 0 ? (
                            <>
                                Strong Structures
                                <br />
                                Strong Trust
                            </>
                        ) : (
                            slide.title
                        )}
                    </h1>

                    {/* Red accent line */}
                    <div className="hero-accent-line" style={{
                        width: 70,
                        height: 3,
                        background: C.red,
                        margin: '22px 0 18px',
                        borderRadius: 2,
                        opacity: 0,
                    }} />

                    {/* Subtitle */}
                    <h3 className="hero-subtitle" style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 'clamp(1rem, 1.6vw, 1.3rem)',
                        fontWeight: 400,
                        fontStyle: 'italic',
                        color: slide.color,
                        marginBottom: 18,
                        letterSpacing: '0.5px',
                        opacity: 0.95,
                        maxWidth: '55vw',
                        opacity: 0,
                    }}>
                        {slide.subtitle}
                    </h3>

                    {/* Description */}
                    <p className="hero-description" style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 'clamp(13px, 1.3vw, 15px)',
                        fontWeight: 300,
                        lineHeight: 1.9,
                        color: 'rgba(255,255,255,0.85)',
                        maxWidth: '55vw',
                        marginBottom: 38,
                        letterSpacing: '0.3px',
                        opacity: 0,
                    }}>
                        {slide.description}
                    </p>

                    {/* CTA Buttons */}
                    <div className="hero-buttons-container" style={{
                        display: 'flex',
                        gap: 20,
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        opacity: 0,
                    }}>
                        <a
                            href="https://wa.me/9562100007?text=Hello%20G5%20Homes,%20I%20am%20interested%20in%20building%20my%20dream%20home.%20I%20would%20like%20to%20get%20a%20free%20consultation."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-premium"
                            style={{
                                padding: '16px 44px',
                                fontSize: 11,
                                minWidth: 180,
                                textDecoration: 'none',
                                color: C.white
                            }}
                        >
                            <span>Get Free Consultation</span>
                        </a>
                        <a href="#contact" className="btn-outline-premium" style={{
                            padding: '16px 44px',
                            fontSize: 11,
                            minWidth: 180,
                            textDecoration: 'none'
                        }}>
                            Start Your Dream Home
                        </a>
                    </div>
                </div>

                {/* Slide indicators */}
                <div style={{ position: 'absolute', bottom: 32, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 12, zIndex: 3 }}>
                    {heroSlides.map((_, i) => (
                        <button key={i} onClick={() => goToSlide(i)} style={{
                            width: i === currentSlide ? 48 : 8,
                            height: 8,
                            borderRadius: 20,
                            border: 'none',
                            cursor: 'pointer',
                            background: i === currentSlide ? `linear-gradient(90deg,${C.red},${C.gold})` : 'rgba(255,255,255,0.35)',
                            transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                        }} />
                    ))}
                </div>

                {/* Scroll indicator */}
                <div className="scroll-bob" style={{ position: 'absolute', bottom: 32, right: 48, zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.45 }}>
                    <span style={{ fontSize: 8, letterSpacing: 4, color: C.white, writingMode: 'vertical-rl', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif" }}>Scroll</span>
                    <div style={{ width: 1.5, height: 40, background: `linear-gradient(to bottom,${C.gold},transparent)` }} />
                </div>
            </section>

            {/* ── MARQUEE TICKER ── */}
            <div style={{ background: `linear-gradient(90deg,${C.navy},${C.navyMid},${C.navy})`, padding: '14px 0', overflow: 'hidden', borderTop: `1px solid rgba(201,168,76,0.2)`, borderBottom: `1px solid rgba(201,168,76,0.2)` }}>
                <div className="marquee-inner">
                    {[...Array(2)].map((_, r) => (
                        ['Premium Villas', '◆', 'Expert Agents', '◆', 'Transparency', '◆', 'Innovation', '◆', 'Luxury Properties', '◆', 'Est. 2019', '◆', 'Eco Friendly', '◆', 'Strong Structures, Stronger Trust', '◆'].map((t, i) => (
                            <span key={`${r}-${i}`} style={{ marginRight: 48, fontSize: 11, letterSpacing: 3, color: t === '◆' ? C.gold : 'rgba(255,255,255,0.5)', fontWeight: t === '◆' ? 700 : 400, textTransform: 'uppercase', whiteSpace: 'nowrap', fontFamily: "'Inter', sans-serif" }}>{t}</span>
                        ))
                    ))}
                </div>
            </div>

            {/* ══════════════════════════════════════════════════════════
          STATS SECTION
      ══════════════════════════════════════════════════════════ */}
            <section ref={statsRef} style={{ background: C.navy, padding: '0 60px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,transparent,${C.red} 20%,${C.gold} 50%,${C.red} 80%,transparent)` }} />

                <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', maxWidth: 1160, margin: '0 auto' }}>
                    {stats.map((s, i) => (
                        <div key={i} style={{
                            textAlign: 'center', padding: '52px 16px',
                            borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                            position: 'relative', cursor: 'default',
                            transition: 'background 0.4s ease',
                        }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                            <div style={{ fontSize: '1.6rem', marginBottom: 12, opacity: 0.6 }}>{s.icon}</div>
                            <div className="stat-val" style={{
                                fontSize: 'clamp(2rem,3.5vw,2.8rem)', fontWeight: 700, color: C.white, lineHeight: 1,
                                fontFamily: "'Playfair Display', serif", letterSpacing: '-1px',
                            }}>
                                <AnimCounter target={s.value} inView={statsInView} />
                            </div>
                            <div style={{ fontSize: 10, letterSpacing: 3, color: C.gold, marginTop: 10, textTransform: 'uppercase', fontWeight: 500, opacity: 0.8 }}>{s.label}</div>
                            <div style={{ position: 'absolute', bottom: 0, left: '25%', right: '25%', height: 1, background: `linear-gradient(90deg,transparent,${C.gold},transparent)`, opacity: statsInView ? 0.4 : 0, transition: `opacity 1s ease ${i * 0.2}s` }} />
                        </div>
                    ))}
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
          WHAT WE OFFER - SERVICES SECTION (REDESIGNED - ATTRACTIVE)
      ══════════════════════════════════════════════════════════ */}
            <section id="services" className="g5-section" style={{ padding: '110px 60px 40px', background: `linear-gradient(135deg, ${C.offWhite} 0%, ${C.white} 100%)`, position: 'relative', overflow: 'hidden' }}>
                {/* Animated Background Elements */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', overflow: 'hidden', pointerEvents: 'none' }}>
                    <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px', borderRadius: '50%', background: `radial-gradient(circle, rgba(192,41,42,0.05) 0%, transparent 70%)`, animation: 'pulse 8s ease-in-out infinite' }} />
                    <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '250px', height: '250px', borderRadius: '50%', background: `radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)`, animation: 'pulse 6s ease-in-out infinite reverse' }} />
                </div>
                <style>{`
                    @keyframes pulse {
                        0%, 100% { transform: scale(1); opacity: 0.5; }
                        50% { transform: scale(1.1); opacity: 0.8; }
                    }
                `}</style>

                <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <div ref={ref('servicesHeader')} style={{ textAlign: 'center', marginBottom: 64, ...fadeUp('servicesHeader') }}>
                        <div style={{
                            fontSize: 11,
                            letterSpacing: 8,
                            color: C.red,
                            textTransform: 'uppercase',
                            marginBottom: 14,
                            fontWeight: 700,
                            fontFamily: "'Inter', sans-serif",
                            display: 'inline-block',
                            padding: '4px 16px',
                            background: `rgba(192,41,42,0.08)`,
                            borderRadius: '30px'
                        }}>
                            What We Offer
                        </div>
                        <h2 style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 700, color: C.navy, lineHeight: 1.2, fontFamily: "'Playfair Display', serif", marginTop: 20 }}>
                            Our <span style={{ fontStyle: 'italic', color: C.red, fontWeight: 400 }}>Services</span>
                        </h2>
                        <div style={{ width: 80, height: 3, background: `linear-gradient(90deg,${C.red},${C.gold},${C.red})`, margin: '20px auto 0', borderRadius: 2 }} />
                        <p style={{ fontSize: 15, color: '#6A7290', maxWidth: 600, margin: '20px auto 0' }}>
                            Comprehensive construction and design solutions tailored to your unique needs
                        </p>
                    </div>

                    <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
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
                                    boxShadow: hoveredService === idx
                                        ? '0 30px 50px rgba(10,21,53,0.15)'
                                        : '0 15px 35px rgba(10,21,53,0.05)',
                                    transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                                    cursor: 'default',
                                    position: 'relative',
                                    border: `1px solid ${hoveredService === idx ? 'rgba(192,41,42,0.2)' : 'rgba(14,27,77,0.06)'}`,
                                }}
                            >
                                {/* Top Gradient Bar */}
                                <div style={{
                                    height: 4,
                                    background: `linear-gradient(90deg, ${C.red}, ${C.gold})`,
                                    transform: hoveredService === idx ? 'scaleX(1)' : 'scaleX(0)',
                                    transition: 'transform 0.5s ease',
                                    transformOrigin: 'left'
                                }} />

                                {/* Icon Container */}
                                <div style={{
                                    padding: '32px 28px 0 28px',
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        width: 70,
                                        height: 70,
                                        background: `linear-gradient(135deg, rgba(192,41,42,0.1), rgba(201,168,76,0.1))`,
                                        borderRadius: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: 24,
                                        transition: 'all 0.3s ease',
                                        transform: hoveredService === idx ? 'scale(1.05)' : 'scale(1)'
                                    }}>
                                        <span style={{ fontSize: '2.8rem' }}>{service.icon}</span>
                                    </div>

                                    <h3 style={{
                                        fontSize: '1.35rem',
                                        fontWeight: 700,
                                        marginBottom: 14,
                                        color: C.navy,
                                        fontFamily: "'Playfair Display', serif",
                                        lineHeight: 1.3
                                    }}>
                                        {service.title}
                                    </h3>

                                    <p style={{
                                        fontSize: 13.5,
                                        lineHeight: 1.75,
                                        color: '#6A7290',
                                        fontFamily: "'Inter', sans-serif",
                                        marginBottom: 20
                                    }}>
                                        {service.desc}
                                    </p>
                                </div>

                                {/* Features List */}
                                <div style={{
                                    padding: '0 28px 28px 28px',
                                    borderTop: `1px solid rgba(14,27,77,0.06)`,
                                    marginTop: 8,
                                    paddingTop: 20
                                }}>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                        {service.features.map((feature, fIdx) => (
                                            <span key={fIdx} style={{
                                                fontSize: 11,
                                                color: C.red,
                                                background: `rgba(192,41,42,0.08)`,
                                                padding: '4px 12px',
                                                borderRadius: '20px',
                                                fontWeight: 500
                                            }}>
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Hover Overlay Icon */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: 20,
                                    right: 20,
                                    opacity: hoveredService === idx ? 0.3 : 0,
                                    transition: 'opacity 0.3s ease',
                                    fontSize: 40
                                }}>
                                    ➤
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
          PROJECTS SECTION (REDESIGNED - ATTRACTIVE)
      ══════════════════════════════════════════════════════════ */}
            <section id="projects" className="g5-section" style={{ padding: '110px 60px', background: C.navy, position: 'relative', overflow: 'hidden' }}>
                {/* Animated Background */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(circle at 20% 40%, rgba(201,168,76,0.08) 0%, transparent 50%)` }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', background: `linear-gradient(to top, rgba(10,21,53,0.9), transparent)` }} />

                <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <div ref={ref('projectsHeader')} style={{ textAlign: 'center', marginBottom: 64, ...fadeUp('projectsHeader') }}>
                        <div style={{
                            fontSize: 11,
                            letterSpacing: 8,
                            color: C.gold,
                            textTransform: 'uppercase',
                            marginBottom: 14,
                            fontWeight: 700,
                            display: 'inline-block',
                            padding: '4px 16px',
                            background: `rgba(201,168,76,0.12)`,
                            borderRadius: '30px'
                        }}>
                            Our Portfolio
                        </div>
                        <h2 style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 700, color: C.white, fontFamily: "'Playfair Display', serif", marginTop: 20 }}>
                            Featured <span style={{ fontStyle: 'italic', fontWeight: 400, color: C.gold }}>Projects</span>
                        </h2>
                        <div style={{ width: 80, height: 3, background: `linear-gradient(90deg,${C.red},${C.gold},${C.red})`, margin: '20px auto 0', borderRadius: 2 }} />
                        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', maxWidth: 600, margin: '20px auto 0' }}>
                            At G5, every project reflects our commitment to quality construction, innovative architecture, and customer-focused design.
                        </p>
                    </div>

                    <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28 }}>
                        {projectsData.map((project, idx) => (
                            <div
                                key={idx}
                                ref={ref(`project${idx}`)}
                                className="project-card"
                                onMouseEnter={() => setHoveredProject(idx)}
                                onMouseLeave={() => setHoveredProject(null)}
                                style={{
                                    ...scaleIn(`project${idx}`, idx * 0.12),
                                    background: C.white,
                                    borderRadius: 24,
                                    overflow: 'hidden',
                                    boxShadow: hoveredProject === idx
                                        ? '0 25px 45px rgba(0,0,0,0.3)'
                                        : '0 10px 25px rgba(0,0,0,0.1)',
                                    transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                                    cursor: 'default',
                                    transform: hoveredProject === idx ? 'translateY(-12px)' : 'translateY(0)',
                                }}
                            >
                                {/* Image Container */}
                                <div style={{
                                    height: 200,
                                    background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyMid} 100%)`,
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.6s ease',
                                            transform: hoveredProject === idx ? 'scale(1.08)' : 'scale(1)'
                                        }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: `linear-gradient(to top, ${C.navy}, transparent)`,
                                        opacity: 0.4
                                    }} />
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 16,
                                        left: 16,
                                        fontSize: '2rem',
                                        filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.3))'
                                    }}>
                                        {project.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <div style={{ padding: '24px 20px 28px' }}>
                                    <h3 style={{
                                        fontSize: '1.2rem',
                                        fontWeight: 700,
                                        marginBottom: 10,
                                        color: C.navy,
                                        fontFamily: "'Playfair Display', serif"
                                    }}>
                                        {project.title}
                                    </h3>
                                    <p style={{ fontSize: 13, color: '#6A7290', lineHeight: 1.65 }}>
                                        {project.desc}
                                    </p>

                                    {/* Hover Line */}
                                    <div style={{
                                        width: hoveredProject === idx ? 40 : 0,
                                        height: 2,
                                        background: C.red,
                                        marginTop: 16,
                                        transition: 'width 0.4s ease'
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div ref={ref('projectsFooter')} style={{ textAlign: 'center', marginTop: 56, ...fadeUp('projectsFooter', 0.2) }}>
                        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>
                            As modern house builders and premium villa builders, every project reflects our commitment to quality and design excellence.
                        </p>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
          WHY CHOOSE G5 - DETAILED SECTION (REDESIGNED)
      ══════════════════════════════════════════════════════════ */}
            <section id="why-choose" className="g5-section" style={{ padding: '110px 60px', background: `linear-gradient(135deg, ${C.white} 0%, ${C.offWhite} 100%)`, position: 'relative', overflow: 'hidden' }}>
                {/* Animated Accent */}
                <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: `radial-gradient(ellipse at 100% 0%, rgba(192,41,42,0.03), transparent 70%)`, pointerEvents: 'none' }} />

                <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <div ref={ref('whyChooseHeader')} style={{ textAlign: 'center', marginBottom: 64, ...fadeUp('whyChooseHeader') }}>
                        <div style={{
                            fontSize: 11,
                            letterSpacing: 8,
                            color: C.red,
                            textTransform: 'uppercase',
                            marginBottom: 14,
                            fontWeight: 700,
                            display: 'inline-block',
                            padding: '4px 16px',
                            background: `rgba(192,41,42,0.08)`,
                            borderRadius: '30px'
                        }}>
                            Why G5
                        </div>
                        <h2 style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 700, color: C.navy, fontFamily: "'Playfair Display', serif", marginTop: 20 }}>
                            Why Homeowners Choose <span style={{ fontStyle: 'italic', fontWeight: 400, color: C.red }}>G5 Homes in 2026</span>
                        </h2>
                        <div style={{ width: 80, height: 3, background: `linear-gradient(90deg,${C.red},${C.gold},${C.red})`, margin: '20px auto 0', borderRadius: 2 }} />
                        <p style={{ fontSize: 15, color: '#6A7290', maxWidth: 600, margin: '20px auto 0' }}>
                            Excellence, trust, and innovation — the pillars of every home we build
                        </p>
                    </div>

                    <div className="why-grid-new" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
                        {whyChoosePoints.map((point, idx) => (
                            <div
                                key={idx}
                                ref={ref(`whyPoint${idx}`)}
                                className="why-card"
                                onMouseEnter={() => setHoveredWhy(idx)}
                                onMouseLeave={() => setHoveredWhy(null)}
                                style={{
                                    ...scaleIn(`whyPoint${idx}`, idx * 0.08),
                                    background: C.white,
                                    borderRadius: 24,
                                    padding: '32px 28px',
                                    boxShadow: hoveredWhy === idx
                                        ? '0 25px 50px rgba(10,21,53,0.12)'
                                        : '0 10px 30px rgba(10,21,53,0.04)',
                                    transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                                    cursor: 'default',
                                    border: `1px solid ${hoveredWhy === idx ? 'rgba(192,41,42,0.15)' : 'rgba(14,27,77,0.06)'}`,
                                    transform: hoveredWhy === idx ? 'translateY(-8px)' : 'translateY(0)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {/* Number Badge */}
                                <div style={{
                                    position: 'absolute',
                                    top: 20,
                                    right: 20,
                                    width: 36,
                                    height: 36,
                                    background: `linear-gradient(135deg, rgba(192,41,42,0.08), rgba(201,168,76,0.08))`,
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 16,
                                    fontWeight: 700,
                                    color: C.red,
                                    fontFamily: "'Playfair Display', serif"
                                }}>
                                    {String(idx + 1).padStart(2, '0')}
                                </div>

                                {/* Icon */}
                                <div style={{
                                    width: 56,
                                    height: 56,
                                    background: `linear-gradient(135deg, ${C.red}, ${C.redDark})`,
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 24,
                                    fontSize: 28,
                                    boxShadow: `0 10px 20px rgba(192,41,42,0.2)`,
                                    transition: 'transform 0.3s ease',
                                    transform: hoveredWhy === idx ? 'scale(1.05)' : 'scale(1)'
                                }}>
                                    {point.icon}
                                </div>

                                <h3 style={{
                                    fontSize: '1.2rem',
                                    fontWeight: 700,
                                    marginBottom: 14,
                                    color: C.navy,
                                    fontFamily: "'Playfair Display', serif",
                                    lineHeight: 1.35
                                }}>
                                    {point.title}
                                </h3>

                                <p style={{ fontSize: 13, lineHeight: 1.75, color: '#6A7290', fontFamily: "'Inter', sans-serif" }}>
                                    {point.desc}
                                </p>

                                {/* Animated Bottom Border */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: 3,
                                    background: `linear-gradient(90deg, ${C.red}, ${C.gold}, ${C.red})`,
                                    transform: hoveredWhy === idx ? 'scaleX(1)' : 'scaleX(0)',
                                    transition: 'transform 0.4s ease',
                                    transformOrigin: 'center'
                                }} />
                            </div>
                        ))}
                    </div>

                    <div ref={ref('whyFooter')} style={{ textAlign: 'center', marginTop: 64, paddingTop: 40, borderTop: `1px solid rgba(14,27,77,0.08)`, ...fadeUp('whyFooter', 0.2) }}>
                        <p style={{ fontSize: 15, color: '#4A5270', fontStyle: 'italic', fontWeight: 500 }}>
                            "We stand among the dream home builders and developers, delivering not just houses, but lifestyles."
                        </p>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
          OUR STORY SECTION
      ══════════════════════════════════════════════════════════ */}
            <section id="story" className="g5-section" style={{ padding: '110px 60px 20px', background: C.offWhite, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(14,27,77,0.04) 1px, transparent 0)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '40%', background: `radial-gradient(ellipse, rgba(192,41,42,0.03) 0%, transparent 70%)`, pointerEvents: 'none' }} />

                <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <div ref={ref('storyHeader')} style={{ textAlign: 'center', marginBottom: 64, ...fadeUp('storyHeader') }}>
                        <div style={{ fontSize: 10, letterSpacing: 6, color: C.red, textTransform: 'uppercase', marginBottom: 14, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                            Our Journey
                        </div>
                        <h2 style={{ fontSize: 'clamp(2.2rem,4.5vw,3.4rem)', fontWeight: 600, color: C.navy, lineHeight: 1.1, letterSpacing: '-0.5px', fontFamily: "'Playfair Display', serif" }}>
                            Building Dreams for <span style={{ fontStyle: 'italic', color: C.red, fontWeight: 400 }}>Since 2019</span>
                        </h2>
                        <div style={{ width: 60, height: 2, background: `linear-gradient(90deg,${C.red},${C.gold})`, margin: '20px auto 0' }} />
                    </div>

                    <div className="story-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', marginBottom: 80 }}>
                        <div ref={ref('storyText')} style={slideInLeft('storyText')}>
                            <div style={{ marginBottom: 32 }}>
                                <span style={{ fontSize: '3rem', lineHeight: 1, color: C.red, opacity: 0.3, fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>“</span>
                                <p style={{ fontSize: '1.15rem', fontWeight: 400, lineHeight: 1.85, color: '#4A5270', fontStyle: 'italic', marginTop: -24, fontFamily: "'Playfair Display', serif" }}>
                                    G5 Homes started with a simple idea — to change the way people experience home building.
                                </p>
                            </div>
                            <p style={{ fontSize: 15, lineHeight: 1.95, color: '#5A6380', marginBottom: 24, fontFamily: "'Inter', sans-serif" }}>
                                We saw the need for a transparent, reliable, and quality-driven house construction company that puts clients first.
                                Over the years, we have grown into one of the best home builders in Trivandrum for villas, known for blending creativity with precision.
                            </p>
                            <p style={{ fontSize: 15, lineHeight: 1.95, color: '#5A6380', marginBottom: 32, fontFamily: "'Inter', sans-serif" }}>
                                From affordable house construction to premium home construction, our journey has always been guided by innovation, trust, and customer satisfaction.
                                Every home we build carries our promise of excellence and our passion for creating spaces where families thrive.
                            </p>

                            <div className="story-highlight" style={{ display: 'flex', gap: 32, alignItems: 'center', background: C.white, padding: '20px 28px', borderRadius: 16, border: `1px solid rgba(14,27,77,0.08)`, boxShadow: '0 10px 30px rgba(10,21,53,0.04)', flexWrap: 'wrap' }}>
                                <div>
                                    <div style={{ fontSize: '1.8rem', fontWeight: 700, color: C.navy, fontFamily: "'Playfair Display', serif", lineHeight: 1.2 }}>100%</div>
                                    <div style={{ fontSize: 10, color: C.midGray, letterSpacing: 1.5, marginTop: 4, fontFamily: "'Inter', sans-serif" }}>Client Satisfaction</div>
                                </div>
                                <div style={{ width: 1, height: 40, background: C.lightGray }} />
                                <div>
                                    <div style={{ fontSize: '1.8rem', fontWeight: 700, color: C.navy, fontFamily: "'Playfair Display', serif", lineHeight: 1.2 }}>24/7</div>
                                    <div style={{ fontSize: 10, color: C.midGray, letterSpacing: 1.5, marginTop: 4, fontFamily: "'Inter', sans-serif" }}>Client Support</div>
                                </div>
                            </div>
                        </div>

                        <div className="story-image" ref={ref('storyImage')} style={{ ...slideInRight('storyImage'), position: 'relative' }}>
                            <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', boxShadow: '0 30px 50px rgba(10,21,53,0.12)' }}>
                                <img
                                    src={abouthome}
                                    alt="G5 Homes Construction"
                                    style={{ width: '100%', height: 'auto', display: 'block', transition: 'transform 0.7s ease' }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                />
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(10,21,53,0.6), transparent)' }} />
                            </div>
                            <div style={{ position: 'absolute', bottom: -20, right: -20, width: 100, height: 100, border: `2px solid ${C.gold}`, borderRadius: 50, opacity: 0.2, zIndex: -1 }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
          TESTIMONIALS SECTION (UPDATED)
      ══════════════════════════════════════════════════════════ */}
            <section style={{ padding: '40px 60px 110px', background: C.white, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', fontSize: '30vw', color: 'rgba(192,41,42,0.04)', lineHeight: 1, fontFamily: "'Playfair Display', serif", fontWeight: 700, pointerEvents: 'none', userSelect: 'none' }}>"</div>

                <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <div ref={ref('testi')} style={fadeUp('testi')}>
                        <div style={{ fontSize: 10, letterSpacing: 6, color: C.red, textTransform: 'uppercase', marginBottom: 14, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>Testimonials</div>
                        <h2 style={{ fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 600, color: C.navy, marginBottom: 16, letterSpacing: '-0.5px', fontFamily: "'Playfair Display', serif" }}>
                            What Our <span style={{ fontStyle: 'italic', color: C.red, fontWeight: 400 }}>Clients Say</span>
                        </h2>
                        <div style={{ width: 60, height: 2, background: `linear-gradient(90deg,${C.red},${C.gold})`, margin: '0 auto 40px' }} />
                    </div>

                    <div style={{ position: 'relative', minHeight: 320 }}>
                        {clientTestimonials.map((t, i) => (
                            <div key={i} style={{
                                position: i === activeTest ? 'relative' : 'absolute',
                                top: 0, left: 0, right: 0,
                                opacity: i === activeTest ? 1 : 0,
                                transform: i === activeTest ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
                                transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
                                pointerEvents: i === activeTest ? 'auto' : 'none',
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 28 }}>
                                    {[...Array(t.rating)].map((_, j) => <span key={j} style={{ color: C.gold, fontSize: 18 }}>★</span>)}
                                </div>
                                <p style={{ fontSize: 'clamp(1rem,1.8vw,1.15rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.8, marginBottom: 32, color: '#3A4260', letterSpacing: '0.2px', fontFamily: "'Inter', sans-serif", maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>"{t.text}"</p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
                                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: `linear-gradient(135deg,${C.red},${C.gold})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.white, fontWeight: 700, fontSize: 18, fontFamily: "'Playfair Display', serif" }}>
                                        {t.name.charAt(0)}
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <div style={{ fontSize: 13, letterSpacing: 2, color: C.navy, textTransform: 'uppercase', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>{t.name}</div>
                                        <div style={{ fontSize: 11, color: C.midGray, marginTop: 4, fontFamily: "'Inter', sans-serif" }}>{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 56 }}>
                        {clientTestimonials.map((_, i) => (
                            <button key={i} onClick={() => setActiveTest(i)} style={{
                                width: i === activeTest ? 36 : 8,
                                height: 8,
                                borderRadius: 4,
                                border: 'none',
                                cursor: 'pointer',
                                background: i === activeTest ? `linear-gradient(90deg,${C.red},${C.gold})` : '#CBD0E0',
                                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                            }} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
          LOCATIONS SECTION
      ══════════════════════════════════════════════════════════ */}
            <section id="locations" style={{ background: C.navy, padding: '90px 60px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '60%', height: '60%', background: `radial-gradient(ellipse,rgba(192,41,42,0.1),transparent 70%)`, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)`, backgroundSize: '48px 48px', pointerEvents: 'none' }} />

                <div style={{ maxWidth: 1140, margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <div ref={ref('locs')} style={{ textAlign: 'center', marginBottom: 52, ...fadeUp('locs') }}>
                        <div style={{ fontSize: 10, letterSpacing: 6, color: C.gold, textTransform: 'uppercase', marginBottom: 14, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>Where We Operate</div>
                        <h2 style={{ fontSize: 'clamp(2rem,3.5vw,3rem)', fontWeight: 600, color: C.white, letterSpacing: '-0.5px', fontFamily: "'Playfair Display', serif" }}>
                            Across Kerala's <span style={{ fontStyle: 'italic', color: C.red, fontWeight: 400 }}>Finest Addresses</span>
                        </h2>
                        <div className="gold-rule center" />
                    </div>

                    <div className="loc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
                        {[{ city: 'Kovalam', tag: 'HQ', icon: '🌊' }, { city: 'Varkala', tag: '', icon: '🏖' }, { city: 'Thiruvananthapuram', tag: '', icon: '🏛' }, { city: 'Kochi', tag: '', icon: '⚓' }, { city: 'Alappuzha', tag: '', icon: '🛶' }, { city: 'Munnar', tag: '', icon: '🍃' }, { city: 'Thrissur', tag: '', icon: '🎭' }, { city: 'Kozhikode', tag: '', icon: '🌿' }].map(({ city, tag, icon }, i) => (
                            <div key={i} ref={ref(`loc${i}`)} className="loc-tile" style={scaleIn(`loc${i}`, i * 0.05)}>
                                {tag && <span style={{ position: 'absolute', top: 8, right: 8, fontSize: 8, background: C.red, color: C.white, padding: '3px 8px', borderRadius: 20, letterSpacing: 1.5, fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>{tag}</span>}
                                <div style={{ fontSize: '1.4rem', marginBottom: 10, display: 'block' }}>{icon}</div>
                                <div style={{ fontWeight: 600, fontSize: 12, color: C.white, letterSpacing: 1, fontFamily: "'Inter', sans-serif" }}>{city}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
          CONTACT SECTION (UPDATED WITH VALIDATION FIELDS)
      ══════════════════════════════════════════════════════════ */}

            <section id="contact" style={{ padding: '110px 60px', background: C.white, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: `linear-gradient(to bottom,${C.red},${C.gold},${C.red})`, opacity: 0.3 }} />

                <div className="contact-grid" style={{ maxWidth: 1140, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 90, alignItems: 'start' }}>
                    <div ref={ref('contact')} style={slideInLeft('contact')}>
                        <div style={{ fontSize: 10, letterSpacing: 6, color: C.red, textTransform: 'uppercase', marginBottom: 14, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>Get In Touch</div>
                        <h2 style={{ fontSize: 'clamp(2rem,3.8vw,3.2rem)', fontWeight: 600, marginBottom: 18, color: C.navy, letterSpacing: '-0.5px', fontFamily: "'Playfair Display', serif" }}>
                            Begin Your<br />
                            <span style={{ fontStyle: 'italic', color: C.red, fontWeight: 400 }}>Journey Home.</span>
                        </h2>
                        <div className="gold-rule" />
                        <p style={{ fontSize: 14, color: '#6A7290', lineHeight: 1.95, marginBottom: 40, fontFamily: "'Inter', sans-serif" }}>
                            Our advisors in Kovalam are available to guide you through every step — from your first inquiry to handing over the keys.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            {[['📍', 'Head Office: G5 Group, NH 66, Edavilakam, Pachalloor, Tvm, Kerala, India- 695027'], ['📞', '+91 9562100007'], ['✉️', 'info@g5homes.in'], ['🕐', 'Mon – Sat: 9AM – 5:30PM IST']].map(([icon, val], i) => (
                                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                                    <div style={{ width: 42, height: 42, background: `linear-gradient(135deg,${C.offWhite},${C.lightGray})`, border: `1px solid rgba(14,27,77,0.08)`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 17 }}>{icon}</div>
                                    <span style={{ fontSize: 13, color: '#5A6380', lineHeight: 1.7, paddingTop: 10, fontFamily: "'Inter', sans-serif" }}>{val}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* UPDATED FORM with validation */}
                    <div ref={ref('form')} style={{ ...slideInRight('form'), background: C.offWhite, padding: '44px 40px', borderRadius: 20, border: `1px solid rgba(14,27,77,0.1)`, boxShadow: '0 24px 80px rgba(10,21,53,0.08)', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${C.red},${C.gold},${C.red})` }} />
                        <h3 style={{ fontSize: '1.6rem', fontWeight: 600, color: C.navy, marginBottom: 6, fontFamily: "'Playfair Display', serif" }}>Send an Inquiry</h3>
                        <p style={{ fontSize: 12, color: C.midGray, marginBottom: 28, fontFamily: "'Inter', sans-serif" }}>We'll respond within 24 hours.</p>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                <div>
                                    <label style={{ fontSize: 11, fontWeight: 600, color: '#4A5270', letterSpacing: 1, textTransform: 'uppercase', fontFamily: "'Inter', sans-serif", display: 'block', marginBottom: 6 }}>Full Name *</label>
                                    <input
                                        placeholder="Your full name"
                                        value={formData.name}
                                        onChange={handleNameChange}
                                        onBlur={() => handleBlur('name')}
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
                                    style={{
                                        width: '100%',
                                        padding: '15px 18px',
                                        borderRadius: 12,
                                        border: '1px solid rgba(14,27,77,0.15)',
                                        fontFamily: "'Inter', sans-serif",
                                        background: C.white,
                                    }}
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

                            <button type="submit" className="btn-premium" style={{ padding: '17px', fontSize: 11, width: '100%', borderRadius: 40, marginTop: 4, border: 'none', cursor: 'pointer', color: C.white }}
                                onMouseEnter={() => setCursorActive(true)} onMouseLeave={() => setCursorActive(false)}>
                                <span>Send Inquiry →</span>
                            </button>
                            <p style={{ fontSize: 10, color: C.midGray, textAlign: 'center', letterSpacing: 1, fontFamily: "'Inter', sans-serif" }}>🔒 Your information is safe with us</p>
                        </form>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
          CTA BAND
      ══════════════════════════════════════════════════════════ */}
            <section style={{ background: `linear-gradient(135deg,${C.red} 0%,${C.redDark} 50%,${C.navy} 100%)`, padding: '80px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ fontSize: 10, letterSpacing: 6, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: 14, fontWeight: 500, fontFamily: "'Inter', sans-serif" }}>Start Your Journey</div>
                    <h2 style={{ fontSize: 'clamp(2rem,4.5vw,3.5rem)', fontWeight: 600, color: C.white, marginBottom: 14, letterSpacing: '-0.5px', fontFamily: "'Playfair Display', serif" }}>
                        Ready to Build Your <em style={{ fontWeight: 300 }}>Dream Home?</em>
                    </h2>
                    <div style={{ width: 48, height: 1, background: `linear-gradient(90deg,transparent,${C.gold},transparent)`, margin: '16px auto 28px' }} />
                    <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', maxWidth: 500, margin: '0 auto 44px', lineHeight: 1.8, fontFamily: "'Inter', sans-serif" }}>
                        Join 200+ happy families who built their dream home with G5 Homes.
                    </p>
                    <div style={{ display: 'flex', gap: 18, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="#story" className="btn-outline-premium" style={{ padding: '17px 52px', fontSize: 11, borderRadius: 40, background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.4)', textDecoration: 'none', color: C.white }}>
                            Our Story
                        </a>
                        <a href="#contact" style={{ padding: '17px 52px', fontSize: 11, borderRadius: 40, border: 'none', background: C.white, color: C.red, cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', transition: 'all 0.35s ease', display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.2)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            Contact Us
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer Component */}
            <Footer />
        </div>
    );
}