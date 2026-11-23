import { useEffect, useState } from 'react';
import { AccessibilityBar } from './components/AccessibilityBar';
import { ContactSection } from './components/ContactSection';
import { DiscAppSection } from './components/DiscAppSection';
import { FacilitatorSection } from './components/FacilitatorSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { OfferSection } from './components/OfferSection';
import { OfflineIndicator } from './components/OfflineIndicator';
import { OutcomesSection } from './components/OutcomesSection';

export default function App() {
  const [prefilledScope, setPrefilledScope] = useState('');
  const [prefilledTeamSize, setPrefilledTeamSize] = useState<number | null>(null);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('a11y-large-text', largeText);
  }, [largeText]);

  useEffect(() => {
    document.documentElement.classList.toggle('a11y-high-contrast', highContrast);
  }, [highContrast]);

  const scrollTo = (id: string) => {
    const performScroll = () => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      if (id === 'contact') {
        setTimeout(() => {
          document.getElementById('contact-name')?.focus({ preventScroll: true });
        }, 450);
      }
    };

    if (isFocusMode && id !== 'disc-app') {
      setIsFocusMode(false);
      setTimeout(performScroll, 60);
      return;
    }
    performScroll();
  };

  const handleSelectOffer = (offerTitle: string) => {
    setPrefilledScope(offerTitle);
    scrollTo('contact');
  };

  const handleApplyScope = (scopeSummary: string, teamSize: number) => {
    setPrefilledScope(scopeSummary);
    setPrefilledTeamSize(teamSize);
    scrollTo('contact');
  };

  return (
    <div className="min-h-screen bg-white text-[#0B1F17]">
      <Header
        onBookClick={() => scrollTo('contact')}
        onAppClick={() => scrollTo('disc-app')}
      />

      <main id="main-content">
        <AccessibilityBar
          largeText={largeText}
          onToggleLargeText={() => setLargeText((prev) => !prev)}
          highContrast={highContrast}
          onToggleHighContrast={() => setHighContrast((prev) => !prev)}
        />

        {!isFocusMode && (
          <>
            <Hero
              onBookClick={() => scrollTo('contact')}
              onExploreAppClick={() => scrollTo('disc-app')}
            />
            <OfferSection onSelectOffer={handleSelectOffer} />
          </>
        )}

        <DiscAppSection
          onApplyScope={handleApplyScope}
          isFocusMode={isFocusMode}
          onToggleFocusMode={() => setIsFocusMode((prev) => !prev)}
        />

        {!isFocusMode && (
          <>
            <OutcomesSection />
            <FacilitatorSection />
            <ContactSection
              prefilledScope={prefilledScope}
              prefilledTeamSize={prefilledTeamSize}
            />
          </>
        )}
      </main>

      {!isFocusMode && <Footer />}
      <OfflineIndicator />
    </div>
  );
}
