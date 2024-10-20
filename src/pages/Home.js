// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { handleerror, handleSuccess } from '../utills';
// import { useLocation } from 'react-router-dom';
// import { AuthContext } from '../AuthContext';
// import  { useContext } from 'react';

// function Home() {
//   const { email } = useContext(AuthContext);

//   const navigate = useNavigate();
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [products, setProducts] = useState([]);
//   const location = useLocation();
//   // const email = location.state?.email; 
//   const handleAddPostClick = () => {
//     // Navigate to the "Add Post" page
//     navigate('/addpost');
//   };
//   const handleAllPost = () => {
//     // Navigate to the "Add Post" page
//     navigate('/allpost', { state: { email: email } });
//   };
//   useEffect(() => {
//     setLoggedInUser(localStorage.getItem('loggedInUser'));

//     fetchProducts();
//   }, []);


//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('loggedInUser');
//     handleSuccess('User Logged out');
//     setTimeout(() => {
//       navigate('/login ');
//     }, 1000);
//   };

//   const fetchProducts = async () => {
//     try {
//       const url = 'http://localhost:8080/products';
//       const headers = {
//         headers: {
//           'Authorization': localStorage.getItem('token'),
//         },
//       };
//       const response = await fetch(url, headers);
//       const result = await response.json();
//       console.log(result);
//       setProducts(result);
//     } catch (error) {
//       handleerror(error);
//     }
//   };

//   console.log(email)

//   return (
//     // <div className='bg-gray-300 min-w-full h-screen flex items-center flex-col justify-center p-3' >
//     //   <div className='bg-blue-500 max-w-full rounded-md shadow-md'>
//     //   <h1 className='p-4'>{loggedInUser}</h1>
//     //   <button className='bg-red-500 px-3 rounded-lg w-lg py-1 text-white' onClick={handleLogout}>Logout</button>
//     //   <div className='py-4 px-2 rounded-lg bg-gray-600 text-white m-4'>
//     //     {products.length > 0 ? (
//     //       products.map((item, index) => (
//     //         <ul key={index}>
//     //           <span>{item.name}: {item.price}</span>
//     //         </ul>
//     //       ))
//     //     ) : (
//     //       <p>No products available.</p>
//     //     )}
//     //   </div>
      
//     //   </div>
//     //   <div>
//     //   {/* <button onClick={handleAddPostClick}>Add Post</button> */}
//     //   </div>

    
//     // <div>
//     //   <button onClick={handleAllPost}>All Posts</button>
//     // </div>
//     // </div>
//     <>
//     </>
//   );
// }

// export default Home;



import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleerror, handleSuccess } from '../utills';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { useContext } from 'react';

function Home() {
  const { email } = useContext(AuthContext);
  const { postCount } = useContext(AuthContext)
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [products, setProducts] = useState([]);
  const location = useLocation();

  const handleAddPostClick = () => {
    navigate('/addpost');
  };

  const handleAllPost = () => {
    navigate('/allpost', { state: { email: email } });
  };

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = 'https://login-logout-backend-3.onrender.com/products';
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token'),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setProducts(result);
    } catch (error) {
      handleerror(error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-700 min-h-screen flex items-center justify-center p-6">
      {/* Main content container */}
      <div className="bg-gradient-to-r from-slate-300 to-slate-500 shadow-lg rounded-lg w-full max-w-3xl p-7">
        
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600">Welcome, {loggedInUser}</h1>
          <p className="text-black mt-2">Manage your tasks efficiently</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={handleAddPostClick}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add Post
          </button>
          <button
            onClick={handleAllPost}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            View All Posts
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>

        {/* Product List Section */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Number Of TODO</h2>
          <div className="space-y-4">
           <h1>{postCount}</h1>
           <h1>{email}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
