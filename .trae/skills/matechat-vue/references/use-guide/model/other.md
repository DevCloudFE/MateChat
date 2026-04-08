# 其他

当前大部分大模型服务 API 接口都使用与 OpenAI 兼容的 API 格式，但直到目前，还没有标准的协议定义模型接口规范，所以仍会存在协议不兼容的问题。

这里补充介绍如下 `fetch + SSE` 的接入方案供参考：

### Fetch Event Source

[Fetch Event Source](https://www.npmjs.com/package/@microsoft/fetch-event-source#usage) 是一个用于处理服务器发送事件（Server-Sent Events, SSE）的 JavaScript 库，并具有 Fetch API 中所提供的所有功能。

1. 安装依赖

```bash
npm install @microsoft/fetch-event-source
```

2. 使用 fetchEventSource 调用模型接口

```typescript

import { fetchEventSource } from '@microsoft/fetch-event-source';

const getAIAnswer = (content, type) => {
  abortController = new AbortController();
  const aiAnswer = {
    from: 'assistant',
    content: '',
    type,
    avatarPosition: 'side-left',
    avatarConfig: { ...aiModelAvatar },
    loading: true,
  };
  messages.value.push(aiAnswer);
  const source = fetchEventSource(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'user',
          content,
        },
      ],
      apikey: apiKey,
    }),
    signal: abortController.signal,
    onopen: (response) => {},
    onmessage: (msg) => {
      messages.value.at(-1).loading = false;
      if (msg.data === '[DONE]') {
        nextTick(() => {
          conversationRef.value?.scrollTo({
            top: conversationRef.value.scrollHeight,
            behavior: 'smooth',
          });
        });
        return;
      }
      const data = JSON.parse(msg.data);
      const responseContent = data.choices[0].delta.content;
      messages.value.at(-1).content += responseContent;
    },
    onerror: (err) => {
      messages.value.at(-1).loading = false;
      messages.value.at(-1).content = '请求失败';
      throw err;
    },
  });
};

const stop = () => {
  if (abortController) {
    abortController.abort();
    abortController = null;
    // 更新最后一条消息的状态
    if (messages.value.length > 0) {
      messages.value.at(-1).loading = false;
      messages.value.at(-1).content += '已中止对话';
    }
  }
};
```
