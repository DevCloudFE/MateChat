# DeepSeek

这里我们以DeepSeek为例，介绍如何在MateChat搭建的应用中接入DeepSeek提供的模型服务。

DeepSeek API 使用与 OpenAI 兼容的 API 格式，详见官方文档：[DeepSeek - 首次调用API](https://api-docs.deepseek.com/zh-cn/)

- baseURL获取：https://api-docs.deepseek.com/zh-cn/
- apiKey获取：https://platform.deepseek.com/api_keys


前往DeepSeek开发平台获取相关的baseURL和apiKey后，可以参考如下方法对【快速开始】中示例代码进行调整：

```ts
const onSubmit = (evt) => {
  inputValue.value = '';
  startPage.value = false;
  // 用户发送消息
  messages.value.push({
    from: 'user',
    content: evt,
  });
  setTimeout(() => {
    // 模型返回消息
    messages.value.push({
      from: 'model',
      content: evt,
    });
  }, 200);
};
```

修改为：

```ts
import OpenAI from 'openai';

const client = ref<OpenAI>();

client.value = new OpenAI({
  apiKey: '', // 模型APIKey
  baseURL: '', // 模型API地址
  dangerouslyAllowBrowser: true, // 浏览器环境使用需要开启
});

const onSubmit = (evt) => {
  inputValue.value = '';
  startPage.value = false;
  // 用户发送消息
  messages.value.push({
    from: 'user',
    content: evt,
    avatarConfig: { name: 'user' },
  });

  fetchData(evt);
};

const fetchData = async (ques) => {
  messages.value.push({
    from: 'model',
    content: '',
    avatarConfig: { name: 'model' },
    id: '',
    loading: true,
  });
  const completion = await client.value!.chat.completions.create({
    model: 'deepseek-reasoner', // 根据deepseek模型列表进行替换
    messages: [{ role: 'user', content: ques }],
    stream: true, // 为 true 则开启接口的流式返回
  });
  messages.value[messages.value.length - 1].loading = false;
  for await (const chunk of completion) {
    const content = chunk.choices[0]?.delta?.content || '';
    const chatId = chunk.id;
    messages.value[messages.value.length - 1].content += content;
    messages.value[messages.value.length - 1].id = chatId;
  }
};
```

完成模型API地址与APIKey填充后，即拥有了一个对接DeepSeek大模型的简单应用。如果你想要参考更完整的页面示例，可参考[演示场景](https://matechat.gitcode.com/playground/playground.html)。