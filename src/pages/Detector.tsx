import KeyboardDetector from '../components/KeyboardDetector';
import CameraDetector from '../components/CameraDetector';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Detector = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="text-xl">🔧</span>
            </div>
            <span className="text-xl font-bold text-foreground">HardwareCheck</span>
          </button>
          <LanguageSwitcher />
        </div>
      </header>

      <div className="container max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 space-y-4 animate-fade-in">
          <h1 className="text-5xl font-bold text-gradient">{t.title}</h1>
          <p className="text-muted-foreground text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Detection Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <KeyboardDetector />
          <CameraDetector />
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>{t.footer}</p>
        </div>
      </div>
    </div>
  );
};

export default Detector;
