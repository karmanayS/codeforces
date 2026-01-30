import { Editor } from "@monaco-editor/react"
import { useTheme } from 'next-themes'

const codeSnippets: Record<string,string> = {
    "C++": `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n  // your code goes here\n}\n
    ` ,
    "Javascript": `console.log("Hello Wold !")`,
    "Python": `print("Hello World")`
}

export const CodeEditor = ({language,value,onChange} : {language:string,value:string,onChange: React.Dispatch<React.SetStateAction<string>>}) => {
    const { theme } = useTheme()
    const monacoLanguage = (language === "C++") ? "cpp" : language.toLowerCase()

    return <Editor theme={theme === 'light' ? 'vs' : 'vs-dark'} height="90vh" value={codeSnippets[language]} language={monacoLanguage} onChange={(v) => {
        if (v) onChange(v)
    }} />;
}


