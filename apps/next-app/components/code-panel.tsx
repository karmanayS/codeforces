"use client"

import { useState } from "react"
import { CodeEditor } from "./code-editor"
import { LanguageSelector } from "./languageSelect"
import { Button } from "./ui/button"
import { useTheme } from "next-themes"

export const CodePanel = ({problemId} : {problemId:string}) => {
    const [language,setLanguage] = useState("C++")
    const [ code,setCode ] = useState("")
    const { theme } = useTheme()

    console.log("Current language : ",language)
    console.log("Current code : ",code)
    
    return <div className="w-1/2 flex flex-col bg-card border border-border rounded-lg overflow-hidden">
        {/* Editor Header */}
        <div className={`border-b border-border px-6 py-4 flex items-center justify-between ${(theme === "light") ? "bg-white" : "bg-[#1E1E1E]" }`} >
        <LanguageSelector language={language} setLanguage={setLanguage} />
        <div className="flex gap-2">
            <Button variant="outline" size="sm">
            Run Code
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
            Submit
            </Button>
        </div>
        </div>

        {/* Monaco Editor */}
        <div className="flex-1 overflow-hidden">
        <CodeEditor language={language} value={code} onChange={setCode} />
        </div>
    </div>
}