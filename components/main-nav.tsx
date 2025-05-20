"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 p-10 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center gap-2 lg:mr-6">
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        <Link
            href="/archive"
            className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/archive"
                    ? "text-foreground"
                    : "text-foreground/80"
            )}
        >
            Archive
        </Link>
        <Link
          href="/board"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/board" ? "text-foreground" : "text-foreground/80"
          )}
        >
          White Board
        </Link>
      </nav>
    </div>
  )
}
