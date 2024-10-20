// // src/AuthContext.js
// import React, { createContext, useState  , useEffect} from 'react';

// // Create the context
// export const AuthContext = createContext();

// // Create a provider component
// export const AuthProvider = ({ children }) => {
//   const [email, setEmail] = useState(null);
//   const [count , setCount] = useState(0);

//   useEffect(() => {
//     // Retrieve email from localStorage when the app initializes
//     const storedEmail = localStorage.getItem('email');
//     const storeCount = localStorage.getItem('count');
//     setCount(storeCount);

//     console.log(storedEmail)
//     console.log(storeCount)
//     if (storedEmail) {
//       setEmail(storedEmail);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ email, setEmail,count, setCount }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };









// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState(null);
  const [postCount, setPostCount] = useState(localStorage.getItem('count') || 0);

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      setEmail(savedEmail);
    }

    const savedCount = localStorage.getItem('count');
    if (savedCount) {
      setPostCount(parseInt(savedCount));
    }
  }, []);

  const updatePostCount = (count) => {
    setPostCount(count);
    localStorage.setItem('count', count);
  };

  return (
    <AuthContext.Provider value={{ email, setEmail, postCount, updatePostCount }}>
      {children}
    </AuthContext.Provider>
  );
};
