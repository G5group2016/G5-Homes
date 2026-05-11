import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import modern from '../assets/modernhome.webp';
import aihome from '../assets/aihome.webp';
import listening from '../assets/listening.webp';
import renovation from '../assets/renovation.webp';

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

// Blog posts data
const blogPosts = [
    {
        id: 1,
        title: "Top Trends Transforming Modern Home Construction in Kerala for 2026",
        excerpt: "Home construction in Kerala is evolving beyond traditional designs, with homeowners now focusing on smarter, more sustainable, and lifestyle-oriented living spaces...",
        content: `
            <p>Home construction in Kerala is evolving beyond traditional designs, with homeowners now focusing on smarter, more sustainable, and lifestyle-oriented living spaces. In 2026, modern custom homes are being designed with open layouts, natural ventilation, energy-efficient materials, and elegant contemporary architecture that perfectly suits Kerala's climate and modern family needs. From compact premium homes to luxury villas, people are prioritizing comfort, functionality, and long-term value more than ever before.</p>
            
            <h3>Smart Living Takes Center Stage</h3>
            <p>One of the biggest trends shaping modern house construction plans in Kerala is the rise of smart living. AI-powered home automation, intelligent lighting, advanced security systems, and energy management solutions are becoming essential features in many new homes. At the same time, eco-friendly construction practices such as sustainable materials, rainwater harvesting, solar-ready designs, and climate-responsive architecture are gaining popularity among homeowners looking for future-ready living spaces.</p>
            
            <h3>Personalized Designs for Modern Lifestyles</h3>
            <p>Modern homeowners are also seeking personalized designs that reflect their lifestyle and personality rather than following standard layouts. Warm minimalist interiors, premium outdoor spaces, landscaped areas, and luxury villa concepts are becoming key elements in residential construction today. The focus is no longer just on building a house — it's about creating a comfortable, connected, and meaningful living experience for the future.</p>
        `,
        image: modern,
        date: "April 15, 2026",
        readTime: "4 min read",
        category: "Trends",
    },
    {
        id: 2,
        title: "Is AI The New Standard of Modern Living in Kerala?",
        excerpt: "AI is becoming an important part of modern smart homes by improving convenience, security, energy efficiency, and everyday comfort...",
        content: `
            <p>AI is becoming an important part of modern smart homes by improving convenience, security, energy efficiency, and everyday comfort. While not every home requires advanced automation, AI-powered features can make modern living more connected, efficient, and future-ready.</p>
            
            <h3>Intelligent Living with AI</h3>
            <p>Artificial Intelligence is changing how modern homes in Kerala function by making everyday living more intelligent, efficient, and personalized. AI-integrated smart homes can automatically adjust lighting, room temperature, and energy usage based on daily routines, weather conditions, and occupancy patterns, creating a more comfortable and energy-efficient lifestyle.</p>
            
            <h3>Enhanced Security and Convenience</h3>
            <p>In modern Kerala homes, AI is also improving home security through facial recognition systems, smart surveillance cameras, motion detection, and real-time mobile alerts. Voice-controlled automation is becoming increasingly common, allowing homeowners to manage appliances, entertainment systems, curtains, lighting, and security using simple voice commands or smartphone applications.</p>
            
            <h3>The Future of Home Construction</h3>
            <p>As smart home execution continues to grow in Kerala, AI is becoming an important part of future-ready home construction. From luxury villas to premium family homes, intelligent automation systems are helping homeowners experience better convenience, enhanced safety, optimized energy management, and a more connected living environment.</p>
        `,
        image: aihome,
        date: "April 10, 2026",
        readTime: "5 min read",
        category: "Smart Homes",
    },
    {
        id: 3,
        title: "G5 gives more importance to listening than execution, does that make sense?",
        excerpt: "A well-built home begins with understanding the people who will live in it. Instead of following repetitive designs and standard construction approaches...",
        content: `
            <p>A well-built home begins with understanding the people who will live in it. Instead of following repetitive designs and standard construction approaches, we believe every family deserves a home shaped around their lifestyle, preferences, and future needs. That's why listening to our clients is given more importance than simply executing a project.</p>
            
            <h3>Personalized Approach to Home Building</h3>
            <p>From architectural planning to interiors and smart home features, every decision is guided by meaningful conversations and personalized understanding. By focusing on what clients truly want, we create homes that feel more personal, comfortable, and connected — not just visually impressive, but genuinely designed for the people living in them.</p>
            
            <p>This client-first philosophy ensures that every home we build tells a unique story — one that reflects the dreams, aspirations, and lifestyle of the family who will call it home.</p>
        `,
        image: listening,
        date: "April 5, 2026",
        readTime: "3 min read",
        category: "Philosophy",
    },
    {
        id: 4,
        title: "Renovation or Building a New Home: Both are the Same Here at G5",
        excerpt: "Whether it's renovating an existing space or building a completely new home, the goal remains the same — creating a living space that feels modern, functional, and personal...",
        content: `
            <p>Whether it's renovating an existing space or building a completely new home, the goal remains the same — creating a living space that feels modern, functional, and personal. At G5 Homes, both renovation and new construction are approached with the same level of creativity, planning, quality, and attention to detail to ensure the final result truly reflects the homeowner's vision.</p>
            
            <h3>Equal Commitment to Every Project</h3>
            <p>A thoughtfully executed renovation can transform an outdated property into a refreshed and modern living environment, while a new home offers the freedom to build from the ground up. In both cases, the focus is not just on construction, but on delivering comfort, aesthetics, smart living solutions, and long-term value that make a real difference in everyday life.</p>
            
            <h3>Every Home Has a Story</h3>
            <p>Every home has a story, whether it is being newly created or thoughtfully reimagined. By understanding the lifestyle, preferences, and future needs of each client, both renovation projects and new home construction are designed to deliver the same sense of quality, comfort, and emotional connection. The experience matters just as much as the final structure, which is why every project is treated with equal importance and dedication.</p>
        `,
        image: renovation,
        date: "March 28, 2026",
        readTime: "4 min read",
        category: "Services",
    },
];

export default function Blog() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [cursorActive, setCursorActive] = useState(false);
    const [visible, setVisible] = useState({});
    const [selectedPost, setSelectedPost] = useState(null);
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

    useEffect(() => {
        if (selectedPost) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [selectedPost]);

    const ref = id => el => {
        if (el) { el.dataset.id = id; sectionRefs.current[id] = el; }
    };

    const fadeUp = (id, delay = 0) => ({
        opacity: visible[id] ? 1 : 0,
        transform: visible[id] ? 'translateY(0)' : 'translateY(48px)',
        transition: `opacity 0.85s cubic-bezier(0.22,0.85,0.36,1) ${delay}s, transform 0.85s cubic-bezier(0.22,0.85,0.36,1) ${delay}s`,
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

                .blog-card {
                    transition: all 0.45s cubic-bezier(0.22,1,0.36,1);
                    cursor: pointer;
                }
                .blog-card:hover {
                    transform: translateY(-12px);
                }

                @media (max-width: 1024px) {
                    .blog-grid { grid-template-columns: repeat(2,1fr) !important; }
                }
                @media (max-width: 768px) {
                    .blog-section { padding: 80px 28px !important; }
                    .hero-blog { padding: 0 24px !important; }
                    .blog-grid { grid-template-columns: 1fr !important; }
                }
                @media (max-width: 480px) {
                    .hero-blog h1 { font-size: clamp(2rem, 11vw, 2.8rem) !important; }
                }

                .modal-open {
                    overflow: hidden;
                }
            `}</style>

            <Navbar scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} setCursorActive={setCursorActive} />

            {/* ── HERO SECTION ── */}
            <section style={{
                minHeight: '55vh',
                background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyMid} 60%, #0D1A3A 100%)`,
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                paddingTop: 110,
            }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize: '60px 60px', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: `radial-gradient(circle, rgba(192,41,42,0.12) 0%, transparent 65%)`, pointerEvents: 'none' }} />

                <div className="hero-blog" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 60px 60px', position: 'relative', zIndex: 2, width: '100%' }}>
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
                            G5 GROUP · Insights
                        </span>
                    </div>

                    <h1 className="hero-title" style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                        fontWeight: 700,
                        color: C.white,
                        lineHeight: 1.1,
                        letterSpacing: '-1px',
                        marginBottom: 0,
                    }}>
                        Our Blog
                    </h1>

                    <div className="hero-line" style={{
                        height: 3,
                        width: 0,
                        background: `linear-gradient(90deg, ${C.red}, ${C.gold})`,
                        margin: '24px 0 20px',
                        borderRadius: 2,
                    }} />

                    <p className="hero-subtitle" style={{
                        fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
                        color: 'rgba(255,255,255,0.75)',
                        fontFamily: "'Inter', sans-serif",
                        marginBottom: 16,
                        maxWidth: 600,
                    }}>
                        Insights, trends, and stories from the world of home construction and design.
                    </p>
                </div>
            </section>

            {/* ── MARQUEE ── */}
            <div style={{ background: `linear-gradient(90deg,${C.navy},${C.navyMid},${C.navy})`, padding: '13px 0', overflow: 'hidden', borderTop: `1px solid rgba(201,168,76,0.2)`, borderBottom: `1px solid rgba(201,168,76,0.2)` }}>
                <div className="marquee-inner">
                    {[...Array(2)].map((_, r) => (
                        ['Latest Articles', '◆', 'Construction Trends', '◆', 'Smart Living', '◆', 'Design Insights', '◆', 'Expert Tips', '◆', 'Industry News', '◆'].map((t, i) => (
                            <span key={`${r}-${i}`} style={{ marginRight: 48, fontSize: 11, letterSpacing: 3, color: t === '◆' ? C.gold : 'rgba(255,255,255,0.45)', fontWeight: t === '◆' ? 700 : 400, textTransform: 'uppercase', whiteSpace: 'nowrap', fontFamily: "'Inter', sans-serif" }}>{t}</span>
                        ))
                    ))}
                </div>
            </div>

            {/* ── BLOG GRID SECTION ── */}
            <section className="blog-section" style={{ padding: '110px 60px', background: C.white, position: 'relative' }}>
                <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                    <div ref={ref('blogHeader')} style={{ textAlign: 'center', marginBottom: 64, ...fadeUp('blogHeader') }}>
                        <div style={{ fontSize: 10, letterSpacing: 6, color: C.red, textTransform: 'uppercase', marginBottom: 14, fontWeight: 700, fontFamily: "'Inter', sans-serif", background: 'rgba(192,41,42,0.07)', display: 'inline-block', padding: '5px 16px', borderRadius: 30 }}>
                            Featured Stories
                        </div>
                        <h2 style={{ fontSize: 'clamp(2rem,3.8vw,3rem)', fontWeight: 700, color: C.navy, fontFamily: "'Playfair Display', serif", marginTop: 18 }}>
                            Latest from <span style={{ fontStyle: 'italic', color: C.red, fontWeight: 400 }}>Our Blog</span>
                        </h2>
                        <div style={{ width: 60, height: 3, background: `linear-gradient(90deg,${C.red},${C.gold})`, borderRadius: 2, margin: '20px auto 0' }} />
                    </div>

                    <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 40 }}>
                        {blogPosts.map((post, idx) => (
                            <div
                                key={post.id}
                                ref={ref(`blog${idx}`)}
                                className="blog-card"
                                onClick={() => setSelectedPost(post)}
                                style={{
                                    ...scaleIn(`blog${idx}`, idx * 0.1),
                                    background: C.white,
                                    borderRadius: 28,
                                    overflow: 'hidden',
                                    boxShadow: '0 20px 40px rgba(10,21,53,0.08)',
                                    border: '1px solid rgba(14,27,77,0.06)',
                                    cursor: 'pointer',
                                }}
                            >
                                <div style={{ position: 'relative', overflow: 'hidden', height: 260 }}>
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.6s ease',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        top: 20,
                                        left: 20,
                                        background: `linear-gradient(135deg, ${C.red}, ${C.redDark})`,
                                        padding: '5px 16px',
                                        borderRadius: 30,
                                        fontSize: 10,
                                        fontWeight: 600,
                                        color: C.white,
                                        letterSpacing: 1,
                                        fontFamily: "'Inter', sans-serif",
                                    }}>
                                        {post.category}
                                    </div>
                                </div>
                                <div style={{ padding: '28px 30px 32px' }}>
                                    <div style={{ display: 'flex', gap: 16, marginBottom: 14, fontSize: 11, color: C.midGray, fontFamily: "'Inter', sans-serif", letterSpacing: 0.5 }}>
                                        <span>{post.date}</span>
                                        <span>•</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h3 style={{
                                        fontSize: '1.35rem',
                                        fontWeight: 700,
                                        color: C.navy,
                                        fontFamily: "'Playfair Display', serif",
                                        lineHeight: 1.3,
                                        marginBottom: 14,
                                        transition: 'color 0.3s ease',
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.color = C.red}
                                        onMouseLeave={e => e.currentTarget.style.color = C.navy}
                                    >
                                        {post.title}
                                    </h3>
                                    <p style={{ fontSize: 13.5, lineHeight: 1.8, color: '#6A7290', fontFamily: "'Inter', sans-serif", marginBottom: 20 }}>
                                        {post.excerpt.substring(0, 120)}...
                                    </p>
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        fontSize: 11,
                                        fontWeight: 600,
                                        color: C.red,
                                        textTransform: 'uppercase',
                                        letterSpacing: 2,
                                        fontFamily: "'Inter', sans-serif",
                                        borderBottom: `1.5px solid ${C.gold}`,
                                        paddingBottom: 6,
                                    }}>
                                        Read Article
                                        <span style={{ fontSize: 14 }}>→</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── NEWSLETTER SECTION ── */}
            <section style={{ padding: '80px 60px', background: C.offWhite, textAlign: 'center' }}>
                <div style={{ maxWidth: 680, margin: '0 auto' }}>
                    <div style={{ fontSize: 10, letterSpacing: 6, color: C.red, textTransform: 'uppercase', marginBottom: 14, fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>Stay Updated</div>
                    <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', fontWeight: 700, color: C.navy, fontFamily: "'Playfair Display', serif", marginBottom: 16 }}>
                        Subscribe to Our <span style={{ fontStyle: 'italic', color: C.red }}>Newsletter</span>
                    </h2>
                    <p style={{ fontSize: 14, color: '#6A7290', marginBottom: 32, fontFamily: "'Inter', sans-serif" }}>
                        Get the latest insights on home construction, design trends, and smart living delivered to your inbox.
                    </p>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <input
                            type="email"
                            placeholder="Your email address"
                            style={{
                                padding: '14px 24px',
                                width: 280,
                                border: `1px solid rgba(10,21,53,0.15)`,
                                borderRadius: 40,
                                fontFamily: "'Inter', sans-serif",
                                fontSize: 13,
                                outline: 'none',
                                transition: 'all 0.3s ease',
                            }}
                            onFocus={e => e.currentTarget.style.borderColor = C.red}
                            onBlur={e => e.currentTarget.style.borderColor = 'rgba(10,21,53,0.15)'}
                        />
                        <button style={{
                            padding: '14px 32px',
                            background: `linear-gradient(135deg, ${C.red}, ${C.redDark})`,
                            border: 'none',
                            borderRadius: 40,
                            color: C.white,
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 11,
                            fontWeight: 600,
                            letterSpacing: 2,
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: `0 5px 15px rgba(192,41,42,0.25)`,
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(192,41,42,0.35)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 5px 15px rgba(192,41,42,0.25)'; }}
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            <Footer />

            {/* ── MODAL FOR BLOG POST ── */}
            {selectedPost && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(10,21,53,0.95)',
                    backdropFilter: 'blur(12px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px 20px',
                    overflowY: 'auto',
                }}
                    onClick={() => setSelectedPost(null)}
                >
                    <div style={{
                        maxWidth: 900,
                        width: '100%',
                        background: C.white,
                        borderRadius: 32,
                        overflow: 'hidden',
                        position: 'relative',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                    }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedPost(null)}
                            style={{
                                position: 'absolute',
                                top: 20,
                                right: 20,
                                width: 44,
                                height: 44,
                                borderRadius: '50%',
                                background: C.white,
                                border: 'none',
                                fontSize: 20,
                                cursor: 'pointer',
                                zIndex: 10,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = C.red; e.currentTarget.style.color = C.white; }}
                            onMouseLeave={e => { e.currentTarget.style.background = C.white; e.currentTarget.style.color = C.darkText; }}
                        >
                            ✕
                        </button>

                        {/* Modal content */}
                        <img
                            src={selectedPost.image}
                            alt={selectedPost.title}
                            style={{ width: '100%', height: 420, objectFit: 'cover' }}
                        />
                        <div style={{ padding: '40px 48px' }}>
                            <div style={{ display: 'flex', gap: 16, marginBottom: 20, fontSize: 12, color: C.midGray, fontFamily: "'Inter', sans-serif", letterSpacing: 0.5 }}>
                                <span style={{ background: `linear-gradient(135deg, ${C.red}, ${C.redDark})`, padding: '4px 12px', borderRadius: 20, color: C.white, fontWeight: 600 }}>
                                    {selectedPost.category}
                                </span>
                                <span>{selectedPost.date}</span>
                                <span>•</span>
                                <span>{selectedPost.readTime}</span>
                            </div>
                            <h1 style={{
                                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                                fontWeight: 700,
                                color: C.navy,
                                fontFamily: "'Playfair Display', serif",
                                lineHeight: 1.2,
                                marginBottom: 24,
                            }}>
                                {selectedPost.title}
                            </h1>
                            <div
                                style={{
                                    fontSize: 15,
                                    lineHeight: 1.9,
                                    color: '#4A5270',
                                    fontFamily: "'Inter', sans-serif",
                                }}
                                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                            />
                            <div style={{ marginTop: 40, paddingTop: 24, borderTop: `1px solid rgba(10,21,53,0.08)` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div style={{ width: 48, height: 48, borderRadius: '50%', background: `linear-gradient(135deg, ${C.red}, ${C.gold})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>G5</div>
                                        <div>
                                            <div style={{ fontSize: 12, color: C.midGray }}>Written by</div>
                                            <div style={{ fontWeight: 600, color: C.navy }}>G5 Homes Team</div>
                                        </div>
                                    </div>
                                    <a href="/contact" style={{
                                        padding: '12px 28px',
                                        background: `linear-gradient(135deg, ${C.navy}, ${C.navyMid})`,
                                        color: C.white,
                                        textDecoration: 'none',
                                        borderRadius: 40,
                                        fontSize: 11,
                                        fontWeight: 600,
                                        letterSpacing: 1.5,
                                        textTransform: 'uppercase',
                                        transition: 'all 0.3s ease',
                                    }}
                                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(10,21,53,0.25)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                                    >
                                        Discuss Your Project →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}