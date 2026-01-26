import { Editor } from "@monaco-editor/react"
import { useTheme } from 'next-themes'

const codeSnippets: Record<string,string> = {
    "cpp": `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n  // your code goes here\n}\n
    ` ,
    "javascript": `console.log("Hello Wold !")`,
    "python": `print("Hello World")`
}

export const CodeEditor = ({language} : {language:string}) => {
    const { theme } = useTheme()

    return <Editor theme={theme === 'dark' ? 'vs-dark' : 'vs'} height="90vh" value={codeSnippets[language]} language={language} />;
}


