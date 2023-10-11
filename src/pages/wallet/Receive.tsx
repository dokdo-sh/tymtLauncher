import { useState } from "react";
import { BiCopy } from "react-icons/bi";
import QRCode from "react-qr-code";
import { writeText } from '@tauri-apps/api/clipboard';

import "../../lib/translations/i18n";
import { t } from "i18next";

export const Receive = () => {
    const [address, setAddress] = useState("");
    return (
        <div>
            <div className="py-4 px-10">
                Deposit
            </div>
                <div className="w-fit mx-auto p-6 bg-white my-6"><QRCode value={"hech"} size={150}/></div>
                
                <div className="grow w-fit rounded-lg   text-center select-none   cursor-pointer text-sm rounded-full hover:bg-dark-hoverish px-2 py-1 mx-auto">
                <div className="font-mono text-greenish" onClick={() => writeText(address)}>
                <BiCopy className="text-gray-300 inline-block"/>  {"hech"}
                </div>
            </div>
            <div className="py-4 px-10"> {t("aware_confirm")}</div>
        </div>
    );
}
