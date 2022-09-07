import { useEffect, useRef, useState } from "react";

export default function AudioControls({ url }) {
    const [showAudioPlayer, setShowAudioPlayer] = useState(false);

    const audioRef = useRef();

    useEffect(() => {
        if (url) {
            setShowAudioPlayer(true);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.load();
                audioRef.current.play();
            }
        } 
    }, [url, audioRef]);

    return (
        showAudioPlayer && (
            <audio
                ref={audioRef}
                controls="controls"
                autoPlay
                style={{
                    position: "fixed",
                    top: "85%",
                    left: 0,
                    right: 0,
                    margin: "4% auto",
                    zIndex: 9999,
                }}
            >
                <source src={url} type="audio/mpeg" />
            </audio>
        )
    );
}
