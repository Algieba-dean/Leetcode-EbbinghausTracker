# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
delegated: Chrome Extension Manifest V3, Vite + React + TypeScript + Tailwind CSS (选型理由：现代响应式组件模型便于构建高信息密度的复习仪表盘、掌握度状态机与流畅微交互，Vite 提供极速构建体验与清晰的 MV3 产物结构)。

## Users
准备技术面试、算法竞赛或日常精进算法的开发者。他们经常面临“题目做过但过阵子就忘”、“刷题数量可观但缺乏结构化复习”的痛点，需要在日常做题与浏览流程中，以极低阻力获得科学的记忆曲线复习调度。

## Product Purpose
基于艾宾浩斯遗忘曲线（Ebbinghaus Forgetting Curve）自动化管理算法题目的记忆与复习周期。帮助用户在自然刷题流中实现“做题即记录、到期即提醒、一键去复习、沉淀真能力”，建立高留存率的刷题复习闭环。

## Positioning
与独立的备忘录或笨重的外部打卡表格不同，本产品原生驻留在浏览器做题的第一线场景中：深度适配 LeetCode（力扣）解题页面，自动抓取题目元数据与完成状态，并通过扩展图标角标（Badge）与轻量 Popup 仪表盘提供零跳转、低认知负担的复习指引。

## Operating Context
- 运行环境：Google Chrome 浏览器（及 Chromium 内核浏览器）扩展环境（Manifest V3）。
- 关键触点：
  - 刷题时：在力扣页面完成解题后，插件内容脚本（Content Script）自动或一键将题目纳入复习池。
  - 浏览时：工具栏扩展图标以醒目的 Badge 徽章实时显示“今日待复习题目数”。
  - 复习时：点击 Popup 弹出层查看今日艾宾浩斯复习队列，点击直达题目进行二刷/三刷；提交后评定掌握程度（如遗忘/勉强做出/熟练掌握），系统自适应计算下一轮复习时间。

## Capabilities and Constraints
- 核心功能：
  - 艾宾浩斯记忆模型调度（经典 1/2/4/7/15/30 天阶梯，支持基于掌握程度的动态间隔调整）。
  - LeetCode 题目页面自动提取（题号、题名、难度、URL、分类标签与提交记录）。
  - 自定义录入支持（支持手动补充非力扣题目、外部链接、核心思路关键词与个人笔记卡片）。
  - Popup 仪表盘（今日待复习清单、已完成复习、复习日历分布、记忆留存率概览）。
  - 扩展图标 Badge 动态数字同步与后台定时调度（\`chrome.alarms\`）。
  - 本地优先存储（基于 \`chrome.storage.local\`，并支持 JSON 导入/导出备份）。
- 技术约束：
  - 严格遵循 Chrome Extension Manifest V3 规范（无动态 eval，Service Worker 后台机制）。
  - 纯本地数据留存，隐私安全，无需强制注册或联网鉴权。

## Brand Commitments
- 语调与特质：沉稳、严密、高效且具掌控感（Precision, Mastery, Momentum）。
- 界面标准：高信息密度与纯正的专业工具质感，层级分明、排版考究、微动效克制而准确。

## Evidence on Hand
- 无外部后端服务依赖；当前代码库为全新项目（Greenfield），尚无旧有资产。

## Product Principles
1. 顺流记录（Frictionless Ingestion）：记录动作必须与刷题动作自然融合，自动化优先，坚决消除额外记账的心智负担。
2. 科学留存（Cognitive Integrity）：恪守间隔重复记忆规律，以真实掌握度驱动复习调度，拒绝形式主义的虚假打卡。
3. 紧凑行动（Dense & Actionable）：Popup 空间寸土寸金，每一个像素与信息元素都应明确回答“当前进度”与“下一步做什么”。
4. 本地自持（Local-first & Private）：用户的心血记录完全归属于本地，离线即用，进退自如。
