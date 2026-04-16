# QuickToolLab · 综合在线工具站

> 免费、纯静态、无需服务器 · 托管于 GitHub + Cloudflare Pages

🌐 **线上地址：** [https://quicktoollab.top](https://quicktoollab.top)

---

## 项目简介

QuickToolLab 是一个纯前端综合在线工具站，所有页面均为静态 HTML 文件，无需后端服务器，直接托管在 GitHub 仓库并通过 Cloudflare Pages 全球分发。

内容包含：

- 在线工具导航（图片处理、开发工具、格式转换等）
- 技术文库（来自 Dev.to 的实时文章）
- 幻灯片精选封面
- 热门开源项目（来自 GitHub API）
- 软件推荐
- 评论系统（Waline，独立部署）

---

## 文件结构

```
QuickToolLab/
├── index.html          # 首页：工具导航 + 动态内容聚合
├── compress.html       # PixCrush：图片压缩 & 格式转换工具
├── help.html           # 帮助中心
├── help-article.html   # 帮助文章详情页
├── about.html          # 关于页
├── privacy.html        # 隐私政策
├── help-articles.js    # 帮助文章数据
├── sitemap.xml         # 站点地图
├── robots.txt          # 爬虫规则
└── ads.txt             # Google AdSense 验证
```

---

## 核心功能

### 🖼️ PixCrush 图片压缩工具（compress.html）

- 支持 JPG、PNG、WebP、BMP、GIF 批量处理
- **完全本地运行**，图片不上传任何服务器
- 可调节压缩质量（10%–100%）
- 支持设置最大输出尺寸（原尺寸 / 1920 / 1280 / 800px）
- 单张下载 + 全部打包下载
- 显示每张图片的压缩节省比例

### 🌐 首页动态内容（index.html）

- 技术文库：调用 Dev.to API 实时拉取热门文章
- 开源类库：调用 GitHub API 展示高 Star 项目
- 软件推荐：调用 GitHub API 展示热门 CLI 工具

### 💬 评论系统

基于 [Waline](https://waline.js.org/) 独立部署，评论数据存储在服务端数据库，所有访客均可查看和发表。

评论服务地址：`https://comment.quicktoollab.top`

---

## 技术栈

| 层级 | 技术 |
|---|---|
| 前端 | 纯 HTML / CSS / Vanilla JS，无框架 |
| 字体 | Google Fonts（Noto Sans SC + JetBrains Mono） |
| 图片处理 | HTML5 Canvas API |
| 动态数据 | Dev.to API + GitHub API |
| 评论系统 | Waline v3 |
| 主题切换 | CSS Variables + localStorage |
| 多语言 | 内置 i18n（中文 / English / 日本語） |
| 托管 | GitHub + Cloudflare Pages |
| 广告 | Google AdSense（`pub-8586931911554867`） |

---

## 本地预览

无需安装任何依赖，直接用浏览器打开即可：

```bash
# 克隆仓库
git clone https://github.com/你的用户名/QuickToolLab.git
cd QuickToolLab

# 方式一：直接双击 index.html 用浏览器打开
# 方式二：用 VS Code Live Server 插件启动本地服务
# 方式三：Python 简易服务器
python3 -m http.server 8080
# 然后访问 http://localhost:8080
```

> **注意：** Dev.to 和 GitHub API 在本地直接打开文件时可能触发 CORS，建议使用本地服务器方式预览。

---

## 部署方式

### Cloudflare Pages（推荐）

1. Fork 或 Push 本仓库到你的 GitHub 账号
2. 登录 [Cloudflare Pages](https://pages.cloudflare.com/)
3. 新建项目 → 连接 GitHub 仓库
4. 构建设置全部留空（纯静态，无需构建命令）
5. 部署完成后在 Cloudflare 绑定自定义域名
6. 在域名 DNS 处添加 Cloudflare 提供的 CNAME 记录

### GitHub Pages（备选）

在仓库 Settings → Pages → Source 选择 `main` 分支根目录即可。

---

## SEO 配置

每个页面均配置了：

- `<meta name="description">` 页面描述
- `<meta name="keywords">` 关键词
- `<link rel="canonical">` 规范链接（域名：`quicktoollab.top`）
- Open Graph 标签（`og:title` / `og:description` / `og:url` / `og:image`）
- Twitter Card 标签
- 结构化 `sitemap.xml` + `robots.txt`

---

## 隐私说明

- **PixCrush 图片工具**：所有图片处理在浏览器本地完成，不上传任何服务器
- **首页动态内容**：向 Dev.to 和 GitHub 发起只读 API 请求，不传递用户数据
- **评论系统**：Waline 独立部署，仅存储评论内容、昵称和时间
- **广告**：Google AdSense 可能使用 Cookie 投放个性化广告
- **本地存储**：仅保存语言偏好（`pc_lang`）和主题偏好（`pc_theme`）

---

## License

MIT License · 随意使用和修改，保留 License 声明即可。

---

<p align="center">© 2025 QuickToolLab · Built with ❤️ · Powered by Cloudflare Pages</p>
