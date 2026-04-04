# QuickToolLab

综合在线工具站：纯静态页面，聚合常用开发工具入口，并通过公开 API 展示技术文章、幻灯片式封面、热门开源仓库与 CLI 类软件推荐。

**在线站点：** [quicktoollab.top](https://quicktoollab.top/)

## 页面一览

| 路径 | 说明 |
|------|------|
| `index.html` | 首页：工具网格、多语言、明暗主题；动态区数据来自 Dev.to、GitHub API |
| `compress.html` | PixCrush：浏览器本地图片压缩与格式转换（Canvas，不上传服务器） |
| `about.html` | 关于本站 |
| `privacy.html` | 隐私政策 |
| `sitemap.xml` / `robots.txt` / `ads.txt` | SEO 与广告验证 |

## 技术说明

- **无构建步骤**：HTML、CSS、JavaScript 同页或内联，可直接部署到任意静态托管。
- **国际化**：首页支持中文 / English / 日本語（`localStorage` 记忆 `pc_lang`）。
- **主题**：明暗切换（`localStorage` 记忆 `pc_theme`）。
- **外部数据**：首页「技术文库」「幻灯片」「开源类库」「软件推荐」等区块通过 `fetch` 请求 Dev.to、GitHub 公开接口；需用户浏览器能访问对应域名。

## 本地预览

在项目根目录启动任意静态文件服务即可，例如：

```bash
# Python 3
python -m http.server 8080

# 或 Node（若已安装 npx）
npx serve .
```

浏览器打开 `http://localhost:8080/`（端口以实际命令为准）。

## 许可证

仓库中尚未包含 `LICENSE`；若计划开源，可自行添加（例如 MIT）。
