import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { EffectFade, Navigation, Pagination } from "swiper";
import Games, { Game } from "../lib/api/Games";
import { Button } from "../pages/components/Button";
import TymtCore from "../lib/core/TymtCore";
import { useEffect, useState } from "react";
import { downloadGame } from "../lib/api/Downloads";
import { useNavigate } from "react-router-dom";
import { setAppState } from "../lib/store/appSlice";
import { useAppDispatch } from "../app/hooks";

export default function Slider() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper h-96"
      >
        <SwiperSlide>
          <img src="/backgrounds/d53slider.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ytimg.com/vi/fdt_jBXg3B4/maxresdefault.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/d53_screenshot.png" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/d53_landmap.png" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

const PlayButton = (props: { game: { key: string; data: Game } }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [installed, setInstalled] = useState(false);
  const [installing, setInstalling] = useState(false);

  async function install() {
    setInstalling(true);
    await downloadGame(props.game.key).then(async () => {});
    setInstalling(false);
    checkInstalled();
  }

  async function checkInstalled() {
    setInstalled(await TymtCore.Launcher.Library.isInstalled(props.game.key));
    setLoading(false);
  }

  useEffect(() => {
    checkInstalled();
    
  }, []);

  if (loading) {
    return <></>;
  } else {
    if (installed) {
      return (
        <div
          className="rounded py-2  px-8 text-xl w-fit font-Orbitron  duration-200 flex flex-row items-center h-fit bg-primary/70  hover:bg-primary cursor-pointer hover:ease-in '} select-none ease-in duration-100 my-3"
          onClick={() => {
            props.game.data.component == undefined
              ? TymtCore.Launcher.Launch(props.game.key)
              : navigate(`/library/${props.game.key}`);
          }}
        >
          Play
        </div>
      );
    } else {
      if (installing) {
        return (
          <div className="rounded py-2  px-8 text-xl w-fit font-Orbitron  duration-200 flex flex-row items-center h-fit bg-primary/70  hover:bg-primary cursor-pointer hover:ease-in '} select-none ease-in duration-100 my-3">
            Installing...
          </div>
        );
      } else {
        return (
          <div
            className="rounded py-2  px-8 text-xl w-fit font-Orbitron  duration-200 flex flex-row items-center h-fit bg-primary/70  hover:bg-primary cursor-pointer hover:ease-in '} select-none ease-in duration-100 my-3"
            onClick={install}
          >
            Install
          </div>
        );
      }
    }
  }
};

export const GamePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setAppState("linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url('/backgrounds/district53/background.png') no-repeat"))
  }, [])

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="text-sm text-gray-300 py-2">
        <a href="#" onClick={() => navigate("/")} className="hover:underline">
          Catalog
        </a>{" "}
        {">"}{" "}
        <a href="#" className="hover:underline">
          District 53
        </a>
      </div>
      <div className="flex flex-row items-center space-x-4 justify-items-center py-4">
      <img src="https://district53.io/d53logo.png" alt="logo" className="rounded bg-gray-800 border-2 border-primary w-16 h-16" />
      <div className="text-4xl pb-6 font-bold justify-items-center items-center">District 53</div>
      </div>
      <div className="grid grid-cols-6 ">
        <div className="col-span-4">
          <div className="h-96">
            <Slider />
          </div>
          <div className="rounded bg-gray-800/30 hover:bg-gray-800/50 ease-in duration-150 select-none cursor-pointer my-3 px-4 py-2">
            <div className="py-2 text-2xl">About District 53</div>
            <div className="text-sm py-3 text-gray-400">
              <p>
              District 53 is a virtual desktop and mobile voxel based metaverse game.
It has unique features utilizing the SXP blockchain with the Minetest codebase.
Purchase virtual land. Hire contractors with building skills or use your skills to build your own dream land.
              </p>
              <br />
              <p>
              Interact with other players and join them on missions and quests or prepare yourself for a war.
Go underground and mine rare blocks to sell them on the market to other players.
There is so much to-do in District 53. You are limited only by your imagination!
              </p>
            </div>
            {/* <a href="#">See more</a> */}
          </div>
          {/* <div className="rounded bg-gray-800/30 hover:bg-gray-800/50 ease-in duration-150 select-none cursor-pointer my-3 px-4 py-2">
          <div className="py-2 text-xl">
          System Requirements
          </div>
          
          <div>
            Windows | Linux | macOS
          </div>
          </div> */}
        </div>
        <div className="col-span-2">
          <div className="rounded bg-gray-800/30 mx-6 py-8 px-8">
            <div className="rounded bg-gray-800 px-8 py-4">
              <img src="https://district53.io/d53logo.png" alt="" />
            </div>
            <PlayButton
              game={{ key: "district53", data: Games["district53"] }}
            />
            <div className="text-sm  py-4 text-justify select-none">
              <p> District 53 is a virtual desktop and mobile voxel based metaverse game.
It has unique features utilizing the SXP blockchain with the Minetest codebase.</p>
<br />
              <p>
Purchase virtual land. Hire contractors with building skills or use your skills to build your own dream land. </p>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-gray-500 text-xs font-bold">BLOCKCHAINS</div>
                <div className="py-1"><img src="/blockchains/solar.png" className="w-6" alt="" /></div>
              </div>
              <div>
                <div className="text-gray-500 text-xs font-bold">
                  RELEASE DATE
                </div>
                <div>April 2022</div>
              </div>
              <div>
                <div className="text-gray-500 text-xs font-bold">DEVELOPER</div>
                <div>Dokdo UAB</div>
              </div>
              <div>
                <div className="text-gray-500 text-xs font-bold">GENRE</div>
                <div>Sandbox</div>
              </div>
            </div>
          </div>
          <div className="rounded bg-gray-800/30 my-2 mx-6 py-3 px-8">
          <div className="py-2 text-2xl">Permissions</div>
            <div>
                <div className="italic">This game will get access to:</div>
                <div className="text-gray-400 text-sm py-3 italic">
                <p>• Your wallet address</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

