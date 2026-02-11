import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import "../styles/videoroom.css";

function VideoRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const startMeeting = async () => {
      // For testing, use these IDs. For production, get your own at zegocloud.com
      const appID = 12345678; 
      const serverSecret = "87654321abcdefg"; 

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID, 
        serverSecret, 
        roomId, 
        Date.now().toString(), 
        "User_" + Math.floor(Math.random() * 100)
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: containerRef.current,
        scenario: { mode: ZegoUIKitPrebuilt.GroupCall },
        showScreenSharingButton: true,
        onLeaveRoom: () => navigate("/dashboard"),
      });
    };

    if (roomId) startMeeting();
  }, [roomId, navigate]);

  return (
    <div className="video-room-wrapper">
      <div className="room-id-badge">Meeting ID: {roomId}</div>
      <div className="video-container" ref={containerRef} />
    </div>
  );
}

export default VideoRoom;