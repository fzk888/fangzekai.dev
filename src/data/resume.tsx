import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, VideoIcon, FolderIcon, Settings, Wrench, Zap } from "lucide-react";
import { faReact, faNodeJs, faGitAlt, faTypescript, faTailwindCss, faDocker, faFigma, faGithub, faFirefoxBrowser, faBrave, faNotion, faPython, faJava, faJs, faHtml5, faCss3Alt } from "@fortawesome/free-brands-svg-icons";
import { faLeaf, faPlug, faBolt, faTerminal, faRocket, faServer, faDatabase, faCode } from "@fortawesome/free-solid-svg-icons";

export const DATA = {
  name: "fangzekai",
  initials: "FZK",
  url: "https://fangzekai.vercel.app",
  location: "Guangdong, China",
  locationLink: "https://www.google.com/maps/place/Guangdong",
  description:
    "",
  summary:
    "Currently building **AI applications** and **Agent systems** with LLM.\n\nI'm passionate about [RAG](https://github.com/fzk888/Doc_QA), [AI Agent](https://github.com/fzk888/GraphRAG-Assistant), and turning research into real products.\n\nBullish on AI and the future of intelligent applications.",

  avatarUrl: "/prasen.webp",
  skills: [
    { name: "TypeScript", icon: faTypescript, category: "Languages" },
    { name: "JavaScript", icon: faJs, category: "Languages" },
    { name: "Python", icon: faPython, category: "Languages" },
    { name: "React", icon: faReact, category: "Frontend" },
    { name: "Next.js", customIcon: Icons.nextjs, category: "Frontend" },
    { name: "TailwindCSS", icon: faTailwindCss, category: "Frontend" },
    { name: "Framer Motion", icon: faBolt, category: "Frontend" },
    { name: "Node.js", icon: faNodeJs, category: "Backend" },
    { name: "MongoDB", icon: faLeaf, category: "Backend" },
    { name: "PostgreSQL", icon: faDatabase, category: "Backend" },
    { name: "Redis", icon: faDatabase, category: "Backend" },
    { name: "Git", icon: faGitAlt, category: "Tools" },
    { name: "Docker", icon: faDocker, category: "Tools" },
    { name: "Cursor", customIcon: Icons.cursor, category: "Tools" },
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
      company: "smart huh :)",
      href: "#",
      badges: ["NDA"],
      location: "",
      title: "Frontend Developer",
      logoUrl: "/company.png",
      start: "December 2025",
      end: "Present",
      description:
        "Gatekeeping this one because of NDA. Working on exciting stuff though!",
      redacted: true,
    },
    {
      company: "Stealth AI Startup",
      href: "https://www.linkedin.com/company/stealthaistartup/",
      badges: [],
      location: "Remote",
      title: "Full Stack Developer",
      logoUrl: "/stealth-ai.webp",
      start: "August 2025",
      end: "September 2025",
      description:
        "Built and shipped features in a fast-paced startup environment. Worked on React frontend components, integrated REST APIs, and collaborated with cross-functional teams on product delivery.",
    },
    {
      company: "Freelance",
      href: "https://github.com/fzk888",
      badges: [],
      location: "Remote",
      title: "Frontend Developer",
      logoUrl: "/freelance.webp",
      start: "2025",
      end: "Present",
      description:
        "Delivering web solutions for startups and small businesses. Building responsive UIs with React/Next.js, integrating third-party APIs, and deploying production-ready applications.",
    },
    {
      company: "v0 by Vercel",
      href: "https://github.com/fzk888",
      badges: [],
      location: "Remote",
      title: "v0 Ambassador",
      logoUrl: "/v0dev_logo.webp",
      start: "2025",
      end: "Present",
      description: "Community ambassador for Vercel's AI-powered UI generation tool. Creating and sharing projects, helping developers adopt v0 for rapid prototyping.",
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
    }
  ],
  hackathons: [
    {
      title: "Smart India Hackathon 2022",
      dates: "March 23rd - 25th, 2022",
      location: "Bhubaneswar, India",
      description:
        "Built 'EducationX' - an e-learning portal with free and premium educational content. Implemented user authentication, course management, and payment integration.",
      image:
        "/smart-india-hackathon.webp",
      mlh: "https://github.com/Synchrotek/E-LearningX",
      links: [],
    },
    {
      title: "Smart India Hackathon 2023",
      dates: "December 19th - 23rd, 2023",
      location: "Bhubaneswar, India",
      description:
        "Built 'NexusLink' - a real-time collaborative coding platform with multi-user editing, integrated chat, and project management features using WebSockets.",
      image:
        "/logo.webp",
      mlh: "https://nexuslink01v.netlify.app/",
      links: [],
    },
  ],
} as const;
