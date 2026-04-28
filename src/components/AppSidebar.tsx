import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Sparkles, Kanban, Library, Image, CalendarRange, BarChart3, Users, Crown } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";

const main = [
  { title: "Overview", url: "/", icon: LayoutDashboard },
  { title: "AI Generator", url: "/generator", icon: Sparkles },
  { title: "Content Factory", url: "/factory", icon: Kanban },
  { title: "Hook Library", url: "/hooks", icon: Library },
];
const studio = [
  { title: "Visual Templates", url: "/templates", icon: Image },
  { title: "Automation", url: "/automation", icon: CalendarRange },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Team", url: "/team", icon: Users },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();
  const isActive = (p: string) => p === "/" ? pathname === "/" : pathname.startsWith(p);

  const renderItem = (item: typeof main[number]) => (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild isActive={isActive(item.url)} className="h-11 rounded-xl data-[active=true]:bg-gradient-to-r data-[active=true]:from-primary/20 data-[active=true]:to-transparent data-[active=true]:text-primary data-[active=true]:border data-[active=true]:border-primary/30">
        <NavLink to={item.url} className="flex items-center gap-3">
          <item.icon className="h-[18px] w-[18px] shrink-0" />
          {!collapsed && <span className="text-sm font-medium tracking-wide">{item.title}</span>}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent className="bg-gradient-to-b from-sidebar to-background">
        <div className={`flex items-center gap-2 px-4 pt-6 pb-4 ${collapsed ? "justify-center" : ""}`}>
          <div className="relative">
            <div className="h-9 w-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Crown className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="absolute -inset-1 bg-gradient-primary rounded-xl blur-md opacity-40 -z-10" />
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <div className="font-display text-lg text-gradient-gold">ResoFlex</div>
              <div className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase">× Elite NG</div>
            </div>
          )}
        </div>

        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70 px-4">Workspace</SidebarGroupLabel>}
          <SidebarGroupContent className="px-2">
            <SidebarMenu>{main.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70 px-4">Studio</SidebarGroupLabel>}
          <SidebarGroupContent className="px-2">
            <SidebarMenu>{studio.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <div className="mt-auto m-3 rounded-2xl glass-strong p-4">
            <div className="text-[10px] tracking-[0.2em] uppercase text-primary/80 mb-1">Goal</div>
            <div className="font-display text-xl text-gradient-gold">₦1B / year</div>
            <div className="text-xs text-muted-foreground mt-1">Scalable content ops</div>
            <div className="mt-3 h-1.5 rounded-full bg-secondary overflow-hidden">
              <div className="h-full w-[34%] bg-gradient-primary rounded-full shadow-glow" />
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
