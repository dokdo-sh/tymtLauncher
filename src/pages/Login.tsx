
export const Login = () => {
    return (
        <div className="max-w-2xl mx-auto my-16 px-4">
            <div className="border border-primary p-1 rounded space-y-3">
                <div className="border border-red-500 space-y-4 p-6 w-full h-full">
                <img src="/logo.png" className="h-16 mx-auto" alt="" />
                <div className="text-3xl text-center py-3 font-Orbitron font-bold">Log in on <span className="text-primary">tymt</span></div>
                <div className="font-Orbitron text-center py-4 text-xs">
                    You can log in with your mnemonic or create a new one.
                </div>
                <div className='bg-primary/70 py-2 mx-auto px-6 text-base w-fit font-Orbitron hover:bg-primary cursor-pointer hover:ease-in duration-200 flex flex-row items-center h-fit'> <div>Import mnemonic</div></div>
                  <div className='bg-red-500/70 py-2 mx-auto px-6 text-base w-fit font-Orbitron hover:bg-red-500 cursor-pointer hover:ease-in duration-200 flex flex-row items-center h-fit'> <div>Create mnemonic</div></div>
                <div className="text-center text-xs">
                    tymt.com
                </div>
                </div>
            </div>
        </div>
    );
}
