import { useContext, useState } from "react"
import { assets } from "../../Assets/assets"
import { Context } from "../../Context/Context";

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

    const SidebarItems = [
        { img: assets.question_icon, label: 'Help' },
        { img: assets.history_icon, label: 'Activity' },
        { img: assets.setting_icon, label: 'Settigs' },
    ]

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    }

    return (
        <div className={`min-h-screen sm:inline-flex flex-col justify-between bg-[#f0f4f9] px-[15px] py-[25px] ${extended ? 'w-60' : 'w-20'} transition-all ease-in duration-150 hidden`}>
            <div className="flex flex-col">
                <div className="relative group w-fit">
                    <img onClick={() => setExtended(!extended)} src={assets.menu_icon} alt="" className="w-[40px] block cursor-pointer transition-all ease-in duration-150 hover:bg-[#e2e6eb] p-2 rounded-full" />
                    <p className={`absolute top-12 group-hover:opacity-80 hover:hidden cursor-default opacity-0 ${extended ? 'hidden' : '-left-2'} bg-black text-xs px-2 py-1 rounded-md text-white transition-all ease-in duration-150 w-16`}>Expand Menu</p>
                </div>
                {prevPrompts.length > 0 &&
                    <div onClick={() => newChat()} className="mt-[50px] relative group inline-flex items-center gap-[10px] font-semibold py-[10px] px-[15px] w-fit bg-[#e6eaf1] hover:opacity-80 transition-all ease-in duration-150 rounded-full text-[14px] text-[grey] cursor-pointer">
                        <img src={assets.plus_icon} alt="" className="w-[15px]" />
                        <p className={`absolute group-hover:opacity-100 hover:hidden cursor-default opacity-0 ${extended ? 'hidden' : 'left-20'} bg-black text-xs px-2 py-1 rounded-md text-white transition-all ease-in duration-150 w-20`}>Create New Chat</p>
                        {extended && <p>New Chat</p>}
                    </div>
                }
                {extended &&
                    <div className="flex flex-col" style={{ animation: 'fadeIn 1.5s' }}>
                        {prevPrompts.length > 0 &&
                            <p className="mt-[30px] font-semibold text-zinc-600 mb-[10px]">Recent:</p>
                        }
                        {prevPrompts.map((prompt, id) => (
                            <div key={id} onClick={() => loadPrompt(prompt)} className="flex items-center gap-[10px] p-[10px] pr-[40px] rounded-[50px] text-[#282828] cursor-pointer hover:bg-[#e2e6eb]">
                                <img src={assets.message_icon} alt="" className="w-[20px]" />
                                <p>{prompt.slice(0, 15)} ...</p>
                            </div>
                        ))}
                    </div>
                }
            </div>
            <div className="flex flex-col gap-1">
                {SidebarItems.map((item, id) => (
                    <div key={id} className={`flex relative items-center group gap-[10px] ${extended ? 'w-full' : 'w-fit'} p-[10px] rounded-full text-[#282828] cursor-pointer transition-all ease-in duration-150 hover:bg-[#e2e6eb]`}>
                        <img src={item.img} alt="" className="w-[20px]" />
                        {extended &&
                            <p>{item.label}</p>
                        }
                        <p className={`absolute left-20 group-hover:opacity-80 opacity-0 ${extended ? 'hidden' : 'left-10'} bg-black text-xs px-2 py-1 rounded-md text-white transition-all ease-in duration-150`}>{item.label}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar