// src/pages/TermsAndConditions.jsx

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
        id: 'acceptance',
        title: 'Acceptance of Terms',
        icon: '📜',
        content: [
            {
                subtitle: 'Agreement to Terms',
                text: 'By accessing or using the G5 Homes website (g5homes.in), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website or services.'
            },
            {
                subtitle: 'Amendments',
                text: 'G5 Homes reserves the right to modify, update, or replace these Terms at any time without prior notice. Changes will be effective immediately upon posting. Your continued use of the website constitutes acceptance of the modified terms.'
            }
        ]
    },
    {
        id: 'services',
        title: 'Our Services',
        icon: '🏗️',
        content: [
            {
                subtitle: 'Scope of Services',
                text: 'G5 Homes provides residential construction, home building, interior design, and architectural consultation services in Kerala, India. Detailed project specifications, timelines, and costs will be outlined in separate construction agreements or work orders.'
            },
            {
                subtitle: 'Consultations & Estimates',
                text: 'Initial consultations and cost estimates are provided based on the information you share. Estimates are not final quotes and may be subject to change based on site conditions, material availability, or revised requirements. Written quotations shall prevail over any verbal discussions.'
            }
        ]
    },
    {
        id: 'user-obligations',
        title: 'User Obligations',
        icon: '⚖️',
        content: [
            {
                subtitle: 'Accurate Information',
                text: 'You agree to provide accurate, current, and complete information when contacting us, requesting consultations, or engaging our services. G5 Homes is not liable for delays or issues arising from incorrect information provided by you.'
            },
            {
                subtitle: 'Prohibited Conduct',
                text: 'You may not use our website for any unlawful purpose, to harass or harm others, to transmit malware, to impersonate any person or entity, or to interfere with the proper functioning of the website.'
            },
            {
                subtitle: 'Site Access',
                text: 'For safety and privacy reasons, access to active construction sites requires prior authorization and accompaniment by a G5 Homes representative. You agree to follow all safety instructions when visiting our project sites.'
            }
        ]
    },
    {
        id: 'intellectual-property',
        title: 'Intellectual Property',
        icon: '©️',
        content: [
            {
                subtitle: 'Ownership',
                text: 'All content on this website — including text, graphics, logos, images, designs, project portfolios, architectural renderings, and software — is the exclusive property of G5 Homes or its licensors and is protected by Indian copyright and intellectual property laws.'
            },
            {
                subtitle: 'Limited License',
                text: 'You are granted a limited, non-exclusive, non-transferable license to access and view the content for personal, non-commercial use. You may not reproduce, distribute, modify, create derivative works of, or publicly display any content without prior written consent from G5 Homes.'
            },
            {
                subtitle: 'Trademarks',
                text: '"G5 Homes", the G5 logo, and associated marks are registered or unregistered trademarks. Unauthorized use of these trademarks is prohibited.'
            }
        ]
    },
    {
        id: 'payments',
        title: 'Payments & Fees',
        icon: '💰',
        content: [
            {
                subtitle: 'Payment Terms',
                text: 'Construction and design services are governed by separate payment schedules outlined in your project agreement. Typically, payments are linked to project milestones (foundation, framing, finishing, etc.). All amounts are in Indian Rupees (INR) unless specified otherwise.'
            },
            {
                subtitle: 'Late Payments',
                text: 'Delays in payment may result in project delays, suspension of work, or additional interest charges as specified in your agreement. G5 Homes reserves the right to file a lien on the property for unpaid dues.'
            },
            {
                subtitle: 'Refund Policy',
                text: 'Advance payments for design consultations or site visits are generally non-refundable. For construction projects, refunds if any will be governed by the specific cancellation terms in your project agreement.'
            }
        ]
    },
    {
        id: 'limitation-liability',
        title: 'Limitation of Liability',
        icon: '⚠️',
        content: [
            {
                subtitle: 'Disclaimer of Warranties',
                text: 'The website and its content are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. G5 Homes does not warrant that the website will be uninterrupted, error-free, or free of viruses or harmful components.'
            },
            {
                subtitle: 'Liability Cap',
                text: 'To the fullest extent permitted by law, G5 Homes shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the website or our services. Our total liability shall not exceed the amount paid by you (if any) for services in the preceding six months.'
            },
            {
                subtitle: 'Construction Specifics',
                text: 'Construction projects involve inherent risks including weather delays, material price fluctuations, and unforeseen site conditions. While we strive to meet deadlines, G5 Homes is not liable for delays beyond our reasonable control (force majeure).'
            }
        ]
    },
    {
        id: 'warranty',
        title: 'Warranty Information',
        icon: '🛡️',
        content: [
            {
                subtitle: 'Construction Warranty',
                text: 'G5 Homes offers a standard structural warranty on completed homes as specified in your construction agreement (typically 5-10 years for structural defects). Material warranties pass through from manufacturers. This warranty does not cover normal wear and tear, misuse, unauthorized modifications, or damage from natural disasters.'
            },
            {
                subtitle: 'Warranty Claims',
                text: 'To make a warranty claim, you must notify us in writing within 14 days of discovering the defect, provide reasonable access for inspection, and allow G5 Homes a reasonable period to remedy the issue.'
            }
        ]
    },
    {
        id: 'indemnification',
        title: 'Indemnification',
        icon: '🛡️',
        content: [
            {
                subtitle: 'Your Responsibility',
                text: 'You agree to indemnify, defend, and hold harmless G5 Homes, its directors, employees, contractors, and affiliates from any claims, damages, losses, liabilities, costs, or expenses (including reasonable legal fees) arising out of your breach of these Terms, your misuse of the website, or your violation of any law or third-party rights.'
            }
        ]
    },
    {
        id: 'third-party',
        title: 'Third-Party Links',
        icon: '🔗',
        content: [
            {
                subtitle: 'External Sites',
                text: 'Our website may contain links to third-party websites (social media, material suppliers, design inspiration sites, etc.). These links are provided for convenience only. G5 Homes does not control, endorse, or assume responsibility for the content, privacy practices, or terms of any third-party sites.'
            }
        ]
    },
    {
        id: 'governing-law',
        title: 'Governing Law',
        icon: '⚖️',
        content: [
            {
                subtitle: 'Jurisdiction',
                text: 'These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of our services shall be subject to the exclusive jurisdiction of the courts in Thiruvananthapuram, Kerala.'
            },
            {
                subtitle: 'Dispute Resolution',
                text: 'Prior to initiating legal proceedings, both parties agree to make a good-faith effort to resolve disputes through negotiation. If unresolved, disputes may be referred to mediation or arbitration in Thiruvananthapuram, as mutually agreed.'
            }
        ]
    },
    {
        id: 'severability',
        title: 'Severability',
        icon: '✂️',
        content: [
            {
                subtitle: 'Partial Invalidity',
                text: 'If any provision of these Terms is found to be unenforceable or invalid by a court of competent jurisdiction, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.'
            }
        ]
    },
    {
        id: 'contact',
        title: 'Contact Us',
        icon: '📞',
        content: [
            {
                subtitle: 'Questions & Notices',
                text: 'For questions about these Terms, to request permissions for content use, or to send formal notices, please contact us:'
            }
        ],
        contactInfo: true
    }
];

export default function TermsAndConditions() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('acceptance');

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
                <title>Terms & Conditions | G5 Homes – Trusted Home Builders in Kerala</title>
                <meta name="description" content="Read G5 Homes' Terms and Conditions for website usage, construction services, payment terms, warranties, and legal disclaimers." />
                <link rel="canonical" href="https://g5homes.in/terms-and-conditions" />
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
                    .pp-section-header { gap: 10px; margin-bottom: 20px; padding-bottom: 12px; }
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
                    .pp-subsection { padding: 16px 16px; border-radius: 10px; margin-bottom: 16px; }
                }
                @media (max-width: 320px) {
                    .pp-subsection { padding: 14px 14px; border-radius: 8px; margin-bottom: 14px; }
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
                @media (max-width: 320px) {
                    .pp-subsection-title { font-size: 12px; margin-bottom: 6px; }
                }

                .pp-subsection-text {
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                    line-height: 1.85;
                    color: #5A6380;
                }
                @media (max-width: 320px) {
                    .pp-subsection-text { font-size: 12.5px; line-height: 1.75; }
                }

                .pp-contact-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 14px;
                    margin-top: 8px;
                }
                @media (max-width: 480px) {
                    .pp-contact-grid { grid-template-columns: 1fr; gap: 12px; }
                }
                @media (max-width: 320px) {
                    .pp-contact-grid { gap: 10px; }
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
                @media (max-width: 380px) {
                    .pp-contact-item { padding: 14px; gap: 10px; }
                }
                @media (max-width: 320px) {
                    .pp-contact-item { padding: 12px; gap: 8px; border-radius: 10px; }
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
                    .pp-breadcrumb { font-size: 11px; gap: 6px; margin-bottom: 18px; }
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
                @media (max-width: 320px) {
                    .pp-hero-badge { font-size: 9px; letter-spacing: 2.5px; padding: 5px 12px; margin-bottom: 16px; gap: 6px; }
                }

                .pp-hero-title {
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(2rem, 5vw, 4rem);
                    font-weight: 700;
                    color: ${C.white};
                    line-height: 1.1;
                    margin-bottom: 16px;
                    letter-spacing: -1px;
                }
                @media (max-width: 320px) {
                    .pp-hero-title { margin-bottom: 12px; letter-spacing: -0.5px; }
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
                @media (max-width: 380px) {
                    .pp-toc-mobile { padding: 16px; border-radius: 14px; margin-bottom: 28px; }
                }
                @media (max-width: 320px) {
                    .pp-toc-mobile { padding: 14px; border-radius: 12px; margin-bottom: 24px; }
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
                    .pp-toc-mobile-item { font-size: 11.5px; padding: 7px 0; gap: 6px; }
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
                        <span style={{ color: 'rgba(255,255,255,0.7)' }}>Terms & Conditions</span>
                    </div>
                    <div className="pp-hero-badge">
                        <span>⚖️</span> Legal Agreement
                    </div>
                    <h1 className="pp-hero-title">
                        Terms & <span style={{ fontStyle: 'italic', fontWeight: 400, color: C.gold }}>Conditions</span>
                    </h1>
                    <p style={{ fontSize: 'clamp(12.5px, 1.5vw, 15px)', color: 'rgba(255,255,255,0.65)', fontFamily: "'Inter', sans-serif", lineHeight: 1.8, maxWidth: 560, marginBottom: 28 }}>
                        Please read these terms carefully. They govern your use of our website and the construction services provided by G5 Homes.
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
                            <span style={{ fontSize: '11px' }}>{s.title}</span>
                        </div>
                    ))}
                    <div style={{ marginTop: 28, padding: '18px', background: C.navy, borderRadius: 12 }}>
                        <div style={{ fontSize: 10, letterSpacing: 2, color: C.gold, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8, fontFamily: "'Inter', sans-serif" }}>Legal Notice</div>
                        <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontFamily: "'Inter', sans-serif", marginBottom: 12 }}>
                            These terms form a binding agreement. For project-specific contracts, refer to your signed construction agreement.
                        </p>
                        <a href="mailto:legal@g5homes.in" style={{ fontSize: 11, color: C.gold, textDecoration: 'none', fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                            legal@g5homes.in →
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
                            These Terms and Conditions constitute a legally binding agreement between <strong style={{ color: C.navy }}>G5 Homes</strong> ("we", "us", or "our"), headquartered at G5 Group, NH 66, Edavilakam, Pachalloor, Thiruvananthapuram, Kerala — India 695027, and you ("user" or "client"). By accessing our website or engaging our services, you accept these terms in full.
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
                                        { icon: '📞', label: 'Phone', value: '+91 6282582923', href: 'tel:+916282582923' },
                                        { icon: '📍', label: 'Address', value: 'NH 66, Edavilakam, Pachalloor, Thiruvananthapuram, Kerala 695027', href: null },
                                        { icon: '🕐', label: 'Hours', value: 'Mon – Sat: 9AM – 5:30PM IST', href: null },
                                        { icon: '⚖️', label: 'Legal Notices', value: 'legal@g5homes.in', href: 'mailto:legal@g5homes.in' },
                                    ].map((c, i) => (
                                        <div key={i} className="pp-contact-item">
                                            <div style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${C.navy}, ${C.navyMid})`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{c.icon}</div>
                                            <div>
                                                <div style={{ fontSize: 10, letterSpacing: 1.5, color: C.midGray, textTransform: 'uppercase', fontFamily: "'Inter', sans-serif", fontWeight: 600, marginBottom: 4 }}>{c.label}</div>
                                                {c.href
                                                    ? <a href={c.href} style={{ fontSize: 12.5, color: C.red, fontFamily: "'Inter', sans-serif", textDecoration: 'none', fontWeight: 500, wordBreak: 'break-all' }}>{c.value}</a>
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
                                Also see our <Link to="/privacy-policy" style={{ color: C.gold, textDecoration: 'none' }}>Privacy Policy</Link>. For all other queries, <Link to="/contact" style={{ color: C.gold, textDecoration: 'none' }}>contact our team</Link>.
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
}