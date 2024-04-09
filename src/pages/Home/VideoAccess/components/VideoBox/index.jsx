import React, { useImperativeHandle, forwardRef, useState, useEffect } from 'react'
import Player from 'xgplayer'
//import Xgplayer from 'xgplayer-react';
import FlvPlayer from 'xgplayer-flv';
import HlsPlayer from 'xgplayer-hls';
import "xgplayer/dist/index.min.css"
import './index.scss'

/**
 * @url string
 * @type FLV|HLS
 * */

function VideoBox({ url, type }, ref) {
    //这是暴露出去的方法
    useImperativeHandle(ref, () => ({
        destroyPlay
    }))
    //播放器对象
    const [player, setPlayer] = useState(null);
    const [config, setConfig] = useState(null);
    useEffect(() => {
        //先tm销毁一遍
        destroyPlay()
        let p = null;
        switch (type) {
            case 'FLV':
                if (FlvPlayer.isSupported()) {
                    p = new Player({
                        isLive: true,
                        width: '100%',
                        height: '100%',
                        autoplay: true,
                        playsinline: true,
                        lang: 'zh-cn',
                        url: url.httpFlv,
                        id: 'mse',
                        plugins: [FlvPlayer]
                    })
                }
                break;
            case 'HLS':
                if (HlsPlayer.isSupported()) {
                    p = new Player({
                        isLive: true,
                        width: '100%',
                        height: '100%',
                        autoplay: true,
                        playsinline: true,
                        lang: 'zh-cn',
                        url: url.hls,
                        id: 'mse',
                        plugins: [HlsPlayer]
                    })
                }
                break;
            default:
                break;
        }
        setPlayer(p)
    }, [url, type])


    //销毁播放器
    const destroyPlay = () => {
        if (player) {
            player.destroy();
            setPlayer(null);
        }
    }

    return (
        <div id='EasyPlayerBox'>
            <div id='mse'>{ }</div>
            {/* <Xgplayer
                config={config}
                playerInit={(player) => { setPlayer(player); console.log(player) }}
                readyHandle={() => { readyHandle(); }}
                completeHandle={() => { completeHandle(); }}
                destroyHandle={() => { destroyHandle(); }}

            ></Xgplayer> */}
        </div>
    )
}
export default forwardRef(VideoBox)