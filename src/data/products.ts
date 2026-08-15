import type { LocalizedText } from "@/i18n/config";

export interface Product {
  id: string;
  title: string;
  description: LocalizedText;
  imageUrl: string;
  amazonLink: string;
  category: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Ryzen 5 7600X Desktop Processor',
    description: {
      en: "My PC processor: six cores, twelve threads, and plenty of performance for an RTX 4070 Super.",
      zh: "我的电脑处理器，6 核 12 线程，性能足以搭配 RTX 4070 Super。",
    },
    imageUrl: '/images/products/ryzen5.webp',
    amazonLink: 'https://amzn.to/4d5E9kW',
    category: 'PC Components',
    featured: true,
  },
  {
    id: '2',
    title: 'Cooler Master MasterLiquid 240L Core ARGB (Black)',
    description: {
      en: "An excellent AIO cooler for this build, with strong thermals and tasteful RGB.",
      zh: "非常适合这套配置的一体式水冷，散热出色，RGB 效果也很协调。",
    },
    imageUrl: '/images/products/coolermaster.webp',
    amazonLink: 'https://amzn.to/3EUItH1',
    category: 'PC Components',
    featured: false,
  },
  {
    id: '3',
    title: 'MSI B650M Gaming Plus WIFI (DDR5)',
    description: {
      en: "A feature-rich, well-regarded motherboard with excellent value.",
      zh: "功能丰富、口碑良好，并且性价比很高的主板。",
    },
    imageUrl: '/images/products/MotherBoard.webp',
    amazonLink: 'https://amzn.to/3ESUHzQ',
    category: 'PC Components',
    featured: true,
  },
  {
    id: '4',
    title: 'Adata XPG Lancer RGB 16GB (16GB x 2) DDR5 6000MHz (Black)',
    description: {
      en: "A great memory kit for this build; the non-RGB version is also a solid choice.",
      zh: "很适合这套配置的内存，也可以选择无 RGB 版本。",
    },
    imageUrl: '/images/products/Ram.webp',
    amazonLink: 'https://amzn.to/44nlzlZ',
    category: 'PC Components',
    featured: false,
  },
  {
    id: '5',
    title: 'Gigabyte RTX 4060 Eagle OC 8GB',
    description: {
      en: "A solid GPU choice with room to upgrade to an RTX 4070 Super later.",
      zh: "可靠的显卡选择，之后也可以按需要升级到 RTX 4070 Super。",
    },
    imageUrl: '/images/products/RTX4060.webp',
    amazonLink: 'https://amzn.to/3GQgvwx',
    category: 'PC Components',
    featured: true,
  },
  {
    id: '6',
    title: 'XPG GAMMIX S70 Blade M.2 NVMe 2TB PCIe Gen4 SSD',
    description: {
      en: "Blazing-fast storage and one of the most worthwhile upgrades in the build.",
      zh: "速度非常快，也是整套配置中最值得投入的升级之一。",
    },
    imageUrl: '/images/products/SSD.webp',
    amazonLink: 'https://amzn.to/4jEaodt',
    category: 'PC Components',
    featured: false,
  },
  {
    id: '7',
    title: 'Cooler Master MWE 750 V3 Bronze ATX 3.1 Power Supply',
    description: {
      en: "A reliable 80 Plus Bronze PSU for the RTX 4060, with headroom for future upgrades.",
      zh: "可靠的 80 Plus 铜牌电源，适合 RTX 4060，并为后续升级留有余量。",
    },
    imageUrl: '/images/products/powersupply.webp',
    amazonLink: 'https://amzn.to/4iMOmnB',
    category: 'PC Components',
    featured: false,
  },
  {
    id: '8',
    title: 'MSI MAG Forge 320R Airflow Mid-Tower PC Case',
    description: {
      en: "Excellent airflow and value for money—my top case pick for this build.",
      zh: "风道设计出色且性价比高，是这套配置的首选机箱。",
    },
    imageUrl: '/images/products/Cabinet.webp',
    amazonLink: 'https://amzn.to/4d0NkCY',
    category: 'PC Components',
    featured: true,
  },
  {
    id: '9',
    title: 'Samsung Galaxy S23 (Cream)',
    description: {
      en: "My daily phone, with excellent cameras and balanced performance for work and media.",
      zh: "我的日常主力手机，影像出色，工作与影音体验都很均衡。",
    },
    imageUrl: '/images/products/S23.webp',
    amazonLink: 'https://amzn.to/3GQiwsB',
    category: 'Mobile',
    featured: false,
  },
  {
    id: '10',
    title: 'JBL Quantum 100 Wired Over Ear Gaming Headphones',
    description: {
      en: "Great value and sound quality, especially for hearing footsteps in games.",
      zh: "声音表现和性价比都很好，尤其适合在游戏中辨别脚步声。",
    },
    imageUrl: '/images/products/headphones.webp',
    amazonLink: 'https://amzn.to/4l6uUmM',
    category: 'Peripherals',
    featured: false,
  },
  {
    id: '11',
    title: 'FIFINE A6T Streaming Gaming USB Microphone Kit',
    description: {
      en: "Excellent noise filtering out of the box; tune it in OBS Studio for polished audio.",
      zh: "开箱即有不错的降噪效果，在 OBS Studio 中调整后可获得更专业的声音。",
    },
    imageUrl: '/images/products/microphone.webp',
    amazonLink: 'https://amzn.to/47rET2F',
    category: 'Peripherals',
    featured: false,
  },
  {
    id: '12',
    title: 'Razer BlackWidow V3 Tenkeyless',
    description: {
      en: "A premium Razer mechanical keyboard that works equally well for productivity and gaming.",
      zh: "雷蛇的高品质机械键盘，办公和游戏都很合适。",
    },
    imageUrl: '/images/products/keyboard.webp',
    amazonLink: 'https://amzn.to/44Pq9ZN',
    category: 'Peripherals',
    featured: true,
  },
  {
    id: '13',
    title: 'compressed Air Duster',
    description: {
      en: "A must-have for keeping devices clean and free of dust.",
      zh: "保持设备清洁、减少灰尘堆积的实用工具。",
    },
    imageUrl: '/images/products/airduster.webp',
    amazonLink: 'https://amzn.to/45DVQFQ',
    category: 'Peripherals',
    featured: true,
  },
];
