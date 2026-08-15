"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { localize, type LocalizedText } from "@/i18n/config";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string | LocalizedText;
  subtitle?: string | LocalizedText;
  href?: string;
  badges?: readonly string[];
  period: string | LocalizedText;
  description?: string | LocalizedText;
  redacted?: boolean;
}
export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
  redacted,
}: ResumeCardProps) => {
  const { locale } = useLanguage();
  const displayTitle = localize(title, locale) ?? "";
  const displaySubtitle = localize(subtitle, locale);
  const displayPeriod = localize(period, locale) ?? "";
  const displayDescription = localize(description, locale);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const hasLink = !!href && href !== "#";

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // Company-name link is its own <a> and stops propagation, so reaching here
    // means the rest of the card was clicked -> toggle the description.
    if (displayDescription) {
      setIsExpanded(!isExpanded);
    }
  };

  const cardProps = {
    className: "block cursor-pointer",
    onClick: handleClick,
  };

  return (
    <>
      {hasLink ? (
        <div {...cardProps}>
          <CardBody
            logoUrl={logoUrl}
            altText={altText}
            redacted={redacted}
            href={href}
            displayTitle={displayTitle}
            badges={badges}
            period={displayPeriod}
            subtitle={displaySubtitle}
            description={displayDescription}
            isExpanded={isExpanded}
          />
        </div>
      ) : (
        <div {...cardProps}>
          <CardBody
            logoUrl={logoUrl}
            altText={altText}
            redacted={redacted}
            href={undefined}
            displayTitle={displayTitle}
            badges={badges}
            period={displayPeriod}
            subtitle={displaySubtitle}
            description={displayDescription}
            isExpanded={isExpanded}
          />
        </div>
      )}
    </>
  );
}

function CardBody({
  logoUrl,
  altText,
  redacted,
  href,
  displayTitle,
  badges,
  period,
  subtitle,
  description,
  isExpanded,
}: {
  logoUrl: string;
  altText: string;
  redacted?: boolean;
  href?: string;
  displayTitle: string;
  badges?: readonly string[];
  period: string;
  subtitle?: string;
  description?: string;
  isExpanded: boolean;
}) {
  return (
    <Card className="flex border-border/60 bg-card/40">
      <div className="flex-none">
        <Avatar className={cn(
          "border size-12 m-auto bg-muted-background dark:bg-foreground",
          redacted && "rounded-lg"
        )}>
          <AvatarImage
            src={logoUrl}
            alt={altText}
            className={cn("object-contain", redacted && "scale-75")}
          />
          <AvatarFallback>{altText[0]}</AvatarFallback>
        </Avatar>
      </div>
        <div className="group ml-4 flex flex-grow flex-col items-center">
          <CardHeader className="w-full px-0 py-3">
            <div className="flex items-center justify-between gap-x-2 text-base">
              <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm gap-x-2">
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                      "underline-offset-4 hover:underline",
                      redacted && "blur-[3px] select-none"
                    )}
                  >
                    {displayTitle}
                  </a>
                ) : (
                  <span className={cn(redacted && "blur-[3px] select-none")}>
                    {displayTitle}
                  </span>
                )}
                {badges && (
                  <span className="inline-flex gap-x-1">
                    {badges.map((badge, index) => (
                      <Badge
                        variant="secondary"
                        className="align-middle text-xs"
                        key={index}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </span>
                )}
                <ChevronRightIcon
                  className={cn(
                    "size-4 translate-x-0 transform opacity-70 transition-all duration-300 ease-out",
                    isExpanded ? "rotate-90" : "rotate-0"
                  )}
                />
              </h3>
              <div className="text-right text-xs tabular-nums text-muted-foreground sm:text-sm">
                {period}
              </div>
            </div>
            {subtitle && <div className="pt-1 font-sans text-xs text-muted-foreground">{subtitle}</div>}
          </CardHeader>
          {description && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isExpanded ? 1 : 0,

                height: isExpanded ? "auto" : 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="pb-2 text-xs text-muted-foreground sm:text-sm"
            >
              {description}
            </motion.div>
          )}
        </div>
    </Card>
  );
}
