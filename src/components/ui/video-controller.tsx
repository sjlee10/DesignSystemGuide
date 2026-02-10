import * as React from "react"
import { Play, Pause, Volume2, Maximize, RotateCcw, RotateCw } from "lucide-react"
import { cn } from "@/lib/utils"

interface VideoControllerProps extends React.HTMLAttributes<HTMLDivElement> {
    isPlaying?: boolean
    progress?: number
    duration?: string
    currentTime?: string
    onPlayPause?: () => void
}

export function VideoController({
    className,
    isPlaying = false,
    progress = 0,
    duration = "00:00",
    currentTime = "00:00",
    onPlayPause,
    ...props
}: VideoControllerProps) {
    const [localPlaying, setLocalPlaying] = React.useState(isPlaying)
    const [volume, setVolume] = React.useState(80)
    const [speed, setSpeed] = React.useState("1.0x")

    const handlePlayPause = () => {
        setLocalPlaying(!localPlaying)
        onPlayPause?.()
    }

    return (
        <div className={cn("w-full bg-gray-900 rounded-xl overflow-hidden shadow-2xl", className)} {...props}>
            <div className="relative aspect-video bg-black flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <button
                    onClick={handlePlayPause}
                    className="w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg z-10"
                >
                    {localPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 flex flex-col gap-2 z-20">
                    <div className="group/slider relative h-1.5 w-full cursor-pointer bg-white/20 rounded-full">
                        <div className="absolute h-full bg-primary rounded-full relative" style={{ width: `${progress}%` }}>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow scale-0 group-hover/slider:scale-100 transition-transform" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-white/90 mt-1">
                        <div className="flex items-center gap-4">
                            <button onClick={handlePlayPause} className="hover:text-primary transition-colors">
                                {localPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                            </button>
                            <div className="flex items-center gap-2 text-xs font-medium font-mono">
                                <span>{currentTime}</span>
                                <span className="text-white/50">/</span>
                                <span>{duration}</span>
                            </div>
                            <div className="flex items-center gap-2 group/vol">
                                <Volume2 className="w-5 h-5" />
                                <div className="w-0 overflow-hidden group-hover/vol:w-20 transition-all duration-300">
                                    <div className="h-1 bg-white/30 rounded-full w-20 relative my-2">
                                        <div className="absolute h-full bg-white rounded-full" style={{ width: `${volume}%` }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="text-white/70 hover:text-white" title="-10초">
                                <RotateCcw className="w-4 h-4" />
                            </button>
                            <button className="text-white/70 hover:text-white" title="+10초">
                                <RotateCw className="w-4 h-4" />
                            </button>

                            <div className="relative group/speed">
                                <button className="text-xs font-bold bg-white/10 px-2 py-1 rounded hover:bg-primary hover:text-black transition-colors min-w-[3rem]">
                                    {speed}
                                </button>
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-black/90 rounded-lg p-1 hidden group-hover/speed:flex flex-col gap-1 w-16 shadow-xl border border-white/10">
                                    {["2.0x", "1.5x", "1.0x", "0.5x"].map(s => (
                                        <button
                                            key={s}
                                            onClick={() => setSpeed(s)}
                                            className={cn("text-xs py-1 rounded hover:bg-white/20 text-white", speed === s && "text-primary font-bold")}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button className="hover:text-primary transition-colors">
                                <Maximize className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
