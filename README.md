# QuickToolLab

一个基于 Git 文件的纯静态工具站与内容站，托管在 GitHub + Cloudflare Pages。  
站点包含在线工具、博客、帮助中心，以及基于 Decap CMS 的后台内容管理。

线上地址：[https://quicktoollab.top](https://quicktoollab.top)

## 技术栈

- 前端：HTML / CSS / Vanilla JS
- 内容管理：Decap CMS
- 内容存储：Git 文件（JSON）
- 评论系统：Waline
- 部署：GitHub + Cloudflare Pages
- 自动索引：GitHub Actions + Python

## 当前内容架构

现在的 CMS 使用 `folder collection`，不是旧的 `files collection`。

- 博客文章：`content/blog/*.json`
- 帮助文章：`content/help/*.json`
- 每篇文章对应一个独立文件
- CMS 后台会把这些文件识别为独立 entries

前端列表页不直接扫描目录，而是读取聚合索引：

- 博客索引：`content/blog/index.json`
- 帮助索引：`content/help/index.json`

兼容输出：

- `data/posts.json`
- `data/help.json`

## 目录结构

```text
QuickToolLab/
├── admin/
│   ├── config.yml
│   └── index.html
├── content/
│   ├── blog/
│   │   ├── *.json
│   │   └── index.json
│   └── help/
│       ├── *.json
│       └── index.json
├── data/
│   ├── posts.json
│   └── help.json
├── scripts/
│   └── build_content.py
├── .github/
│   └── workflows/
│       └── build-content-indexes.yml
├── index.html
├── blog.html
├── blog-post.html
├── help.html
├── help-article.html
├── about.html
├── privacy.html
└── compress.html
```

## CMS 工作方式

CMS 配置文件：

- [admin/config.yml](/D:/Code/AdSense/QuickToolLab_edit/admin/config.yml:1)

后台入口：

- [admin/index.html](/D:/Code/AdSense/QuickToolLab_edit/admin/index.html:1)

内容编辑流程：

1. 在 `/admin/` 登录 Decap CMS
2. 新建或编辑博客/帮助文章
3. CMS 将内容写入 GitHub 仓库中的单篇 JSON 文件
4. GitHub Actions 自动运行 `scripts/build_content.py`
5. 自动更新 `index.json` 和 `data/*.json`
6. Cloudflare Pages 自动部署最新内容

## 自动索引

索引生成脚本：

- [scripts/build_content.py](/D:/Code/AdSense/QuickToolLab_edit/scripts/build_content.py:1)

自动工作流：

- [.github/workflows/build-content-indexes.yml](/D:/Code/AdSense/QuickToolLab_edit/.github/workflows/build-content-indexes.yml:1)

触发条件：

- `content/blog/*.json` 变化
- `content/help/*.json` 变化
- `scripts/build_content.py` 变化

生成结果：

- `content/blog/index.json`
- `content/help/index.json`
- `data/posts.json`
- `data/help.json`

如果需要手动执行：

```powershell
cd D:\Code\AdSense\QuickToolLab_edit
python scripts\build_content.py
```

## 本地预览

推荐使用本地静态服务器，不要直接双击 HTML。

```powershell
cd D:\Code\AdSense\QuickToolLab_edit
python -m http.server 8080
```

然后访问：

- [http://localhost:8080](http://localhost:8080)
- [http://localhost:8080/admin/](http://localhost:8080/admin/)

## 主要页面

- 首页：`index.html`
- 博客列表：`blog.html`
- 博客详情：`blog-post.html?id=...`
- 帮助列表：`help.html`
- 帮助详情：`help-article.html?id=...`
- 图片压缩工具：`compress.html`
- 关于页：`about.html`
- 隐私页：`privacy.html`

## 部署说明

### Cloudflare Pages

推荐直接连接 GitHub 仓库部署。

- 构建命令：留空
- 输出目录：`/`

由于这是纯静态站点，不需要额外构建框架。  
内容索引由 GitHub Actions 预先生成并提交回仓库。

### GitHub Actions 权限

为了让自动索引工作流能回写仓库，需要在 GitHub 仓库中开启：

`Settings -> Actions -> General -> Workflow permissions -> Read and write permissions`

## 备注

- 这是 file-based CMS 架构，不依赖数据库
- 文章列表展示依赖 `index.json`，不是浏览器目录扫描
- `build_content.py` 是当前内容发布链路的一部分，不能删除

## License

MIT
