# OpenAI

在搭建完成页面后，我们可以开始对接模型服务，如 `DeepSeek`、`盘古大模型`、`ChatGPT` 等优秀大模型。在注册并生成对应模型的调用API_Key后，可以参考如下方法进行调用：

1. 通过 npm 安装 openai:

```bash
$ npm install openai
```

2. 使用OpenAI初始化并调用模型接口，如下为一段代码示例：

> 注意：通常openai-node用于node环境，如果在浏览器环境使用，需要开启`dangerouslyAllowBrowser`，开启该配置存在安全风险（API凭证泄露），请确保在安全环境中使用，详见[openai-node官方文档](https://github.com/openai/openai-node?tab=readme-ov-file#why-is-this-dangerous)说明。

```js
import OpenAI from 'openai';

const client = ref();

client.value = new OpenAI({
  apiKey: '', // 模型APIKey
  baseURL: '', // 模型API地址
  dangerouslyAllowBrowser: true, // 浏览器环境使用需要开启
});

const fetchData = (ques) => {
  const completion = await client.value!.chat.completions.create({
    model: 'my-model', // 替换为自己的model名称
    messages: [
      { role: 'user', content: ques },
    ],
    stream: true, // 为 true 则开启接口的流式返回
  });

  for await (const chunk of completion) {
    console.log('content: ', chunk.choices[0]?.delta?.content || '');
    console.log('chatId: ', chunk.id);
  }
}
```

结合MateChat【快速开始】示例代码，修改`onSubmit`函数代码如下：

```ts
import OpenAI from 'openai';

const client = ref<OpenAI>();

client.value = new OpenAI({
  apiKey: '', // 模型APIKey
  baseURL: '', // 模型API地址
  dangerouslyAllowBrowser: true,
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
  // 消息响应气泡
  messages.value.push({
    from: 'model',
    content: '',
    avatarConfig: { name: 'model' },
    id: '',
    loading: true,
  });
  const completion = await client.value!.chat.completions.create({
    model: 'my-model', // 替换为自己的model名称
    messages: [{ role: 'user', content: ques }],
    stream: true, // 为 true 则开启接口的流式返回
  });
  messages.value[messages.value.length - 1].loading = false;
  // 将流式返回拼接到消息内容中
  for await (const chunk of completion) {
    const content = chunk.choices[0]?.delta?.content || '';
    const chatId = chunk.id;
    messages.value[messages.value.length - 1].content += content;
    messages.value[messages.value.length - 1].id = chatId;
  }
};
```

完成模型API地址与APIKey填充后，即拥有了一个对接大模型的简单应用。如果你想要参考更完整的页面示例，可参考[演示场景](https://matechat.gitcode.com/playground/playground.html)。