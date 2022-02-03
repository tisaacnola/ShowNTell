import React, { useEffect, useRef, useState } from "react";
import Peer from 'peerjs';

const VideoChat = ({ peerId }) => {

  const remoteRef = useRef(null);
  const userRef = useRef(null);
  const peerI = useRef(null)
  const peer = new Peer()

  

 
    
//     var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
//         peer.on('call', function(call) {
//         getUserMedia({video: true}, function(stream) {
//         call.answer(stream); // Answer the call with an A/V stream.
//         call.on('stream', function(remoteStream) {
//       // Show stream in some video/canvas element.
//           remoteRef.current.srcObject = remoteStream
//           remoteRef.current.play()
//     });
//   }, function(err) {
//     console.log('Failed to get local stream' ,err);
//   });
// });
  

  
;
  
 const call = () => {
  var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  getUserMedia({video: true}, function(stream) {
    userRef.current.srcObject = stream
    userRef.current.play()
    var call = peer.call(peerId, stream);

    call.on('stream', function(remoteStream) {
      // Show stream in some video/canvas element.
      remoteRef.current.srcObject = remoteStream
      remoteRef.current.play();
    });
  }, function(err) {
    console.log('Failed to get local stream' ,err);
  });
 }
  



  return (
    <div>
       <header>
        <button id="videoCall" text-align="align-right" onClick={call}>VideoCall</button>
      </header> 
      <header>
        <button id="answer" text-align="align-right" >Answer</button>
      </header> 
      <div>
        <video ref={userRef}/>
      </div>
      <div>
        <video ref={remoteRef}/>
      </div>

    </div>
     
    
  )
}

export default VideoChat;