export function JsonLd() {
  const baseUrl = 'https://fangzekai.vercel.app';
  const structuredData = [{
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${baseUrl}/#person`,
    name: 'Fang Zekai',
    givenName: 'Zekai',
    familyName: 'Fang',
    url: baseUrl,
    image: `${baseUrl}/avatar.webp`,
    jobTitle: 'AI应用工程师 / 大模型算法工程师 / Agent 开发工程师 / 全栈开发工程师',
    sameAs: [
      'https://github.com/fzk888',
    ],
    knowsAbout: [
      'AI Application Development',
      'RAG Systems',
      'Computer Vision',
      'LLM',
      'Python',
      'Next.js',
      'TypeScript'
    ],
    description: 'AI Application Developer specializing in RAG systems, computer vision, and LLM-based applications.'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: 'Fang Zekai - AI应用开发工程师',
    url: baseUrl,
    description: 'Portfolio of Fang Zekai - AI Application Developer',
    publisher: {
      '@id': `${baseUrl}/#person`
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Site Sections',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Projects',
        description: 'AI and software projects',
        url: `${baseUrl}/projects`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        description: 'Technical articles about AI, development, and software engineering',
        url: `${baseUrl}/blog`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Videos',
        description: 'Videos about development and tech',
        url: `${baseUrl}/videos`
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Gadgets',
        description: 'Tech setup and productivity tools',
        url: `${baseUrl}/gadgets`
      }
    ]
  }];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
