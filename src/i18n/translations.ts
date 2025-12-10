export const translations = {
  zh: {
    title: '硬件检测工具',
    subtitle: '实时检测系统硬件设备状态',
    footer: '提示：请允许浏览器访问摄像头权限以完成检测',

    keyboard: {
      title: '键盘检测',
      subtitle: '按任意键开始测试',
      waiting: '等待输入',
      detecting: '检测中',
      currentKey: '当前按键',
      keyName: '键名',
      keyCode: '键码',
      recentKeys: '最近按键',
      placeholder: '按下任意键开始测试...'
    },

    camera: {
      title: '摄像头检测',
      subtitle: '测试摄像头功能',
      notStarted: '未启动',
      requesting: '请求权限中...',
      active: '摄像头正常',
      failed: '检测失败',
      start: '启动摄像头',
      stop: '停止摄像头',
      success: '✓ 摄像头工作正常，视频流已建立',
      clickToStart: '点击下方按钮启动摄像头',
      requesting2: '正在请求权限...',

      errors: {
        denied: '摄像头权限被拒绝',
        notFound: '未找到摄像头设备',
        unknown: '无法访问摄像头'
      }
    }
  },

  en: {
    title: 'Hardware Detection Tool',
    subtitle: 'Real-time system hardware device status monitoring',
    footer: 'Tip: Please allow browser to access camera for detection',

    keyboard: {
      title: 'Keyboard Detection',
      subtitle: 'Press any key to start testing',
      waiting: 'Waiting',
      detecting: 'Detecting',
      currentKey: 'Current Key',
      keyName: 'Key',
      keyCode: 'Code',
      recentKeys: 'Recent Keys',
      placeholder: 'Press any key to start testing...'
    },

    camera: {
      title: 'Camera Detection',
      subtitle: 'Test camera functionality',
      notStarted: 'Not Started',
      requesting: 'Requesting Permission...',
      active: 'Camera Active',
      failed: 'Detection Failed',
      start: 'Start Camera',
      stop: 'Stop Camera',
      success: '✓ Camera is working properly, video stream established',
      clickToStart: 'Click the button below to start camera',
      requesting2: 'Requesting permission...',

      errors: {
        denied: 'Camera permission denied',
        notFound: 'Camera device not found',
        unknown: 'Unable to access camera'
      }
    }
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = typeof translations.zh;
