import { ReactComponentElement, ReactElement } from "react";
import { District53 } from "../../games/district53/District53";

export type GameTab = {[key: string]: string};
export type PlatformFile = {url:string, type: "zip" | "exec", file?: string} | undefined
export type Game = {name: string, url:string,  thumbnail:string, component: JSX.Element | undefined, tabs: GameTab, executables: {windows:PlatformFile, macos:PlatformFile, linux: PlatformFile}}
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
            linux: {url: "https://github.com/district53/minetest/releases/download/5.6.0/Minetest-5.6.0-x86_64.AppImage", type: "exec"},
            macos: {url: "https://github.com/district53/minetest/releases/download/5.6.0/minetest-5.6.0-osx.zip", type: "zip"}, 
            windows: {url: "https://github.com/district53/minetest/releases/download/5.6.0/minetest-5.6.0-win64.zip", type: "zip", file: "minetest.exe"}
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
            windows: undefined,
            macos: undefined,
            linux: {url: "https://github.com/redeclipse/deploy/releases/download/appimage_continuous_stable/redeclipse-stable-x86_64.AppImage",  type: "exec"}
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
            windows: undefined,// {url: "https://github.com/OpenRA/OpenRA/releases/download/release-20210321/OpenRA-release-20210321-x64-winportable.zip", type: "zip"},
            macos: undefined,//{url: "https://github.com/OpenRA/OpenRA/releases/download/release-20210321/OpenRA-release-20210321.dmg", type: "exec"},
            linux: {url: "https://github.com/OpenRA/OpenRA/releases/download/release-20210321/OpenRA-Red-Alert-x86_64.AppImage", type: "exec"}
        },
        component: undefined,
    },
    "openra_dune" : {
        name: "OpenRA Dune 2000",
        url: "http://d.com/",
        thumbnail: "https://resources.tymt.com/media/6/thumb-240x340.png",
        tabs : {
            "servers": "Servers",
            "auctions": "Land auctions",
            "map": "Land map"
        },
        executables: {
            windows: undefined,//{url: "https://github.com/OpenRA/OpenRA/releases/download/release-20210321/OpenRA-release-20210321-x64-winportable.zip", type: "zip"},
            macos: undefined,//{url: "https://github.com/OpenRA/OpenRA/releases/download/release-20210321/OpenRA-release-20210321.dmg", type: "exec"},
            linux: {url: "https://github.com/OpenRA/OpenRA/releases/download/release-20210321/OpenRA-Tiberian-Dawn-x86_64.AppImage", type: "exec"}
        },
        component: undefined,
    },
    "openra_2000" : {
        name: "OpenRA Tiberian Dawn",
        url: "http://d.com/",
        thumbnail: "https://resources.tymt.com/media/6/thumb-240x340.png",
        tabs : {
            "servers": "Servers",
            "auctions": "Land auctions",
            "map": "Land map"
        },
        executables: {
            windows: undefined,//{url: "https://github.com/OpenRA/OpenRA/releases/download/release-20210321/OpenRA-release-20210321-x64.exe", type: "exec"},
            macos: undefined,//{url: "https://github.com/OpenRA/OpenRA/releases/download/release-20210321/OpenRA-release-20210321.dmg", type: "exec"},
            linux: {url: "https://github.com/OpenRA/OpenRA/releases/download/release-20210321/OpenRA-Dune-2000-x86_64.AppImage", type: "exec"}
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
            windows: undefined,//{url: "https://github.com/minetest/minetest/releases/download/5.6.1/minetest-5.6.1-win64.zip", type: "zip"},
            macos: undefined,//{url: "https://github.com/minetest/minetest/releases/download/5.6.1/minetest-5.6.1-osx.zip", type: "zip"},
            linux: undefined
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
            windows: undefined,
            macos: undefined,
            linux: {url: "https://jztkft.dl.sourceforge.net/project/flightgear/release-2020.3/FlightGear-2020.3.13-x86_64.AppImage", type: "exec"}
        },
        component: undefined,
    },
}

export default Games;