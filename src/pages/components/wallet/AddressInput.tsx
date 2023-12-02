import { useEffect, useState } from "react";
import { BsCheckCircleFill, BsFillDashCircleFill } from "react-icons/bs";
import { BiQrScan } from "react-icons/bi";

import "../../../lib/translations/i18n";
import { t } from "i18next";

export const AddressInput = (props: {onChange: (text:string) => void, onBlur?: () => {}, value:string, search?: boolean, validate?: (v:boolean) => void}) => {
const [valid, setValid] = useState(false);
    async function validateAddress(address:string) : Promise<boolean> {
        //   let cw = await Armor.currentWallet()
        return true;
        //     return solar.validateAddress(address);
    }

    useEffect(() => {
        if (props.validate) {
            validateAddress(props.value).then((isValid:boolean) => {
                props.validate(isValid);
                setValid(isValid);
            })
        }
    }, [props.value])

    function updateValidate (addr:string) {
        validateAddress(addr).then((v:boolean) => {
            setValid(v);
        })
    }

    return (
        <div className="bg-gray-800 bg-opacity-70 w-full  rounded flex items-center px-1">
            <div className="w-8 items-center">{valid? <BsCheckCircleFill className="mx-auto text-greenish"/> : <BsFillDashCircleFill className="mx-auto text-red-400"/> }</div>
            <input
            type="text"
            className={`bg-transparent w-full outline-none dark:text-white dark:border-0 px-1 py-2 w-full  text-sm $`}
            value={props.value}
            placeholder={t("paste_address")}
            onBlur={props.onBlur}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                updateValidate(e.currentTarget.value)
                props.onChange(e.currentTarget.value)
              }}
          />
        </div>
    );
}
