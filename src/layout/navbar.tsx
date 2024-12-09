import { useState, useEffect } from "react";
import * as React from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
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
  ChevronDown,
} from "lucide-react";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/assets/Logo";
import { UserMenu } from "@/components/UserMenu";
import { LanguageSelector } from "@/components/LanguageSelector";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
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
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { direction } = useSelector((state: RootState) => state.language);
  const user = useSelector((state: RootState) => state.auth.user);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-colors duration-300 no-scroll-shift",
        isScrolled ? "bg-black/80 backdrop-blur-lg" : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      dir={direction}
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

        {/* Desktop Navigation Menu */}
        <div className="hidden lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white">
                  {t("nav.features")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {features.map((feature) => (
                      <ListItem
                        key={feature.name}
                        title={feature.name}
                        href={feature.href}
                        icon={<feature.icon className="h-5 w-5" />}
                      >
                        {feature.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white">
                  {t("nav.resources")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {resources.map((resource) => (
                      <ListItem
                        key={resource.name}
                        title={resource.name}
                        href={resource.href}
                        icon={<resource.icon className="h-5 w-5" />}
                      >
                        {resource.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#pricing"
                  className={navigationMenuTriggerStyle()}
                >
                  {t("nav.pricing")}
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#blog"
                  className={navigationMenuTriggerStyle()}
                >
                  {t("nav.blog")}
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <LanguageSelector />
          {user ? (
            <UserMenu />
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => navigate("/login")}
                className="text-sm font-semibold leading-6 text-white"
              >
                {t("common.login")}
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-sm font-semibold text-white transition-all hover:from-purple-600 hover:via-pink-600 hover:to-blue-600"
              >
                {t("common.getStarted")}
              </Button>
            </>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-x-0 top-[73px] z-50 lg:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-black/90 backdrop-blur-lg">
              <div className="space-y-4 px-6 pb-6 pt-4">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <button
                      className="flex w-full items-center justify-between rounded-lg py-2 text-base font-semibold text-white transition-colors hover:text-purple-400"
                      onClick={() => {
                        setActiveMegaMenu(
                          activeMegaMenu === item.name ? null : item.name
                        );
                      }}
                    >
                      <span>{t(`nav.${item.name.toLowerCase()}`)}</span>
                      {item.megaMenu && (
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            activeMegaMenu === item.name ? "rotate-180" : ""
                          )}
                        />
                      )}
                    </button>
                    {activeMegaMenu === item.name && item.megaMenu && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 space-y-2"
                      >
                        {item.megaMenu.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className="flex items-center gap-3 rounded-lg bg-white/5 px-4 py-3 text-sm text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                            onClick={() => setIsOpen(false)}
                          >
                            <subItem.icon className="h-5 w-5 text-purple-400" />
                            <div>
                              <div className="font-medium text-white">
                                {subItem.name}
                              </div>
                              <p className="text-xs text-gray-400">
                                {subItem.description}
                              </p>
                            </div>
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
                <div className="my-4 h-px bg-white/10" />
                <div className="space-y-4">
                  <LanguageSelector />
                  {user ? (
                    <UserMenu />
                  ) : (
                    <div className="space-y-3">
                      <Button
                        variant="ghost"
                        onClick={() => navigate("/login")}
                        className="w-full justify-center bg-white/5 text-base font-semibold text-white hover:bg-white/10"
                      >
                        {t("common.login")}
                      </Button>
                      <Button
                        onClick={() => navigate("/signup")}
                        className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-base font-semibold text-white transition-all hover:from-purple-600 hover:via-pink-600 hover:to-blue-600"
                      >
                        {t("common.getStarted")}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
const ListItem = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    icon?: React.ReactNode;
    title: string;
    href: string;
  }
>(({ className, title, children, icon, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <div
          ref={ref}
          className={cn(
            "block cursor-pointer select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white",
            className
          )}
          onClick={() => (window.location.href = href)}
          {...props}
        >
          <div className="flex items-center gap-2 text-white">
            {icon}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-400">
            {children}
          </p>
        </div>
      </NavigationMenuLink>
    </li>
  );
});
