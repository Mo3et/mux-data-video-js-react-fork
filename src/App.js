//
// This example assumes you are importing videojs-mux from npm
// View this code on codesandbox: https://codesandbox.io/s/mux-data-video-js-react-pyl1h
//
import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-mux";

export default function VideoPlayer() {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const src = "https://stream.mux.com/yb2L3z3Z4IKQH02HYkf9xPToVYkOC85WA.m3u8";

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      const initTime = Date.now();

      playerRef.current = videojs(video, {
        sources: [{ src, type: "application/x-mpegURL" }],
        plugins: {
          mux: {
            debug: false,
            data: {
              env_key: "ENV_KEY", // required

              // Metadata
              player_name: "", // ex: 'My Main Player'
              player_init_time: initTime // ex: 1451606400000

              // ... and other metadata
            }
          }
        }
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [videoRef]);

  return (
    <video
      controls
      ref={videoRef}
      style={{ width: "100%", maxWidth: "500px" }}
    />
  );
}
