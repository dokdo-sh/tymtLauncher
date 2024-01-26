import { BaseDirectory, createDir, readDir, readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { encrypt, decrypt } from '@metamask/browser-passworder'

const Contact = {
    init: async () => {
        try {
            await readDir('', { dir: BaseDirectory.App });
        }
        catch {
            await createDir('', {
            dir: BaseDirectory.App,
            recursive: true
            });
            try {
            await readTextFile("contacts.json", {
                dir: BaseDirectory.App
            });
            } catch (e) {
                console.log("createDir error: ", e)
            }
        }
    },
    load: async () => {
        try {
            let contacts = await readTextFile("contacts.json", {
            dir: BaseDirectory.App
            });
            return JSON.parse(contacts)
        }
        catch (e) {
            return e
        }
    },
    save: async (contacts: string []) => {
        await writeTextFile("contacts.json", JSON.stringify(contacts), {
            dir: BaseDirectory.App
        })
    }
};

export default Contact;
