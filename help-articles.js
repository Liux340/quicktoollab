// This file is managed by Decap CMS — do not edit manually
window.HELP_ARTICLES = [
    {
        id: 'pixcrush-compress-guide',
        cat: { zh: 'PixCrush', en: 'PixCrush', ja: 'PixCrush' },
        title: {
            zh: 'PixCrush 在线图片压缩工具：如何在不明显降质的情况下快速减小图片体积',
            en: 'PixCrush Image Compression: shrink files without visible quality loss',
            ja: 'PixCrush 画像圧縮：画質を保ちながら容量を下げる方法'
        },
        intro: {
            zh: 'PixCrush 适合站长、运营与开发者做发布前图片瘦身。它支持浏览器本地处理，不依赖上传到服务器，适用于隐私要求较高的场景。',
            en: 'PixCrush helps teams optimize images before publishing. It runs fully in your browser and does not require uploading files to a server.',
            ja: 'PixCrush は公開前の画像最適化に便利です。処理はブラウザ内で完結し、サーバーアップロードは不要です。'
        },
        howto: {
            zh: '建议先统一目标宽度，再逐级调整质量参数并对比视觉效果；最后按页面场景导出 JPG 或 WebP。',
            en: 'Set a target width first, then adjust quality step by step while checking visual output; export as JPG or WebP based on your page usage.',
            ja: '先に目標幅を決め、次に品質を段階調整して見た目を確認します。用途に合わせて JPG または WebP で書き出します。'
        },
        science: {
            zh: '图片大小由像素总量、编码方式、压缩质量共同决定。只盯质量参数往往不够，分辨率控制通常更有效。',
            en: 'File size depends on pixel count, codec, and quality level. Resolution control is often more impactful than quality alone.',
            ja: '容量は画素数・圧縮方式・品質値の組み合わせで決まります。品質だけでなく解像度調整が重要です。'
        }
    },
    {
        id: 'regex101-debug-guide',
        cat: { zh: '文本与数据格式', en: 'Text & Data Formats', ja: 'テキスト・データ形式' },
        title: {
            zh: 'Regex101 正则表达式入门到排错：如何快速定位匹配失败的真实原因',
            en: 'Regex101 debugging guide: quickly find why pattern matching fails',
            ja: 'Regex101 デバッグ入門：マッチ失敗の原因を素早く特定する'
        },
        intro: {
            zh: 'Regex101 可以把复杂正则拆解为可视化步骤，适合日志筛选、文本提取、输入校验等场景。',
            en: 'Regex101 visualizes complex expressions and is useful for logs, extraction tasks, and input validation.',
            ja: 'Regex101 は複雑な正規表現を可視化でき、ログ抽出や入力検証に役立ちます。'
        },
        howto: {
            zh: '先写最小规则完成首次匹配，再逐步增加边界与分组；每加一步都看 Explain 面板。',
            en: 'Start with the smallest working pattern, then add boundaries and groups gradually while reading the Explain panel.',
            ja: '最小パターンでまず動作確認し、境界やグループを段階的に追加して Explain を確認します。'
        },
        science: {
            zh: '贪婪匹配与惰性匹配是多数正则 bug 的源头。',
            en: 'Greedy vs lazy matching is a common source of regex bugs.',
            ja: '貪欲・非貪欲マッチの違いは不具合の主要因です。'
        }
    },
    {
        id: 'json-formatter-steps',
        cat: { zh: '文本与数据格式', en: 'Text & Data Formats', ja: 'テキスト・データ形式' },
        title: {
            zh: 'JSON Formatter 使用指南：格式化、校验、折叠节点三步完成结构化排查',
            en: 'JSON Formatter workflow: format, validate, then inspect nested nodes',
            ja: 'JSON Formatter の基本手順：整形・検証・階層確認'
        },
        intro: {
            zh: 'JSON Formatter 适合接口联调、配置文件检查和日志阅读，字段层级越深越有价值。',
            en: 'JSON Formatter is great for API debugging, config checks, and deep nested log inspection.',
            ja: 'JSON Formatter は API 連携確認や設定ファイル点検、深い階層のログ確認に有効です。'
        },
        howto: {
            zh: '先格式化，再折叠外层逐级定位目标节点，最后确认字段类型。',
            en: 'Format first, collapse outer nodes, drill into target paths, and verify field types.',
            ja: '先に整形し、外側の階層を折りたたんで目的ノードを絞り込み、型を確認します。'
        },
        science: {
            zh: 'JSON 语法很严格：键名必须双引号、不能有尾逗号。',
            en: 'JSON syntax is strict: quoted keys and no trailing commas.',
            ja: 'JSON は厳密な文法です。キーはダブルクォート、末尾カンマ不可です。'
        }
    },
    {
        id: 'diffchecker-review-trick',
        cat: { zh: '文本与数据格式', en: 'Text & Data Formats', ja: 'テキスト・データ形式' },
        title: {
            zh: 'Diffchecker 对比技巧：如何高效识别改动中真正会引发回归的问题',
            en: 'Diffchecker review tips: detect risky changes, not just big changes',
            ja: 'Diffchecker 活用法：回帰リスクの高い差分を見抜く'
        },
        intro: {
            zh: 'Diffchecker 用于文本与代码版本差异分析，适合发布前校对和协作审阅。',
            en: 'Diffchecker helps compare text/code revisions before release and during team reviews.',
            ja: 'Diffchecker は公開前の差分確認やレビューに向いています。'
        },
        howto: {
            zh: '建议先看删除内容，再看新增内容，最后检查顺序和空白变更。',
            en: 'Review deletions first, then additions, then ordering/whitespace changes.',
            ja: '削除差分を先に確認し、次に追加、最後に並び順や空白差分を見ます。'
        },
        science: {
            zh: '回归风险常来自“删掉了关键约束”，不只是“新增很多代码”。',
            en: 'Regressions often come from removed constraints, not only from large additions.',
            ja: '回帰は大量追加よりも、重要制約の削除で起きることが多いです。'
        }
    },
    {
        id: 'caniuse-compat-strategy',
        cat: { zh: '前端设计与 UI', en: 'Front-end & UI', ja: 'フロントエンド・UI' },
        title: {
            zh: 'Can I Use 兼容性实践：如何为新 CSS/JS 特性设计可回退方案',
            en: 'Can I Use strategy: plan safe fallback for new CSS/JS features',
            ja: 'Can I Use 活用：新機能のフォールバック設計'
        },
        intro: {
            zh: 'Can I Use 用于查询浏览器支持度，帮助你判断新特性能否直接上线。',
            en: 'Can I Use shows browser support so you can decide whether a feature is ready for production.',
            ja: 'Can I Use はブラウザ対応状況を確認し、本番投入判断を助けます。'
        },
        howto: {
            zh: '根据目标用户浏览器份额做决策：高覆盖直用，低覆盖加 polyfill 或降级策略。',
            en: 'Decide by audience browser share: ship directly for high coverage, add polyfill/degradation when needed.',
            ja: '利用ユーザー環境の割合で判断し、必要なら polyfill や段階的劣化を用意します。'
        },
        science: {
            zh: '兼容性是分层设计问题，不是简单“支持/不支持”二选一。',
            en: 'Compatibility is a layered design decision, not a binary yes/no.',
            ja: '互換性は二択ではなく、段階設計で考えるべき課題です。'
        }
    },
    {
        id: 'codesandbox-min-repro',
        cat: { zh: '在线 IDE 与沙盒', en: 'Online IDE & Sandbox', ja: 'オンライン IDE・サンドボックス' },
        title: {
            zh: 'CodeSandbox 最小复现指南：如何构造能让别人一眼看懂的问题现场',
            en: 'CodeSandbox minimal reproduction: build a clean, shareable bug case',
            ja: 'CodeSandbox 最小再現ガイド：伝わる不具合ケースの作り方'
        },
        intro: {
            zh: 'CodeSandbox 特别适合复现前端 bug、演示方案和协作讨论。',
            en: 'CodeSandbox is ideal for reproducing front-end bugs and sharing isolated demos.',
            ja: 'CodeSandbox はフロント不具合の再現や共有デモに最適です。'
        },
        howto: {
            zh: '把复现范围缩到一个页面或组件，删掉无关依赖，只保留触发路径。',
            en: 'Shrink the repro to a single page/component and keep only dependencies required to trigger the issue.',
            ja: '再現範囲を 1 ページ/1 コンポーネントに絞り、必要最小限の依存だけ残します。'
        },
        science: {
            zh: '最小复现的核心不是代码少，而是变量可控。',
            en: 'A good minimal repro is about controllable variables, not just fewer lines.',
            ja: '最小再現の本質はコード量ではなく、変数を制御できることです。'
        }
    },
    {
        id: 'crontab-time-pitfalls',
        cat: { zh: '运维网络与调试', en: 'Ops, Network & Debug', ja: '運用・ネットワーク・デバッグ' },
        title: {
            zh: 'crontab.guru 定时任务避坑：表达式看起来对，为什么执行时间还是不对',
            en: 'crontab.guru pitfalls: why valid expressions still run at the wrong time',
            ja: 'crontab.guru の落とし穴：式が正しくても実行時刻がずれる理由'
        },
        intro: {
            zh: 'crontab.guru 把 Cron 表达式翻译成人话，是上线前校验定时配置的高效工具。',
            en: 'crontab.guru translates cron syntax into plain language for quick schedule validation.',
            ja: 'crontab.guru は Cron 式を自然文で確認でき、投入前チェックに便利です。'
        },
        howto: {
            zh: '写完表达式先看自然语言描述，再结合服务器时区与夏令时做二次确认。',
            en: 'Read the natural language summary and verify timezone/DST behavior before deployment.',
            ja: '自然文の説明を確認し、タイムゾーンや夏時間設定まで合わせて検証します。'
        },
        science: {
            zh: '定时偏差常由时区和字段语义误解导致。',
            en: 'Most scheduling drift issues come from timezone and field-meaning confusion.',
            ja: '実行ずれの多くはタイムゾーン設定や項目解釈の誤りが原因です。'
        }
    },
    {
        id: 'httpbin-api-debug',
        cat: { zh: '运维网络与调试', en: 'Ops, Network & Debug', ja: '運用・ネットワーク・デバッグ' },
        title: {
            zh: 'httpbin 接口联调方法：如何验证请求头、方法与 Body 是否真实生效',
            en: 'httpbin API debugging: verify headers, method, and payload quickly',
            ja: 'httpbin 連携確認：ヘッダー・メソッド・本文の検証手順'
        },
        intro: {
            zh: 'httpbin 是通用请求回显服务，可用于验证客户端和网关行为。',
            en: 'httpbin echoes requests and is useful for validating client and gateway behavior.',
            ja: 'httpbin はリクエスト内容を返すため、クライアントやゲートウェイ検証に使えます。'
        },
        howto: {
            zh: '优先验证 method、headers、json/body 三项核心数据，确认请求正确后再排查后端。',
            en: 'Check method, headers, and body first; only then continue to backend-side debugging.',
            ja: 'まず method・headers・body を確認し、送信が正しいことを確かめてからサーバー側を調査します。'
        },
        science: {
            zh: '很多联调问题根源是请求构造细节不一致。',
            en: 'Many integration issues are caused by subtle request-construction mismatches.',
            ja: '連携不具合の多くはリクエスト構築の細かな不一致です。'
        }
    },
    {
        id: 'jwtio-security-boundary',
        cat: { zh: '数据库、安全与文档', en: 'DB, Security & Docs', ja: 'DB・セキュリティ・ドキュメント' },
        title: {
            zh: 'JWT.io 调试边界：能看懂令牌结构，但为什么还不能代表鉴权安全',
            en: 'JWT.io limits: understanding token structure is not full auth security',
            ja: 'JWT.io の限界：構造理解だけでは認証安全にならない理由'
        },
        intro: {
            zh: 'JWT.io 适合查看 token 结构与字段，不适合作为生产密钥验证环境。',
            en: 'JWT.io is great for inspecting token fields, but should not be treated as a production validation environment.',
            ja: 'JWT.io は構造確認に適していますが、本番鍵での検証環境として使うべきではありません。'
        },
        howto: {
            zh: '把它当结构检查工具，重点核对 exp、iss、aud 等声明是否符合服务约定。',
            en: 'Use it as a structure checker, and validate claims like exp/iss/aud against your service rules.',
            ja: '構造確認ツールとして使い、exp・iss・aud などのクレームをサービス仕様と照合します。'
        },
        science: {
            zh: 'JWT 安全性来自签名算法、密钥管理和服务端严格校验。',
            en: 'JWT security depends on algorithm choice, key management, and strict server-side validation.',
            ja: 'JWT の安全性は署名方式、鍵管理、サーバー側の厳格検証で決まります。'
        }
    },
    {
        id: 'shields-readme-signals',
        cat: { zh: '数据库、安全与文档', en: 'DB, Security & Docs', ja: 'DB・セキュリティ・ドキュメント' },
        title: {
            zh: 'Shields.io 徽章设计建议：如何在 README 中展示关键信息又不造成信息过载',
            en: 'Shields.io badge strategy: show key project signals without clutter',
            ja: 'Shields.io バッジ設計：情報過多を避けつつ要点を伝える'
        },
        intro: {
            zh: 'Shields.io 能快速生成版本、构建、许可证等状态徽章，提升项目可读性。',
            en: 'Shields.io provides quick badges for version, CI status, and license to improve README readability.',
            ja: 'Shields.io はバージョン・CI・ライセンス等のバッジを簡単に作成できます。'
        },
        howto: {
            zh: '建议只保留核心信号：版本、构建、覆盖率、许可证，其余信息放正文。',
            en: 'Keep only core signals (version/build/coverage/license) and move the rest to documentation text.',
            ja: 'バッジは主要指標に絞り、補足情報は本文で説明するのがおすすめです。'
        },
        science: {
            zh: '徽章属于导航信息，数量过多会稀释真正重点。',
            en: 'Badges are navigation signals; too many badges dilute important information.',
            ja: 'バッジはナビ情報です。多すぎると重要な情報が埋もれます。'
        }
    },
    {
        id: 'dns-propagation-check',
        cat: { zh: '运维网络与调试', en: 'Ops, Network & Debug', ja: '運用・ネットワーク・デバッグ' },
        title: {
            zh: 'DNS 传播检查实战：修改记录后为什么有的人能访问有的人不行',
            en: 'DNS propagation in practice: why updates work for some users but not others',
            ja: 'DNS 伝播の実務：更新後に人によって結果が違う理由'
        },
        intro: {
            zh: 'DNSChecker 和 WhatsMyDNS 可用于观察全球解析状态，判断记录是否传播完成。',
            en: 'DNSChecker and WhatsMyDNS help you observe global resolution status after DNS changes.',
            ja: 'DNSChecker / WhatsMyDNS で更新後の世界各地の解決状況を確認できます。'
        },
        howto: {
            zh: '改记录后先核对 TTL，再按地区查询 A/CNAME 结果，确认是否逐步一致。',
            en: 'After updating records, verify TTL and compare A/CNAME results across regions.',
            ja: '更新後は TTL を確認し、地域ごとに A/CNAME の結果を比較して収束を確認します。'
        },
        science: {
            zh: 'DNS 不是即时全网同步，缓存与 TTL 会造成阶段性差异。',
            en: 'DNS is not instantly global; cache and TTL naturally create temporary inconsistency.',
            ja: 'DNS は即時同期ではなく、キャッシュと TTL により一時的な差が生じます。'
        }
    },
    {
        id: 'sqlite-viewer-readonly',
        cat: { zh: '数据库、安全与文档', en: 'DB, Security & Docs', ja: 'DB・セキュリティ・ドキュメント' },
        title: {
            zh: 'SQLite Viewer 排查指南：如何在不破坏原库的前提下定位数据问题',
            en: 'SQLite Viewer troubleshooting: inspect data safely in read-only flow',
            ja: 'SQLite Viewer 解析：元データを壊さずに問題を特定する方法'
        },
        intro: {
            zh: 'SQLite Viewer 适合快速查看表结构和记录内容，适用于线上问题回溯。',
            en: 'SQLite Viewer is useful for quickly inspecting table schemas and records during incident analysis.',
            ja: 'SQLite Viewer はテーブル構造やレコードの迅速確認に便利です。'
        },
        howto: {
            zh: '先备份数据库文件，再按“表结构 -> 条件查询 -> 样本导出”的顺序排查。',
            en: 'Back up the file first, then inspect in order: schema -> filtered queries -> sample export.',
            ja: '先に DB ファイルをバックアップし、構造確認→条件検索→サンプル抽出の順で調査します。'
        },
        science: {
            zh: '排查优先读操作，避免带副作用写入，才能保持证据链完整。',
            en: 'Prioritize read-only steps to preserve evidence and avoid side effects.',
            ja: '調査時は読み取り優先にし、副作用のある書き込みを避けるのが基本です。'
        }
    },
    {
        id: 'readme-so-structure',
        cat: { zh: '数据库、安全与文档', en: 'DB, Security & Docs', ja: 'DB・セキュリティ・ドキュメント' },
        title: {
            zh: 'readme.so 写作框架：如何让项目文档既完整又易读',
            en: 'readme.so structure: write complete yet readable project docs',
            ja: 'readme.so 構成術：読みやすく漏れのない README の作り方'
        },
        intro: {
            zh: 'readme.so 提供可视化模板，适合快速搭建项目文档骨架。',
            en: 'readme.so offers visual templates to bootstrap a solid README structure quickly.',
            ja: 'readme.so は視覚的テンプレートで README の骨組み作成を効率化します。'
        },
        howto: {
            zh: '优先写清项目定位、安装方式、快速开始和常见问题，再补充进阶章节。',
            en: 'Start with project purpose, installation, quick start, and FAQ before adding advanced sections.',
            ja: 'まず目的・導入・クイックスタート・FAQ を整え、後から詳細章を追加します。'
        },
        science: {
            zh: '文档的价值在于降低沟通成本，结构清晰通常比语言华丽更重要。',
            en: 'Documentation value comes from lowering communication cost, so clear structure matters most.',
            ja: 'ドキュメントの価値は伝達コスト削減です。華麗さより構造の明快さが重要です。'
        }
    },
    {
        id: 'base64-image-tradeoffs',
        cat: { zh: '文本与数据格式', en: 'Text & Data Formats', ja: 'テキスト・データ形式' },
        title: {
            zh: '图片 Base64 转换取舍：什么时候该内联，什么时候应该保留独立文件',
            en: 'Image Base64 trade-offs: when to inline and when to keep separate files',
            ja: '画像 Base64 の使い分け：インライン化すべき場面と避ける場面'
        },
        intro: {
            zh: 'Base64 工具可快速把小图片嵌入文本配置，但并不总是最佳方案。',
            en: 'Base64 tools are handy for embedding tiny assets, but they are not always optimal.',
            ja: 'Base64 は小さな画像埋め込みに便利ですが、常に最適とは限りません。'
        },
        howto: {
            zh: '图标级别资源可考虑内联；大图优先独立文件并走缓存。',
            en: 'Inline icon-sized assets only; keep large images as separate files with proper caching.',
            ja: 'アイコン程度はインライン可。大きな画像は別ファイル化してキャッシュ活用が基本です。'
        },
        science: {
            zh: 'Base64 常见体积膨胀约 33%，会增加传输和解析负担。',
            en: 'Base64 often increases size by around 33%, adding transfer and parsing overhead.',
            ja: 'Base64 は一般に約 33% 容量増となり、転送・解析コストが上がります。'
        }
    }
];
