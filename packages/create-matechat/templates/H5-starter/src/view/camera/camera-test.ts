// 相机测试工具 - 用于诊断无法访问相机的问题

export const runCameraTest = async (): Promise<{
  success: boolean;
  message: string;
  details?: any;
}> => {
  try {
    // 检查浏览器环境
    console.log('检查浏览器环境...');
    
    // 检查是否为安全上下文（HTTPS）
    const isSecureContext = window.isSecureContext;
    console.log('是否为安全上下文(HTTPS):', isSecureContext);
    
    if (!isSecureContext) {
      return {
        success: false,
        message: '警告: 应用运行在非安全上下文环境(HTTP)，getUserMedia API 在非HTTPS环境下可能被限制',
        details: { isSecureContext }
      };
    }
    
    // 检查getUserMedia支持
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return {
        success: false,
        message: '浏览器不支持getUserMedia API',
        details: { navigator: { mediaDevices: !!navigator.mediaDevices } }
      };
    }
    
    // 尝试获取相机权限
    console.log('尝试获取相机权限...');
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    
    // 成功获取权限，停止流
    stream.getTracks().forEach(track => track.stop());
    
    console.log('相机权限测试成功！');
    return {
      success: true,
      message: '相机权限测试成功，浏览器能够访问相机',
      details: { 
        isSecureContext, 
        deviceCount: stream.getVideoTracks().length 
      }
    };
  } catch (error) {
    console.error('相机测试失败:', error);
    
    // 解析错误类型
    let errorMessage = '无法访问相机，请检查权限设置';
    if (error instanceof DOMException) {
      switch (error.name) {
        case 'NotAllowedError':
          errorMessage = '用户拒绝了相机权限';
          break;
        case 'NotFoundError':
          errorMessage = '没有找到可用的相机设备';
          break;
        case 'NotReadableError':
          errorMessage = '相机设备被其他应用占用';
          break;
        case 'OverconstrainedError':
          errorMessage = '无法满足相机参数要求';
          break;
        case 'SecurityError':
          errorMessage = '安全错误，可能是浏览器策略限制';
          break;
        default:
          errorMessage = `相机错误: ${error.message}`;
      }
    }
    
    return {
      success: false,
      message: errorMessage,
      details: error
    };
  }
};

// 在控制台运行测试（如果直接在控制台加载此脚本）
if (typeof window !== 'undefined') {
  console.log('运行相机测试...');
  runCameraTest().then(result => {
    console.log('测试结果:', result);
  });
}