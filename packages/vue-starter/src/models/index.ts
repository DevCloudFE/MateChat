import OpenAI from 'openai';
import type { ChatRequest, LLMModuleConfig } from './types';

export abstract class LLMService {
  constructor(protected config: LLMModuleConfig) {}

  async chat(request: ChatRequest): Promise<string> {
    const shouldStream = this.config.stream;
    return shouldStream ? this.chatStream(request) : this.chatBatch(request);
  }

  // 流式
  abstract chatStream(request: ChatRequest): Promise<string>;

  // 非流式
  abstract chatBatch(request: ChatRequest): Promise<string>;
}

export class OpenAiService extends LLMService {
  private client: OpenAI;
  constructor(config: LLMModuleConfig) {
    super(config);

    this.client = new OpenAI({
      baseURL: this.config.baseURL,
      apiKey: this.config.apiKey,
      dangerouslyAllowBrowser: true,
    });
  }

  async chatBatch(request: ChatRequest): Promise<string> {
    try {
      const completion = await this.client.chat.completions.create({
        model: this.config.modelName,
        messages: [{ role: 'user', content: request.content }],
        stream: false,
      });

      return completion.choices[0].message.content;
    } catch {
      return '发生错误，请稍后再试。';
    }
  }

  // Todo: 终止流式
  async chatStream(request: ChatRequest): Promise<string> {
    try {
      const completion = await this.client.chat.completions.create({
        model: this.config.modelName,
        messages: [{ role: 'user', content: request.content }],
        stream: true,
      });

      let fullAnswer = '';
      for await (const chunk of completion) {
        const answer = chunk.choices[0]?.delta?.content || '';
        fullAnswer += answer;
        request.streamOptions?.onMessage?.(answer);
      }
      request.streamOptions?.onComplete?.();
      return fullAnswer;
    } catch (error) {
      return '发生错误，请稍后再试。';
    }
  }
}
