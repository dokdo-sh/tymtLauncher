import {
    BaseDirectory,
    createDir,
    readDir,
    readTextFile,
    writeTextFile,
  } from "@tauri-apps/api/fs";
import { MSG } from '../../pages/Chat';
  
  const ChatHistory = {
    init: async () => {
      try {
        await readDir("", { dir: BaseDirectory.App });
      } catch (e) {
        await createDir("", {
          dir: BaseDirectory.App,
          recursive: true,
        });
        try {
          await readTextFile("chat_history.json", {
            dir: BaseDirectory.App,
          });
        } catch (e) {
          console.log("readTextFile error: ", e);
        }
      }
      console.log("done")
    },
    load: async () => {
      try {
        let contacts = await readTextFile("chat_history.json", {
          dir: BaseDirectory.App,
        });
        return JSON.parse(contacts);
      } catch (e) {
        console.log(e);
        return [];
      }
    },
    save: async (hisotry: MSG[]) => {
      await writeTextFile("chat_history.json", JSON.stringify(hisotry), {
        dir: BaseDirectory.App,
      });
    },
  };
  
  export default ChatHistory;