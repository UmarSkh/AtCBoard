import { ModeToggle } from "@/components/mode-toggle"
import { MainNav } from "@/components/main-nav"
import Link from "next/link"
import { useEffect, useState } from "react"
import {checkUserState, signout} from "@/components/custom/firebase-utils"

export function SiteHeader() {

  const [userState, setUserState] = useState("Login");

  useEffect(() => {
    checkUserState(setUserState);
  }, [checkUserState, setUserState]);

  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center">
          <MainNav />
          <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
            <Link
              href="/login"
              className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
              onClick={() => {
                if (userState === "Signout") {
                  signout(setUserState)
                  }
              }}
            >
              {userState}
            </Link>
            <nav className="flex items-center gap-0.5">
              <ModeToggle />
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
