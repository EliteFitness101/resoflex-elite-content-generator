import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-luxe-radial">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-40 h-16 border-b border-border/60 bg-background/60 backdrop-blur-xl">
            <div className="h-full flex items-center gap-3 px-4 md:px-6">
              <SidebarTrigger className="text-muted-foreground hover:text-primary" />
              <div className="hidden md:flex items-center gap-2 flex-1 max-w-md ml-2">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search hooks, templates, campaigns…" className="pl-9 bg-secondary/40 border-border/60 h-10 rounded-xl" />
                </div>
              </div>
              <div className="flex-1 md:hidden" />
              <Button variant="ghost" size="icon" className="rounded-xl">
                <Bell className="h-4 w-4" />
              </Button>
              <Button className="rounded-xl bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow gap-2 hidden sm:inline-flex">
                <Sparkles className="h-4 w-4" /> New Campaign
              </Button>
              <div className="h-9 w-9 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground font-semibold text-sm shadow-soft">
                AO
              </div>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-8 max-w-[1500px] w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
