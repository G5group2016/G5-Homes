// src/pages/PrivacyPolicy.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';

const C = {
    navy: '#0A1535',
    navyMid: '#0E1B4D',
    red: '#C0292A',
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

const sections = [
    {
        id: 'information-we-collect',
        title: 'Information We Collect',
        icon: '📋',
        content: [
            {
                subtitle: 'Personal Information',
                text: 'When you contact us, request a consultation, or submit an inquiry through our website, we may collect personal information including your full name, email address, phone number, and the nature of your construction or design query.'
            },
            {
                subtitle: 'Usage Data',
                text: 'We automatically collect certain information when you visit our website, including your IP address, browser type, pages visited, time spent on pages, and referring URLs. This data helps us understand how visitors interact with our site.'
            },
            {
                subtitle: 'Communication Data',
                text: 'Any messages, feedback, or correspondence you send us — including through WhatsApp, email, or our contact form — may be retained to improve our services and maintain communication records.'
            }
        ]
    },
    {
        id: 'how-we-use',
        title: 'How We Use Your Information',
        icon: '⚙️',
        content: [
            {
                subtitle: 'Service Delivery',
                text: 'We use your contact details to respond to inquiries, schedule consultations, provide construction quotations, and deliver the home-building and interior design services you request.'
            },
            {
                subtitle: 'Communication',
                text: 'With your consent, we may send you project updates, construction tips, new service announcements, or promotional offers related to G5 Homes. You may opt out of marketing communications at any time.'
            },
            {
                subtitle: 'Website Improvement',
                text: 'Usage data helps us improve our website\'s functionality, design, and content to better serve prospective homeowners and clients across Kerala.'
            },
            {
                subtitle: 'Legal Compliance',
                text: 'We may use or disclose your information as required by applicable laws, regulations, or legal processes, including responding to lawful government requests.'
            }
        ]
    },
    {
        id: 'data-sharing',
        title: 'Data Sharing & Disclosure',
        icon: '🔗',
        content: [
            {
                subtitle: 'We Do Not Sell Your Data',
                text: 'G5 Homes does not sell, rent, or trade your personal information to third parties for their marketing purposes. Your trust is the foundation of our business.'
            },
            {
                subtitle: 'Trusted Service Providers',
                text: 'We may share data with carefully vetted third-party service providers (such as email platforms or analytics tools) who assist us in operating our website and business. These providers are contractually obligated to protect your data.'
            },
            {
                subtitle: 'Business Partners',
                text: 'In connection with specific construction projects, we may share relevant contact details with architects, interior designers, or contractors who are part of your project team, only with your knowledge.'
            },
            {
                subtitle: 'Legal Requirements',
                text: 'We may disclose information if required by law, court order, or to protect the rights, property, or safety of G5 Homes, our clients, or the public.'
            }
        ]
    },
    {
        id: 'data-security',
        title: 'Data Security',
        icon: '🔒',
        content: [
            {
                subtitle: 'Security Measures',
                text: 'We implement reasonable technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes secure HTTPS connections and restricted data access.'
            },
            {
                subtitle: 'Limitation of Liability',
                text: 'While we strive to protect your information, no method of internet transmission or electronic storage is 100% secure. We cannot guarantee absolute security but commit to prompt notification in the event of a data breach affecting your information.'
            }
        ]
    },
    {
        id: 'cookies',
        title: 'Cookies & Tracking',
        icon: '🍪',
        content: [
            {
                subtitle: 'What Are Cookies',
                text: 'Cookies are small text files stored on your device that help us recognize returning visitors, remember preferences, and analyze traffic patterns on g5homes.in.'
            },
            {
                subtitle: 'Types We Use',
                text: 'We use essential cookies (required for site functionality), analytics cookies (to understand traffic patterns), and may use marketing cookies if you interact with our social media or advertising content.'
            },
            {
                subtitle: 'Your Control',
                text: 'You can control or disable cookies through your browser settings. Note that disabling certain cookies may affect the functionality of our website.'
            }
        ]
    },
    {
        id: 'your-rights',
        title: 'Your Rights',
        icon: '⚖️',
        content: [
            {
                subtitle: 'Access & Correction',
                text: 'You have the right to request access to the personal information we hold about you and to request corrections if any information is inaccurate or incomplete.'
            },
            {
                subtitle: 'Deletion',
                text: 'You may request the deletion of your personal information from our systems, subject to any legal obligations we may have to retain certain records.'
            },
            {
                subtitle: 'Opt-Out',
                text: 'You may opt out of marketing communications at any time by clicking the unsubscribe link in any email, or by contacting us directly at info@g5homes.in.'
            },
            {
                subtitle: 'How to Exercise Your Rights',
                text: 'To exercise any of these rights, please contact our team at info@g5homes.in or call +91 9074525538. We will respond to your request within 30 days.'
            }
        ]
    },
    {
        id: 'third-party',
        title: 'Third-Party Links',
        icon: '🌐',
        content: [
            {
                subtitle: 'External Websites',
                text: 'Our website may contain links to external sites including social media platforms (Instagram, Facebook, WhatsApp, LinkedIn, YouTube). We are not responsible for the privacy practices or content of those sites. We encourage you to review their respective privacy policies.'
            }
        ]
    },
    {
        id: 'changes',
        title: 'Changes to This Policy',
        icon: '📝',
        content: [
            {
                subtitle: 'Updates',
                text: 'We may update this Privacy Policy periodically to reflect changes in our practices or for legal, operational, or regulatory reasons. The updated policy will be posted on this page with a revised "Last Updated" date. We encourage you to review this policy regularly.'
            }
        ]
    },
    {
        id: 'contact',
        title: 'Contact Us',
        icon: '📞',
        content: [
            {
                subtitle: 'Reach Out',
                text: 'If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal data, please contact us:'
            }
        ],
        contactInfo: true
    }
];

export default function PrivacyPolicy() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('information-we-collect');

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    // Track active section on scroll
    useEffect(() => {
        const handleScroll = () => {
            const sectionEls = sections.map(s => document.getElementById(s.id));
            for (let i = sectionEls.length - 1; i >= 0; i--) {
                const el = sectionEls[i];
                if (el && el.getBoundingClientRect().top <= 140) {
                    setActiveSection(sections[i].id);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            const offset = 110;
            const top = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <div style={{ fontFamily: "'Inter', 'Poppins', sans-serif", background: C.white, color: C.darkText, overflowX: 'hidden' }}>
            <Helmet>
                <title>Privacy Policy | G5 Homes – Trusted Home Builders in Kerala</title>
                <meta name="description" content="Read G5 Homes' Privacy Policy to understand how we collect, use, and protect your personal information when you visit our website or use our construction services." />
                <link rel="canonical" href="https://g5homes.in/privacy-policy" />
            </Helmet>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');
                *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
                html { scroll-behavior: smooth; }
                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-track { background: #0A1535; }
                ::-webkit-scrollbar-thumb { background: linear-gradient(${C.red},${C.gold}); border-radius: 2px; }

                .pp-hero {
                    background: linear-gradient(135deg, ${C.navy} 0%, ${C.navyMid} 60%, #0B1F5C 100%);
                    padding: 160px 60px 80px;
                    position: relative;
                    overflow: hidden;
                }
                @media (max-width: 768px) {
                    .pp-hero { padding: 140px 32px 60px; }
                }
                @media (max-width: 480px) {
                    .pp-hero { padding: 130px 20px 50px; }
                }
                @media (max-width: 380px) {
                    .pp-hero { padding: 120px 16px 44px; }
                }
                @media (max-width: 320px) {
                    .pp-hero { padding: 110px 14px 36px; }
                }

                .pp-layout {
                    display: grid;
                    grid-template-columns: 260px 1fr;
                    gap: 48px;
                    max-width: 1140px;
                    margin: 0 auto;
                    padding: 60px 60px 100px;
                    align-items: start;
                }
                @media (max-width: 960px) {
                    .pp-layout { grid-template-columns: 1fr; gap: 0; padding: 40px 32px 80px; }
                    .pp-sidebar { display: none !important; }
                }
                @media (max-width: 480px) {
                    .pp-layout { padding: 32px 20px 60px; }
                }
                @media (max-width: 380px) {
                    .pp-layout { padding: 28px 16px 52px; }
                }
                @media (max-width: 320px) {
                    .pp-layout { padding: 24px 14px 44px; }
                }

                .pp-sidebar {
                    position: sticky;
                    top: 110px;
                }

                .pp-nav-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px 14px;
                    border-radius: 10px;
                    cursor: pointer;
                    font-size: 12px;
                    font-family: 'Inter', sans-serif;
                    font-weight: 500;
                    letter-spacing: 0.3px;
                    color: ${C.midGray};
                    transition: all 0.3s ease;
                    border-left: 2px solid transparent;
                    margin-bottom: 4px;
                }
                .pp-nav-item:hover { color: ${C.navy}; background: ${C.offWhite}; }
                .pp-nav-item.active {
                    color: ${C.red};
                    background: rgba(192,41,42,0.06);
                    border-left-color: ${C.red};
                    font-weight: 600;
                }

                .pp-section {
                    margin-bottom: 60px;
                    scroll-margin-top: 110px;
                }
                @media (max-width: 480px) {
                    .pp-section { margin-bottom: 44px; }
                }
                @media (max-width: 320px) {
                    .pp-section { margin-bottom: 36px; }
                }

                .pp-section-header {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    margin-bottom: 28px;
                    padding-bottom: 16px;
                    border-bottom: 1px solid ${C.lightGray};
                }
                @media (max-width: 320px) {
                    .pp-section-header { gap: 10px; margin-bottom: 20px; }
                }

                .pp-section-icon {
                    width: 44px;
                    height: 44px;
                    background: linear-gradient(135deg, rgba(192,41,42,0.1), rgba(201,168,76,0.1));
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    flex-shrink: 0;
                }
                @media (max-width: 320px) {
                    .pp-section-icon { width: 36px; height: 36px; font-size: 16px; border-radius: 8px; }
                }

                .pp-section-title {
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(1.15rem, 2.5vw, 1.5rem);
                    font-weight: 700;
                    color: ${C.navy};
                }

                .pp-subsection {
                    margin-bottom: 22px;
                    padding: 20px 22px;
                    background: ${C.offWhite};
                    border-radius: 14px;
                    border-left: 3px solid ${C.red};
                }
                @media (max-width: 380px) {
                    .pp-subsection { padding: 16px 16px; border-radius: 10px; }
                }
                @media (max-width: 320px) {
                    .pp-subsection { padding: 14px 14px; border-radius: 8px; margin-bottom: 16px; }
                }

                .pp-subsection-title {
                    font-family: 'Inter', sans-serif;
                    font-size: 13px;
                    font-weight: 700;
                    color: ${C.navy};
                    margin-bottom: 8px;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                }

                .pp-subsection-text {
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                    line-height: 1.85;
                    color: #5A6380;
                }
                @media (max-width: 320px) {
                    .pp-subsection-text { font-size: 13px; line-height: 1.75; }
                }

                .pp-contact-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 14px;
                    margin-top: 8px;
                }
                @media (max-width: 480px) {
                    .pp-contact-grid { grid-template-columns: 1fr; }
                }

                .pp-contact-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    padding: 16px;
                    background: ${C.white};
                    border-radius: 12px;
                    border: 1px solid ${C.lightGray};
                }
                @media (max-width: 320px) {
                    .pp-contact-item { padding: 12px; gap: 8px; }
                }

                .pp-breadcrumb {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 12px;
                    font-family: 'Inter', sans-serif;
                    color: rgba(255,255,255,0.5);
                    margin-bottom: 24px;
                    flex-wrap: wrap;
                }
                @media (max-width: 320px) {
                    .pp-breadcrumb { font-size: 11px; gap: 6px; }
                }

                .pp-hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(201,168,76,0.12);
                    border: 1px solid rgba(201,168,76,0.25);
                    padding: 6px 16px;
                    border-radius: 30px;
                    font-size: 10px;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    color: ${C.gold};
                    font-family: 'Inter', sans-serif;
                    font-weight: 600;
                    margin-bottom: 20px;
                }

                .pp-hero-title {
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(2.2rem, 5vw, 4rem);
                    font-weight: 700;
                    color: ${C.white};
                    line-height: 1.1;
                    margin-bottom: 16px;
                    letter-spacing: -1px;
                }

                .pp-toc-mobile {
                    display: none;
                    background: ${C.offWhite};
                    border-radius: 16px;
                    padding: 20px;
                    margin-bottom: 36px;
                    border: 1px solid ${C.lightGray};
                }
                @media (max-width: 960px) {
                    .pp-toc-mobile { display: block; }
                }
                @media (max-width: 320px) {
                    .pp-toc-mobile { padding: 16px; border-radius: 12px; }
                }

                .pp-toc-mobile-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 0;
                    font-size: 12.5px;
                    font-family: 'Inter', sans-serif;
                    color: #5A6380;
                    cursor: pointer;
                    border-bottom: 1px solid rgba(14,27,77,0.06);
                    transition: color 0.2s;
                }
                .pp-toc-mobile-item:last-child { border-bottom: none; padding-bottom: 0; }
                .pp-toc-mobile-item:hover { color: ${C.red}; }
                @media (max-width: 320px) {
                    .pp-toc-mobile-item { font-size: 12px; padding: 7px 0; }
                }
            `}</style>

            <Navbar scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} setCursorActive={() => {}} />

            {/* HERO */}
            <div className="pp-hero">
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${C.red},${C.gold},${C.red})` }} />
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`, backgroundSize: '60px 60px', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.08), transparent 70%)', pointerEvents: 'none' }} />

                <div style={{ maxWidth: 1140, margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <div className="pp-breadcrumb">
                        <Link to="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.color = C.gold}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                            Home
                        </Link>
                        <span style={{ color: C.gold }}>›</span>
                        <span style={{ color: 'rgba(255,255,255,0.7)' }}>Privacy Policy</span>
                    </div>
                    <div className="pp-hero-badge">
                        <span>🔒</span> Legal Document
                    </div>
                    <h1 className="pp-hero-title">
                        Privacy <span style={{ fontStyle: 'italic', fontWeight: 400, color: C.gold }}>Policy</span>
                    </h1>
                    <p style={{ fontSize: 'clamp(13px, 1.5vw, 15px)', color: 'rgba(255,255,255,0.65)', fontFamily: "'Inter', sans-serif", lineHeight: 1.8, maxWidth: 520, marginBottom: 28 }}>
                        At G5 Homes, we are committed to protecting your privacy and handling your personal information with transparency and care.
                    </p>
                    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif", letterSpacing: 1 }}>
                            <span style={{ color: C.gold }}>Effective:</span> January 1, 2026
                        </div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif", letterSpacing: 1 }}>
                            <span style={{ color: C.gold }}>Last Updated:</span> June 1, 2026
                        </div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter', sans-serif", letterSpacing: 1 }}>
                            <span style={{ color: C.gold }}>Applies to:</span> g5homes.in
                        </div>
                    </div>
                </div>
            </div>

            {/* BODY */}
            <div className="pp-layout">
                {/* SIDEBAR */}
                <aside className="pp-sidebar" style={{ display: 'block' }}>
                    <div style={{ fontSize: 9, letterSpacing: 3, color: C.red, textTransform: 'uppercase', fontWeight: 700, marginBottom: 14, fontFamily: "'Inter', sans-serif" }}>
                        On This Page
                    </div>
                    {sections.map(s => (
                        <div key={s.id} className={`pp-nav-item ${activeSection === s.id ? 'active' : ''}`}
                            onClick={() => scrollToSection(s.id)}>
                            <span style={{ fontSize: 14 }}>{s.icon}</span>
                            {s.title}
                        </div>
                    ))}
                    <div style={{ marginTop: 28, padding: '18px', background: C.navy, borderRadius: 12 }}>
                        <div style={{ fontSize: 10, letterSpacing: 2, color: C.gold, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8, fontFamily: "'Inter', sans-serif" }}>Questions?</div>
                        <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontFamily: "'Inter', sans-serif", marginBottom: 12 }}>
                            Our team is happy to help clarify any aspect of this policy.
                        </p>
                        <a href="mailto:info@g5homes.in" style={{ fontSize: 11, color: C.gold, textDecoration: 'none', fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                            info@g5homes.in →
                        </a>
                    </div>
                </aside>

                {/* CONTENT */}
                <main>
                    {/* Mobile TOC */}
                    <div className="pp-toc-mobile">
                        <div style={{ fontSize: 9, letterSpacing: 3, color: C.red, textTransform: 'uppercase', fontWeight: 700, marginBottom: 12, fontFamily: "'Inter', sans-serif" }}>
                            Jump to Section
                        </div>
                        {sections.map(s => (
                            <div key={s.id} className="pp-toc-mobile-item" onClick={() => scrollToSection(s.id)}>
                                <span>{s.icon}</span> {s.title}
                            </div>
                        ))}
                    </div>

                    {/* Intro */}
                    <div style={{ background: `linear-gradient(135deg, rgba(192,41,42,0.04), rgba(201,168,76,0.04))`, border: `1px solid rgba(192,41,42,0.12)`, borderRadius: 16, padding: '24px 28px', marginBottom: 44 }}>
                        <p style={{ fontSize: 14, lineHeight: 1.9, color: '#5A6380', fontFamily: "'Inter', sans-serif" }}>
                            This Privacy Policy explains how <strong style={{ color: C.navy }}>G5 Homes</strong> ("we", "us", or "our"), headquartered at G5 Group, NH 66, Edavilakam, Pachalloor, Thiruvananthapuram, Kerala — India 695027, collects, uses, and protects your personal information. By using our website or services, you agree to the practices described in this policy.
                        </p>
                    </div>

                    {sections.map(s => (
                        <div key={s.id} id={s.id} className="pp-section">
                            <div className="pp-section-header">
                                <div className="pp-section-icon">{s.icon}</div>
                                <h2 className="pp-section-title">{s.title}</h2>
                            </div>

                            {s.content.map((item, idx) => (
                                <div key={idx} className="pp-subsection">
                                    <div className="pp-subsection-title">{item.subtitle}</div>
                                    <p className="pp-subsection-text">{item.text}</p>
                                </div>
                            ))}

                            {s.contactInfo && (
                                <div className="pp-contact-grid">
                                    {[
                                        { icon: '📧', label: 'Email', value: 'info@g5homes.in', href: 'mailto:info@g5homes.in' },
                                        { icon: '📞', label: 'Phone', value: '+91 9074525538', href: 'tel:+919074525538' },
                                        { icon: '📍', label: 'Address', value: 'NH 66, Edavilakam, Pachalloor, Thiruvananthapuram, Kerala 695027', href: null },
                                        { icon: '🕐', label: 'Hours', value: 'Mon – Sat: 9AM – 5:30PM IST', href: null },
                                    ].map((c, i) => (
                                        <div key={i} className="pp-contact-item">
                                            <div style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${C.navy}, ${C.navyMid})`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{c.icon}</div>
                                            <div>
                                                <div style={{ fontSize: 10, letterSpacing: 1.5, color: C.midGray, textTransform: 'uppercase', fontFamily: "'Inter', sans-serif", fontWeight: 600, marginBottom: 4 }}>{c.label}</div>
                                                {c.href
                                                    ? <a href={c.href} style={{ fontSize: 12.5, color: C.red, fontFamily: "'Inter', sans-serif", textDecoration: 'none', fontWeight: 500 }}>{c.value}</a>
                                                    : <div style={{ fontSize: 12.5, color: '#5A6380', fontFamily: "'Inter', sans-serif", lineHeight: 1.5 }}>{c.value}</div>
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Footer note */}
                    <div style={{ marginTop: 20, padding: '20px 24px', background: C.navy, borderRadius: 14, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                        <div style={{ fontSize: 24, flexShrink: 0 }}>🏗️</div>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: C.gold, fontFamily: "'Inter', sans-serif", marginBottom: 4 }}>G5 Homes — Building Trust Since 2019</div>
                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>
                                Also see our <Link to="/terms" style={{ color: C.gold, textDecoration: 'none' }}>Terms & Conditions</Link>. For all other queries, <Link to="/contact" style={{ color: C.gold, textDecoration: 'none' }}>contact our team</Link>.
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
}