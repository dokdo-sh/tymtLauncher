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
          <img src="/backgrounds/district53.webp" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

const PlayButton = (props: {game: {key:string, data: Game}}) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [installed, setInstalled] = useState(false)
    const [installing, setInstalling] = useState(false)

    async function install() {
        setInstalling(true);
        await downloadGame(props.game.key).then(async () => {
        } )
        setInstalling(false);
        checkInstalled()
	}

    async function checkInstalled() {
        setInstalled(await TymtCore.Launcher.Library.isInstalled(props.game.key))
        setLoading(false)
    }

    useEffect(() => {
        checkInstalled()
    }, [])

    if (loading) {
        return <></>
    } else {
        if (installed) {
            return (<div className="rounded py-2  px-8 text-xl w-fit font-Orbitron  duration-200 flex flex-row items-center h-fit bg-primary/70  hover:bg-primary cursor-pointer hover:ease-in '} select-none ease-in duration-100 -translate-y-6 mx-12"
            onClick={
                () => {
                    props.game.data.component == undefined?
                    TymtCore.Launcher.Launch(props.game.key)
                    :
                    navigate(`/games/${props.game.key}`)
                }
            }
            >Play</div>) 
        } else {
            if (installing) {
                return <div className="rounded py-2  px-8 text-xl w-fit font-Orbitron  duration-200 flex flex-row items-center h-fit bg-primary/70  hover:bg-primary cursor-pointer hover:ease-in '} select-none ease-in duration-100 -translate-y-6 mx-12">Installing...</div>
            } else {
                return <div className="rounded py-2  px-8 text-xl w-fit font-Orbitron  duration-200 flex flex-row items-center h-fit bg-primary/70  hover:bg-primary cursor-pointer hover:ease-in '} select-none ease-in duration-100 -translate-y-6 mx-12" onClick={install}>Install</div>
            }
        }
    }
        
    }

export const GamePage = () => {
    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
            <div className="text-sm text-gray-300 py-2"><a href="#">Catalog</a> {">"} District 53</div>
            <div className="text-4xl pb-6 font-bold">District 53</div>
                  <div className="grid grid-cols-6 ">
                    <div className="col-span-4">
                    <div className="h-96">
                  <Slider/>
                  </div>
                  <div className="rounded bg-gray-800/30 hover:bg-gray-800/50 ease-in duration-150 select-none cursor-pointer my-3 px-4 py-2">
                    <div className="py-2 text-2xl">About the game</div>
                    <div className="text-sm py-3">
                    Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then 
                    </div>
                  </div>
                    </div>
                    <div className="col-span-2">
                        <div className="text-2xl text-center">
                            <div className="rounded bg-gray-800 px-16 py-4 mx-8">
                            <img src="https://district53.io/d53logo.png" alt="" />
                            </div>
                            <PlayButton game={{key:"flightgear", data:Games["flightgear"]}}/>
                            <div className="text-sm px-8 py-4 text-justify">
                            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. 
                            </div>
                        </div>
                    </div>
                  </div>
        </div>
    );
}
