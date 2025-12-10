import { useState, useRef, useEffect } from 'react';
import StatusBadge from './StatusBadge';
import { useLanguage } from '../contexts/LanguageContext';

type CameraStatus = 'idle' | 'requesting' | 'active' | 'error';

const CameraDetector = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<CameraStatus>('idle');
  const [error, setError] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      setStatus('requesting');
      setError('');

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setStatus('active');
      }
    } catch (err) {
      setStatus('error');
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          setError(t.camera.errors.denied);
        } else if (err.name === 'NotFoundError') {
          setError(t.camera.errors.notFound);
        } else {
          setError(t.camera.errors.unknown);
        }
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setStatus('idle');
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const getStatusConfig = () => {
    switch (status) {
      case 'requesting':
        return { status: 'active' as const, label: t.camera.requesting };
      case 'active':
        return { status: 'success' as const, label: t.camera.active };
      case 'error':
        return { status: 'error' as const, label: t.camera.failed };
      default:
        return { status: 'idle' as const, label: t.camera.notStarted };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="glass-card rounded-2xl p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center shadow-lg shadow-secondary/10">
            <span className="text-3xl">📷</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{t.camera.title}</h2>
            <p className="text-sm text-muted-foreground">{t.camera.subtitle}</p>
          </div>
        </div>
        <StatusBadge status={statusConfig.status} label={statusConfig.label} />
      </div>

      <div className="space-y-6">
        <div className="aspect-video bg-muted/20 rounded-xl overflow-hidden border border-border/50 relative">
          {status === 'active' ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              {status === 'error' ? (
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                    <span className="text-3xl">❌</span>
                  </div>
                  <p className="text-destructive font-medium">{error}</p>
                </div>
              ) : (
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mx-auto">
                    <span className="text-3xl opacity-60">📹</span>
                  </div>
                  <p className="text-muted-foreground">
                    {status === 'requesting' ? t.camera.requesting2 : t.camera.clickToStart}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-4">
          {status !== 'active' ? (
            <button
              onClick={startCamera}
              disabled={status === 'requesting'}
              className="flex-1 btn-primary px-6 py-3 rounded-xl font-medium text-foreground disabled:opacity-50 disabled:transform-none disabled:shadow-none"
            >
              {status === 'requesting' ? t.camera.requesting : t.camera.start}
            </button>
          ) : (
            <button
              onClick={stopCamera}
              className="flex-1 bg-destructive/10 text-destructive px-6 py-3 rounded-xl font-medium hover:bg-destructive/20 transition-colors border border-destructive/20"
            >
              {t.camera.stop}
            </button>
          )}
        </div>

        {status === 'active' && (
          <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 text-sm text-accent flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            {t.camera.success}
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraDetector;
