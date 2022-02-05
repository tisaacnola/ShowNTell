import React, { useEffect, useRef, useState } from "react";
import Peer from 'peerjs';

const VideoChat = ({ peerId, user }) => {

  const remoteRef = useRef(null);
  const userRef = useRef(null);
  const peer = useRef(null);
  useEffect(() => {
  console.log(user, 10);
 peer.current = new Peer(user.id, {
   host:location.hostname,
   debug: 1,
   path: '/ShowNTell'
 })
  
  peer.current.on('call', function(call) {
    const answer = confirm('Do you want to answer?');
    if(answer){
      var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      console.log(call, 21);
    getUserMedia({video: true}, function(stream) {
      console.log(stream);
    call.answer(stream); // Answer the call with an A/V stream.
      userRef.current.srcObject = stream;
      userRef.current.autoplay = true;
    call.on('stream', function(remoteStream) {
  // Show stream in some video/canvas element.
      console.log(remoteStream, 24);
      remoteRef.current.srcObject = remoteStream
      remoteRef.current.autoplay = true;
  });
  }, function(err) {
  console.log('Failed to get local stream' ,err);
  });
      
    }
    

})
  

  
  }, [])

  window.peer = peer.current;

 
  



//  const answer = () => {
//    console.log(peer.current)
//   peer.current.on('on', function(call) {
//   var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
//     console.log(call, 21);
//   getUserMedia({video: true}, function(stream) {
//     console.log(stream);
//   call.answer(stream); // Answer the call with an A/V stream.
//     userRef.current.srcObject = stream;
//     userRef.current.play();
//   call.on('stream', function(remoteStream) {
// // Show stream in some video/canvas element.
//     remoteRef.current.srcObject = remoteStream
//     remoteRef.current.play()
// });
// }, function(err) {
// console.log('Failed to get local stream' ,err);
// });
// })
   

//  }

 
    
   
  


  
 const call = () => {
  var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  getUserMedia({video: true}, function(stream) {
    
    var call = peer.current.call(peerId, stream);
    userRef.current.srcObject = stream;
    userRef.current.autoplay = true;
    call.on('stream', function(remoteStream) {
      // Show stream in some video/canvas element.
      console.log(remoteStream, 92);
      remoteRef.current.srcObject = remoteStream
      remoteRef.current.autoplay = true;
    });
  }, function(err) {
    console.log('Failed to get local stream' ,err);
  });
 }
  



  return (
    <div>
       <header>
        <button id="videoCall" text-align="align-right" onClick={call} >VideoCall</button>
      </header> 
      <header>
        <button id="answer" text-align="align-right"  >Answer</button>
      </header> 
      <div>
        <video id ='user' ref={userRef}>user</video>
      </div>
      <div>
        <video id = 'remote'ref={remoteRef}>remote</video>
      </div>

    </div>
     
    
  )
  
}

export default VideoChat;