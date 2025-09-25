/**
 * ChatInput 组件的提交键（Enter 系列按键）相关功能模块
 *
 * 主要功能：
 * 1. 将组件配置的 submitKey（如 "Enter"/"Shift-Enter"/"Ctrl-Enter"）映射为 ProseMirror 键绑定
 * 2. 聚焦提交命令本身，换行与代码块转换逻辑交由 code-block 插件处理
 * 3. 创建提交命令工厂函数，专注于内容序列化和提交回调
 *
 * 架构设计：
 * - 单一职责：提交命令只负责内容处理和回调，不涉及按键逻辑
 * - 渐进式增强：基础功能无需 schema 即可工作，高级功能依赖 schema
 * - 可测试性：纯函数设计便于单元测试，副作用集中在最终回调
 */
import { keymap } from 'prosemirror-keymap';
import type { Command } from 'prosemirror-state';
import type { ChatInputProps } from '../chat-input-types';
import { serializeNodeToMarkdown } from '../utils';

// 提交键配置类型，从 ChatInput 组件属性中获取
type SubmitKey = ChatInputProps['submitKey'];

/**
 * 创建提交键插件的核心函数
 *
 * 功能说明：
 * - 将用户配置的提交键映射到提交操作
 * - 保持换行逻辑由基础 keymap 与 code-block 插件负责
 * - 对外提供统一的接口，隐藏内部按键映射的复杂性
 *
 * @param submitKey 用户配置的提交键（"Enter"/"Shift-Enter"/"Mod-Enter"）
 * @param onSubmit 提交回调函数，接收序列化后的内容
 * @returns ProseMirror keymap 插件实例
 */
export const createSubmitKeyPlugin = (
  submitKey: SubmitKey,
  onSubmit: SubmitHandler,
) => {
  // 创建提交命令实例
  const submitCommand = createSubmitCommand(onSubmit);

  // 初始化按键绑定映射表
  const bindings: Record<string, Command> = {};

  bindings[submitKey] = submitCommand;

  // 创建并返回 ProseMirror keymap 插件
  return keymap(bindings);
};

// 提交处理器的类型定义
// 接收序列化后的 Markdown 字符串作为参数
export type SubmitHandler = (value: string) => void;

/**
 * 创建提交命令的工厂函数
 *
 * 执行流程：
 * 1. 遍历当前文档的所有节点
 * 2. 将每个节点序列化为 Markdown 格式
 * 3. 合并所有内容并调用提交回调
 *
 * @param onSubmit 提交成功后的回调函数，接收完整的 Markdown 内容
 * @returns 符合 ProseMirror 规范的 Command 函数
 */
export const createSubmitCommand = (
  onSubmit: SubmitHandler,
): Command => {
  return (state, dispatch) => {
    // 如果没有 dispatch 函数，直接返回 true（只读模式）
    if (!dispatch) return true;

    // 收集所有节点的内容
    const contentParts: string[] = [];

    // 遍历文档的每个节点，将其序列化为 Markdown
    state.doc.forEach((node) => {
      contentParts.push(serializeNodeToMarkdown(node));
    });

    // 将所有内容用换行符连接，形成完整的 Markdown 文本
    const markdownContent = contentParts.join('\n');

    // 调用提交回调函数
    onSubmit(markdownContent);

    // 返回 true 表示已成功处理，阻止后续事件传播
    return true;
  };
};
