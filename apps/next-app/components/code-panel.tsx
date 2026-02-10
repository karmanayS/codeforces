"use client"

import { useState } from "react"
import { CodeEditor } from "./code-editor"
import { LanguageSelector } from "./languageSelect"
import { Button } from "./ui/button"
import { useTheme } from "next-themes"
import axios from "axios"
import { API_BASE_URL } from "@/lib/common"
import { toast } from "sonner"

export const CodePanel = ({problemId} : {problemId:string}) => {
    const [language,setLanguage] = useState("C++")
    const [ code,setCode ] = useState("")
    const { theme } = useTheme()

    async function handleSubmit() {
        try {
            const subRes = await axios.post(`${API_BASE_URL}/userRouter/submission/${problemId}`,{
                source_code: code,
                language
            },{
                withCredentials: true
            })
            if (!subRes.data.success) throw new Error("Error while submitting code")
            
            //polling
            while (true) {
                const statusRes = await axios.get(`${API_BASE_URL}/userRouter/submission/${subRes.data. submissionId}`, {
                    withCredentials: true
                })
                if (!statusRes.data.success) throw new Error("Error while fetching submission status")
                if (statusRes.data.status === "processing") {
                    await new Promise(r => setTimeout(r,1000))
                    continue
                }
                break    
            }    
        } catch (err) {
            if (err instanceof Error) {
                toast(err.message,{position:"bottom-right"})
            }
        }
    }

    return <div className="w-1/2 flex flex-col bg-card border border-border rounded-lg overflow-hidden">
        {/* Editor Header */}
        <div className={`border-b border-border px-6 py-4 flex items-center justify-between ${(theme === "light") ? "bg-white" : "bg-[#1E1E1E]" }`} >
        <LanguageSelector language={language} setLanguage={setLanguage} />
        <div className="flex gap-2">
            {/* <Button variant="outline" size="sm">
            Run Code
            </Button> */}
            <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={handleSubmit}>
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