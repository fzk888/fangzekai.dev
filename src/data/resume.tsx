import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, VideoIcon, FolderIcon, Settings, Wrench, Zap } from "lucide-react";
import { faReact, faNodeJs, faGitAlt, faTypescript, faTailwindCss, faDocker, faFigma, faGithub, faFirefoxBrowser, faBrave, faNotion, faPython, faJava, faJs, faHtml5 } from "@fortawesome/free-brands-svg-icons";
import { faTerminal, faRocket, faServer } from "@fortawesome/free-solid-svg-icons";

export const DATA = {
  name: "方泽铠",
  nameEn: "Fang Zekai",
  displayName: {
    en: "Fang Zekai",
    zh: "方泽铠",
  },
  initials: "FZK",
  url: "https://fangzekai.vercel.app",
  location: "Guangdong, China",
  locationLink: "https://www.google.com/maps/place/Guangdong",
  description:
    "",
  summary:
    "Currently working on AI application development. I love collaborating with new people on exciting projects.\n\nWhen I'm not coding, I'm usually playing Honor of Kings or hitting the gym.\n\nHere's my take on the [future of computer science](https://fangzekai.vercel.app/blog/hello-world).\n\nBullish on AI and future technologies.",

  avatarUrl: "/zekai.webp",
  skills: [
    { name: "TypeScript", icon: faTypescript, category: "Languages" },
    { name: "JavaScript", icon: faJs, category: "Languages" },
    { name: "Python", icon: faPython, category: "Languages" },
    { name: "React", icon: faReact, category: "Frontend" },
    { name: "Next.js", customIcon: Icons.nextjs, category: "Frontend" },
    { name: "TailwindCSS", icon: faTailwindCss, category: "Frontend" },
    { name: "Node.js", icon: faNodeJs, category: "Backend" },
    { name: "MySQL", customIcon: Icons.mysql, category: "Backend" },
    { name: "Redis", customIcon: Icons.redis, category: "Backend" },
    { name: "RAG", customIcon: Icons.rag, category: "AI" },
    { name: "Agent", customIcon: Icons.agent, category: "AI" },
    { name: "Git", icon: faGitAlt, category: "Tools" },
    { name: "Docker", icon: faDocker, category: "Tools" },
    { name: "Cursor", customIcon: Icons.cursor, category: "Tools" },
    { name: "Codex", icon: faTerminal, category: "Tools" },
    { name: "Claude", customIcon: Icons.claude, category: "Tools" },
  ],
  setup: [
    {
      title: { en: "Gear I Use", zh: "我的装备" },
      description: {
        en: "Productivity tools and gadgets I use daily.",
        zh: "我日常使用的效率工具与数码装备。",
      },
      href: "/gadgets",
      icon: Settings,
    },
    {
      title: { en: "Tools I Use", zh: "常用工具" },
      description: {
        en: "Software and apps I code with daily.",
        zh: "我日常开发使用的软件与应用。",
      },
      href: "/gadgets#tools",
      icon: Wrench,
    },
  ],
  tools: [
    {
      name: "Cursor",
      description: {
        en: "AI-powered code editor built on VS Code — my primary IDE for all projects.",
        zh: "基于 VS Code 的 AI 代码编辑器，也是我开发所有项目的主力 IDE。",
      },
      href: "https://cursor.com/referral?code=63BS4MRLZQQV",
      customIcon: Icons.cursor,
    },
    {
      name: "VS Code",
      description: {
        en: "The classic. I still use it for quick edits and when I need specific extensions.",
        zh: "经典编辑器，适合快速修改代码或使用特定扩展。",
      },
      href: "https://code.visualstudio.com",
      customIcon: Icons.vscode,
    },
    {
      name: "Git Bash",
      description: {
        en: "My go-to terminal on Windows for all Git operations and shell scripting.",
        zh: "我在 Windows 上进行 Git 操作和编写 Shell 脚本的常用终端。",
      },
      href: "https://gitforwindows.org",
      icon: faTerminal,
    },
    {
      name: "Postman",
      description: {
        en: "API testing and documentation — essential for building and debugging REST APIs.",
        zh: "用于 API 测试与文档管理，是开发和调试 REST API 的必备工具。",
      },
      href: "https://www.postman.com",
      icon: faRocket,
    },
    {
      name: "Docker",
      description: {
        en: "Containerization for consistent development environments and easy deployments.",
        zh: "通过容器保持开发环境一致，并简化部署流程。",
      },
      href: "https://www.docker.com",
      icon: faDocker,
    },
    {
      name: "Hostinger",
      description: {
        en: "Reliable and affordable hosting for my projects and client sites.",
        zh: "用于托管个人项目与客户网站，稳定且价格合理。",
      },
      href: "https://www.hostinger.com/in?REFERRALCODE=NP4PRASENELF",
      icon: faServer,
    },
    {
      name: "Firefox",
      description: {
        en: "A privacy-first browser I use for everyday browsing and web development.",
        zh: "注重隐私保护，是我日常浏览和 Web 开发使用的浏览器。",
      },
      href: "https://www.mozilla.org/firefox",
      icon: faFirefoxBrowser,
    },
    {
      name: "Brave",
      description: {
        en: "A fast, ad-free browser — my secondary pick for a clean browsing experience.",
        zh: "快速、无广告，是我追求清爽浏览体验时的备用选择。",
      },
      href: "https://brave.com",
      icon: faBrave,
    },
    {
      name: "Figma",
      description: {
        en: "A design tool for UI mockups, prototyping, and collaborating on layouts.",
        zh: "用于 UI 设计、原型制作和协作调整布局。",
      },
      href: "https://www.figma.com",
      icon: faFigma,
    },
    {
      name: "GitHub",
      description: {
        en: "Where all my code lives — version control, CI/CD, and open source contributions.",
        zh: "我的代码主要托管于此，用于版本控制、CI/CD 和开源协作。",
      },
      href: "https://github.com",
      icon: faGithub,
    },
    {
      name: "Vercel",
      description: {
        en: "One-click deployments for my Next.js apps with instant previews.",
        zh: "为 Next.js 应用提供一键部署和即时预览。",
      },
      href: "https://vercel.com",
      icon: faRocket,
    },
    {
      name: "Notion",
      description: {
        en: "Notes, task management, and documentation — my second brain.",
        zh: "用于笔记、任务管理和文档整理，是我的第二大脑。",
      },
      href: "https://www.notion.so",
      icon: faNotion,
    },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: { en: "Home", zh: "首页" } },
    { href: "/blog", icon: NotebookIcon, label: { en: "Blog", zh: "博客" } },
    { href: "/videos", icon: VideoIcon, label: { en: "Videos", zh: "视频" } },
    { href: "/projects", icon: FolderIcon, label: { en: "Projects", zh: "项目" } },
    // { href: "/gadgets", icon: Icons.shop, label: "Gadgets" },
  ],
  contact: {
    email: "zekai_ai@163.com",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/fzk888",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "",
        icon: Icons.linkedin,
        navbar: false,
      },
      X: {
        name: "X",
        url: "",
        icon: Icons.x,
        navbar: false,
      },
      email: {
        name: "Send Email",
        url: "mailto:zekai_ai@163.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: {
        en: "Letubao Network Technology Co., Ltd.",
        zh: "乐途宝网络科技有限公司",
      },
      href: undefined,
      badges: ["AI", "Agent"],
      location: { en: "Guangdong, China", zh: "中国广东" },
      title: { en: "Full Stack Developer", zh: "全栈开发工程师" },
      logoUrl: "/letubao.ico",
      period: { en: "Feb 2026 – Jun 2026", zh: "2026年2月 – 2026年6月" },
      description: {
        en: "Full-stack development across an AI Travel Agent platform that turns natural-language trip requests into executable itineraries — built the management dashboard, channel-operations tooling, business APIs, and the H5 user experience end to end.",
        zh: "参与 AI 旅行 Agent 平台的全栈开发，将自然语言出行需求转化为可执行行程；端到端完成管理后台、渠道运营工具、业务 API 与 H5 用户端。",
      },
    },
    {
      company: {
        en: "Haber Intelligent Technology Co., Ltd.",
        zh: "哈贝尔智能科技有限公司",
      },
      href: undefined,
      badges: ["RAG", "LLM"],
      location: { en: "Remote", zh: "远程" },
      title: { en: "AI Application Developer Intern", zh: "AI 应用开发实习生" },
      logoUrl: "/stealth-ai.webp",
      period: { en: "Jan 2026 – Feb 2026", zh: "2026年1月 – 2026年2月" },
      description: {
        en: "Built a RAG pipeline so finance teams could query messy ERP exports — invoices, logistics, tax, and warehouse data — in natural language, combining document parsing with hybrid retrieval (vector + keyword) and reranking to lift answer accuracy on long-tail questions.",
        zh: "构建 RAG 流程，让财务团队能用自然语言查询发票、物流、税务和仓储等复杂 ERP 导出数据；结合文档解析、向量与关键词混合检索及重排序，提升长尾问题的回答准确率。",
      },
    },
    {
      company: {
        en: "Client Service International, Inc.",
        zh: "北京科蓝软件系统股份有限公司",
      },
      href: "http://www.csii.com.cn/",
      badges: ["NLU", "BERT"],
      location: { en: "Remote", zh: "远程" },
      title: { en: "Algorithm Developer Intern", zh: "算法开发实习生" },
      logoUrl: "/csii.png",
      period: { en: "Jul 2025 – Dec 2025", zh: "2025年7月 – 2025年12月" },
      description: {
        en: "Improved the NLU engine behind an intelligent language assistant — strengthened intent recognition and slot extraction, mined and labeled long-tail samples, separated confusable intents, and made tool-calling flows more reliable for real production traffic.",
        zh: "优化智能语言助手背后的 NLU 引擎，增强意图识别与槽位抽取；挖掘并标注长尾样本、拆分易混淆意图，提高真实生产流量下工具调用流程的可靠性。",
      },
    },
  ],
  education: [
    {
      school: {
        en: "Guangzhou City University of Technology",
        zh: "广州城市理工学院",
      },
      href: "https://www.gcut.edu.cn/",
      degree: {
        en: "Bachelor of Engineering in Artificial Intelligence",
        zh: "人工智能 · 工学学士",
      },
      logoUrl: "/buildspace.webp",
      period: { en: "2022 – 2026", zh: "2022 – 2026" },
    },
  ],
  projects: [
    {
      title: "Doc_QA",
      href: "https://github.com/fzk888/Doc_QA",
      dates: "2026",
      active: true,
      description:
        {
          en: "A RAG knowledge-base Q&A system that retrieves relevant document context and generates grounded answers.",
          zh: "RAG 知识库问答系统，面向文档资料构建检索增强问答流程，支持从知识库中检索相关内容并生成回答。",
        },
      technologies: [
        "Python",
        "RAG",
        "HTML",
        "ReScript",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/fzk888/Doc_QA",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/doc-qa.svg",
      video: "",
    },
    {
      title: "xiaozhi-assistant",
      href: "https://github.com/fzk888/xiaozhi-assistant",
      dates: "2025",
      active: true,
      description:
        {
          en: "An AI backend for Xiaozhi ESP32 devices, supporting voice conversations, wake words, OTA updates, and end-to-end interaction with self-hosted language models.",
          zh: "小智 ESP32 智能硬件 AI 后端服务，基于小智通信协议实现语音对话、唤醒词、OTA 升级等能力，对接自建大模型为硬件设备提供端到端交互。",
        },
      technologies: [
        "Python",
        "ESP32",
        "IoT",
        "LLM",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/fzk888/xiaozhi-assistant",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/xiaozhi-assistant.svg",
      video: "",
    },
    {
      title: "VehicleDetection_YOLOv12",
      href: "https://github.com/fzk888/VehicleDetection_YOLOv12",
      dates: "2026",
      active: true,
      description:
        {
          en: "A real-time YOLOv12 vehicle detection and classification system for identifying vehicle targets in images and video.",
          zh: "基于 YOLOv12 的实时车辆检测与分类系统，用于识别图像或视频中的车辆目标并完成分类。",
        },
      technologies: [
        "Python",
        "YOLOv12",
        "Computer Vision",
        "Object Detection",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/fzk888/VehicleDetection_YOLOv12",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/vehicle-detection-yolov12.svg",
      video: "",
    },
    {
      title: "Tiny Traffic Sign Detection",
      href: "https://github.com/fzk888/Tiny-Traffic-Sign-Intelligent-Detection-and-Recognition-System",
      dates: "2026",
      active: true,
      description:
        {
          en: "An intelligent detection and recognition system focused on tiny traffic signs in complex road scenes.",
          zh: "小目标交通标志智能检测与识别系统，聚焦复杂交通场景下小尺寸标志目标的检测与识别。",
        },
      technologies: [
        "Python",
        "Computer Vision",
        "Object Detection",
        "Traffic Sign Recognition",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/fzk888/Tiny-Traffic-Sign-Intelligent-Detection-and-Recognition-System",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/tiny-traffic-sign-detection.svg",
      video: "",
    },
    {
      title: "Watermark Lab",
      href: "https://github.com/fzk888/watermark-lab",
      dates: "2026",
      active: true,
      description:
        {
          en: "A blind-analysis toolkit for imperceptible video watermarks with detection, residual and spectrum extraction, weakening attacks, similarity scoring, and a unified CLI.",
          zh: "视频暗水印盲分析工具箱，支持盲水印检测、残差特征与频谱提取、弱化攻击（DCT/SVD/各向异性扩散）及相似度对比评分，提供统一 CLI 工具链。",
        },
      technologies: [
        "Python",
        "OpenCV",
        "Steganography",
        "DCT/SVD",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/fzk888/watermark-lab",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/watermark-lab.svg",
      video: "",
    },
    {
      title: "airticket-compare",
      href: "https://github.com/fzk888/airticket-compare",
      dates: "2026",
      active: true,
      description:
        {
          en: "A flight-comparison agent skill that concurrently checks four Chinese travel platforms, filters direct and connecting flights, and generates price charts.",
          zh: "机票比价 Skill，并发爬取携程、飞猪、同程、去哪儿四平台实时价格，支持直飞/中转筛选与航班号查询，生成价格对比图表，可作为 Agent 技能集成。",
        },
      technologies: [
        "Python",
        "Playwright",
        "Asyncio",
        "Data Visualization",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/fzk888/airticket-compare",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/airticket-compare.svg",
      video: "",
    },
    {
      title: "CB-Settlement",
      href: "https://github.com/fzk888/CB-Settlement",
      dates: "2026",
      active: true,
      description:
        {
          en: "A cross-border e-commerce revenue accounting system for order settlement, reconciliation, and efficient financial reporting.",
          zh: "跨境电商收入核算系统，用于处理业务收入、订单结算和核算流程，提升数据整理与财务统计效率。",
        },
      technologies: [
        "Python",
        "Data Processing",
        "Settlement",
        "Automation",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/fzk888/CB-Settlement",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/cb-settlement.svg",
      video: "",
    },
    {
      title: "GraphRAG-Assistant",
      href: "https://github.com/fzk888/GraphRAG-Assistant",
      dates: "2025",
      active: true,
      description:
        {
          en: "A RAG customer-service assistant built with LangGraph, orchestrating retrieval, reasoning, and response generation through graph workflows.",
          zh: "基于 LangGraph 构建的 RAG 智能客服系统，通过图式工作流组织检索、推理和回答生成流程。",
        },
      technologies: [
        "Python",
        "LangGraph",
        "RAG",
        "LLM",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/fzk888/GraphRAG-Assistant",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/projects/graphrag-assistant.svg",
      video: "",
    },
  ],
  hackathons: [],
} as const;
