// WebComponent 加载工具 - 供angular-components目录下所有demo.md文件共享使用

/**
 * WebComponent 加载配置接口
 * @typedef {Object} WebComponentConfig
 * @property {string} scriptUrl - 主脚本URL
 * @property {string} polyfillsUrl - polyfills脚本URL
 * @property {string} runtimeUrl - runtime脚本URL
 * @property {string} componentName - 组件名称
 * @property {number} maxRetries - 最大重试次数
 * @property {number} retryDelay - 重试延迟(毫秒)
 */

/**
 * 全局标志，表示WebComponent脚本是否已加载
 * 用于在整个angular-components目录下共享加载状态
 */
const WEB_COMPONENT_LOADED_FLAG = '__matechat_webcomponent_loaded';

/**
 * 加载WebComponent脚本的主函数
 * @param {WebComponentConfig} config - WebComponent配置
 * @param {Function} onLoadComplete - 加载完成回调函数
 */
export function loadWebComponentScript(config, onLoadComplete) {
    // 检查是否在浏览器环境中
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
    }
    
    // 再次检查（可能在其他组件中已经加载）
    if (window[WEB_COMPONENT_LOADED_FLAG]) {
        if (typeof onLoadComplete === 'function') {
            setTimeout(onLoadComplete, 100);
        }
        return;
    }
    
    // 检查是否已经注册了核心组件
    if (typeof customElements !== 'undefined' && 
        (customElements.get('mc-ng-bubble') !== undefined || 
         customElements.get('mc-ng-input') !== undefined)) {
        window[WEB_COMPONENT_LOADED_FLAG] = true;
        if (typeof onLoadComplete === 'function') {
            onLoadComplete();
        }
        return;
    }
    
    let loadedScripts = 0;
    const totalScripts = 3; // runtime.js, polyfills.js, main.js
    
    // 加载完成处理函数
    function handleScriptLoad() {
        loadedScripts++;
        if (loadedScripts === totalScripts) {
            
            // 设置全局标志表示脚本已加载 - 整个angular-components目录共享
            window[WEB_COMPONENT_LOADED_FLAG] = true;
            
            // 检查组件是否已注册
            setTimeout(() => {
                if (typeof customElements !== 'undefined') {
                    // 执行回调函数
                    if (typeof onLoadComplete === 'function') {
                        onLoadComplete();
                    }
                }
            }, 1000);
        }
    }
    
    // 加载脚本的通用函数
    function loadScript(url, onLoad, onError) {
        // 检查是否已经存在相同src的script标签
        const existingScript = Array.from(document.querySelectorAll('script')).find(
            script => script.src.includes(url)
        );
        
        if (existingScript) {
            // 如果脚本已经存在但还未加载完成，则监听其加载事件
            if (existingScript.readyState === 'loading' || !existingScript.complete) {
                const checkLoaded = () => {
                    if (existingScript.complete) {
                        clearInterval(checkInterval);
                        onLoad();
                    }
                };
                const checkInterval = setInterval(checkLoaded, 100);
            } else {
                // 如果脚本已经加载完成，则直接调用onLoad
                onLoad();
            }
            return;
        }
        
        const script = document.createElement('script');
        script.src = url;
        script.type = 'text/javascript';
        script.setAttribute('cache-control', 'no-cache');
        
        script.onload = function() {
            onLoad();
        };
        
        script.onerror = function(error) {
            console.error(`加载脚本失败: ${url}`, error);
            onError(error);
        };
        
        if (document && document.head) {
            document.head.appendChild(script);
        }
    }
    
    // 按顺序加载所有必需的脚本
    let loadError = false;
    
    loadScript(
        config.runtimeUrl,
        () => {
            if (loadError) return;
            
            loadScript(
                config.polyfillsUrl,
                () => {
                    if (loadError) return;
                    
                    loadScript(
                        config.scriptUrl,
                        handleScriptLoad,
                        (error) => {
                            loadError = true;
                            console.error('WebComponent主脚本加载失败', error);
                        }
                    );
                },
                (error) => {
                    loadError = true;
                    console.error('WebComponent polyfills加载失败', error);
                }
            );
        },
        (error) => {
            loadError = true;
            console.error('WebComponent runtime加载失败', error);
        }
    );
}

/**
 * 检查WebComponent脚本是否已加载
 * @returns {boolean} 是否已加载
 */
export function isWebComponentLoaded() {
    return typeof window !== 'undefined' && window[WEB_COMPONENT_LOADED_FLAG] === true;
}

/**
 * 获取全局标志名称
 * @returns {string} 全局标志名称
 */
function getWebComponentLoadedFlag() {
    return WEB_COMPONENT_LOADED_FLAG;
}

// 导出到window对象，以便在非ES模块环境中使用
if (typeof window !== 'undefined') {
    window.loadWebComponentScript = loadWebComponentScript;
    window.isWebComponentLoaded = isWebComponentLoaded;
    window.getWebComponentLoadedFlag = getWebComponentLoadedFlag;
}