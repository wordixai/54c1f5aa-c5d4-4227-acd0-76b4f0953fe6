import { useState, useEffect } from 'react';
import StatusBadge from './StatusBadge';
import { useLanguage } from '../contexts/LanguageContext';

interface KeyPress {
  key: string;
  code: string;
  timestamp: number;
}

const KeyboardDetector = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'active'>('idle');
  const [lastKey, setLastKey] = useState<KeyPress | null>(null);
  const [keyHistory, setKeyHistory] = useState<KeyPress[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyPress: KeyPress = {
        key: e.key,
        code: e.code,
        timestamp: Date.now()
      };

      setLastKey(keyPress);
      setStatus('active');
      setKeyHistory((prev) => [keyPress, ...prev].slice(0, 5));

      setTimeout(() => setStatus('idle'), 300);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="glass-card rounded-2xl p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shadow-lg shadow-primary/10">
            <span className="text-3xl">⌨️</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{t.keyboard.title}</h2>
            <p className="text-sm text-muted-foreground">{t.keyboard.subtitle}</p>
          </div>
        </div>
        <StatusBadge status={status} label={status === 'active' ? t.keyboard.detecting : t.keyboard.waiting} />
      </div>

      <div className="space-y-6">
        {lastKey ? (
          <div className="bg-muted/30 rounded-xl p-6 border border-border/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">{t.keyboard.currentKey}</span>
              <span className="text-xs text-muted-foreground font-mono">
                {new Date(lastKey.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-xl number-badge flex items-center justify-center">
                <span className="text-3xl font-bold text-foreground">{lastKey.key}</span>
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-16">{t.keyboard.keyName}:</span>
                  <span className="text-foreground font-mono bg-muted/50 px-3 py-1 rounded-lg">{lastKey.key}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-16">{t.keyboard.keyCode}:</span>
                  <span className="text-foreground font-mono bg-muted/50 px-3 py-1 rounded-lg">{lastKey.code}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-muted/20 rounded-xl p-12 border border-dashed border-border/50 text-center">
            <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl opacity-50">⌨️</span>
            </div>
            <p className="text-muted-foreground">{t.keyboard.placeholder}</p>
          </div>
        )}

        {keyHistory.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">{t.keyboard.recentKeys}</h3>
            <div className="flex flex-wrap gap-2">
              {keyHistory.map((kp, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-muted/30 rounded-lg text-sm font-mono text-foreground border border-border/50 hover:bg-muted/50 transition-colors"
                >
                  {kp.key}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KeyboardDetector;
