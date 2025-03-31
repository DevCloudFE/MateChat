请将以下 JavaScript 原生组件封装为 Vue 组件：

1. JS 组件文件路径：<JS组件文件路径>
2. JS 组件类名：<JS组件类名>
3. Vue 组件文件名：<Vue组件文件名>

4. Vue 组件功能需求：
- 支持通过 props 将数据传递给 JS 组件。
- 支持通过 slots 将内容插入到 JS 组件的指定位置。
- 支持通过 emit 将 JS 组件的事件抛出到 Vue 组件。

5. Vue 组件结构：
- 在模板中使用 <div ref="container"></div> 作为 JS 组件的挂载点。
- 在 onMounted 中创建 JS 组件实例，并将 props 和 slots 传递给 JS 组件。
- 在 onBeforeUnmount 中销毁 JS 组件实例。

6. 示例代码：
- Vue 组件的 props、slots 和 emit 的定义。
- 在 onMounted 中如何挂载 JS 组件实例。
- 在 onBeforeUnmount 中如何销毁 JS 组件实例。

7. 生成的 Vue 组件代码：
- 使用 script setup 语法。
- 样式部分支持 scoped，并通过 ::v-deep 作用于 JS 组件的 DOM。
- 提供一个完整的 Vue 组件代码示例。