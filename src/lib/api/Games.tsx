import { District53 } from "../../games/district53/District53";

export type GameTab = {[key: string]: string};
export type PlatformFile = {url:string, type: "zip" | "exec", file?: string} | undefined
export type Game = {name: string, url:string,  thumbnail:string, component: JSX.Element | undefined, tabs: GameTab, executables: {windows:PlatformFile, macos:PlatformFile, linux: PlatformFile}}
export type GamesType = {[key:string] : Game}

const Games : {[key:string] : Game} = {
   "district53" : {
        name: "District 53",
        url: "http://d.com/",
        thumbnail: "/backgrounds/District53.png",
        tabs : {
            "servers": "Servers",
            // "auctions": "Land auctions",
            // "map": "Land map"
        },
        executables: {
            linux: {url: "https://github.com/district53/minetest/releases/download/5.6.0/Minetest-5.6.0-x86_64.AppImage", type: "exec"},
            macos: {url: "https://github.com/district53/minetest/releases/download/5.6.0/minetest-5.6.0-osx.zip", type: "zip"}, 
            windows: {url: "https://github.com/district53/minetest/releases/download/5.6.0/minetest-5.6.0-win64.zip", type: "zip", file: "minetest"}
        },
        component: <District53/>,
    },
}

export default Games;