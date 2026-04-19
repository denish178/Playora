import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const Player = ({ url }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // Prevent double initialization
    if (!videoRef.current) return;

    if (!playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        fluid: true,
        sources: [
          {
            src: url,
            type: "application/x-mpegURL",
          },
        ],
      });
    } else {
      // Update source if already exists
      playerRef.current.src({
        src: url,
        type: "application/x-mpegURL",
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [url]);

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
};

export default Player;
