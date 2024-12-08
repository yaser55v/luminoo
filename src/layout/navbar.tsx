import { useState, useEffect, useRef } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  BarChart3,
  Calendar,
  MessageSquare,
  Users,
  Video,
  BookOpen,
  Heart,
  HelpCircle,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/assets/Logo";

const features = [
  {
    name: "Analytics",
    description: "Track your content performance",
    href: "#",
    icon: BarChart3,
  },
  {
    name: "Content Calendar",
    description: "Plan and schedule content",
    href: "#",
    icon: Calendar,
  },
  {
    name: "AI Captions",
    description: "Generate engaging captions",
    href: "#",
    icon: MessageSquare,
  },
  {
    name: "Video Editor",
    description: "Edit videos with AI",
    href: "#",
    icon: Video,
  },
];

const resources = [
  {
    name: "Help Center",
    description: "Get your questions answered",
    href: "#",
    icon: HelpCircle,
  },
  {
    name: "Guides",
    description: "Learn how to grow",
    href: "#",
    icon: BookOpen,
  },
  {
    name: "Community",
    description: "Connect with creators",
    href: "#",
    icon: Users,
  },
  {
    name: "Creator Stories",
    description: "Get inspired by others",
    href: "#",
    icon: Heart,
  },
];

const navigation = [
  { name: "Features", href: "#features", megaMenu: features },
  { name: "Resources", href: "#resources", megaMenu: resources },
  { name: "Pricing", href: "#pricing" },
  { name: "Blog", href: "#blog" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const handleMouseEnter = (name: string) => {
    if (window.innerWidth >= 1024) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setActiveMegaMenu(name);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      timeoutRef.current = setTimeout(() => {
        setActiveMegaMenu(null);
      }, 100);
    }
  };

  return (
    <motion.header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-colors duration-300",
        isScrolled ? "bg-black/80 backdrop-blur-lg" : "bg-transparent",
        activeMegaMenu && "bg-black/80 backdrop-blur-lg"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="flex items-center gap-2">
              <Logo className="h-10 w-10" />
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-xl font-bold text-transparent">
                Luminoo
              </span>
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:bg-white/10"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <div
              key={item.name}
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <a
                href={item.href}
                className="text-sm font-semibold leading-6 text-white transition-colors hover:text-purple-400"
              >
                {item.name}
              </a>
              {/* Mega Menu */}
              <AnimatePresence>
                {activeMegaMenu === item.name && item.megaMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 top-full z-50 mt-2 w-screen max-w-max -translate-x-1/2"
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Arrow */}
                    <div className="relative">
                      <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-black/80" />
                    </div>
                    {/* Content */}
                    <div className="relative mt-2 rounded-xl bg-black/80 p-8 shadow-2xl backdrop-blur-lg">
                      <div className="grid grid-cols-2 gap-8">
                        {item.megaMenu.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className="group relative flex items-center gap-6 rounded-lg p-4 transition-colors hover:bg-white/10"
                          >
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 transition-colors group-hover:bg-purple-500 group-hover:text-white">
                              <subItem.icon className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">
                                {subItem.name}
                              </h3>
                              <p className="mt-1 text-sm text-gray-400">
                                {subItem.description}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Button className="text-sm font-semibold leading-6 text-white">
            Log in
          </Button>
          <Button className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-sm font-semibold text-white transition-all hover:from-purple-600 hover:via-pink-600 hover:to-blue-600">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-2 px-6 pb-6 pt-2">
              {navigation.map((item) => (
                <div key={item.name} className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left text-base font-semibold text-white"
                    onClick={() => {
                      setActiveMegaMenu(
                        activeMegaMenu === item.name ? null : item.name
                      );
                    }}
                  >
                    {item.name}
                  </Button>
                  {activeMegaMenu === item.name &&
                    item.megaMenu?.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.href}
                        className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-white/10"
                        onClick={() => setIsOpen(false)}
                      >
                        <subItem.icon className="h-5 w-5" />
                        {subItem.name}
                      </a>
                    ))}
                </div>
              ))}
              <div className="mt-8 space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left text-base font-semibold text-white"
                >
                  Log in
                </Button>
                <Button className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-base font-semibold text-white transition-all hover:from-purple-600 hover:via-pink-600 hover:to-blue-600">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
