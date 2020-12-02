// /* eslint-disable no-console */
// /* eslint-disable no-unused-vars */
// /* eslint-disable consistent-return */
// /* eslint-disable react/prop-types */
// /* eslint-disable react/button-has-type */
// import React, { useState } from 'react';
// import axios from 'axios';

// const Notifs = ({ user, setUser }) => {
//   const [number, setNumber] = useState();
//   return (
//     <div>
//       {
//       !user.phone ? (
//         <div>
//           <h1>enter number to received notifs</h1>
//           <input onChange={(e) => setNumber(e.target.value)} />
//           <button onClick={() => axios.post('/number', { number })
//             .then(() => axios.get('/user'))
//             .then((result) => {
//               setUser(result.data);
//               const body = 'Welcome to Show&Tell! Congrats on your first notification';
//               axios.get(`/notifs/${body}/null`);
//             })}
//           >
//             add number
//           </button>
//         </div>
//       ) : (
//         <div>
//           <h1>Notifs page</h1>
//           <button onClick={() => axios.post('/number', { number: null })
//             .then(() => axios.get('/user'))
//             .then((result) => setUser(result.data))}
//           >
//             change number
//           </button>
//           <div>
//             {
//               user.notifs.map((text, i) => (<h2 key={text + i}>{text}</h2>))
//             }
//           </div>
//         </div>
//       )
//     }
//     </div>
//   );
// };

// export default Notifs;
