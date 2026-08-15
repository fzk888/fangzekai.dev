// components/visitor-counter.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { useLanguage } from "@/components/language-provider";

// Helper to get ordinal suffix (1st, 2nd, 3rd, etc.)
function getOrdinalSuffix(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

export default function VisitorCounter() {
  const { locale, t } = useLanguage();
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch('/api/visitor-count', {
          method: 'GET',
          credentials: 'include',
        });
        
        if (response.ok) {
          const data = await response.json();
          setCount(data.count);
        }
      } catch (error) {
        console.error('Error fetching visitor count:', error);
        setCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisitorCount();
  }, []);

  // Show placeholder until mounted
  if (isLoading || count === null) {
    return (
      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <Eye className="size-4" />
        <span className="opacity-50">{t.common.loading}</span>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-sm text-muted-foreground flex items-center gap-2"
      title={t.visitor.title}
    >
      <Eye className="size-4" />
      <span>
        {t.visitor.prefix}{' '}
        <motion.span
          key={count}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-semibold text-foreground tabular-nums"
          suppressHydrationWarning
        >
          {count.toLocaleString(locale === "zh" ? "zh-CN" : "en-US")}
          {locale === "en" && (
            <sup className="text-xs">{getOrdinalSuffix(count)}</sup>
          )}
        </motion.span>
        {' '}{t.visitor.suffix}
      </span>
    </motion.div>
  );
}
