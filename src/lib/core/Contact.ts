import {
  BaseDirectory,
  createDir,
  readDir,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/api/fs";

const Contact = {
  init: async () => {
    try {
      await readDir("", { dir: BaseDirectory.App });
    } catch (e) {
      await createDir("", {
        dir: BaseDirectory.App,
        recursive: true,
      });
      try {
        await readTextFile("contacts.json", {
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
      let contacts = await readTextFile("contacts.json", {
        dir: BaseDirectory.App,
      });
      return JSON.parse(contacts);
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  save: async (contacts: string[]) => {
    await writeTextFile("contacts.json", JSON.stringify(contacts), {
      dir: BaseDirectory.App,
    });
  },
};

export default Contact;
