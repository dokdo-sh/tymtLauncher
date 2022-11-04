import { ReactComponentElement, ReactElement } from "react";
import { District53 } from "../../games/district53/District53";

export type GameTab = {[key: string]: string};
export type Game = {name: string, url:string,  thumbnail:string, component: JSX.Element | undefined, tabs: GameTab, executables: {windows:string, macos:string, linux:string}}
export type GamesType = {[key:string] : Game}

const Games : {[key:string] : Game} = {
   "district53" : {
        name: "District 53",
        url: "http://d.com/",
        thumbnail: "https://resources.tymt.com/media/1/thumb-240x340.png",
        tabs : {
            "servers": "Servers",
            "auctions": "Land auctions",
            "map": "Land map"
        },
        executables: {
            linux: "https://github.com/district53/minetest/releases/download/5.6.0/Minetest-5.6.0-x86_64.AppImage",
            macos: "https://github.com/district53/minetest/releases/download/5.6.0/minetest-5.6.0-osx.zip",
            windows: "https://github.com/district53/minetest/releases/download/5.6.0/minetest-5.6.0-win64.zip"
        },
        component: <District53/>,
    },
    "red_eclipse" : {
        name: "Red Eclipse",
        url: "http://d.com/",
        thumbnail: "https://resources.tymt.com/media/7/thumb-240x340.png",
        tabs : {
            "servers": "Servers",
            "auctions": "Land auctions",
            "map": "Land map"
        },
        executables: {
            windows: "",
            macos: "",
            linux: "https://github.com/redeclipse/deploy/releases/download/appimage_continuous_stable/redeclipse-stable-x86_64.AppImage"
        },
        component: undefined,
    },
    "openra" : {
        name: "OpenRA",
        url: "http://d.com/",
        thumbnail: "https://resources.tymt.com/media/6/thumb-240x340.png",
        tabs : {
            "servers": "Servers",
            "auctions": "Land auctions",
            "map": "Land map"
        },
        executables: {
            windows: "https://github.com/OpenRA/OpenRA/releases/download/release-20210321/OpenRA-release-20210321-x64.exe",
            macos: "https://github.com/OpenRA/OpenRA/releases/download/release-20210321/OpenRA-release-20210321.dmg",
            linux: "https://github.com/OpenRA/OpenRA/releases/download/release-20210321/OpenRA-Red-Alert-x86_64.AppImage"
        },
        component: undefined,
    },
    "minetest" : {
        name: "Minetest",
        url: "http://d.com/",
        thumbnail: "https://resources.tymt.com/media/2/thumb-240x340.png",
        tabs : {
            "servers": "Servers",
            "auctions": "Land auctions",
            "map": "Land map"
        },
        executables: {
            windows: "",
            macos: "",
            linux: ""
        },
        component: undefined,
    },
    "flightgear" : {
        name: "Flightgear",
        url: "http://d.com/",
        thumbnail: "https://resources.tymt.com/media/3/thumb-240x340.png",
        tabs : {
            "servers": "Servers",
            "auctions": "Land auctions",
            "map": "Land map"
        },
        executables: {
            windows: "",
            macos: "",
            linux: ""
        },
        component: undefined,
    },
}

export default Games;