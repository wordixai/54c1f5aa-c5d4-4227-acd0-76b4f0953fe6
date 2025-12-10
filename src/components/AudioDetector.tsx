import { useState, useRef, useEffect } from 'react';
import StatusBadge from './StatusBadge';
import { useLanguage } from '../contexts/LanguageContext';

type AudioStatus = 'idle' | 'requesting' | 'active' | 'error';

const AudioDetector = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<AudioStatus>('idle');
  const [error, setError] = useState<string>('');
  const [volume, setVolume] = useState<number>(0);
  const [deviceInfo, setDeviceInfo] = useState<{ label: string; channelCount: number } | null>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const startAudio = async () => {
    try {
      setStatus('requesting');
      setError('');

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      streamRef.current = stream;

      // Get device info
      const audioTrack = stream.getAudioTracks()[0];
      const settings = audioTrack.getSettings();
      setDeviceInfo({
        label: audioTrack.label || 'Default Microphone',
        channelCount: settings.channelCount || 1
      });

      // Setup audio analysis
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);

      analyser.fftSize = 256;
      microphone.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      setStatus('active');
      analyzeAudio();
    } catch (err) {
      setStatus('error');
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

  const analyzeAudio = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);

    const updateVolume = () => {
      if (!analyserRef.current || status !== 'active') return;

      analyserRef.current.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      const normalizedVolume = Math.min(100, (average / 255) * 200);

      setVolume(normalizedVolume);
      animationFrameRef.current = requestAnimationFrame(updateVolume);
    };

    updateVolume();
  };

  const stopAudio = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    analyserRef.current = null;
    setStatus('idle');
    setVolume(0);
    setDeviceInfo(null);
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const getStatusConfig = () => {
    switch (status) {
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

  const statusConfig = getStatusConfig();

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

      <div className="space-y-4">
        {/* Volume Visualizer */}
        <div className="bg-muted/50 rounded-lg p-6 border border-border">
          {status === 'active' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t.audio.volume}</span>
                <span className="text-sm font-mono text-foreground">{Math.round(volume)}%</span>
              </div>

              {/* Volume Bar */}
              <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-primary transition-all duration-100 rounded-full"
                  style={{ width: `${volume}%` }}
                />
              </div>

              {/* Waveform Indicator */}
              <div className="flex items-center justify-center gap-1 h-16">
                {[...Array(20)].map((_, i) => {
                  const height = volume > 0
                    ? Math.random() * volume + 10
                    : 10;
                  return (
                    <div
                      key={i}
                      className="w-1 bg-primary rounded-full transition-all duration-100"
                      style={{ height: `${height}%` }}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              {status === 'error' ? (
                <div className="space-y-2">
                  <div className="text-4xl">❌</div>
                  <p className="text-destructive font-medium">{error}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-4xl">🎙️</div>
                  <p className="text-muted-foreground">
                    {status === 'requesting' ? t.audio.requesting2 : t.audio.clickToStart}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Device Info */}
        {deviceInfo && status === 'active' && (
          <div className="bg-muted/50 rounded-lg p-4 border border-border space-y-2">
            <div className="text-sm">
              <span className="text-muted-foreground">{t.audio.device}: </span>
              <span className="text-foreground">{deviceInfo.label}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">{t.audio.channels}: </span>
              <span className="text-foreground">{deviceInfo.channelCount}</span>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-3">
          {status !== 'active' ? (
            <button
              onClick={startAudio}
              disabled={status === 'requesting'}
              className="flex-1 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {status === 'requesting' ? t.audio.requesting : t.audio.start}
            </button>
          ) : (
            <button
              onClick={stopAudio}
              className="flex-1 bg-destructive/20 text-destructive px-4 py-2.5 rounded-lg font-medium hover:bg-destructive/30 transition-colors"
            >
              {t.audio.stop}
            </button>
          )}
        </div>

        {status === 'active' && (
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 text-sm text-accent">
            {t.audio.success}
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioDetector;
