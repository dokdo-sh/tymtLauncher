import { useState } from "react";
// import { BsSend } from "react-icons/bs";
import InputEmojiWithRef from "react-input-emoji";
// import { use } from "i18next";


export const SendMessage = (props:{ myId:string, to:string, onHandleSend: (text:string) => void }) => {
  const [message, setMessage] = useState("");

  const handleOnEnter = (text: string) => {
    props.onHandleSend(text)
    setMessage("");
  };

  return (
    <div className="flex flex-row bg-gray-800/50 border-t border-gray-800 w-full">
      {/* <input type="text" className="bg-transparent w-full  outline-none py-2 px-4 text-sm" placeholder="Write a message..." onChange={(e)=> {
                setMessage(e.target.value)
            }}/> */}
      <InputEmojiWithRef
        value={message}
        onChange={setMessage}
        cleanOnEnter
        onEnter={handleOnEnter}
        placeholder="Type a message"
        disableRecent={props.myId.length == 0 || props.to.length == 0}
      />
      {/* <div className="px-3 py-2 hover:bg-gray-800">
                <BsSend className="mx-auto"/>
            </div> */}
    </div>
  );
};
