import { useState, useRef, useEffect } from 'react';
import StatusBadge from './StatusBadge';

type CameraStatus = 'idle' | 'requesting' | 'active' | 'error';

const CameraDetector = () => {
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
          setError('摄像头权限被拒绝');
        } else if (err.name === 'NotFoundError') {
          setError('未找到摄像头设备');
        } else {
          setError('无法访问摄像头');
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
        return { status: 'active' as const, label: '请求权限中...' };
      case 'active':
        return { status: 'success' as const, label: '摄像头正常' };
      case 'error':
        return { status: 'error' as const, label: '检测失败' };
      default:
        return { status: 'idle' as const, label: '未启动' };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="bg-card border border-border rounded-xl p-6 card-glow animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
            <span className="text-2xl">📷</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">摄像头检测</h2>
            <p className="text-sm text-muted-foreground">测试摄像头功能</p>
          </div>
        </div>
        <StatusBadge status={statusConfig.status} label={statusConfig.label} />
      </div>

      <div className="space-y-4">
        <div className="aspect-video bg-muted/50 rounded-lg overflow-hidden border border-border relative">
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
                <div className="text-center space-y-2">
                  <div className="text-4xl">❌</div>
                  <p className="text-destructive font-medium">{error}</p>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <div className="text-4xl">📹</div>
                  <p className="text-muted-foreground">
                    {status === 'requesting' ? '正在请求权限...' : '点击下方按钮启动摄像头'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          {status !== 'active' ? (
            <button
              onClick={startCamera}
              disabled={status === 'requesting'}
              className="flex-1 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {status === 'requesting' ? '请求中...' : '启动摄像头'}
            </button>
          ) : (
            <button
              onClick={stopCamera}
              className="flex-1 bg-destructive/20 text-destructive px-4 py-2.5 rounded-lg font-medium hover:bg-destructive/30 transition-colors"
            >
              停止摄像头
            </button>
          )}
        </div>

        {status === 'active' && (
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 text-sm text-accent">
            ✓ 摄像头工作正常，视频流已建立
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraDetector;
