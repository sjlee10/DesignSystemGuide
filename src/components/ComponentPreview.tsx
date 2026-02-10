import { useState } from "react"
import { Check, Copy, Code } from "lucide-react"
import { cn } from "@/lib/utils"

interface ComponentPreviewProps {
    title: string
    description?: string
    code: string
    children: React.ReactNode
}

export function ComponentPreview({ title, description, code, children }: ComponentPreviewProps) {
    const [copied, setCopied] = useState(false)
    const [showCode, setShowCode] = useState(false)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="border rounded-xl bg-white overflow-hidden shadow-sm mb-8 eduwill-preview-block">
            <div className="flex items-center justify-between px-6 py-4 border-b">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowCode(!showCode)}
                        className={cn("p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-500", showCode && "bg-gray-100 text-gray-900")}
                        title="Toggle code"
                    >
                        <Code className="w-4 h-4" />
                    </button>
                    <button
                        onClick={copyToClipboard}
                        className="p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-500"
                        title="Copy code"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                </div>
            </div>
            <div className="p-8 flex items-center justify-center bg-gray-50/50 min-h-[160px]">
                {children}
            </div>
            {showCode && (
                <div className="bg-gray-950 p-4 overflow-x-auto border-t">
                    <pre className="text-xs text-gray-300 font-mono">
                        <code>{code}</code>
                    </pre>
                </div>
            )}
        </div>
    )
}
