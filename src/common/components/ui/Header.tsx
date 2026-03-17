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

export default function Header({slug} : any) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isVisible, setIsVisible] = React.useState(true)
  const [lastScrollY, setLastScrollY] = React.useState(0)
  const pathname = usePathname()
  
  const getLocalizedUrl = (path: string) => {
    if (!slug) return path;
    const cleanPath = path === "/" ? "" : path;
    return `/${slug}${cleanPath}`;
  };

  const {t} = useClientTranslation(slug, JsonLangFile.MENU);
  
  // Logic hide/show header on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show header if scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true)
      } 
      // Hide header if scrolling down and past a threshold
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const customNavStyle = "bg-transparent text-base font-medium text-black hover:bg-[#FFF0ED] hover:text-[#EF5941] focus:bg-[#FFF0ED] focus:text-[#EF5941] data-[state=open]:bg-[#FFF0ED] data-[state=open]:text-[#EF5941] transition-colors"
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
    <div className={cn(
      "fixed top-0 left-0 right-0 z-50 flex w-full justify-center px-4 pt-4 bg-transparent transition-all duration-500 ease-in-out",
      isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
    )}>
      <header className="flex h-16 w-full max-w-6xl items-center justify-between rounded-full bg-white px-4 md:px-6 py-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
        
        <div className="flex items-center gap-2">
          {/* Mobile Menu Trigger */}
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
                      <h4 className="px-4 text-sm font-semibold text-gray-400 uppercase tracking-wider">HTECH</h4>
                      <MobileLink href="/" active={pathname === getLocalizedUrl("/")}>{t('home')}</MobileLink>
                      <MobileLink href="/abouts" active={pathname?.startsWith(getLocalizedUrl("/abouts"))}>{t('abouts')}</MobileLink>
                    </div>

                    <div className="space-y-1 mt-4">
                      <MobileLink href="/projects" active={isMenuActive(['/projects'])}>{t('projects')}</MobileLink>
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

        {/* Desktop Menu */}
        <NavigationMenu className="hidden md:flex" viewport={false}>
          <NavigationMenuList className="gap-2">
            
            {/* Menu Dropdown: Home */}
            <NavigationMenuItem className="relative">
              <NavigationMenuTrigger className={customNavStyle}> 
                {t('home')}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="absolute left-0 top-full mt-2 p-0">
                <ul className="flex flex-col w-[180px] bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                  <ListItem 
                    href={getLocalizedUrl("/")} 
                    title={`${t('home')}`} 
                    isActive={pathname === getLocalizedUrl("/")}
                  />
                  <ListItem 
                    href={getLocalizedUrl('/abouts')} 
                    title={`${t('abouts')}`} 
                    isActive={pathname?.startsWith(getLocalizedUrl("/abouts"))}
                  />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Menu Đơn: Projects */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), customNavStyle, isMenuActive(['/projects']) && activeStyle)}>
                <Link href={getLocalizedUrl('/projects')}>{t('projects')}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            {/* Menu Dropdown: Partnership */}
            <NavigationMenuItem className="relative">
              <NavigationMenuTrigger className={customNavStyle}>
                {t('partnership')}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="absolute left-0 top-full mt-2 p-0">
                <ul className="flex flex-col w-[180px] bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                  <ListItem 
                    href={getLocalizedUrl('/partners')} 
                    title={`${t('partners')}`} 
                    isActive={pathname?.startsWith(getLocalizedUrl("/partners"))}
                  />
                  <ListItem 
                    href={getLocalizedUrl('/jobs')} 
                    title={`${t('jobs')}`} 
                    isActive={pathname?.startsWith(getLocalizedUrl("/jobs"))}
                  />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Menu Đơn: Services */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), customNavStyle, isMenuActive(['/services']) && activeStyle)}>
                <Link href={getLocalizedUrl('/services')}>{t('services')}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            {/* Menu Đơn: News */}
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

function ListItem({ title, href, isActive, ...props }: React.ComponentPropsWithoutRef<"li"> & { href: string; title: string; isActive?: boolean }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link 
          href={href} 
          className={cn(
            "block select-none px-4 py-3 no-underline outline-none transition-all duration-200 hover:bg-[#FFF0ED] group",
            isActive ? "bg-[#FFF0ED]" : ""
          )}
        >
          <div className={cn(
            "text-sm font-medium transition-colors group-hover:text-[#EF5941]",
            isActive ? "text-[#EF5941]" : "text-gray-700"
          )}>
            {title}
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}