"use client";

import { useState, useCallback, memo } from "react";
import { FaUtensils, FaUserTie, FaBuilding, FaWhatsapp, FaTelegramPlane, FaStar, FaTimes, FaInstagram, FaArrowRight, FaHeart, FaPaperPlane } from "react-icons/fa";
import { useRouter, usePathname } from 'next/navigation';

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
          size={36}
          color={star <= rating ? color : "#cbd5e1"}
          style={{
            transition: "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
            filter: star <= rating ? "drop-shadow(0 0 5px currentColor)" : "none"
          }}
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
  placeholder,
  delay
}) => {
  const handleFeedbackChange = useCallback((e) => {
    setFeedback(e.target.value);
  }, [setFeedback]);

  return (
    <div
      className="section-card animated-card"
      style={{
        ...styles.section,
        background: "#ffffff",
        animationDelay: `${delay}s`
      }}
    >
      <div style={styles.sectionHeader}>
        <div
          className="glow-icon"
          style={{
            ...styles.iconWrapper,
            background: `${color}15`,
            border: `2px solid ${color}30`,
            animation: "iconGlow 2s ease-in-out infinite"
          }}
        >
          <Icon size={28} color={color} />
        </div>
        <h3 style={{ ...styles.sectionTitle, color: "#1e293b" }}>{title}</h3>
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
  const instagramUrl = "https://www.instagram.com/lazizhouse";

  const texts = {
    ru: {
      title: "Оцените ваш визит",
      subtitle: "Ваше мнение помогает нам становиться лучше",
      foodTitle: "Оценка блюд",
      serviceTitle: "Качество обслуживания",
      atmosphereTitle: "Атмосфера и интерьер",
      foodPlaceholder: "Поделитесь впечатлениями о блюдах...",
      servicePlaceholder: "Расскажите о качестве обслуживания...",
      atmospherePlaceholder: "Опишите атмосферу и интерьер...",
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
      foodPlaceholder: "Share your thoughts about the food...",
      servicePlaceholder: "Tell us about the service quality...",
      atmospherePlaceholder: "Describe the atmosphere and interior...",
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
      {/* Animated Background */}
      <div style={styles.animatedBg}></div>
      <div style={styles.gradientBg}></div>

      {/* Floating Particles */}
      <div style={styles.particles}>
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            style={{
              ...styles.particle,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}
          />
        ))}
      </div>

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
              <FaPaperPlane size={24} color="#8b5cf6" />
              <span>Laziz House</span>
            </div>
            <span style={styles.logoText}>Laziz House</span>
          </div>

          <div style={styles.headerActions}>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.instagramLink}
            >
              <FaInstagram size={18} />
              <span>Instagram</span>
            </a>
            <a href={`tel:${phoneNumber}`} style={styles.phoneLink}>
              <span>📞</span>
              {phoneNumber}
            </a>
            <button onClick={switchLanguage} style={styles.languageButton}>
              {isEnglish ? (
                <>
                  <span>🇷🇺</span>
                  <span>РУ</span>
                </>
              ) : (
                <>
                  <span>🇬🇧</span>
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
          <div style={styles.heroBadge}>
            <FaHeart size={14} style={{ marginRight: "8px" }} />
            WE VALUE YOUR OPINION
            <FaHeart size={14} style={{ marginLeft: "8px" }} />
          </div>
          <h1 style={styles.heroTitle}>
            {t.title}
          </h1>
          <p style={styles.heroSubtitle}>
            {t.subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <RatingSection
            title={t.foodTitle}
            rating={foodRating}
            setRating={handleFoodRating}
            feedback={foodFeedback}
            setFeedback={handleFoodFeedback}
            Icon={FaUtensils}
            color="#f59e0b"
            placeholder={t.foodPlaceholder}
            delay={0.1}
          />

          <RatingSection
            title={t.serviceTitle}
            rating={serviceRating}
            setRating={handleServiceRating}
            feedback={serviceFeedback}
            setFeedback={handleServiceFeedback}
            Icon={FaUserTie}
            color="#10b981"
            placeholder={t.servicePlaceholder}
            delay={0.2}
          />

          <RatingSection
            title={t.atmosphereTitle}
            rating={atmosphereRating}
            setRating={handleAtmosphereRating}
            feedback={atmosphereFeedback}
            setFeedback={handleAtmosphereFeedback}
            Icon={FaBuilding}
            color="#8b5cf6"
            placeholder={t.atmospherePlaceholder}
            delay={0.3}
          />

          <button
            type="submit"
            style={styles.submitButton}
            className="submit-btn"
          >
            <span>{t.submit}</span>
            <FaArrowRight style={{ marginLeft: "8px" }} />
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
    backgroundColor: "#0f0f1a",
    position: "relative",
    overflowX: "hidden",
  },
  animatedBg: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)",
    animation: "gradientBG 15s ease infinite",
    pointerEvents: "none",
    zIndex: 0,
  },
  gradientBg: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
    pointerEvents: "none",
    zIndex: -1,
  },
  particles: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
    zIndex: 0,
  },
  particle: {
    position: "absolute",
    bottom: "0",
    background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
    borderRadius: "50%",
    opacity: 0.2,
    animation: "float 3s infinite ease-in-out",
  },
  header: {
    borderBottom: "1px solid rgba(139, 92, 246, 0.2)",
    backgroundColor: "rgba(15, 15, 26, 0.9)",
    backdropFilter: "blur(20px)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  headerContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "16px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
  },
  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logoImage: {
    height: "45px",
    width: "auto",
    objectFit: "contain",
  },
  logoFallback: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "20px",
    fontWeight: "700",
    color: "#ffffff",
  },
  logoText: {
    fontSize: "22px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    letterSpacing: "-0.5px",
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  instagramLink: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#ec4899",
    textDecoration: "none",
    padding: "8px 16px",
    borderRadius: "10px",
    backgroundColor: "rgba(236, 72, 153, 0.1)",
    border: "1px solid rgba(236, 72, 153, 0.3)",
    transition: "all 0.3s ease",
    fontWeight: "500",
    fontSize: "14px",
  },
  phoneLink: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#e2e8f0",
    textDecoration: "none",
    fontWeight: "500",
    padding: "8px 16px",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap",
  },
  languageButton: {
    fontSize: "14px",
    color: "#e2e8f0",
    textDecoration: "none",
    fontWeight: "500",
    padding: "8px 16px",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "inherit",
  },
  main: {
    flex: 1,
    maxWidth: "680px",
    margin: "0 auto",
    width: "100%",
    padding: "60px 24px",
    position: "relative",
    zIndex: 1,
  },
  hero: {
    textAlign: "center",
    marginBottom: "48px",
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(139, 92, 246, 0.2)",
    backdropFilter: "blur(10px)",
    padding: "8px 20px",
    borderRadius: "50px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#8b5cf6",
    marginBottom: "20px",
    letterSpacing: "1px",
    border: "1px solid rgba(139, 92, 246, 0.3)",
  },
  heroTitle: {
    fontSize: "48px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #fff 0%, #8b5cf6 50%, #ec4899 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "16px",
    letterSpacing: "-1px",
  },
  heroSubtitle: {
    fontSize: "18px",
    color: "rgba(255, 255, 255, 0.7)",
    margin: 0,
    fontWeight: "400",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  section: {
    padding: "32px",
    borderRadius: "24px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    position: "relative",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "24px",
  },
  iconWrapper: {
    width: "56px",
    height: "56px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "600",
  },
  starsWrapper: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    marginBottom: "24px",
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
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    resize: "vertical",
    fontFamily: "inherit",
    backgroundColor: "#ffffff",
    color: "#1e293b",
    boxSizing: "border-box",
  },
  submitButton: {
    background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
    color: "white",
    border: "none",
    padding: "18px 32px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "16px",
    cursor: "pointer",
    marginTop: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    gap: "8px",
  },
  footer: {
    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
    backgroundColor: "rgba(15, 15, 26, 0.9)",
    backdropFilter: "blur(20px)",
    padding: "24px",
    marginTop: "auto",
    position: "relative",
    zIndex: 1,
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
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: "14px",
  },
  devLink: {
    color: "#8b5cf6",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "14px",
    transition: "color 0.2s ease",
  },
  devName: {
    fontWeight: "600",
    color: "#ec4899",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    backdropFilter: "blur(12px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    zIndex: 1000,
  },
  modalContent: {
    background: "linear-gradient(135deg, #1a1a2e, #16213e)",
    borderRadius: "24px",
    padding: "32px",
    maxWidth: "460px",
    width: "100%",
    border: "1px solid rgba(139, 92, 246, 0.3)",
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
    color: "#ffffff",
  },
  closeButton: {
    background: "rgba(255, 255, 255, 0.1)",
    border: "none",
    cursor: "pointer",
    color: "#ffffff",
    padding: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    transition: "all 0.2s ease",
  },
  modalPreview: {
    background: "rgba(0, 0, 0, 0.3)",
    padding: "18px",
    borderRadius: "16px",
    fontSize: "14px",
    whiteSpace: "pre-wrap",
    marginBottom: "24px",
    border: "1px solid rgba(139, 92, 246, 0.2)",
    color: "#e2e8f0",
    maxHeight: "300px",
    overflowY: "auto",
    lineHeight: "1.6",
  },
  modalButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  shareButton: {
    background: "rgba(255, 255, 255, 0.05)",
    border: "2px solid",
    padding: "14px 18px",
    fontSize: "15px",
    fontWeight: "500",
    borderRadius: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    transition: "all 0.2s ease",
    color: "#ffffff",
  },
};