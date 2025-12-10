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
    },
    {
      icon: '📷',
      title: t.landing.features.camera.title,
      description: t.landing.features.camera.description,
    },
    {
      icon: '🎤',
      title: t.landing.features.audio.title,
      description: t.landing.features.audio.description,
    },
    {
      icon: '🌐',
      title: t.landing.features.multilang.title,
      description: t.landing.features.multilang.description,
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

  const reasons = [
    {
      icon: '⚡',
      title: t.landing.whyChoose.reasons.instant.title,
      description: t.landing.whyChoose.reasons.instant.description
    },
    {
      icon: '🎯',
      title: t.landing.whyChoose.reasons.accurate.title,
      description: t.landing.whyChoose.reasons.accurate.description
    },
    {
      icon: '💎',
      title: t.landing.whyChoose.reasons.free.title,
      description: t.landing.whyChoose.reasons.free.description
    },
    {
      icon: '🛡️',
      title: t.landing.whyChoose.reasons.privacy.title,
      description: t.landing.whyChoose.reasons.privacy.description
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="relative z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
        <div className="container max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-xl">🔧</span>
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">HardwareCheck</span>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="glow-orb glow-orb-primary w-[600px] h-[600px] -top-40 -left-40" />
          <div className="glow-orb glow-orb-secondary w-[500px] h-[500px] top-1/3 right-0" style={{ animationDelay: '2s' }} />
          <div className="glow-orb glow-orb-primary w-[400px] h-[400px] bottom-0 left-1/3" style={{ animationDelay: '4s' }} />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              专业级硬件检测工具
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <span className="text-foreground">{t.landing.hero.title.split('硬件')[0]}</span>
              <span className="text-gradient">硬件</span>
              <span className="text-foreground">{t.landing.hero.title.split('硬件')[1] || '检测工具'}</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {t.landing.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <button
                onClick={() => navigate('/detector')}
                className="btn-primary px-10 py-4 rounded-xl font-semibold text-lg text-foreground"
              >
                {t.landing.hero.cta}
                <span className="ml-2">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

        <div className="container max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">{t.landing.features.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.landing.features.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-8 animate-fade-up group cursor-default"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-32 relative">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">{t.landing.whyChoose.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.landing.whyChoose.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {reasons.map((reason, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-8 animate-fade-up group"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-xl number-badge flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {reason.icon}
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">{reason.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />

        <div className="container max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">{t.landing.howItWorks.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.landing.howItWorks.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary/50 via-secondary/50 to-primary/50" />

            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative animate-fade-up"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <div className="text-center space-y-6">
                  <div className="relative inline-flex">
                    <div className="w-20 h-20 rounded-2xl number-badge flex items-center justify-center text-3xl font-bold text-foreground">
                      {step.number}
                    </div>
                    <div className="absolute -inset-2 rounded-3xl bg-primary/20 animate-pulse-glow" style={{ zIndex: -1 }} />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="glow-orb glow-orb-primary w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />
        </div>

        <div className="container max-w-4xl mx-auto px-6 text-center space-y-10 relative">
          <h2 className="text-5xl md:text-6xl font-bold text-gradient animate-fade-up">{t.landing.cta.title}</h2>
          <p className="text-xl text-muted-foreground animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {t.landing.cta.subtitle}
          </p>
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={() => navigate('/detector')}
              className="btn-primary px-14 py-5 rounded-xl font-semibold text-xl text-foreground"
            >
              {t.landing.cta.button}
              <span className="ml-2">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 bg-card/30 backdrop-blur-xl">
        <div className="container max-w-7xl mx-auto px-6 text-center text-muted-foreground text-sm">
          <p>© 2024 HardwareCheck. {t.footer}</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
