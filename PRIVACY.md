# Privacy Policy for LeetCode Ebbinghaus Tracker / 隐私权政策

**Last Updated / 最近更新日期**: September 2026

LeetCode Ebbinghaus Tracker ("the Extension", "本扩展程序") is committed to protecting your privacy. This Privacy Policy explains how user data is handled by the Extension.

---

## English Version

### 1. Overview
LeetCode Ebbinghaus Tracker is a browser extension designed to help users track and review LeetCode coding problems using spaced repetition and the SM-2 memory algorithm.

### 2. Information Collection and Storage
- **No External Data Collection**: The Extension **does not** collect, store, transmit, or share any personal identification information (PII), browsing history, or sensitive user data with external servers or third parties.
- **Local Storage Only**: All problem review schedules, SM-2 algorithm intervals, tags, custom notes, and user preferences are stored exclusively on your local device using the browser's `chrome.storage.local` API.
- **No Analytics or Trackers**: The Extension contains no third-party tracking scripts, advertising trackers, or analytics services.

### 3. Permissions Usage
- `storage`: Used solely to save your LeetCode problem review records and settings locally on your machine.
- `alarms`: Used to periodically schedule background checks for due review tasks and update the badge count on the extension icon without keeping a persistent background script running.
- `activeTab`: Used to inspect the current tab's URL and title when you open the extension popup, enabling one-click addition of the current LeetCode problem.
- `tabs`: Used to open LeetCode problem links in a new tab when clicked from the review list, and to coordinate problem status with the active tab.
- Host Permissions (`*://leetcode.cn/*`, `*://leetcode.com/*`): Used strictly to display an in-page review status widget on LeetCode problem pages and detect problem submission results (Accepted). No other websites are accessed or modified.

### 4. Third-Party Sharing and Remote Code
- We do not sell, rent, or transfer any user data to third parties.
- The Extension contains no remote code (`eval()`, external scripts, or remotely hosted modules). All code is bundled directly within the extension package.

### 5. Contact
If you have any questions or feedback regarding this Privacy Policy, please open an issue on the GitHub repository:
https://github.com/Algieba-dean/Leetcode-EbbinghausTracker/issues

---

## 中文版

### 1. 概述
LeetCode 艾宾浩斯复习助手（以下简称“本扩展程序”）是一款基于艾宾浩斯遗忘曲线与 SM-2 算法的力扣刷题与间隔复习辅助工具。我们高度重视用户的隐私安全。

### 2. 信息收集与本地存储
- **不收集任何个人数据**：本扩展程序**不收集、不上传、不传输、不共享**任何用户的个人身份信息、健康、财务、身份验证或网页浏览历史。
- **纯本地存储**：所有题目复习进度、艾宾浩斯阶梯参数、做题笔记与偏好设置均保存在用户本地浏览器的 `chrome.storage.local` 中，不会发送至任何外部云端服务器。
- **无第三方分析统计**：本扩展程序不包含任何第三方跟踪代码、数据分析 SDK 或广告模块。

### 3. 权限使用说明
- `storage`：仅用于在本地存储您的复习计划与题目笔记。
- `alarms`：用于后台定时计算今日待复习题目数量并刷新插件图标角标。
- `activeTab`：用于在打开插件弹窗时读取当前标签页是否为力扣题目页，以支持一键收录。
- `tabs`：用于在点击待复习卡片时在新标签页打开力扣题目链接。
- 主机权限（`*://leetcode.cn/*` 与 `*://leetcode.com/*`）：仅在力扣题目页面注入轻量复习状态胶囊与检测提交状态，绝不访问其他任何网站。

### 4. 数据安全与远程代码
- 我们绝不会向任何第三方出售或转移用户数据。
- 本扩展程序不包含任何远程托管代码，所有代码均打包在扩展程序安装包内。

### 5. 联系方式
如有任何疑问或建议，欢迎在 GitHub 提交 Issue：
https://github.com/Algieba-dean/Leetcode-EbbinghausTracker/issues
