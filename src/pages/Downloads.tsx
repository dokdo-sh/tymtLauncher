import { FC } from "react";

export const Downloads = () => {
    return (
                  <div className="max-w-6xl mx-auto pb-16">
        <div className="py-16">
          <div className="flex flex-row max-w-2xl space-x-3">
            <div className="text-3xl font-Orbitron">Downloads</div>
            <div className="grow"></div>
                
          </div>
        </div>
        <div>
            <div className="bg-gray-800/50 bg-opacity-60 px-3 py-5 w-1/2 text-gray-300 border border-gray-800 rounded font-Orbitron text-xs">
            No downloads in progress.
            </div>
        </div>
        </div>
    );
}
