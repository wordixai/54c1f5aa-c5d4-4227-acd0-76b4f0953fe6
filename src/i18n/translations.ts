export const translations = {
  zh: {
    title: '硬件检测工具',
    subtitle: '实时检测系统硬件设备状态',
    footer: '提示：请允许浏览器访问摄像头权限以完成检测',

    landing: {
      hero: {
        title: '专业的硬件检测工具',
        subtitle: '一键检测键盘、摄像头、音频等硬件设备，确保系统正常运行',
        cta: '开始检测',
        demo: '查看演示'
      },
      features: {
        title: '强大功能',
        subtitle: '全方位硬件检测解决方案',
        keyboard: {
          title: '键盘检测',
          description: '实时捕获按键输入，显示键码信息，追踪按键历史'
        },
        camera: {
          title: '摄像头检测',
          description: '快速测试摄像头功能，实时预览视频流，检测设备状态'
        },
        audio: {
          title: '音频检测',
          description: '测试麦克风和扬声器，实时音量监控，确保音频正常'
        },
        realtime: {
          title: '实时反馈',
          description: '即时显示检测结果，提供详细的设备状态信息'
        },
        multilang: {
          title: '多语言支持',
          description: '支持中英文界面切换，满足不同用户需求'
        }
      },
      howItWorks: {
        title: '使用流程',
        subtitle: '简单三步，快速完成硬件检测',
        step1: {
          title: '选择设备',
          description: '选择需要检测的硬件设备类型'
        },
        step2: {
          title: '开始检测',
          description: '点击按钮启动检测流程'
        },
        step3: {
          title: '查看结果',
          description: '实时查看检测结果和设备状态'
        }
      },
      cta: {
        title: '准备好了吗？',
        subtitle: '立即开始检测您的硬件设备',
        button: '开始检测'
      }
    },

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
    },

    audio: {
      title: '音频检测',
      subtitle: '测试麦克风和扬声器',
      notStarted: '未启动',
      requesting: '请求权限中...',
      active: '音频正常',
      failed: '检测失败',
      micTitle: '麦克风测试',
      speakerTitle: '扬声器测试',
      startMic: '启动麦克风',
      stopMic: '停止麦克风',
      playSound: '播放测试音',
      stopSound: '停止播放',
      volumeLevel: '音量级别',
      speakToTest: '对着麦克风说话以测试',
      micSuccess: '✓ 麦克风工作正常',
      speakerSuccess: '✓ 扬声器测试音播放中',

      errors: {
        denied: '麦克风权限被拒绝',
        notFound: '未找到音频设备',
        unknown: '无法访问音频设备'
      }
    }
  },

  en: {
    title: 'Hardware Detection Tool',
    subtitle: 'Real-time system hardware device status monitoring',
    footer: 'Tip: Please allow browser to access camera for detection',

    landing: {
      hero: {
        title: 'Professional Hardware Detection Tool',
        subtitle: 'One-click detection for keyboard, camera, audio and more. Ensure your system runs smoothly',
        cta: 'Start Detection',
        demo: 'View Demo'
      },
      features: {
        title: 'Powerful Features',
        subtitle: 'Comprehensive hardware detection solution',
        keyboard: {
          title: 'Keyboard Detection',
          description: 'Real-time key capture, display key codes, track key history'
        },
        camera: {
          title: 'Camera Detection',
          description: 'Quick camera test, live video preview, device status monitoring'
        },
        audio: {
          title: 'Audio Detection',
          description: 'Test microphone and speakers, real-time volume monitoring'
        },
        realtime: {
          title: 'Real-time Feedback',
          description: 'Instant detection results with detailed device status information'
        },
        multilang: {
          title: 'Multi-language',
          description: 'Support Chinese and English interface switching'
        }
      },
      howItWorks: {
        title: 'How It Works',
        subtitle: 'Three simple steps to complete hardware detection',
        step1: {
          title: 'Select Device',
          description: 'Choose the hardware device type to detect'
        },
        step2: {
          title: 'Start Detection',
          description: 'Click the button to start detection'
        },
        step3: {
          title: 'View Results',
          description: 'Real-time view of detection results and device status'
        }
      },
      cta: {
        title: 'Ready to Start?',
        subtitle: 'Begin detecting your hardware devices now',
        button: 'Start Detection'
      }
    },

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
    },

    audio: {
      title: 'Audio Detection',
      subtitle: 'Test microphone and speakers',
      notStarted: 'Not Started',
      requesting: 'Requesting Permission...',
      active: 'Audio Active',
      failed: 'Detection Failed',
      micTitle: 'Microphone Test',
      speakerTitle: 'Speaker Test',
      startMic: 'Start Microphone',
      stopMic: 'Stop Microphone',
      playSound: 'Play Test Sound',
      stopSound: 'Stop Sound',
      volumeLevel: 'Volume Level',
      speakToTest: 'Speak into the microphone to test',
      micSuccess: '✓ Microphone is working properly',
      speakerSuccess: '✓ Speaker test sound playing',

      errors: {
        denied: 'Microphone permission denied',
        notFound: 'Audio device not found',
        unknown: 'Unable to access audio device'
      }
    }
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = typeof translations.zh;
