"use client";

import { useState, useCallback, memo } from "react";
import { FaUtensils, FaUserTie, FaBuilding, FaWhatsapp, FaTelegramPlane, FaStar, FaPaperPlane, FaTimes, FaInstagram } from "react-icons/fa";
import { useRouter, usePathname } from 'next/navigation';
import "./styles/globals.css";

// Мемоизированный компонент звездного рейтинга
const StarRating = memo(({ rating, setRating, color }) => (
  <div style={styles.starsWrapper}>
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => setRating(star)}
        style={styles.starButton}
        className="star-btn"
      >
        <FaStar 
          size={32} 
          color={star <= rating ? color : "#e5e7eb"}
          style={{ transition: "all 0.2s ease" }}
        />
      </button>
    ))}
  </div>
));

StarRating.displayName = 'StarRating';

// Мемоизированный компонент секции с отзывом
const RatingSection = memo(({ 
  title, 
  rating, 
  setRating, 
  feedback, 
  setFeedback, 
  Icon, 
  color,
  placeholder
}) => {
  const handleFeedbackChange = useCallback((e) => {
    setFeedback(e.target.value);
  }, [setFeedback]);

  return (
    <div style={{ ...styles.section, borderLeft: `4px solid ${color}` }}>
      <div style={styles.sectionHeader}>
        <div style={{ ...styles.iconWrapper, background: `${color}15` }}>
          <Icon size={24} color={color} />
        </div>
        <h3 style={styles.sectionTitle}>{title}</h3>
      </div>
      
      <StarRating rating={rating} setRating={setRating} color={color} />
      
      <textarea
        style={{ ...styles.sectionTextarea, borderColor: `${color}30` }}
        placeholder={placeholder}
        value={feedback}
        onChange={handleFeedbackChange}
        rows={3}
      />
    </div>
  );
});

RatingSection.displayName = 'RatingSection';

export default function HomePage() {
  const router = useRouter();
  const pathname = usePathname();
  const isEnglish = pathname === '/en';
  
  const [foodRating, setFoodRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(0);
  const [atmosphereRating, setAtmosphereRating] = useState(0);
  
  const [foodFeedback, setFoodFeedback] = useState("");
  const [serviceFeedback, setServiceFeedback] = useState("");
  const [atmosphereFeedback, setAtmosphereFeedback] = useState("");
  
  const [showModal, setShowModal] = useState(false);
  const [summaryText, setSummaryText] = useState("");

  const phoneNumber = "+998987744747";
  const telegramUsername = 'Ulugbek1974';
  const instagramUrl = "https://instagram.com/lazizhouse";

  // Тексты на разных языках
  const texts = {
    ru: {
      title: "Оцените ваш визит",
      subtitle: "Ваше мнение помогает нам становиться лучше",
      foodTitle: "Оценка блюд",
      serviceTitle: "Качество обслуживания",
      atmosphereTitle: "Атмосфера и интерьер",
      foodPlaceholder: "Ваш отзыв о блюдах...",
      servicePlaceholder: "Ваш отзыв об обслуживании...",
      atmospherePlaceholder: "Ваш отзыв об атмосфере...",
      submit: "Отправить оценку",
      thankYou: "Благодарим за отзыв!",
      shareTitle: "Поделиться оценкой",
      alert: "Пожалуйста, поставьте оценки всем категориям.",
      copyright: "Все права защищены.",
      developed: "Разработано",
      by: "Akbar Soft"
    },
    en: {
      title: "Rate Your Visit",
      subtitle: "Your opinion helps us become better",
      foodTitle: "Food Rating",
      serviceTitle: "Service Quality",
      atmosphereTitle: "Atmosphere & Interior",
      foodPlaceholder: "Your feedback about the food...",
      servicePlaceholder: "Your feedback about the service...",
      atmospherePlaceholder: "Your feedback about the atmosphere...",
      submit: "Submit Rating",
      thankYou: "Thank you for your feedback!",
      shareTitle: "Share Rating",
      alert: "Please rate all categories.",
      copyright: "All rights reserved.",
      developed: "Developed by",
      by: "Akbar Soft"
    }
  };

  const t = isEnglish ? texts.en : texts.ru;

  const handleFoodRating = useCallback((rating) => setFoodRating(rating), []);
  const handleServiceRating = useCallback((rating) => setServiceRating(rating), []);
  const handleAtmosphereRating = useCallback((rating) => setAtmosphereRating(rating), []);
  
  const handleFoodFeedback = useCallback((text) => setFoodFeedback(text), []);
  const handleServiceFeedback = useCallback((text) => setServiceFeedback(text), []);
  const handleAtmosphereFeedback = useCallback((text) => setAtmosphereFeedback(text), []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (foodRating === 0 || serviceRating === 0 || atmosphereRating === 0) {
      alert(t.alert);
      return;
    }

    const text = isEnglish ? `
🍽️ LAZIZ HOUSE - RATING
━━━━━━━━━━━━━━━━━━━━

⭐ Food: ${foodRating}/5
${foodFeedback ? `📝 ${foodFeedback}` : ""}

⭐ Service: ${serviceRating}/5
${serviceFeedback ? `📝 ${serviceFeedback}` : ""}

⭐ Atmosphere: ${atmosphereRating}/5
${atmosphereFeedback ? `📝 ${atmosphereFeedback}` : ""}

━━━━━━━━━━━━━━━━━━━━
${t.thankYou}
    `.trim() : `
🍽️ LAZIZ HOUSE - ОЦЕНКА
━━━━━━━━━━━━━━━━━━━━

⭐ Блюда: ${foodRating}/5
${foodFeedback ? `📝 ${foodFeedback}` : ""}

⭐ Обслуживание: ${serviceRating}/5
${serviceFeedback ? `📝 ${serviceFeedback}` : ""}

⭐ Атмосфера: ${atmosphereRating}/5
${atmosphereFeedback ? `📝 ${atmosphereFeedback}` : ""}

━━━━━━━━━━━━━━━━━━━━
${t.thankYou}
    `.trim();

    setSummaryText(text);
    setShowModal(true);
  }, [foodRating, serviceRating, atmosphereRating, foodFeedback, serviceFeedback, atmosphereFeedback, t, isEnglish]);

  const shareTo = useCallback((platform) => {
    let url = "";
    const encodedText = encodeURIComponent(summaryText);

    if (platform === "telegram") {
      url = `https://t.me/${telegramUsername}?text=${encodedText}`;
    } else if (platform === "whatsapp") {
      url = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedText}`;
    }

    window.open(url, "_blank");
    setShowModal(false);
  }, [summaryText]);

  const closeModal = useCallback(() => setShowModal(false), []);
  
  const switchLanguage = useCallback(() => {
    if (isEnglish) {
      router.push('/');
    } else {
      router.push('/en');
    }
  }, [isEnglish, router]);

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContainer}>
          <div style={styles.logoArea}>
            <img 
              src="/images/logo.png" 
              alt="Laziz House" 
              style={styles.logoImage}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div style={{ ...styles.logoFallback, display: 'none' }}>
              Laziz House
            </div>
          </div>
          
          <div style={styles.headerActions}>
            <a 
              href={instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={styles.instagramLink}
              aria-label="Instagram"
            >
              <FaInstagram size={28} />
            </a>
            <a href={`tel:${phoneNumber}`} style={styles.phoneLink}>
              {phoneNumber}
            </a>
            <button onClick={switchLanguage} style={styles.languageButton}>
              {isEnglish ? (
                <>
                  <span style={styles.flagIcon}>🇷🇺</span>
                  <span>РУ</span>
                </>
              ) : (
                <>
                  <span style={styles.flagIcon}>🇬🇧</span>
                  <span>EN</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.hero}>
          <h1 style={styles.heroTitle}>
            {t.title}
          </h1>
          <p style={styles.heroSubtitle}>
            {t.subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div className="section-card">
            <RatingSection
              title={t.foodTitle}
              rating={foodRating}
              setRating={handleFoodRating}
              feedback={foodFeedback}
              setFeedback={handleFoodFeedback}
              Icon={FaUtensils}
              color="#2563eb"
              placeholder={t.foodPlaceholder}
            />
          </div>
          
          <div className="section-card">
            <RatingSection
              title={t.serviceTitle}
              rating={serviceRating}
              setRating={handleServiceRating}
              feedback={serviceFeedback}
              setFeedback={handleServiceFeedback}
              Icon={FaUserTie}
              color="#059669"
              placeholder={t.servicePlaceholder}
            />
          </div>
          
          <div className="section-card">
            <RatingSection
              title={t.atmosphereTitle}
              rating={atmosphereRating}
              setRating={handleAtmosphereRating}
              feedback={atmosphereFeedback}
              setFeedback={handleAtmosphereFeedback}
              Icon={FaBuilding}
              color="#3b82f6"
              placeholder={t.atmospherePlaceholder}
            />
          </div>

          <button 
            type="submit" 
            style={styles.submitButton}
            className="submit-btn"
          >
            <FaPaperPlane style={{ marginRight: "8px" }} />
            {t.submit}
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <p style={styles.copyright}>
            © 2026 Laziz House. {t.copyright}
          </p>
          <a 
            href="https://akbarsoft.uz" 
            target="_blank" 
            rel="noopener noreferrer"
            style={styles.devLink}
          >
            {t.developed} <span style={styles.devName}>{t.by}</span>
          </a>
        </div>
      </footer>

      {/* Modal */}
      {showModal && (
        <div 
          style={styles.modalOverlay} 
          onClick={closeModal}
          className="modal-overlay"
        >
          <div 
            style={styles.modalContent} 
            onClick={(e) => e.stopPropagation()}
            className="modal-content"
          >
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>{t.shareTitle}</h2>
              <button 
                style={styles.closeButton}
                onClick={closeModal}
                aria-label="Закрыть"
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            <div style={styles.modalPreview}>
              {summaryText.split('\n').map((line, i) => (
                <p key={i} style={{ margin: '4px 0' }}>{line}</p>
              ))}
            </div>

            <div style={styles.modalButtons}>
              <button
                style={{ ...styles.shareButton, color: "#25D366", borderColor: "#25D36630" }}
                onClick={() => shareTo("whatsapp")}
                className="share-btn"
              >
                <FaWhatsapp size={20} style={{ marginRight: "12px", color: "#25D366" }} />
                WhatsApp
              </button>
              
              <button
                style={{ ...styles.shareButton, color: "#0088cc", borderColor: "#0088cc30" }}
                onClick={() => shareTo("telegram")}
                className="share-btn"
              >
                <FaTelegramPlane size={20} style={{ marginRight: "12px", color: "#0088cc" }} />
                Telegram
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    backgroundColor: "#ffffff",
  },
  header: {
    borderBottom: "1px solid #f1f5f9",
    backgroundColor: "#ffffff",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  headerContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
  },
  logoArea: {
    display: "flex",
    alignItems: "center",
  },
  logoImage: {
    height: "60px",
    width: "auto",
    objectFit: "contain",
  },
  logoFallback: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1e293b",
    letterSpacing: "-0.5px",
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  instagramLink: {
    color: "#E4405F",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    padding: "8px",
    borderRadius: "12px",
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
  },
  phoneLink: {
    fontSize: "15px",
    color: "#1e293b",
    textDecoration: "none",
    fontWeight: "500",
    padding: "8px 16px",
    borderRadius: "8px",
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  },
  languageButton: {
    fontSize: "15px",
    color: "#1e293b",
    textDecoration: "none",
    fontWeight: "500",
    padding: "8px 16px",
    borderRadius: "8px",
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    transition: "all 0.2s ease",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "inherit",
  },
  flagIcon: {
    fontSize: "18px",
  },
  main: {
    flex: 1,
    maxWidth: "680px",
    margin: "0 auto",
    width: "100%",
    padding: "48px 24px",
  },
  hero: {
    textAlign: "center",
    marginBottom: "48px",
  },
  heroTitle: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "8px",
    letterSpacing: "-0.5px",
  },
  heroSubtitle: {
    fontSize: "16px",
    color: "#64748b",
    margin: 0,
    fontWeight: "400",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  section: {
    background: "#ffffff",
    padding: "28px",
    borderRadius: "16px",
    border: "1px solid #f1f5f9",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "24px",
  },
  iconWrapper: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "600",
    color: "#1e293b",
  },
  starsWrapper: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  starButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTextarea: {
    width: "100%",
    padding: "14px 16px",
    fontSize: "14px",
    borderRadius: "12px",
    border: "1px solid",
    resize: "vertical",
    fontFamily: "inherit",
    backgroundColor: "#fafafa",
    boxSizing: "border-box",
  },
  submitButton: {
    background: "linear-gradient(135deg, #2563eb 0%, #059669 100%)",
    color: "white",
    border: "none",
    padding: "16px 24px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "12px",
    cursor: "pointer",
    marginTop: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  footer: {
    borderTop: "1px solid #f1f5f9",
    backgroundColor: "#ffffff",
    padding: "24px",
  },
  footerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
  },
  copyright: {
    margin: 0,
    color: "#64748b",
    fontSize: "14px",
  },
  devLink: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "14px",
    transition: "color 0.2s ease",
  },
  devName: {
    fontWeight: "600",
    color: "#059669",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    zIndex: 1000,
  },
  modalContent: {
    background: "white",
    borderRadius: "20px",
    padding: "28px",
    maxWidth: "460px",
    width: "100%",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  modalTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "600",
    color: "#0f172a",
  },
  closeButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#94a3b8",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "6px",
    transition: "all 0.2s ease",
  },
  modalPreview: {
    background: "#f8fafc",
    padding: "18px",
    borderRadius: "12px",
    fontSize: "14px",
    whiteSpace: "pre-wrap",
    marginBottom: "24px",
    border: "1px solid #e2e8f0",
    color: "#334155",
    maxHeight: "300px",
    overflowY: "auto",
    lineHeight: "1.6",
  },
  modalButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  shareButton: {
    background: "white",
    border: "2px solid",
    padding: "14px 18px",
    fontSize: "15px",
    fontWeight: "500",
    borderRadius: "12px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    transition: "all 0.2s ease",
  },
};