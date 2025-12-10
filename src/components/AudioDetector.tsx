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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startMicrophone = async () => {
    try {
      setMicStatus('requesting');
      setError('');

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Create audio context and analyser
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
    // Create a simple beep sound using Web Audio API
    if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = 440; // A4 note
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
    <div className="bg-card border border-border rounded-xl p-6 card-glow animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
            <span className="text-2xl">🎤</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{t.audio.title}</h2>
            <p className="text-sm text-muted-foreground">{t.audio.subtitle}</p>
          </div>
        </div>
        <StatusBadge status={statusConfig.status} label={statusConfig.label} />
      </div>

      <div className="space-y-6">
        {/* Microphone Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span>🎙️</span>
            {t.audio.micTitle}
          </h3>

          {micStatus === 'error' && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {micStatus === 'active' ? (
            <div className="space-y-3">
              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{t.audio.volumeLevel}</span>
                  <span className="text-sm font-mono text-foreground">{Math.round(volumeLevel)}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent to-primary transition-all duration-100"
                    style={{ width: `${volumeLevel}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">{t.audio.speakToTest}</p>
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 text-sm text-accent">
                {t.audio.micSuccess}
              </div>

              <button
                onClick={stopMicrophone}
                className="w-full bg-destructive/20 text-destructive px-4 py-2.5 rounded-lg font-medium hover:bg-destructive/30 transition-colors"
              >
                {t.audio.stopMic}
              </button>
            </div>
          ) : (
            <button
              onClick={startMicrophone}
              disabled={micStatus === 'requesting'}
              className="w-full bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {micStatus === 'requesting' ? t.audio.requesting : t.audio.startMic}
            </button>
          )}
        </div>

        {/* Speaker Section */}
        <div className="space-y-4 pt-6 border-t border-border">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span>🔊</span>
            {t.audio.speakerTitle}
          </h3>

          <button
            onClick={playTestSound}
            disabled={isPlayingSound}
            className="w-full bg-secondary text-secondary-foreground px-4 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isPlayingSound ? t.audio.stopSound : t.audio.playSound}
          </button>

          {isPlayingSound && (
            <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-3 text-sm text-secondary flex items-center gap-2">
              <span className="animate-pulse-glow">🔊</span>
              {t.audio.speakerSuccess}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioDetector;
