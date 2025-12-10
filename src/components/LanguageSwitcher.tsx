import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-muted/30 backdrop-blur-sm border border-border/50 rounded-xl p-1">
      <button
        onClick={() => setLanguage('zh')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          language === 'zh'
            ? 'bg-primary/20 text-primary shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
        }`}
      >
        中文
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
          language === 'en'
            ? 'bg-primary/20 text-primary shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
        }`}
      >
        English
      </button>
    </div>
  );
};

export default LanguageSwitcher;
