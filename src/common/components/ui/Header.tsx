"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import LanguageSwitcher from "./LanguageSwitcher";
import { cn } from "@/lib/utils" 
import { usePathname } from "next/navigation";

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

export default function Header() {
  const customNavStyle = "bg-transparent text-base font-medium text-black hover:bg-[#FFF0ED] hover:text-[#EF5941] focus:bg-[#FFF0ED] focus:text-[#EF5941] data-[active]:text-[#EF5941] data-[state=open]:bg-[#FFF0ED] data-[state=open]:text-[#EF5941]";
  const pathname = usePathname();
  const isMenuActive = (paths: string[]) => {
    if (!pathname) return false;
    const pathWithoutLang = pathname.replace(/^\/[a-zA-Z]{2}(\/|$)/, '/') || '/';

    return paths.some(path => {
      if (path === '/') return pathWithoutLang === '/';
      return pathWithoutLang.startsWith(path);
    });
  };
  const activeStyle = "text-[#EF5941] bg-[#FFF0ED]";
  return (
    <div className="sticky top-4 z-50 flex w-full justify-center px-4">
      <header className="flex h-16 w-full max-w-6xl items-center justify-between rounded-full bg-white px-6 py-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
        
        {/* 1. Logo */}
        <div className="flex shrink-0 items-center">
          <img src="/assets/logo.png" alt="HTECH Logo" className="h-8 w-auto object-contain" />
        </div>
        {/* 3. Menu */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-2">
            
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(customNavStyle, isMenuActive(['/', '/abouts']) && activeStyle)}> 
                Trang chủ
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-96 p-4">
                  <ListItem href="/" title="Trang chủ">Trang chủ</ListItem>
                  <ListItem href="/abouts" title="Về chúng tôi">Về chúng tôi</ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), customNavStyle, isMenuActive(['/services']) && activeStyle)}>
                <Link href="/services">Dịch vụ</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(customNavStyle, isMenuActive(['/projects']) && activeStyle)}>
                Dự án
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
                Hợp tác
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-96 p-4">
                  <ListItem href="/partners" title="Đối tác">Đối tác</ListItem>
                  <ListItem href="/jobs" title="Tuyển dụng">Tuyển dụng</ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), customNavStyle, isMenuActive(['/news']) && activeStyle)}>
                <Link href="/news">Tin tức</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
          </NavigationMenuList>
        </NavigationMenu>
        {/* 5. Right actions */}
        <div className="flex shrink-0 items-center gap-4">
          <LanguageSwitcher />
          <Link href="/abouts" className="rounded-full bg-[#EF5941] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#d84e38]">
            Tham gia
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