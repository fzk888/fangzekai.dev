"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  HomeIcon,
  NotebookIcon,
  VideoIcon,
  FolderIcon,
  MoonIcon,
  SunIcon,
  MonitorIcon,
  MailIcon,
  GithubIcon,
  LinkedinIcon,
  SearchIcon,
  CopyIcon,
  CheckIcon,
  HashIcon,
  Volume2Icon,
  VolumeXIcon,
} from "lucide-react";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useSoundSettings } from "@/components/sound-provider";
import { playSound } from "@/hooks/use-sound";
import { useLanguage } from "@/components/language-provider";

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  keywords?: string[];
  group: string;
}

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const { enabled: soundEnabled, setEnabled: setSoundEnabled } = useSoundSettings();
  const { t } = useLanguage();
  const selectedButtonRef = React.useRef<HTMLButtonElement>(null);

  // Handle keyboard shortcuts to open palette
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Reset search and selection when dialog closes
  React.useEffect(() => {
    if (!open) {
      setSearch("");
      setSelectedIndex(0);
      setCopied(false);
    }
  }, [open]);

  const copyToClipboard = React.useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    if (soundEnabled) {
      playSound("success", 0.3);
    }
    setTimeout(() => {
      setCopied(false);
      setOpen(false);
    }, 1000);
  }, [soundEnabled]);

  const navigateToSection = React.useCallback((sectionId: string) => {
    setOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const commands: Command[] = React.useMemo(() => [
    // Navigation - Pages
    {
      id: "home",
      label: t.commandPalette.commands.home[0],
      description: t.commandPalette.commands.home[1],
      icon: <HomeIcon className="size-4" />,
      action: () => {
        setOpen(false);
        router.push("/");
      },
      keywords: ["home", "main", "index"],
      group: t.commandPalette.groups.pages,
    },
    {
      id: "blog",
      label: t.commandPalette.commands.blog[0],
      description: t.commandPalette.commands.blog[1],
      icon: <NotebookIcon className="size-4" />,
      action: () => {
        setOpen(false);
        router.push("/blog");
      },
      keywords: ["blog", "posts", "articles", "writing"],
      group: t.commandPalette.groups.pages,
    },
    {
      id: "videos",
      label: t.commandPalette.commands.videos[0],
      description: t.commandPalette.commands.videos[1],
      icon: <VideoIcon className="size-4" />,
      action: () => {
        setOpen(false);
        router.push("/videos");
      },
      keywords: ["videos", "youtube", "tutorials"],
      group: t.commandPalette.groups.pages,
    },
    {
      id: "projects",
      label: t.commandPalette.commands.projects[0],
      description: t.commandPalette.commands.projects[1],
      icon: <FolderIcon className="size-4" />,
      action: () => {
        setOpen(false);
        router.push("/projects");
      },
      keywords: ["projects", "work", "portfolio"],
      group: t.commandPalette.groups.pages,
    },
    {
      id: "gadgets",
      label: t.commandPalette.commands.gadgets[0],
      description: t.commandPalette.commands.gadgets[1],
      icon: <Icons.shop className="size-4" />,
      action: () => {
        setOpen(false);
        router.push("/gadgets");
      },
      keywords: ["gadgets", "gear", "setup", "tools"],
      group: t.commandPalette.groups.pages,
    },
    // Navigation - Sections
    {
      id: "about",
      label: t.commandPalette.commands.about[0],
      description: t.commandPalette.commands.about[1],
      icon: <HashIcon className="size-4" />,
      action: () => navigateToSection("about"),
      keywords: ["about", "bio", "info"],
      group: t.commandPalette.groups.sections,
    },
    {
      id: "skills",
      label: t.commandPalette.commands.skills[0],
      description: t.commandPalette.commands.skills[1],
      icon: <HashIcon className="size-4" />,
      action: () => navigateToSection("skills"),
      keywords: ["skills", "tech", "stack"],
      group: t.commandPalette.groups.sections,
    },
    {
      id: "work",
      label: t.commandPalette.commands.work[0],
      description: t.commandPalette.commands.work[1],
      icon: <HashIcon className="size-4" />,
      action: () => navigateToSection("work"),
      keywords: ["work", "experience", "job", "career"],
      group: t.commandPalette.groups.sections,
    },
    {
      id: "contributions",
      label: t.commandPalette.commands.contributions[0],
      description: t.commandPalette.commands.contributions[1],
      icon: <HashIcon className="size-4" />,
      action: () => navigateToSection("contributions"),
      keywords: ["github", "contributions", "activity"],
      group: t.commandPalette.groups.sections,
    },
    {
      id: "contact",
      label: t.commandPalette.commands.contact[0],
      description: t.commandPalette.commands.contact[1],
      icon: <HashIcon className="size-4" />,
      action: () => navigateToSection("contact"),
      keywords: ["contact", "email", "reach"],
      group: t.commandPalette.groups.sections,
    },
    // Theme
    {
      id: "theme-light",
      label: t.commandPalette.commands.light[0],
      description: t.commandPalette.commands.light[1],
      icon: <SunIcon className="size-4" />,
      action: () => {
        setTheme("light");
        setOpen(false);
      },
      keywords: ["light", "theme", "bright"],
      group: t.commandPalette.groups.theme,
    },
    {
      id: "theme-dark",
      label: t.commandPalette.commands.dark[0],
      description: t.commandPalette.commands.dark[1],
      icon: <MoonIcon className="size-4" />,
      action: () => {
        setTheme("dark");
        setOpen(false);
      },
      keywords: ["dark", "theme", "night"],
      group: t.commandPalette.groups.theme,
    },
    {
      id: "theme-system",
      label: t.commandPalette.commands.system[0],
      description: t.commandPalette.commands.system[1],
      icon: <MonitorIcon className="size-4" />,
      action: () => {
        setTheme("system");
        setOpen(false);
      },
      keywords: ["system", "theme", "auto"],
      group: t.commandPalette.groups.theme,
    },
    // Settings
    {
      id: "toggle-sound",
      label: soundEnabled
        ? t.commandPalette.commands.soundOff[0]
        : t.commandPalette.commands.soundOn[0],
      description: soundEnabled
        ? t.commandPalette.commands.soundOff[1]
        : t.commandPalette.commands.soundOn[1],
      icon: soundEnabled ? <Volume2Icon className="size-4" /> : <VolumeXIcon className="size-4" />,
      action: () => {
        setSoundEnabled(!soundEnabled);
        setOpen(false);
      },
      keywords: ["sound", "audio", "mute", "effects", "sfx"],
      group: t.commandPalette.groups.settings,
    },
    // Quick Actions
    {
      id: "copy-email",
      label: t.commandPalette.commands.copyEmail[0],
      description: t.commandPalette.commands.copyEmail[1],
      icon: copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />,
      action: () => copyToClipboard("zekai_ai@163.com"),
      keywords: ["copy", "email", "contact"],
      group: t.commandPalette.groups.actions,
    },
    {
      id: "github",
      label: t.commandPalette.commands.github[0],
      description: t.commandPalette.commands.github[1],
      icon: <GithubIcon className="size-4" />,
      action: () => {
        window.open("https://github.com/fzk888", "_blank");
        setOpen(false);
      },
      keywords: ["github", "profile", "code"],
      group: t.commandPalette.groups.social,
    },
    {
      id: "linkedin",
      label: t.commandPalette.commands.linkedin[0],
      description: t.commandPalette.commands.linkedin[1],
      icon: <LinkedinIcon className="size-4" />,
      action: () => {
        window.open("", "_blank");
        setOpen(false);
      },
      keywords: ["linkedin", "profile", "professional"],
      group: t.commandPalette.groups.social,
    },
    {
      id: "x",
      label: t.commandPalette.commands.x[0],
      description: t.commandPalette.commands.x[1],
      icon: <Icons.x className="size-4" />,
      action: () => {
        window.open("", "_blank");
        setOpen(false);
      },
      keywords: ["x", "twitter", "social"],
      group: t.commandPalette.groups.social,
    },
  ], [copied, router, setTheme, navigateToSection, copyToClipboard, soundEnabled, setSoundEnabled, t]);

  // Filter commands based on search
  const filteredCommands = React.useMemo(() => {
    if (!search) return commands;

    const searchLower = search.toLowerCase();
    return commands.filter((cmd) => {
      const matchesLabel = cmd.label.toLowerCase().includes(searchLower);
      const matchesDescription = cmd.description?.toLowerCase().includes(searchLower);
      const matchesKeywords = cmd.keywords?.some((k) => k.includes(searchLower));
      return matchesLabel || matchesDescription || matchesKeywords;
    });
  }, [search, commands]);

  // Group filtered commands
  const groupedCommands = React.useMemo(() => {
    const groups: Record<string, Command[]> = {};
    filteredCommands.forEach((cmd) => {
      if (!groups[cmd.group]) {
        groups[cmd.group] = [];
      }
      groups[cmd.group].push(cmd);
    });
    return groups;
  }, [filteredCommands]);

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, selectedIndex, filteredCommands]);

  // Reset selected index when search changes
  React.useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Scroll selected item into view
  React.useEffect(() => {
    if (selectedButtonRef.current) {
      selectedButtonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  let commandIndex = 0;

  return (
    <>
      {/* Keyboard hint */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 hidden md:flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground bg-background/80 backdrop-blur-sm border rounded-lg hover:bg-accent transition-colors"
      >
        <SearchIcon className="size-3" />
        <span>{t.commandPalette.search}</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg p-0 gap-0">
          {/* Search Input */}
          <div className="flex items-center border-b px-3">
            <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={t.commandPalette.placeholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>

          {/* Commands List */}
          <div className="max-h-[400px] overflow-y-auto overflow-x-hidden p-2">
            {filteredCommands.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {t.commandPalette.noResults}
              </div>
            ) : (
              Object.entries(groupedCommands).map(([group, cmds]) => (
                <div key={group} className="mb-2">
                  <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                    {group}
                  </div>
                  {cmds.map((cmd) => {
                    const isSelected = commandIndex === selectedIndex;
                    const currentIndex = commandIndex;
                    commandIndex++;

                    return (
                      <button
                        key={cmd.id}
                        ref={isSelected ? selectedButtonRef : null}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelectedIndex(currentIndex)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm transition-colors text-left",
                          "hover:bg-accent hover:text-accent-foreground",
                          isSelected && "bg-accent text-accent-foreground"
                        )}
                      >
                        <div className="flex items-center justify-center shrink-0 w-5">
                          {cmd.icon}
                        </div>
                        <div className="flex flex-col flex-1 min-w-0 gap-1">
                          <span className="font-medium">{cmd.label}</span>
                          {cmd.description && (
                            <span className="text-xs text-muted-foreground truncate w-full">
                              {cmd.description}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t px-3 py-2 text-xs text-muted-foreground flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
                  ↑↓
                </kbd>
                {t.commandPalette.navigate}
              </span>
              <span className="flex items-center gap-1">
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
                  ↵
                </kbd>
                {t.commandPalette.select}
              </span>
            </div>
            <span>
              {filteredCommands.length}{" "}
              {filteredCommands.length === 1
                ? t.commandPalette.result
                : t.commandPalette.results}
            </span>
          </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}

