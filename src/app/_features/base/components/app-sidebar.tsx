'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/app/_ui/components/sidebar';
import { cn } from '@/app/_ui/lib/utils';
import { User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  {
    name: 'Account',
    link: '/account',
    icon: <User />,
  },
];

/**
 * Sidebar component for protected routes.
 */
export function ProtectedSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-mono">Logo</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {LINKS.map((link, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link
                      className={cn('font-mono', {
                        'bg-sidebar-accent': pathname === link.link,
                      })}
                      href={link.link}
                    >
                      {link.icon}
                      Account
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
