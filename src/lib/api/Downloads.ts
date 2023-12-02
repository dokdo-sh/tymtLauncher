import { fetch as tFetch, ResponseType } from '@tauri-apps/api/http';
import { BaseDirectory, createDir, writeBinaryFile, readDir } from "@tauri-apps/api/fs";
import { type, arch } from '@tauri-apps/api/os';
import { invoke } from "@tauri-apps/api/tauri";
import Games from './Games';


export async function downloadAndUnzip(url:string, targetDir:string) {
    return invoke('download_and_unzip', {
        url: url,
        target: targetDir
    });
}

export async function downloadFile(url:string, targetFile:string) {
    return invoke('download_file', {
        url: url,
        target: targetFile
    });
}

export async function downloadFileLinux(url:string, targetFile:string) {
    return invoke('download_file', {
        url: url,
        target: targetFile
    });
}

export async function downloadGame(game_key:string) {
    let platform = await type();
    let game = Games[game_key]
    switch (platform) {
        case 'Linux':
            await createDir(`games/${game_key}`, {
                dir: BaseDirectory.App,
                recursive:true
            });
            return downloadFileLinux(game.executables.linux.url, `/games/${game_key}/${game_key}.AppImage`);

        case 'Darwin':
            await createDir(`games/${game_key}`, {
                dir: BaseDirectory.App,
                recursive:true
            });
            return downloadAndUnzip(game.executables.macos.url, `/games/${game_key}/${game_key}.app`);

        case 'Windows_NT':
            return downloadAndUnzip(game.executables.windows.url, `/games/${game_key}`);
    }
    return false;
}

// export async function unzipVersion(zipFile:string, version = '5.6.0') {
//     let arch = 'win64';
//     let files = Object.values(zipFile.files); //.filter(i => !i.dir);
//     //console.log(files);
//     //files = Object.keys(files);
//     for (const file of files) {
//         if (file.dir) {
//             await createDir(`versions/${file.name.replace(`minetest-${version}-${arch}`, version)}`, {
//                 dir: BaseDirectory.App,
//                 recursive: true
//             }).then(() => console.log(`created directory for ${file.name}`));
//         }
//         else {
//             await zipFile.file(file.name).async('uint8array').then(data => {
//                 return writeBinaryFile({
//                     path: `versions/${file.name.replace(`minetest-${version}-${arch}`, version)}`,
//                     contents: data
//                 }, {
//                     dir: BaseDirectory.App
//                 })
//             }).then(`Saved ${file.name}`).catch(err => console.log(err));
//         }
//     }
// }