import { change } from "../../lib/store/gameSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Games from "../../lib/api/Games";
import {changeTab, selectCurrentGame} from '../../lib/store/currentGameSlice'


import { ServerList } from "./pages/ServerList";
import { Auctions } from "./pages/Auctions";
import { LandMap } from "./pages/LandMap";

export const District53 = () => {
    const dispatch = useAppDispatch()
    const game = Games.district53;
    const gameState = useAppSelector(selectCurrentGame)


    dispatch(change(game))
    
    switch (gameState.currentTab) {
      default:
      case "servers":
        return (
          <ServerList/>
        );
      case "auctions":
        return (
          <Auctions/>
        );
      case "map":
        return (
            <LandMap/>
        );
    }

}
