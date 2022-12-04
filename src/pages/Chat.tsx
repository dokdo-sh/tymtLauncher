import { BsChat, BsSearch } from "react-icons/bs";

export const Chat = () => {
    return (
        <div>
            <div className="flex flex-row h-screen">
                <div className="w-1/4 border-r border-gray-800">
                    <div className="py-3 px-4 "><input type="text" className="bg-gray-800/50 w-full py-1 px-2 text-sm rounded" placeholder="Search for a friend..." /></div>
                    <div className=" grid grid-cols-3">
                        <div className="px-3 col-span-1 py-3 hover:bg-red-500">
                            <BsChat className="mx-auto"/>
                        </div>
                    </div>
                    <div>
                        <div className="py-2 px-3 flex flex-row bg-primary/50">
                            <img className="rounded-full h-12 w-12 bg-gray-800" src="https://leitesv.dev/logo.jpg"></img>
                            <div>
                                <div className="px-3 font-bold">Tío Gilipollas</div>
                                <div className="italic text-sm px-3 text-gray-100">Qué va tío si te lo he dicho...</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grow flex flex-col">
                    <div className="py-3 px-4 border-b border-gray-800 flex flex-row items-center">
                        <div className="grow">
                        <div className="font-bold py-">Tío Gilipollas</div>
                        <div className="italic text-gray-400 text-xs">last seen recently</div>
                        </div>
                        
                            <div className="mx-2 rounded-full  hover:bg-greenish bg-[#f64a28] cursor-pointer py-1 px-4 text-sm font-bold"> <img src="/blockchains/solar.png" className="w-6 inline-block" alt="" /> Send SXP</div>
                            <BsSearch className="mx-2 text-gray-300 hover:text-white cursor-pointer"/>
                    </div>
                    <div className="grow bg-[#101010]"></div>
                    <div className="py-2 bg-gray-800/50 border-t border-gray-800">
                    <input type="text" className="bg-transparent w-full  outline-none py-2 px-4 text-sm" placeholder="Write a message..." />
                    </div>
                </div>
            </div>
        </div>
    );
}
