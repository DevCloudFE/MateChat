# MateChat 
  - vue-starter

## 依赖安装
可以在本子项目根目录(packages/vue-starter)下执行：
```bash
pnpm install
```
也可以在MateChat根目录下执行：
```bash
// 推荐执行一次, 可能本地项目之前用npm安装的依赖, 该指令会为根项目和所有子项目安装依赖
pnpm install
// 只会对vue-starter子项目安装依赖
pnpm install --filter vue-starter
// 为子项目安装指定包
pnpm add "package-name" --filter vue-starter
```
## 启动
在根项目根目录下执行：
```bash
pnpm run dev:vue-starter
```
或者在子项目vue-starter目录下执行：
```bash
pnpm run dev
```