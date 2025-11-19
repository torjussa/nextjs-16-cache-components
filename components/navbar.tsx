import Link from "next/link";

import { ModeSwitcher } from "@/components/mode-switcher";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export function Navbar() {
  return (
    <header className="flex sticky top-0 z-50 h-14 shrink-0 items-center gap-2 border-b border-dashed bg-background/95">
      <div className="flex w-full items-center h-full gap-1 px-4 md:px-6 max-w-[1400px] mx-auto">
        <Link href="/" className="hidden md:flex items-center gap-2">
          <h2 className={`${"retro"} hidden font-bold md:inline-block text-xs`}>
            NextJS v16 Cache Components
          </h2>
        </Link>

        <div className="ml-auto flex items-center">
          <Link
            href="https://github.com/TheOrcDev/nextjs16-cache-components"
            target="_blank"
          >
            <Button
              size="default"
              variant="ghost"
              className="flex items-center"
            >
              <div className="relative">
                <Bell size={46} />
                {/* <NotificationsCount /> */}
              </div>
            </Button>
          </Link>

          <ModeSwitcher />
        </div>
      </div>
    </header>
  );
}
