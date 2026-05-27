import { useState } from "react";
import { useLocation } from "wouter";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

/**
 * Design System: Liturgical Minimalism
 * - Clean header with warm gold accents
 * - Dropdown menu for secondary navigation
 * - Responsive design for mobile and desktop
 */

export default function Header() {
  const [, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container py-4 flex items-center justify-between">
        {/* Logo/Home Link */}
        <button
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">✝</span>
          </div>
          <h1 className="text-lg font-bold text-foreground hidden sm:block">
            Fr. Joe Staudt
          </h1>
        </button>

        {/* Navigation Menu */}
        <nav className="flex items-center gap-6">
          {/* Homilies Link */}
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="text-foreground hover:text-accent"
          >
            Homilies
          </Button>

          {/* Spiritual Resources Dropdown */}
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="text-foreground hover:text-accent flex items-center gap-1"
              >
                Resources
                <ChevronDown className="w-4 h-4 transition-transform" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem
                onClick={() => {
                  setLocation("/archive");
                  setIsOpen(false);
                }}
                className="cursor-pointer"
              >
                <div>
                  <div className="font-semibold">Homily Archive</div>
                  <div className="text-xs text-muted-foreground">
                    Browse by year and month
                  </div>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => {
                  setLocation("/contemplative-prayer");
                  setIsOpen(false);
                }}
                className="cursor-pointer"
              >
                <div>
                  <div className="font-semibold">Contemplative Prayer</div>
                  <div className="text-xs text-muted-foreground">
                    Richard Rohr's teachings
                  </div>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                More resources coming soon
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
