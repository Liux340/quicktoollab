window.BLOG_POSTS = [
  {
    id: "astro-blog-intro",
    slug: "astro-blog-intro",
    date: "2026-04-16",
    readTime: "6 min",
    cover: "linear-gradient(135deg, rgba(249,115,22,.22), rgba(20,184,166,.16))",
    category: {
      zh: "博客搭建",
      en: "Blog Setup",
      ja: "ブログ構築"
    },
    tags: {
      zh: ["Astro", "静态博客", "站点结构"],
      en: ["Astro", "Static Blog", "Site Structure"],
      ja: ["Astro", "静的ブログ", "サイト構成"]
    },
    title: {
      zh: "Astro 静态博客模板接入说明",
      en: "How the Astro blog template was adapted",
      ja: "Astro ブログテンプレート導入メモ"
    },
    excerpt: {
      zh: "这篇文章记录 QuickToolLab 如何参考 Astro 模板补上博客入口、文章列表与详情页，并保持当前纯静态部署方式不变。",
      en: "This post explains how QuickToolLab borrows ideas from the Astro template while keeping the current static deployment workflow.",
      ja: "QuickToolLab が Astro テンプレートの構成を参考にしつつ、既存の静的デプロイ方式を維持した流れをまとめています。"
    },
    contentHtml: {
      zh: `
        <p>这次接入没有把整套 Astro 工程直接并入现有站点，而是保留了 QuickToolLab 现在的纯静态 HTML 结构，再把博客页、文章详情页和文章数据层补上。</p>
        <h2>为什么不直接整站切 Astro</h2>
        <p>你当前项目已经有首页、工具页、帮助页、隐私页和评论等功能，部署方式也非常轻。直接把它迁成 Astro 会涉及目录结构、构建脚本、静态资源路径和 SEO 规则的整体调整，工作量会明显变大。</p>
        <h2>这次实际接入了什么</h2>
        <ul>
          <li>新增博客入口页，展示文章卡片、分类和摘要。</li>
          <li>新增文章详情页，支持根据文章 ID 动态渲染内容与 SEO 标签。</li>
          <li>新增文章数据文件，方便后续继续扩展文章列表。</li>
        </ul>
        <h2>保留了哪些模板思路</h2>
        <p>页面结构上延续了 Astro 模板里“列表页 + 详情页 + 分类信息 + 标签信息”的内容组织方式，同时保留你站点现有的主题切换和多语言偏好存储逻辑。</p>
        <blockquote>重点不是强行复制模板运行环境，而是把它最有价值的内容结构移植到你当前站点里。</blockquote>
      `,
      en: `
        <p>This integration does not merge the full Astro app into the existing website. Instead, it keeps QuickToolLab as a static HTML site and adds a blog index, article detail page, and a reusable post data layer.</p>
        <h2>Why not migrate everything to Astro</h2>
        <p>Your current project already includes tools, help content, comments, and a lightweight deployment flow. A full migration would require larger changes across routing, build setup, assets, and SEO behavior.</p>
        <h2>What was added</h2>
        <ul>
          <li>A blog index page with article cards and summaries.</li>
          <li>An article detail page with dynamic metadata.</li>
          <li>A dedicated post data file for future updates.</li>
        </ul>
        <p>The result keeps the deployment simple while giving the site a proper blog section.</p>
      `,
      ja: `
        <p>今回は Astro 全体を既存サイトへ統合したのではなく、QuickToolLab の静的 HTML 構成を維持したまま、ブログ一覧・記事詳細・記事データ層を追加しました。</p>
        <h2>全面移行しなかった理由</h2>
        <p>現在のサイトは軽量で、デプロイ方法も単純です。Astro へ全面移行すると、ルーティングやビルド設定、SEO 制御まで広く調整が必要になります。</p>
        <h2>今回追加したもの</h2>
        <ul>
          <li>記事カードを表示するブログ一覧ページ</li>
          <li>メタ情報を動的に更新する記事詳細ページ</li>
          <li>今後の追加に使える記事データファイル</li>
        </ul>
      `
    }
  },
  {
    id: "content-management-workflow",
    slug: "content-management-workflow",
    date: "2026-04-16",
    readTime: "5 min",
    cover: "linear-gradient(135deg, rgba(34,197,94,.18), rgba(59,130,246,.15))",
    category: {
      zh: "内容管理",
      en: "Content Workflow",
      ja: "コンテンツ管理"
    },
    tags: {
      zh: ["在线写作", "文章管理", "配置编辑"],
      en: ["Online Editing", "Posts", "Site Config"],
      ja: ["オンライン編集", "記事管理", "設定編集"]
    },
    title: {
      zh: "在线增删改文章与站点配置的使用思路",
      en: "Using online post management and site config editing",
      ja: "記事の追加・編集とサイト設定の運用メモ"
    },
    excerpt: {
      zh: "模板里已经有在线写作和在线配置的能力，这篇文章整理这些功能更适合什么场景，以及接下来怎么继续接到你的内容流程里。",
      en: "This post summarizes how online writing and site configuration features fit into a lightweight publishing workflow.",
      ja: "テンプレートに含まれるオンライン執筆と設定編集機能を、どのような運用で活かせるかを整理しています。"
    },
    contentHtml: {
      zh: `
        <p>你提供的模板已经补上了在线增删改文章和在线修改站点配置，这意味着它更偏向“可运营”的博客，而不是一次性静态展示模板。</p>
        <h2>适合的使用场景</h2>
        <ul>
          <li>你想快速写短文、发布更新日志或工具使用教程。</li>
          <li>你希望不改源码也能调整站点标题、菜单和主题配置。</li>
          <li>你想把博客当成工具站的内容补充区，而不是另起一个完全独立的网站。</li>
        </ul>
        <h2>建议的内容组织方式</h2>
        <p>对于 QuickToolLab，博客内容最适合围绕工具说明、SEO 修复记录、站点更新日志和产品实践做扩展。这样既能补内容厚度，也能提升长尾收录机会。</p>
        <h2>后续可以继续做什么</h2>
        <p>如果你之后决定真的切到 Astro，可以再把现在这批博客文章迁到模板的内容目录里，保持路径和 slug 设计一致即可减少迁移成本。</p>
      `,
      en: `
        <p>The template already supports editing posts and site configuration online, which makes it useful for ongoing publishing rather than one-off static demos.</p>
        <h2>Good fit</h2>
        <ul>
          <li>Publishing short tutorials and update notes quickly.</li>
          <li>Adjusting titles, menus, and theme settings without touching source files.</li>
          <li>Using the blog as a content layer for a tools website.</li>
        </ul>
        <p>For QuickToolLab, the best topics are tool guides, SEO fixes, changelogs, and practical workflow notes.</p>
      `,
      ja: `
        <p>このテンプレートには記事の追加・更新・削除やサイト設定のオンライン編集機能があり、継続運用しやすい構成になっています。</p>
        <h2>向いている使い方</h2>
        <ul>
          <li>短いガイドや更新ログを素早く公開する</li>
          <li>タイトルやメニュー、テーマ設定を手軽に調整する</li>
          <li>ツールサイトの補完コンテンツとしてブログを使う</li>
        </ul>
      `
    }
  },
  {
    id: "theme-mode-music-notes",
    slug: "theme-mode-music-notes",
    date: "2026-04-16",
    readTime: "4 min",
    cover: "linear-gradient(135deg, rgba(168,85,247,.18), rgba(249,115,22,.16))",
    category: {
      zh: "交互体验",
      en: "Experience",
      ja: "体験設計"
    },
    tags: {
      zh: ["主题切换", "模式切换", "音乐组件"],
      en: ["Themes", "Modes", "Music Widget"],
      ja: ["テーマ切替", "モード切替", "音楽ウィジェット"]
    },
    title: {
      zh: "主题切换、模式切换与音乐组件怎么放进博客",
      en: "How theme switching, mode switching, and music fit the blog",
      ja: "テーマ切替と音楽コンポーネントの置きどころ"
    },
    excerpt: {
      zh: "模板里新增的交互能力会直接影响博客阅读体验，这篇文章给出一套更适合工具站博客区的取舍建议。",
      en: "These interaction features influence reading experience directly, so this post outlines a practical way to use them in a tools-oriented blog.",
      ja: "追加されたインタラクション機能を、ツール系ブログでどう使い分けるかの考え方をまとめています。"
    },
    contentHtml: {
      zh: `
        <p>主题切换和模式切换属于高频基础能力，音乐组件则更偏个性表达。三者都能提升氛围，但在工具站博客里，优先级并不完全一样。</p>
        <h2>建议优先级</h2>
        <ol>
          <li>先保证亮色 / 暗色主题稳定。</li>
          <li>再考虑阅读模式或布局模式切换。</li>
          <li>最后再决定音乐组件是否默认展示。</li>
        </ol>
        <h2>为什么音乐组件要谨慎</h2>
        <p>博客文章页面的核心任务仍然是阅读和转化。音乐组件适合做可选增强，不适合默认打断内容消费，尤其是工具教程或 SEO 类文章。</p>
        <h2>最稳妥的落法</h2>
        <p>把音乐入口放在独立页面或可折叠侧边区域，把主题和模式切换保留在全局导航中，这样既有个性，也不会影响主流程。</p>
      `,
      en: `
        <p>Theme switching is essential, layout or reading mode is useful, and music is more expressive than necessary. All three can enrich the experience, but their priority is different for a tools-focused blog.</p>
        <ol>
          <li>Stabilize light and dark themes first.</li>
          <li>Add reading or layout modes second.</li>
          <li>Treat music as optional enhancement.</li>
        </ol>
        <p>For tutorials and SEO content, the reading flow should remain the main focus.</p>
      `,
      ja: `
        <p>テーマ切替は必須機能、表示モード切替は有用、音楽コンポーネントは個性寄りの機能です。すべて魅力的ですが、優先順位は同じではありません。</p>
        <ol>
          <li>まずライト / ダークテーマを安定させる</li>
          <li>次に閲覧モードやレイアウト切替を考える</li>
          <li>音楽は任意機能として扱う</li>
        </ol>
      `
    }
  }
];
