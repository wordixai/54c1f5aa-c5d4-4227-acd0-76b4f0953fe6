import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Landing = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const features = [
    {
      icon: '⌨️',
      title: t.landing.features.keyboard.title,
      description: t.landing.features.keyboard.description,
      color: 'primary'
    },
    {
      icon: '📷',
      title: t.landing.features.camera.title,
      description: t.landing.features.camera.description,
      color: 'secondary'
    },
    {
      icon: '🎤',
      title: t.landing.features.audio.title,
      description: t.landing.features.audio.description,
      color: 'accent'
    },
    {
      icon: '⚡',
      title: t.landing.features.realtime.title,
      description: t.landing.features.realtime.description,
      color: 'primary'
    },
    {
      icon: '🌐',
      title: t.landing.features.multilang.title,
      description: t.landing.features.multilang.description,
      color: 'secondary'
    }
  ];

  const steps = [
    {
      number: '01',
      title: t.landing.howItWorks.step1.title,
      description: t.landing.howItWorks.step1.description
    },
    {
      number: '02',
      title: t.landing.howItWorks.step2.title,
      description: t.landing.howItWorks.step2.description
    },
    {
      number: '03',
      title: t.landing.howItWorks.step3.title,
      description: t.landing.howItWorks.step3.description
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="text-xl">🔧</span>
            </div>
            <span className="text-xl font-bold text-foreground">HardwareCheck</span>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container max-w-7xl mx-auto px-4 py-24 relative">
          <div className="text-center space-y-8 animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold text-gradient leading-tight">
              {t.landing.hero.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.landing.hero.subtitle}
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => navigate('/detector')}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg"
              >
                {t.landing.hero.cta}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card/30">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-foreground">{t.landing.features.title}</h2>
            <p className="text-lg text-muted-foreground">{t.landing.features.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-xl p-6 card-glow animate-fade-in hover:scale-105 transition-transform"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-foreground">{t.landing.howItWorks.title}</h2>
            <p className="text-lg text-muted-foreground">{t.landing.howItWorks.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative animate-fade-in"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary text-2xl font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-5xl font-bold text-gradient">{t.landing.cta.title}</h2>
          <p className="text-xl text-muted-foreground">{t.landing.cta.subtitle}</p>
          <button
            onClick={() => navigate('/detector')}
            className="bg-primary text-primary-foreground px-12 py-5 rounded-lg font-semibold text-xl hover:opacity-90 transition-opacity shadow-xl"
          >
            {t.landing.cta.button}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container max-w-7xl mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2024 HardwareCheck. {t.footer}</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
