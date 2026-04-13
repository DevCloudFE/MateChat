# MateChat 贡献指南

你好！我们很高兴你有兴趣为 MateChat 做出贡献。在提交你的贡献之前，可以阅读以下指南：

### 快速上手

如果你想参与 `MateChat` 开发或者测试，请参考以下流程：

1. 点击 [GitCode 仓库](https://gitcode.com/DevCloudFE/MateChat.git) 右上角的 Fork 按钮，将此仓库 Fork 仓库到个人空间；
2. Clone 个人空间项目至本地：

   由于 GitCode 目前不支持 Web OAuth，为了更方便的参与代码协作，我们建议使用SSH方式进行克隆：

   ```bash
   git clone git@gitcode.com:<username>/MateChat.git
   ```

   **上述指令中的 `<username>` 为你的 GitCode 用户名，执行前请替换为你的实际用户名。**

   你也可以使用 HTTPS 方式进行克隆：

   ```bash
   git clone https://gitcode.com/DevCloudFE/MateChat.git
   ```

   在此之前，请确保你已经正确安装和配置了 Git 工具。

3. 确保你的计算机中正确安装了 Node.js 和 pnpm：

   在终端（如 Powershell 或 Fish Shell）中执行以下指令：

   ```bash
   node -v
   pnpm -v
   ```

   如果你看到类似`v22.12.0`和`9.15.4`的版本号，说明你已经正确安装了 Node.js 和 pnpm。

   如果出现了异常，请在安装了 Node.js 环境后安装`pnpm`：

   ```bash
   npm install -g pnpm
   ```

4. 安装 Node.js 依赖：

   ```bash
   pnpm install
   ```

5. 启动开发服务器：

   ```bash
   pnpm run docs:dev
   ```

## 参与贡献

MateChat 是一个多人合作的开源项目，为了避免多人同时开发同一个组件/功能，请先在 [问题列表](https://gitcode.com/DevCloudFE/MateChat/issues) 中选择自己感兴趣的任务，在评论区认领。

1. 请确保你已经完成快速上手中的步骤，并且正常访问本地启动网站
2. 创建新分支 `git checkout -b username/feature1`，分支名字建议为`username/feat-xxx`/`username/fix-xxx`
3. 遵循 [Angular Commit Message Format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit) 进行提交（**不符合规范的提交将不会被合并**）
4. 提交到远程仓库，也就是 Fork 后的仓库，`git push origin branchName`
5. (可选) 同步上游仓库dev分支最新代码，`git pull upstream dev`
6. 打开上游仓库提交 [PR](https://gitcode.com/DevCloudFE/MateChat/pulls)
7. 仓库 Committer 进行 Code Review，并提出意见
8. PR 发起人根据意见调整代码（一个分支发起了 PR 后，后续的 commit 会自动同步，不需要重新 PR）
9. 仓库管理员合并PR
10. 贡献流程结束，感谢你的贡献
