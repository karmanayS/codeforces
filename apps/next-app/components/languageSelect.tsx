"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"

export function LanguageSelector({language,setLanguage}: {language:string,setLanguage:React.Dispatch<React.SetStateAction<string>>}) {
  const { theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{language}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
            <DropdownMenuRadioItem value="javascript">Javascript</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="cpp">C++</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="python">Python</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
