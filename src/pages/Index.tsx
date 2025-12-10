import KeyboardDetector from '../components/KeyboardDetector';
import CameraDetector from '../components/CameraDetector';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 space-y-4 animate-fade-in">
          <h1 className="text-5xl font-bold text-gradient">硬件检测工具</h1>
          <p className="text-muted-foreground text-lg">
            实时检测系统硬件设备状态
          </p>
        </div>

        {/* Detection Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <KeyboardDetector />
          <CameraDetector />
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>提示：请允许浏览器访问摄像头权限以完成检测</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
