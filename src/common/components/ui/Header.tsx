"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"

import LanguageSwitcher from "./LanguageSwitcher"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useClientTranslation } from "@/i18n"
import { JsonLangFile } from "@/enums"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/projects/primitives/alert-dialog",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/projects/primitives/hover-card",
    description: "For sighted users to preview content available behind a link.",
  },
]

export default function Header({slug} : any) {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()
  const getLocalizedUrl = (path: string) => {
    if (!slug) return path;
    const cleanPath = path === "/" ? "" : path;
    return `/${slug}${cleanPath}`;
  };

  const {t} = useClientTranslation(slug, JsonLangFile.MENU);
  const customNavStyle = "bg-transparent text-base font-medium text-black hover:bg-[#FFF0ED] hover:text-[#EF5941] focus:bg-[#FFF0ED] focus:text-[#EF5941] data-[active]:text-[#EF5941] data-[state=open]:bg-[#FFF0ED] data-[state=open]:text-[#EF5941]"
  const activeStyle = "text-[#EF5941] bg-[#FFF0ED]"

  const isMenuActive = (paths: string[]) => {
    if (!pathname) return false;
    const pathWithoutLang = pathname.replace(/^\/[a-zA-Z]{2}(\/|$)/, '/') || '/';

    return paths.some(path => {
      if (path === '/') return pathWithoutLang === '/';
      return pathWithoutLang.startsWith(path);
    });
  };

  // Helper component cho Mobile link để tự động đóng Sheet khi click
  const MobileLink = ({ href, children, active }: { href: string, children: React.ReactNode, active?: boolean }) => (
    <Link
      href={getLocalizedUrl(href)}
      onClick={() => setIsOpen(false)}
      className={cn(
        "block rounded-md px-4 py-2 text-base font-medium transition-colors hover:bg-[#FFF0ED] hover:text-[#EF5941]",
        active ? "bg-[#FFF0ED] text-[#EF5941]" : "text-black"
      )}
    >
      {children}
    </Link>
  )

  return (
    <div className="sticky top-0 z-50 flex w-full justify-center px-4">
      <header className="flex h-16 w-full max-w-6xl items-center justify-between rounded-full bg-white px-4 md:px-6 py-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
        
        <div className="flex items-center gap-2">
          {/* Mobile Menu Trigger (Hiển thị trên mobile, ẩn trên PC) */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="p-2 text-gray-600 hover:text-[#EF5941] focus:outline-none">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto pt-10" aria-describedby={undefined}>
                <SheetTitle className="sr-only">Menu điều hướng</SheetTitle>
                <div className="flex flex-col gap-6">
                  {/* Logo trong Mobile Menu */}
                  <Link href={`/${slug}/`} onClick={() => setIsOpen(false)}>
                    <img src="/assets/logo.png" alt="HTECH Logo" className="h-8 w-auto object-contain" />
                  </Link>

                  {/* Cấu trúc Menu dọc cho Mobile */}
                  <nav className="flex flex-col gap-2">
                    <div className="space-y-1">
                      <h4 className="px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">{t('home')}</h4>
                      <MobileLink href="/" active={pathname === getLocalizedUrl("/")}>{t('home')}</MobileLink>
                      <MobileLink href="/abouts" active={pathname?.startsWith(getLocalizedUrl("/abouts"))}>{t('abouts')}</MobileLink>
                    </div>

                    <div className="space-y-1 mt-4">
                      <h4 className="px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">{t('projects')}</h4>
                      {components.map((comp) => (
                        <MobileLink key={comp.title} href={comp.href} active={pathname?.startsWith(getLocalizedUrl(comp.href))}>
                          {comp.title}
                        </MobileLink>
                      ))}
                    </div>

                    <div className="space-y-1 mt-4">
                      <h4 className="px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">{t('partnership')}</h4>
                      <MobileLink href="/partners" active={pathname?.startsWith(getLocalizedUrl("/partners"))}>{t('partners')}</MobileLink>
                      <MobileLink href="/jobs" active={pathname?.startsWith(getLocalizedUrl("/jobs"))}>{t('jobs')}</MobileLink>
                    </div>

                    <div className="space-y-1 mt-4">
                      <MobileLink href="/services" active={pathname?.startsWith(getLocalizedUrl("/services"))}>{t('services')}</MobileLink>
                      <MobileLink href="/news" active={pathname?.startsWith(getLocalizedUrl("/news"))}>{t('news')}</MobileLink>
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo (Desktop & Mobile) */}
          <Link href={getLocalizedUrl("/")} className="flex shrink-0 items-center">
            <img src="/assets/logo.png" alt="HTECH Logo" className="h-8 w-auto object-contain" />
          </Link>
        </div>

        {/* Desktop Menu (Ẩn trên mobile) */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(customNavStyle, isMenuActive(['/', '/abouts']) && activeStyle)}> 
                {t('home')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href={getLocalizedUrl("/")} title={`${t('home')}`}>{t('home')}</ListItem>
                  <ListItem href={getLocalizedUrl('/abouts')} title={`${t('abouts')}`}>{t('abouts')}</ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(customNavStyle, isMenuActive(['/projects']) && activeStyle)}>
                {t('projects')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(customNavStyle, isMenuActive(['/partners', '/jobs']) && activeStyle)}>
                {t('partnership')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href={getLocalizedUrl('/partners')} title={`${t('partners')}`}>{t('partners')}</ListItem>
                  <ListItem href={getLocalizedUrl('/jobs')} title={`${t('jobs')}`}>{t('jobs')}</ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), customNavStyle, isMenuActive(['/services']) && activeStyle)}>
                <Link href={getLocalizedUrl('/services')}>{t('services')}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), customNavStyle, isMenuActive(['/news']) && activeStyle)}>
                <Link href={getLocalizedUrl('/news')}>{t('news')}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right actions */}
        <div className="flex shrink-0 items-center gap-2 md:gap-4">
          <LanguageSwitcher />
          <Link href={getLocalizedUrl('/abouts')} className="hidden sm:flex rounded-full bg-[#EF5941] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d84e38]">
            {t('join_us')}
          </Link>
        </div>
      </header>
    </div>
  )
}

function ListItem({ title, children, href, ...props }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link 
          href={href} 
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#FFF0ED] hover:text-[#EF5941] focus:bg-[#FFF0ED] focus:text-[#EF5941]"
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}