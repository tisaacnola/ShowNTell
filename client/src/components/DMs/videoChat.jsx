import React, { useEffect, useRef, useState } from "react";
import Peer from 'peerjs';

const VideoChat = ({ peerId, user }) => {

  const remoteRef = useRef(null);
  const userRef = useRef(null);
  const peer = useRef(null);
  useEffect(() => {
  peer.current = new Peer(user.id, {
   debug: 1,
   path: '/'
 })
  
 console.log(user.id, peerId);
  peer.current.on('call', function(call) {
    const answer = confirm(`${user.name} is calling... Do you want to answer?`);
    if(answer){
      var getUserMedia =
      navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    getUserMedia({video: true, audio: true}, function(stream) {
    call.answer(stream); // Answer the call with an A/V stream.
      userRef.current.srcObject = stream;
      userRef.current.autoplay = true;
    call.on('stream', function(remoteStream) {
  // Show stream in some video/canvas element.
      remoteRef.current.srcObject = remoteStream
      remoteRef.current.autoplay = true;
  })
  }, function(err) {
  console.log('Failed to get local stream' ,err);
  });
      
    }
    

})
  

  
  }, [])
  

  window.peer = peer.current;

const hangUp = () => {
    peer.current.destroy();
    let x = document.getElementsByClassName('video');
    for(let element of x) {
      element.remove();
      element.remove();
    }
   
    
  }
  
 const call = () => {
  var getUserMedia = 
    navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  getUserMedia({video: true}, function(stream) {
    
    var call = peer.current.call(peerId, stream);
    userRef.current.srcObject = stream;
    userRef.current.autoplay = true;
    call.on('stream', function(remoteStream) {
      // Show stream in some video/canvas element.
      remoteRef.current.srcObject = remoteStream
      remoteRef.current.autoplay = true;
    });
  }, function(err) {
    console.log('Failed to get local stream' ,err);
  });
 }
  



  return (
    <div className="video-Grid">
       <header>
        <button id="videoCall" text-align="align-right" onClick={call} >VideoCall</button>
        <button id="hangup" text-align="align-right" onClick={hangUp} >Hang Up</button>
      </header> 
      <div>
        <video  className='video' ref={userRef}>user</video>
      </div>
      <div>
        <video className="video" ref={remoteRef}>remote</video>
      </div>

    </div>
     
    
  )
  
}

export default VideoChat;