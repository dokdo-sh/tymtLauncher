import { useState } from "react";
import "../../../lib/translations/i18n";
import { t } from "i18next";
import { IWallet } from "../../../lib/wallets/IWallet";
export const FeeInput = (props: {onValidFee: (fee:number) => void, wallet: IWallet}) => {
    const [edit, setEdit] = useState(false)
    const [fee, setFee] = useState("0.05")

    function updateFee(bfee:string) {
        if (/^\d*\.?(?:\d{1,2})?$/.test(bfee)) setFee(bfee)
        if (!isNaN(Number(bfee))) {
            props.onValidFee(Number(bfee))
        }
    }
    
    return (
        <div className="py-3">
            <div className="font-bold">{t("transaction_fee")}</div>
            <div className="py-2 p-1 flex">
                <div className="px-3">
                    { edit && <>
                            {props.wallet.ticker} 
                            <input type="text" className={`w-28 text-center rounded text-sm  focus:outline-none ml-1 p-1 ${!edit? 'bg-dark-primary': 'bg-dark-secondary'}`} value={fee} onChange={(e:any) => {updateFee(e.currentTarget.value)}}/>
                        </>
                    }
                    { !edit && 
                        <div className="flex flex-row">
                            <div> {props.wallet.ticker}</div>
                            <div className={`w-28 ml-1 border select-none border-dark-secondary text-center rounded text-sm  focus:outline-none text-greenish items-center justify-center`}>{fee}</div>
                        </div>
                    }
                </div>
                { !edit && 
                    <div className="text-xs hover:underline text-greenish cursor-pointer" onClick={() => setEdit(true)}>{t("edit_fee")}</div>
                }
            </div>
            
            { edit &&
                <div className="text-greenish text-xs" >{t("beware_fee")}</div>
            }
        </div>
    );
}
