export default `<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MateChat Vue演示</title>
    <style>

      /* 核心加载卡片 —— 这就是那个“正在加载中 div” */
      .loading-card {
        display: inline-flex;          /* 根据内容自适应宽度，保持内敛块特性 */
        align-items: center;
        gap: 1rem;
        padding: 1rem 2.2rem;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(4px);    /* 轻微毛玻璃，提升现代感（不影响动画简洁度） */
        border-radius: 80px;           /* 超大圆角，胶囊风格 */
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08), 0 4px 10px rgba(0, 30, 60, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.5);
        transition: box-shadow 0.2s, transform 0.2s;
      }

      /* 悬停时轻微浮起，增加互动感 (动画依然清晰) */
      .loading-card:hover {
        box-shadow: 0 20px 35px rgba(0, 0, 0, 0.12);
        transform: scale(1.02);
      }

      /* 旋转小轮子 —— 简单动画部分 */
      .loading-card .spinner {
        width: 30px;
        height: 30px;
        border: 4px solid #dde3ed;
        border-top-color: #2b6ef0;      /* 只有顶部是蓝色，形成旋转的缺口圆 */
        border-radius: 50%;
        animation: spintest 1s cubic-bezier(0.4, 0.0, 0.2, 1) infinite; /* 平滑缓动 */
        flex-shrink: 0;                  /* 防止在文字换行时被压缩 */
        box-sizing: border-box;
      }

      /* 定义旋转动画 —— 非常简单：一圈又一圈 */
      @keyframes spintest {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      /* 加载文字 —— 清晰的中文提示 */
      .loading-card .loading-text {
        font-size: 1.3rem;
        font-weight: 500;
        color: #1a2639;
        letter-spacing: 1px;
        white-space: nowrap;              /* 默认不换行，保持胶囊美感 */
        line-height: 1.4;
      }

      /* 如果屏幕宽度较窄，自动变为两行布局（文字折行，图标在上方或左侧？这里保留flex特性，文字折行后高度自适应） */
      @media (max-width: 420px) {
        .loading-card {
          flex-wrap: wrap;
          justify-content: center;
          padding: 1.2rem 1.8rem;
          gap: 0.7rem;
          border-radius: 60px;
        }

        .loading-card .loading-text {
          white-space: normal;            /* 允许换行 */
          text-align: center;
          font-size: 1.2rem;
        }

        .loading-card .spinner {
          width: 28px;
          height: 28px;
          border-width: 3px;
        }
      }

      /* 可选：给文字增加极淡的脉冲，让“加载感”更细腻（但依然非常简约） */
      .loading-card .loading-text {
        animation: gentlePulseTest 2s ease-in-out infinite;
      }

      @keyframes gentlePulseTest {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
      }
  </style>
  </head>
  <body>
    <div id="app">
      <div class="loading-card" role="status" aria-label="内容正在加载">
        <!-- 旋转动画元素（纯粹的 CSS 动画） -->
        <div class="spinner" aria-hidden="true"></div>
        <!-- 加载文案，带有微光脉冲动画（简单且不干扰旋转器） -->
        <span class="loading-text">正在加载中...</span>
      </div>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
`;
