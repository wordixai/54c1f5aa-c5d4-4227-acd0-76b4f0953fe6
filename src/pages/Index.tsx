import KeyboardDetector from '../components/KeyboardDetector';
import CameraDetector from '../components/CameraDetector';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        {/* Language Switcher */}
        <div className="flex justify-end mb-6 animate-fade-in">
          <LanguageSwitcher />
        </div>

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

export default Index;
