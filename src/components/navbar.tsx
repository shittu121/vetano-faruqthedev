"use client"

import * as React from "react" // Import React
import { Home, LucideUpload, LogInIcon } from "lucide-react"
import { AnimeNavBar } from "./ui/anime-navbar"


const items = [
  {
    name: "Home",
    url: "/",
    href: "/",
    icon: Home,
  },
  {
    name: "Login",
    url: "",
    href: "",
    icon: LogInIcon,
  },
  {
    name: "Skill Showcase",
    url: "/",
    href: "/",
    icon: LucideUpload,
  },
]

export function NavBar() {
  return ( 
    <div className="">
      <AnimeNavBar items={items} defaultActive="Skill Showcase" /> 
    </div>
  )
}


