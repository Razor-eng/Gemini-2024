import { assets } from "../../Assets/assets"

const Navbar = () => {
    return (
        <div className="ml-[16px] my-[12px] py-[8px] h-[48px] flex justify-between items-center">
            <h2 className="text-zinc-500 text-[21px]">Gemini</h2>
            <div className="flex items-center text-[15px] gap-4 font-[500] pr-4">
                <div className="md:flex items-center gap-4 hidden">
                    <p className="hover:bg-[#F5F5F5] cursor-pointer p-2 rounded-md">Try Gemini Advanced</p>
                    <p className="hover:bg-[#F5F5F5] cursor-pointer p-2 rounded-md">For business</p>
                    <p className="hover:bg-[#F5F5F5] cursor-pointer p-2 rounded-md">FAQs</p>
                </div>
                <img src={assets.user_icon} alt="" className="w-8" />
            </div>
        </div>
    )
}

export default Navbar