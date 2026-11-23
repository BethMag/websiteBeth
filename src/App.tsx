import { useState } from 'react';
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

  const scrollTo = (id: string) => {
    if (isFocusMode && id !== 'disc-app') {
      setIsFocusMode(false);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
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
    <div className="min-h-screen bg-[#F8FAF8] text-[#14241E]">
      <Header
        onBookClick={() => scrollTo('contact')}
        onAppClick={() => scrollTo('disc-app')}
      />

      <main>
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
