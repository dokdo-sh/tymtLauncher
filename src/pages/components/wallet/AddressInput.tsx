import { useEffect, useState } from "react";
import { BsCheckCircleFill, BsFillDashCircleFill } from "react-icons/bs";
import Contact from "../../../lib/core/Contact";

import "../../../lib/translations/i18n";
import { init, t } from "i18next";

export const AddressInput = (props: {onChange: (text:string) => void, onBlur?: () => {}, value:string, search?: boolean, validate?: (v:boolean) => void}) => {
    const [valid, setValid] = useState(false);
    const [address, setAddress] = useState(props.value);
    async function validateAddress(address:string) : Promise<boolean> {
        if (address.length > 24){
            return true
        } else {
            return false
        }
        
    }

    useEffect(() => {
        const initContacts = async () => {
            await Contact.init()
        }
        initContacts()
    }, [])

    useEffect(() => {
        if (props.validate) {
            validateAddress(props.value).then((isValid:boolean) => {
                props.validate(isValid);
                setValid(isValid);
            })
        }
    }, [props]);

    function updateValidate (addr:string) {
        validateAddress(addr).then((v:boolean) => {
            setValid(v);
        });
    }

    const handleClickAdd = async () => {
        setAddress("")
        setValid(false)
        const contacts = await Contact.load();
        console.log(contacts)
        contacts.push(address);
        // Save the updated contacts
        await Contact.save(contacts);
    }
    
    const handleClickClear = () => {
        setAddress("")
        setValid(false)
    }

    return (
        <div className="bg-gray-800 bg-opacity-70 w-full  rounded flex items-center px-1">
            <div className="w-8 items-center">
                { valid ? <BsCheckCircleFill className="mx-auto text-green-400 hover:cursor-pointer" onClick={handleClickAdd}/>
                 : <BsFillDashCircleFill className="mx-auto text-red-400 hover:cursor-pointer" onClick={handleClickClear}/> }
            </div>
            <input
                type="text"
                className={`bg-transparent w-full outline-none dark:text-white dark:border-0 px-1 py-2 w-full  text-sm $`}
                value={address}
                placeholder={t("paste_address")}
                onBlur={props.onBlur}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setAddress(e.currentTarget.value)
                    updateValidate(e.currentTarget.value)
                    props.onChange(e.currentTarget.value)
                }}
            />
        </div>
    );
}
