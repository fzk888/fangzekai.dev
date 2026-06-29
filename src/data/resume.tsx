import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, VideoIcon, FolderIcon, Settings, Wrench, Zap } from "lucide-react";
import { faReact, faNodeJs, faGitAlt, faTypescript, faTailwindCss, faDocker, faFigma, faGithub, faFirefoxBrowser, faBrave, faNotion, faPython, faJava, faJs, faHtml5 } from "@fortawesome/free-brands-svg-icons";
import { faTerminal, faRocket, faServer } from "@fortawesome/free-solid-svg-icons";

export const DATA = {
  name: "fangzekai",
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
      title: "Gears Used",
      description: "Productivity tools and gadgets I use daily.",
      href: "/gadgets",
      icon: Settings,
    },
    {
      title: "Tools I Use",
      description: "Software and apps I code with daily.",
      href: "/gadgets#tools",
      icon: Wrench,
    },
  ],
  tools: [
    {
      name: "Cursor",
      description: "AI-powered code editor built on VS Code — my primary IDE for all projects.",
      href: "https://cursor.com/referral?code=63BS4MRLZQQV",
      customIcon: Icons.cursor,
    },
    {
      name: "VS Code",
      description: "The classic. I still use it for quick edits and when I need specific extensions.",
      href: "https://code.visualstudio.com",
      customIcon: Icons.vscode,
    },
    {
      name: "Git Bash",
      description: "My go-to terminal on Windows for all git operations and shell scripting.",
      href: "https://gitforwindows.org",
      icon: faTerminal,
    },
    {
      name: "Postman",
      description: "API testing and documentation — essential for building and debugging REST APIs.",
      href: "https://www.postman.com",
      icon: faRocket,
    },
    {
      name: "Docker",
      description: "Containerization for consistent dev environments and easy deployments.",
      href: "https://www.docker.com",
      icon: faDocker,
    },
    {
      name: "Hostinger",
      description: "Reliable and affordable hosting for my projects and client sites.",
      href: "https://www.hostinger.com/in?REFERRALCODE=NP4PRASENELF",
      icon: faServer,
    },
    {
      name: "Firefox",
      description: "Privacy-first browser I use for everyday browsing and web development.",
      href: "https://www.mozilla.org/firefox",
      icon: faFirefoxBrowser,
    },
    {
      name: "Brave",
      description: "Fast, ad-free browser — my secondary pick for a clean browsing experience.",
      href: "https://brave.com",
      icon: faBrave,
    },
    {
      name: "Figma",
      description: "Design tool for UI mockups, prototyping, and collaborating on layouts.",
      href: "https://www.figma.com",
      icon: faFigma,
    },
    {
      name: "GitHub",
      description: "Where all my code lives — version control, CI/CD, and open source contributions.",
      href: "https://github.com",
      icon: faGithub,
    },
    {
      name: "Vercel",
      description: "One-click deploys for all my Next.js apps with instant previews.",
      href: "https://vercel.com",
      icon: faRocket,
    },
    {
      name: "Notion",
      description: "Notes, task management, and documentation — my second brain.",
      href: "https://www.notion.so",
      icon: faNotion,
    },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "/videos", icon: VideoIcon, label: "Videos" },
    { href: "/projects", icon: FolderIcon, label: "Projects" },
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
      company: "RideClaw",
      companyZh: "龙虾出行",
      href: "https://rideclaw.ai/",
      badges: ["AI", "Agent"],
      location: "Guangdong, China",
      title: "Full Stack Developer",
      logoUrl: "/rideclaw.svg",
      start: "February 2026",
      end: "June 2026",
      description:
        "Full-stack development across an AI Travel Agent platform that turns natural-language trip requests into executable itineraries — built the management dashboard, channel-operations tooling, business APIs, and the H5 user experience end to end.",
    },
    {
      company: "Cross-border E-commerce AI Startup",
      href: "#",
      badges: ["RAG", "LLM"],
      location: "Remote",
      title: "AI Application Developer Intern",
      logoUrl: "/stealth-ai.webp",
      start: "January 2026",
      end: "February 2026",
      description:
        "Built a RAG pipeline so finance teams could query messy ERP exports — invoices, logistics, tax, and warehouse data — in natural language, combining document parsing with hybrid retrieval (vector + keyword) and reranking to lift answer accuracy on long-tail questions.",
    },
    {
      company: "Client Service International, Inc.",
      companyZh: "北京科蓝软件系统股份有限公司",
      href: "http://www.csii.com.cn/",
      badges: ["NLU", "BERT"],
      location: "Remote",
      title: "Algorithm Developer Intern",
      logoUrl: "/csii.png",
      start: "July 2025",
      end: "December 2025",
      description:
        "Improved the NLU engine behind an intelligent language assistant — strengthened intent recognition and slot extraction, mined and labeled long-tail samples, separated confusable intents, and made tool-calling flows more reliable for real production traffic.",
    },
  ],
  education: [
    {
      school: "Guangzhou City University of Technology",
      href: "https://www.gcut.edu.cn/",
      degree: "Bachelor of Engineering in Artificial Intelligence",
      logoUrl: "/buildspace.webp",
      start: "2022",
      end: "2026",
    },
  ],
  projects: [
    {
      title: "Doc_QA",
      href: "https://github.com/fzk888/Doc_QA",
      dates: "2026",
      active: true,
      description:
        "RAG 知识库问答系统，面向文档资料构建检索增强问答流程，支持从知识库中检索相关内容并生成回答。",
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
        "小智 ESP32 智能硬件 AI 后端服务，基于小智通信协议实现语音对话、唤醒词、OTA 升级等能力，对接自建大模型为硬件设备提供端到端交互。",
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
        "基于 YOLOv12 的实时车辆检测与分类系统，用于识别图像或视频中的车辆目标并完成分类。",
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
        "小目标交通标志智能检测与识别系统，聚焦复杂交通场景下小尺寸标志目标的检测与识别。",
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
        "视频暗水印盲分析工具箱，支持盲水印检测、残差特征与频谱提取、弱化攻击（DCT/SVD/各向异性扩散）及相似度对比评分，提供统一 CLI 工具链。",
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
        "机票比价 Skill，并发爬取携程、飞猪、同程、去哪儿四平台实时价格，支持直飞/中转筛选与航班号查询，生成价格对比图表，可作为 Agent 技能集成。",
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
        "跨境电商收入核算系统，用于处理业务收入、订单结算和核算流程，提升数据整理与财务统计效率。",
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
        "基于 LangGraph 构建的 RAG 智能客服系统，通过图式工作流组织检索、推理和回答生成流程。",
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
