import { useState, useEffect } from 'react';
import StatusBadge from './StatusBadge';

interface KeyPress {
  key: string;
  code: string;
  timestamp: number;
}

const KeyboardDetector = () => {
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
    <div className="bg-card border border-border rounded-xl p-6 card-glow animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <span className="text-2xl">⌨️</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">键盘检测</h2>
            <p className="text-sm text-muted-foreground">按任意键开始测试</p>
          </div>
        </div>
        <StatusBadge status={status} label={status === 'active' ? '检测中' : '等待输入'} />
      </div>

      <div className="space-y-4">
        {lastKey ? (
          <div className="bg-muted/50 rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">当前按键</span>
              <span className="text-xs text-muted-foreground">
                {new Date(lastKey.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-primary">{lastKey.key}</div>
              <div className="flex-1 space-y-1">
                <div className="text-sm">
                  <span className="text-muted-foreground">键名: </span>
                  <span className="text-foreground font-mono">{lastKey.key}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">键码: </span>
                  <span className="text-foreground font-mono">{lastKey.code}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-muted/30 rounded-lg p-8 border border-dashed border-border text-center">
            <p className="text-muted-foreground">按下任意键开始测试...</p>
          </div>
        )}

        {keyHistory.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">最近按键</h3>
            <div className="flex flex-wrap gap-2">
              {keyHistory.map((kp, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 bg-muted rounded-md text-sm font-mono text-foreground border border-border"
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
