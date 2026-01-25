import { Editor } from "@monaco-editor/react"
import { useTheme } from 'next-themes'

export const CodeEditor = () => {
    const { theme } = useTheme()

    return <Editor theme={theme === 'dark' ? 'vs-dark' : 'vs'} height="90vh" defaultLanguage="javascript" defaultValue="// some comment" />;
}
