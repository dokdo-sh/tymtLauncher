import "../../../lib/translations/i18n";
import { t } from "i18next";
import { BiRightArrowAlt, BiWorld } from "react-icons/bi";
import { MdHowToVote, MdOutlineLocalFireDepartment } from "react-icons/md";
import { BsFileLock, BsKeyFill, BsX } from "react-icons/bs";
import { GiArchiveRegister } from "react-icons/gi";

export const CoreTransactionTypes = {
    0: {
        text: t("legacy_transaction"),
        icon: (style:string) => <BiRightArrowAlt className={style}/>,
    },
    1: {
        text: t("second_signature_transaction"),
        icon: (style:string) => <BsKeyFill className={style}/>,
    },
    2: {
        text: t("delegate_registration_transaction"),
        icon: (style:string) => <GiArchiveRegister className={style} />,
    },
    3: {
        text: t("vote_transaction"),
        icon: (style:string) => <MdHowToVote className={style}/>,
    },
    4: {
        text: t("multisignature_transaction"),
        icon: (style:string) => <BsKeyFill className={style}/>,
    },
    5: {
        text: t("ipfs_transaction"),
        icon: (style:string) => <BiWorld className={style} />,
    },
    6: {
        text: t("transfer_transaction"),
        icon: (style:string) => <BiRightArrowAlt className={style}/>,
    },
    7: {
        text: t("delegate_resignation_transaction"),
        icon: (style:string) => <BsX className={style} />,
    },
    8: {
        text: t("htlclock_transaction"),
        icon: (style:string) =>  <BsFileLock className={style}/>,
    },
    9: {
        text: t("htlcclaim_transaction"),
        icon: (style:string) => <BsFileLock className={style}/>,
    },
    10: {
        text: t("htlcrefund_transaction"),
        icon: (style:string) => <BsFileLock className={style}/>,
    },
};

export const SolarTransactionTypes = {
    0: {
        text: t("burn_transaction"),
        icon: (style:string) => <MdOutlineLocalFireDepartment className={style}/>,
    },
    2: {
        text: t("vote_transaction"),
        icon: (style:string) => <MdHowToVote className={style}/>,
    },
};

export type CoreTransactionTypeKey = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type SolarTransactionTypeKey = 0 | 2;

export const TransactionType = (props: {
    details:
      | { type: CoreTransactionTypeKey; typegroup: 1 }
      | { type: SolarTransactionTypeKey; typegroup: 2 };
}) => {
  
    if (props.details.typegroup === 1 && CoreTransactionTypes[props.details.type]) {
        return <div className="py-1 text-gray-400 px-1">
            {CoreTransactionTypes[props.details.type].icon("inline-block")} {CoreTransactionTypes[props.details.type].text}
        </div>
    } else if (props.details.typegroup === 2 && SolarTransactionTypes[props.details.type]) {
        return <div className="py-1 text-gray-400 px-1">
            {SolarTransactionTypes[props.details.type].icon("inline-block")} {SolarTransactionTypes[props.details.type].text}
        </div>
    } else {
        return <div></div>
    }
};