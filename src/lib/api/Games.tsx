import { ReactComponentElement, ReactElement } from "react";
import { District53 } from "../../games/district53/District53";

export type GameTab = {[key: string]: string};
export type Game = {name: string, url:string, about:string, component: JSX.Element, tabs: GameTab}

const Games = {
   "district53" : {
        name: "District 53",
        url: "http://d.com/",
        about: "District 53 is a virtual desktop and mobile voxel based metaverse game.\
        It has unique features utilizing the SXP blockchain with the Minetest codebase.\
        Purchase virtual land. Hire contractors with building skills or use your skills to build your own dream land.\
        Interact with other players and join them on missions and quests or prepare yourself for a war.\
        Go underground and mine rare blocks to sell them on the market to other players.\
        There is so much to-do in District 53. You are limited only by your imagination!",
        tabs : {
            "servers": "Servers",
            "auctions": "Land auctions",
            "map": "Land map"
        },
        component: <District53/>,
    }
}

export default Games;