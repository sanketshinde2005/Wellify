import { THEMES } from "../constants/index.js"
import { Send } from "lucide-react"
import { useThemeStore } from "../store/useThemeStore.js";

const Preview_Messages = [
    { id: 1, content: "Hey! How's it going ?", isSent: false },
    { id: 2, content: " I'm doing great! just working on something special.", isSent: true },
]

const SettingsPage = () => {
    const { theme, setTheme } = useThemeStore();
    return (
        <div className="h-full container mx-auto px-4 pt-2 max-w-5xl">
            <div className="space-y-6 ">
                {/* them choose theme */}
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold">Themes</h2>
                    <p className="text-sm text-base-content/70">Choose a theme for your interface</p>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                    {THEMES.map((t) => {
                        return (
                            <button
                                key={t}
                                className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                                ${theme === t ? "bg-base-300" : "hover:bg-base-200/80"}
                            `}
                                onClick={() => setTheme(t)}
                            >
                                <div className="relative h-8 w-full rounded-sm overflow-hidden" data-theme={t}>
                                    <div className="absolute inset-0 grid grid-cols-4 gap-[2px] p-1">
                                        <div className="rounded bg-primary"></div>
                                        <div className="rounded bg-secondary"></div>
                                        <div className="rounded bg-accent"></div>
                                        <div className="rounded bg-neutral"></div>
                                    </div>
                                </div>
                                <span className="text-[11px] font-medium truncate w-full text-center">
                                    {t.charAt(0).toUpperCase() + t.slice(1)}
                                </span>
                            </button>
                        )
                    })}
                </div>

                {/* preview section */}

            </div>
        </div >
    )
}

export default SettingsPage