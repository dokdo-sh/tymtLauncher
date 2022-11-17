import { change } from "../../lib/store/gameSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Games from "../../lib/api/Games";
import {changeTab, selectCurrentGame} from '../../lib/store/currentGameSlice'
import {setAppState} from '../../lib/store/appSlice'

import { ServerList } from "./pages/ServerList";
import { Auctions } from "./pages/Auctions";
import { LandMap } from "./pages/LandMap";
import { useEffect } from "react";

export const District53 = () => {
    const dispatch = useAppDispatch()
    const game = Games.district53;
    const gameState = useAppSelector(selectCurrentGame)
    

    useEffect(() => {
      dispatch(change(game))
      dispatch(setAppState("linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url('/backgrounds/district53/background.png') no-repeat"))
  
    }, [])
    
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
