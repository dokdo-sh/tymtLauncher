import {
    BaseDirectory,
    createDir,
    readDir,
    readTextFile,
    writeTextFile,
  } from "@tauri-apps/api/fs";
import { MSG } from '../../pages/Chat';
import { encrypt, decrypt } from '@metamask/browser-passworder'
  
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
    load: async (password: string) => {
      try {
        let raw_history = await readTextFile("chat_history.json", {
          dir: BaseDirectory.App,
        });
        let history = await decrypt<any>(password, raw_history)
        return JSON.parse(history);
      } catch (e) {
        console.log(e);
        return [];
      }
    },
    save: async (hisotry: MSG[], password: string) => {
      let encrypted = await encrypt(password, JSON.stringify(hisotry))
      await writeTextFile("chat_history.json", encrypted, {
        dir: BaseDirectory.App,
      });
    },
  };
  
  export default ChatHistory;