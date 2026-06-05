import { DATA } from "@/data/resume";

export function PersonSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Fang Zekai",
          alternateName: ["方泽铠", "fangzekai"],
          description: DATA.description,
          image: `${DATA.url}/me.png`,
          url: DATA.url,
          sameAs: [
            DATA.contact.social.GitHub.url,
          ].filter(Boolean),
          jobTitle: "AI应用工程师 / 大模型算法工程师 / Agent 开发工程师 / 全栈开发工程师",
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "Guangzhou City University of Technology"
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Guangdong",
            addressCountry: "China"
          },
          email: DATA.contact.email,
          knowsAbout: DATA.skills
        })
      }}
    />
  );
}
