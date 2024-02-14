import {
    BaseDirectory,
    createDir,
    readDir,
    readTextFile,
    writeTextFile,
  } from "@tauri-apps/api/fs";
import { encrypt, decrypt } from '@metamask/browser-passworder'
  
  const ChatContact = {
    init: async () => {
      try {
        await readDir('', { dir: BaseDirectory.App });
      } catch (e) {
        await createDir("", {
          dir: BaseDirectory.App,
          recursive: true,
        });
        try {
          await readTextFile("chat_contacts.json", {
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
        let raw_contacts = await readTextFile("chat_contacts.json", {
          dir: BaseDirectory.App,
        });
        let contacts = await decrypt<any>(password, raw_contacts)
        return JSON.parse(contacts);  
      } catch (e) {
        console.log(e);
        return [];
      }
    },
    save: async (contacts: string[], password: string) => {
      let encrypted = await encrypt(password, JSON.stringify(contacts))
      await writeTextFile("chat_contacts.json", encrypted, {
        dir: BaseDirectory.App,
      });
    },
  };
  
  export default ChatContact;