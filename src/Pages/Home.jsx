import { Link } from "react-router-dom";
import Footer from "../Components/Footer/Footer"
import Navbar from "../Components/Navbar/Navbar"
import { useEffect, useState } from "react";

const Home = () => {
    const [text, setText] = useState('');

    const styledText = () => {
        setText('');
        const delayPara = (index, nextWord) => {
            setTimeout(() => {
                setText(prev => prev + nextWord);
            }, 75 * index);
        }
        const text = 'Generate an image of a futuristic car driving through an old mountain road surrounded by nature';
        let textArray = text.split('');
        for (let i = 0; i < textArray.length; i++) {
            delayPara(i, textArray[i]);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            styledText()
        }, 3000);
    }, [])

    return (
        <div className="w-screen min-h-screen flex flex-col" style={{ animation: 'fadeIn 1.5s' }}>
            <Navbar />
            <div className="md:m-[44px] px-6 md:px-0 flex-1 flex flex-col md:flex-row justify-center mb-32 md:mb-0">
                <div className="py-[24px] md:w-[600px] flex items-center">
                    <div className="w-[360px]">
                        <img src="/gemini_logo.svg" alt="" className="w-52 md:w-auto" />
                        <h2 className="mt-[12px] mb-[24px] text-[27px] leading-8 font-[500]">Supercharge your creativity and productivity</h2>
                        <p className="my-[17px] text-[17px] font-[400] leading-7">Chat to start writing, planning, learning and more with Google AI</p>
                        <Link to={'/chat'}>
                            <button className="px-6 py-3 hover:opacity-90 transition-all shadow-lg drop-shadow-lg ease-in duration-150 bg-[#1A73E8] text-lg font-[500] my-4 rounded-full text-white outline-none border-none">Chat with Gemini</button>
                        </Link>
                    </div>
                </div>
                <div className="md:w-[600px] relative">
                    <img src="/bg_car.jpg" alt="" className="rounded-3xl w-full h-[320px] md:h-[450px] md:w-[490px]" style={{ animation: 'imgMove 2s' }} />
                    <div className="bg-white absolute md:right-10 w-full md:w-[380px] flex items-start gap-4 h-32 -bottom-10 md:bottom-[24px] p-4 rounded-3xl" style={{ animation: 'cardMove 2s' }} >
                        <img src="/avatar.png" alt="" className="w-11" />
                        <p className="text-zinc-600 leading-6 text-lg font-semibold">{text}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home