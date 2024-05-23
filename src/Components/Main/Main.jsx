/* eslint-disable react/no-danger-with-children */
import { assets } from "../../Assets/assets"
import { VscSend } from "react-icons/vsc";
import { SiGooglegemini } from "react-icons/si";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { MdClose, MdMicNone } from "react-icons/md";
import { LuImagePlus } from "react-icons/lu";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/Context";
import { Link } from "react-router-dom";

const Main = () => {
    const [show, setShow] = useState(true);
    const [effect, setEffect] = useState(false);

    const {
        onSent,
        recentPrompt, setRecentPrompt,
        showResults,
        loading,
        resultData,
        input, setInput,
    } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    }

    const Cards = [
        { text: 'Suggest beautiful places to see on an upcoming road trip', img: assets.compass_icon },
        { text: 'Briefly summarize this concept: urban planning', img: assets.bulb_icon },
        { text: 'Brainstorm team bonding activities for our work retreat', img: assets.message_icon },
        { text: 'Improve the readability of the following code', img: assets.code_icon },
    ]

    function getRandomInt(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return (Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)) % 2 === 0;
    }

    useEffect(() => {
        setShow(getRandomInt(1, 10))
        if (!effect) {
            setTimeout(() => {
                setEffect(true);
            }, 750);
        }
    }, [effect])

    return (
        <div className="flex-1 min-h-screen pb-[15vh] relative">
            <div className="flex items-center justify-between p-[20px] text-[#585858]">
                <Link to={'/'}>
                    <h2 className="text-zinc-500 text-[21px]">Gemini</h2>
                </Link>
                <div className="flex items-center gap-6">
                    <button className="hidden md:flex gap-1 items-center text-[13px] font-[500] bg-[#dde3ea] px-3 py-2 rounded-lg hover:bg-[#D4DAE1] transition-all ease-in duration-150">
                        <SiGooglegemini color="#D65F62" size={18} />
                        Try Gemini Advanced
                    </button>
                    <Link to={'/'}>
                        <img src='/icon.png' alt="" className="w-8" />
                    </Link>
                </div>
            </div>
            {show &&
                <div className="w-full relative bg-[#041E49] py-3 text-center hidden md:block">
                    <div className="flex items-center justify-center gap-1 w-full text-white">
                        <HiOutlineCheckBadge />
                        <p className="text-xs">See the latest updates to the <span className="underline cursor-pointer">Gemini Apps Privacy Hub</span></p>
                    </div>
                    <MdClose onClick={() => setShow(false)} className="text-white absolute right-6 top-[10px] cursor-pointer" size={20} />
                </div>
            }
            <div className="max-w-screen md:max-w-[900px] m-auto">
                {!showResults
                    ?
                    <div>
                        <div className="my-[40px] text-[#c4c7c5] font-[500] p-[20px]">
                            <p className="text-[50px] md:text-[56px]"><span className="colorSpan">
                                Hello, Bro
                            </span></p>
                            <p className="text-[40px] md:text-[56px]">How can I help you today?</p>
                        </div>
                        <div className="grid gap-[5px] md:gap-[15px] md:grid-cols-4 p-[20px]" >
                            {Cards.map((card, id) => (
                                <div onClick={() => loadPrompt(card.text)} key={id} className="h-[200px] p-[15px] bg-[#f0f4f9] rounded-[10px] relative cursor-pointer hover:bg-[#dfe4ea] transition-all ease-in duration-150">
                                    <p className="text-[#585858] text-[17px]">{card.text}</p>
                                    <img src={card.img} alt="" className="w-[35px] p-[5px] absolute bg-white rounded-[20px] bottom-[10px] right-[10px]" />
                                </div>
                            ))}
                        </div>
                    </div>
                    :
                    <div className="px-[5%] max-h-[74vh] md:max-h-[68vh] overflow-y-scroll">
                        <div className="my-[40px] flex items-center gap-[20px]">
                            <img src={assets.user_icon} alt="" className="w-[40px]  " />
                            <p className="font-semibold text-zinc-700">{recentPrompt}</p>
                        </div>
                        <div className="flex items-start gap-[20px]">
                            <img src={assets.gemini_icon} alt="" className="w-[40px]" />
                            {loading ?
                                <div className="w-full flex flex-col gap-[10px]">
                                    <hr className="rounded-[4px] border-none bg-[#f6f7f8] bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] h-[20px]" style={{ backgroundSize: '800px 50px', animation: 'loader 3s infinite linear' }} />
                                    <hr className="rounded-[4px] border-none bg-[#f6f7f8] bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] h-[20px]" style={{ backgroundSize: '800px 50px', animation: 'loader 3s infinite linear' }} />
                                    <hr className="rounded-[4px] border-none bg-[#f6f7f8] bg-gradient-to-r from-[#9ed7ff] via-white to-[#9ed7ff] h-[20px]" style={{ backgroundSize: '800px 50px', animation: 'loader 3s infinite linear' }} />
                                </div>
                                :
                                <p className="text-[17px] font-[300] leading-[1.8]" dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }
                        </div>
                    </div>
                }

                <div className="absolute bottom-0 w-[100%] md:max-w-[900px] px-[20px] m-auto mt-4">
                    <div className={`flex items-center justify-between gap-[20px] focus-within:bg-slate-200 bg-[#f0f4f9] transition-all ease-in duration-150 py-[10px] px-[20px] rounded-full mb-8 md:mb-0 ${effect ? 'w-full' : 'md:w-96 w-40'} transition-all ease-in duration-300`}>
                        <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Enter a prompt here" className="w-full bg-transparent border-none outline-none p-[8px] text-[18px]" />
                        <div className="flex items-center gap-[15px] text-zinc-700">
                            <LuImagePlus className="w-[24px] text-2xl hover:text-blue-400 cursor-pointer transition-all ease-in duration-150 hidden sm:block" />
                            <MdMicNone className="w-[24px] text-2xl hover:text-zinc-400 cursor-pointer transition-all ease-in duration-150 hidden sm:block" />
                            <VscSend onClick={() => onSent()} className="w-[24px] text-2xl hover:text-blue-700 cursor-pointer transition-all ease-in duration-150" />
                        </div>
                    </div>
                    <p className="text-[13px] md:my-[15px] mx-auto text-center text-zinc-600 font-[400] hidden md:block">
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main