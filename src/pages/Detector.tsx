import KeyboardDetector from '../components/KeyboardDetector';
import CameraDetector from '../components/CameraDetector';
import AudioDetector from '../components/AudioDetector';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Detector = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="glow-orb glow-orb-primary w-[500px] h-[500px] -top-32 -right-32 opacity-30" />
        <div className="glow-orb glow-orb-secondary w-[400px] h-[400px] bottom-0 -left-32 opacity-30" style={{ animationDelay: '3s' }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
        <div className="container max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-xl">🔧</span>
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">HardwareCheck</span>
          </button>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="container max-w-6xl mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            实时检测
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gradient">{t.title}</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Detection Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <KeyboardDetector />
          <CameraDetector />
          <AudioDetector />
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground bg-card/50 backdrop-blur-sm rounded-xl px-6 py-4 inline-block border border-border/50">
            {t.footer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Detector;
