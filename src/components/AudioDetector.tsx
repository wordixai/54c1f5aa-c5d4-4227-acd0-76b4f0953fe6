import { useState, useRef, useEffect } from 'react';
import StatusBadge from './StatusBadge';
import { useLanguage } from '../contexts/LanguageContext';

type AudioStatus = 'idle' | 'requesting' | 'active' | 'error';

const AudioDetector = () => {
  const { t } = useLanguage();
  const [micStatus, setMicStatus] = useState<AudioStatus>('idle');
  const [volumeLevel, setVolumeLevel] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number | null>(null);

  const startMicrophone = async () => {
    try {
      setMicStatus('requesting');
      setError('');

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      setMicStatus('active');
      monitorVolume();
    } catch (err) {
      setMicStatus('error');
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          setError(t.audio.errors.denied);
        } else if (err.name === 'NotFoundError') {
          setError(t.audio.errors.notFound);
        } else {
          setError(t.audio.errors.unknown);
        }
      }
    }
  };

  const monitorVolume = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);

    const update = () => {
      if (!analyserRef.current || micStatus !== 'active') return;

      analyserRef.current.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      const normalizedVolume = Math.min(100, (average / 255) * 100 * 3);
      setVolumeLevel(normalizedVolume);

      animationRef.current = requestAnimationFrame(update);
    };

    update();
  };

  const stopMicrophone = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    setMicStatus('idle');
    setVolumeLevel(0);
  };

  const playTestSound = () => {
    if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = 440;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 1);

    setIsPlayingSound(true);
    setTimeout(() => setIsPlayingSound(false), 1000);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const getMicStatusConfig = () => {
    switch (micStatus) {
      case 'requesting':
        return { status: 'active' as const, label: t.audio.requesting };
      case 'active':
        return { status: 'success' as const, label: t.audio.active };
      case 'error':
        return { status: 'error' as const, label: t.audio.failed };
      default:
        return { status: 'idle' as const, label: t.audio.notStarted };
    }
  };

  const statusConfig = getMicStatusConfig();

  return (
    <div className="glass-card rounded-2xl p-8 animate-fade-in md:col-span-2">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center shadow-lg shadow-accent/10">
            <span className="text-3xl">🎤</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{t.audio.title}</h2>
            <p className="text-sm text-muted-foreground">{t.audio.subtitle}</p>
          </div>
        </div>
        <StatusBadge status={statusConfig.status} label={statusConfig.label} />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Microphone Section */}
        <div className="space-y-5">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">🎙️</span>
            {t.audio.micTitle}
          </h3>

          {micStatus === 'error' && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 text-sm text-destructive">
              {error}
            </div>
          )}

          {micStatus === 'active' ? (
            <div className="space-y-4">
              <div className="bg-muted/20 rounded-xl p-5 border border-border/50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">{t.audio.volumeLevel}</span>
                  <span className="text-sm font-mono text-foreground bg-muted/50 px-2 py-1 rounded">{Math.round(volumeLevel)}%</span>
                </div>
                <div className="h-4 bg-muted/30 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-100"
                    style={{
                      width: `${volumeLevel}%`,
                      background: 'var(--gradient-primary)'
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-3">{t.audio.speakToTest}</p>
              </div>

              <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 text-sm text-accent flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                {t.audio.micSuccess}
              </div>

              <button
                onClick={stopMicrophone}
                className="w-full bg-destructive/10 text-destructive px-6 py-3 rounded-xl font-medium hover:bg-destructive/20 transition-colors border border-destructive/20"
              >
                {t.audio.stopMic}
              </button>
            </div>
          ) : (
            <button
              onClick={startMicrophone}
              disabled={micStatus === 'requesting'}
              className="w-full btn-primary px-6 py-3 rounded-xl font-medium text-foreground disabled:opacity-50 disabled:transform-none disabled:shadow-none"
            >
              {micStatus === 'requesting' ? t.audio.requesting : t.audio.startMic}
            </button>
          )}
        </div>

        {/* Speaker Section */}
        <div className="space-y-5">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">🔊</span>
            {t.audio.speakerTitle}
          </h3>

          <button
            onClick={playTestSound}
            disabled={isPlayingSound}
            className="w-full bg-secondary/10 text-secondary px-6 py-3 rounded-xl font-medium hover:bg-secondary/20 transition-colors border border-secondary/20 disabled:opacity-50"
          >
            {isPlayingSound ? t.audio.stopSound : t.audio.playSound}
          </button>

          {isPlayingSound && (
            <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4 text-sm text-secondary flex items-center gap-3">
              <span className="animate-pulse">🔊</span>
              {t.audio.speakerSuccess}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioDetector;
