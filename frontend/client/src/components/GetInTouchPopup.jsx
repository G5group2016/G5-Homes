// components/GetInTouchPopup.jsx
import React, { useState, useEffect } from 'react';

// Icons
const CloseIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "24px", height: "24px" }}>
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const PhoneIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "20px", height: "20px" }}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.47 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

const MailIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "20px", height: "20px" }}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

const ArrowIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "1rem", height: "1rem" }}>
        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
);

const CheckCircleIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "48px", height: "48px" }}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "16px", height: "16px", position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

const C = {
    navy: '#0A1535',
    navyMid: '#0E1B4D',
    red: '#C0292A',
    redLight: '#D93A3B',
    redDark: '#A01F20',
    gold: '#C9A84C',
    goldLight: '#E2C97E',
    white: '#FFFFFF',
    offWhite: '#F8F6F1',
    midGray: '#8A93A8',
};

// Validation functions
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

function ErrorMsg({ msg }) {
    if (!msg) return null;
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginTop: 6,
            fontSize: 11.5,
            color: C.red,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
        }}>
            <span style={{ fontSize: 12 }}>⚠</span>
            {msg}
        </div>
    );
}

export default function GetInTouchPopup({ isOpen, onClose }) {
    const [step, setStep] = useState("initial");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: ""
    });
    const [errors, setErrors] = useState({ name: "", email: "", phone: "" });
    const [touched, setTouched] = useState({ name: false, email: false, phone: false });
    const [formFocus, setFormFocus] = useState('');
    const [loading, setLoading] = useState(false);

    const servicesList = [
        'Custom Home Construction',
        'Luxury Villa Planning & Design',
        'Interior Design & Landscaping',
        'Construction Cost Estimation',
        'Flats and Apartments',
        'Smart & Sustainable Home Development',
        'Renovation & Remodeling',
    ];

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
            setTimeout(() => {
                setStep("initial");
            }, 300);
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

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

    const handleContactClick = () => {
        setStep("form");
    };

    const handleCallNow = () => {
        window.location.href = "tel:+919074525538";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nameErr = validateName(formData.name);
        const emailErr = validateEmail(formData.email);
        const phoneErr = validatePhone(formData.phone);

        setErrors({ name: nameErr, email: emailErr, phone: phoneErr });
        setTouched({ name: true, email: true, phone: true });

        if (nameErr || emailErr || phoneErr) return;

        setLoading(true);

        try {
            const res = await fetch("https://g5-homes.onrender.com/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    phone: formData.phone.trim(),
                    service: formData.service,
                    message: formData.message.trim(),
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setStep("success");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    service: "",
                    message: "",
                });
                setErrors({ name: "", email: "", phone: "" });
                setTouched({ name: false, email: false, phone: false });

                setTimeout(() => {
                    onClose();
                    setStep("initial");
                }, 2500);
            } else {
                alert(data.message || "Submission failed. Please try again.");
            }
        } catch (err) {
            console.error(err);
            alert("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <style>{`
                .popup-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.85);
                    backdrop-filter: blur(8px);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    animation: fadeIn 0.3s ease;
                }

                .popup-container {
                    max-width: 520px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    background: linear-gradient(135deg, #0A1535 0%, #0E1B4D 100%);
                    border: 1px solid rgba(201,168,76,0.2);
                    border-radius: 24px;
                    position: relative;
                    animation: slideUp 0.3s ease;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }

                .popup-container::-webkit-scrollbar {
                    width: 6px;
                }

                .popup-container::-webkit-scrollbar-track {
                    background: rgba(201,168,76,0.1);
                    border-radius: 3px;
                }

                .popup-container::-webkit-scrollbar-thumb {
                    background: rgba(201,168,76,0.3);
                    border-radius: 3px;
                }

                .popup-close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: rgba(255, 255, 255, 0.1);
                    border: none;
                    border-radius: 50%;
                    width: 36px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: rgba(255, 255, 255, 0.7);
                    transition: all 0.2s ease;
                    z-index: 10;
                }

                .popup-close:hover {
                    background: rgba(255, 255, 255, 0.2);
                    color: #fff;
                    transform: scale(1.05);
                }

                .initial-content {
                    padding: 2rem 1.8rem;
                }

                .popup-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(201,168,76,0.1);
                    border: 1px solid rgba(201,168,76,0.2);
                    border-radius: 100px;
                    padding: 0.4rem 1rem;
                    margin-bottom: 1.5rem;
                }

                .badge-dot {
                    width: 8px;
                    height: 8px;
                    background: #C9A84C;
                    border-radius: 50%;
                    animation: pulse 2s infinite;
                }

                .badge-text {
                    font-family: 'Inter', monospace;
                    font-size: 0.7rem;
                    letter-spacing: 0.1em;
                    color: #C9A84C;
                }

                .popup-title {
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(1.3rem, 5vw, 1.8rem);
                    font-weight: 700;
                    color: #FFFFFF;
                    margin-bottom: 1rem;
                    line-height: 1.3;
                }

                .popup-title .gradient {
                    background: linear-gradient(90deg, #C9A84C, #E2C97E);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .popup-desc {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.9rem;
                    line-height: 1.6;
                    margin-bottom: 2rem;
                }

                .contact-options {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-bottom: 2rem;
                }

                .contact-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    padding: 1rem;
                    border-radius: 12px;
                    font-family: 'Inter', sans-serif;
                    font-weight: 700;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    border: 1px solid rgba(201,168,76,0.2);
                    background: rgba(201,168,76,0.05);
                    color: #FFFFFF;
                    text-decoration: none;
                }

                .contact-btn.primary {
                    background: linear-gradient(135deg, #C0292A, #A01F20);
                    border: none;
                }

                .contact-btn.primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 20px rgba(192,41,42,0.3);
                }

                .contact-btn.secondary:hover {
                    border-color: rgba(201,168,76,0.5);
                    background: rgba(201,168,76,0.1);
                    transform: translateY(-2px);
                }

                .contact-number {
                    text-align: center;
                    margin-top: 1.5rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid rgba(201,168,76,0.1);
                }

                .number-display {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    font-size: clamp(1rem, 4vw, 1.2rem);
                    font-weight: 700;
                    color: #C9A84C;
                    text-decoration: none;
                    font-family: 'Inter', monospace;
                    padding: 0.5rem 1rem;
                    background: rgba(201,168,76,0.05);
                    border-radius: 12px;
                    transition: all 0.2s ease;
                }

                .number-display:hover {
                    background: rgba(201,168,76,0.1);
                    transform: scale(1.02);
                }

                .or-divider {
                    text-align: center;
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 0.8rem;
                    margin: 1rem 0;
                    position: relative;
                }

                .or-divider::before,
                .or-divider::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    width: calc(50% - 30px);
                    height: 1px;
                    background: rgba(201,168,76,0.2);
                }

                .or-divider::before {
                    left: 0;
                }

                .or-divider::after {
                    right: 0;
                }

                .form-content {
                    padding: 2rem 1.8rem;
                }

                .form-title {
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(1.2rem, 4vw, 1.5rem);
                    font-weight: 700;
                    color: #FFFFFF;
                    margin-bottom: 0.5rem;
                }

                .form-sub {
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 0.85rem;
                    margin-bottom: 1.5rem;
                    line-height: 1.5;
                }

                .form-group {
                    margin-bottom: 1rem;
                }

                .form-group label {
                    display: block;
                    font-family: 'Inter', monospace;
                    font-size: 0.7rem;
                    letter-spacing: 0.1em;
                    color: rgba(201,168,76,0.7);
                    margin-bottom: 0.3rem;
                    text-transform: uppercase;
                }

                .form-input,
                .form-textarea {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(201,168,76,0.15);
                    border-radius: 10px;
                    color: #FFFFFF;
                    font-family: 'Inter', sans-serif;
                    font-size: 0.9rem;
                    transition: all 0.2s ease;
                }

                .form-input:focus,
                .form-textarea:focus {
                    outline: none;
                    border-color: #C9A84C;
                    box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
                }

                /* Enhanced Select Styles */
                .select-wrapper {
                    position: relative;
                    width: 100%;
                }

                .form-select {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    background: rgba(255, 255, 255, 0.08);
                    border: 1.5px solid rgba(201,168,76,0.3);
                    border-radius: 10px;
                    color: #FFFFFF;
                    font-family: 'Inter', sans-serif;
                    font-size: 0.9rem;
                    transition: all 0.2s ease;
                    cursor: pointer;
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                }

                .form-select option {
                    background: #0A1535;
                    color: #FFFFFF;
                    padding: 12px;
                }

                .form-select:focus {
                    outline: none;
                    border-color: #C9A84C;
                    box-shadow: 0 0 0 3px rgba(201,168,76,0.2);
                }

                .form-select:hover {
                    border-color: #C9A84C;
                    background: rgba(255, 255, 255, 0.12);
                }

                .form-textarea {
                    resize: vertical;
                    min-height: 90px;
                }

                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }

                .submit-btn {
                    width: 100%;
                    padding: 0.9rem;
                    background: linear-gradient(135deg, #C0292A, #A01F20);
                    border: none;
                    border-radius: 40px;
                    color: #fff;
                    font-family: 'Inter', sans-serif;
                    font-weight: 700;
                    font-size: 0.9rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    transition: all 0.2s ease;
                    margin-top: 1rem;
                    letter-spacing: 1.5px;
                }

                .submit-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 20px rgba(192,41,42,0.3);
                }

                .submit-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .back-btn {
                    width: 100%;
                    padding: 0.7rem;
                    background: transparent;
                    border: 1px solid rgba(201,168,76,0.2);
                    border-radius: 40px;
                    color: rgba(255, 255, 255, 0.7);
                    font-family: 'Inter', sans-serif;
                    font-weight: 600;
                    font-size: 0.9rem;
                    cursor: pointer;
                    margin-top: 0.8rem;
                    transition: all 0.2s ease;
                }

                .back-btn:hover {
                    border-color: rgba(201,168,76,0.5);
                    color: #fff;
                }

                .success-content {
                    padding: 3rem 2rem;
                    text-align: center;
                }

                .success-icon {
                    color: #C9A84C;
                    margin-bottom: 1rem;
                    animation: scaleIn 0.5s ease;
                }

                .success-title {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.3rem;
                    font-weight: 700;
                    color: #FFFFFF;
                    margin-bottom: 0.5rem;
                }

                .success-desc {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.9rem;
                    line-height: 1.6;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.5;
                        transform: scale(1.2);
                    }
                }

                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                @media (max-width: 600px) {
                    .initial-content,
                    .form-content,
                    .success-content {
                        padding: 1.5rem;
                    }

                    .form-row {
                        grid-template-columns: 1fr;
                        gap: 0;
                    }

                    .popup-container {
                        max-height: 85vh;
                    }
                }
            `}</style>

            <div className="popup-overlay" onClick={onClose}>
                <div className="popup-container" onClick={(e) => e.stopPropagation()}>
                    <button className="popup-close" onClick={onClose}>
                        <CloseIcon />
                    </button>

                    {step === "initial" && (
                        <div className="initial-content">
                            <div className="popup-badge">
                                <span className="badge-dot"></span>
                                <span className="badge-text">GET IN TOUCH</span>
                            </div>
                            <h2 className="popup-title">
                                Let's Build Your<br />
                                <span className="gradient"> Dream Home Together</span>
                            </h2>
                            <p className="popup-desc">
                                Choose your preferred way to connect with us. Our team is ready to discuss your vision and provide expert guidance.
                            </p>

                            <div className="contact-options">
                                <button className="contact-btn primary" onClick={handleContactClick}>
                                    <MailIcon /> Fill Contact Form
                                </button>
                                <button className="contact-btn secondary" onClick={handleCallNow}>
                                    <PhoneIcon /> Call Now: +91 9074525538
                                </button>
                            </div>

                            <div className="or-divider">OR</div>

                            <div className="contact-number">
                                <a href="https://wa.me/919074525538?text=Hello%20G5%20Homes,%20I%20would%20like%20to%20know%20more%20about%20your%20home%20construction%20services."
                                    target="_blank"
                                    rel="noreferrer"
                                    className="number-display">
                                    <PhoneIcon /> Chat on WhatsApp
                                </a>
                            </div>
                        </div>
                    )}

                    {step === "form" && (
                        <div className="form-content">
                            <h3 className="form-title">Send Your Requirements</h3>
                            <p className="form-sub">Fill in the details and our team will reach out to you within 24 hours.</p>

                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Full Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-input"
                                            value={formData.name}
                                            onChange={handleNameChange}
                                            onBlur={() => handleBlur('name')}
                                            onFocus={() => setFormFocus('name')}
                                            required
                                            placeholder="Your full name"
                                        />
                                        <ErrorMsg msg={touched.name && errors.name} />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-input"
                                            value={formData.email}
                                            onChange={handleEmailChange}
                                            onBlur={() => handleBlur('email')}
                                            onFocus={() => setFormFocus('email')}
                                            required
                                            placeholder="you@example.com"
                                        />
                                        <ErrorMsg msg={touched.email && errors.email} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="form-input"
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
                                        onBlur={() => handleBlur('phone')}
                                        onFocus={() => setFormFocus('phone')}
                                        required
                                        maxLength={10}
                                        placeholder="10-digit mobile number"
                                    />
                                    <ErrorMsg msg={touched.phone && errors.phone} />
                                </div>

                                <div className="form-group">
                                    <label>Service Required</label>
                                    <div className="select-wrapper">
                                        <select
                                            name="service"
                                            className="form-select"
                                            value={formData.service}
                                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                            onFocus={() => setFormFocus('service')}
                                            onBlur={() => setFormFocus('')}
                                            style={{
                                                background: formFocus === 'service' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.08)',
                                            }}
                                        >
                                            <option value="" style={{ color: '#8A93A8' }}>▼ Select a service...</option>
                                            {servicesList.map(s => (
                                                <option key={s} value={s} style={{ padding: '10px' }}>{s}</option>
                                            ))}
                                        </select>
                                        <ChevronDownIcon />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea
                                        name="message"
                                        className="form-textarea"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Tell us about your dream home or project requirements..."
                                    />
                                </div>

                                <button type="submit" className="submit-btn" disabled={loading}>
                                    {loading ? "Sending..." : <><span>Send Inquiry</span> <ArrowIcon /></>}
                                </button>

                                <button type="button" className="back-btn" onClick={() => setStep("initial")}>
                                    ← Back
                                </button>
                            </form>
                        </div>
                    )}

                    {step === "success" && (
                        <div className="success-content">
                            <div className="success-icon">
                                <CheckCircleIcon />
                            </div>
                            <h3 className="success-title">Message Sent!</h3>
                            <p className="success-desc">
                                Thank you for reaching out to G5 Homes. Our team will get back to you within 24 hours with personalized guidance for your dream home.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}