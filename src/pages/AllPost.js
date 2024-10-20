// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import { useContext } from 'react';
// import { AuthContext } from '../AuthContext';
// const AllPost = () => {
//   const [posts, setPosts] = useState([]); // State to hold posts
//   const [loading, setLoading] = useState(true); // State to handle loading
//   const [error, setError] = useState(null); // State to handle errors
//   const location = useLocation();
//   // const userEmail = location.state?.email; 
//   const { email } = useContext(AuthContext);
//   useEffect(() => {
//     // Fetch data from the backend when the component mounts
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/Allpost?email=${email}`); // API call
//         setPosts(response.data); // Set the data into the state
//       } catch (err) {
//         setError(err); // Set error if there's an issue with the request
//       } finally {
//         setLoading(false); // Stop loading after the request completes
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array means this effect runs once when the component mounts

//   if (loading) {
//     return <div className="text-center text-blue-600 font-bold">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-red-600 text-center">Error: {error.message}</div>;
//   }

//   return (
//     <div className="p-4 bg-gray-600 min-h-screen">
//   <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">All Posts</h1>
//   <ul className="space-y-4">
//     {posts.map((post) => (
//       <li key={post._id} className="bg-gray-200 shadow-md rounded-lg p-6">
//         {/* Flexbox layout */}
//         <div className="flex items-center">
//           {/* Image on the left */}
//           <img
//             src={post.imageUrl}
//             alt=""
//             width={90}
//             height={90}
//             className="object-cover rounded-md shadow-black shadow-md mr-8"
//           />

//           {/* Text content, centered vertically */}
//           <div className="flex-grow flex flex-col justify-center">
//             <h2 className="text-xl font-semibold text-gray-900 text-center">{post.name}</h2>
//             <p className="text-gray-900 text-center"><strong>Email: </strong>{post.email}</p>
//             <p className="text-gray-900 mt-2 text-center">{post.note}</p>
//           </div>
//         </div>
//       </li>
//     ))}
//   </ul>
// </div>


//   );
// };

// export default AllPost;







// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
// import { useContext } from 'react';
// import { AuthContext } from '../AuthContext';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// const AllPost = () => {
//   const [posts, setPosts] = useState([]); // State to hold posts
//   const [loading, setLoading] = useState(true); // State to handle loading
//   const [error, setError] = useState(null); // State to handle errors

//   const { email, postCount, updatePostCount } = useContext(AuthContext); // Get email and postCount from context

//   useEffect(() => {
//     // Fetch data from the backend when the component mounts
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/Allpost?email=${email}`); // API call
//         setPosts(response.data.posts); // Set the posts data into the state
//         updatePostCount(response.data.postCount); // Set the count of posts into AuthContext and localStorage
//       } catch (err) {
//         setError(err); // Set error if there's an issue with the request
//       } finally {
//         setLoading(false); // Stop loading after the request completes
//       }
//     };

//     fetchData();
//   }, [email]);

//   // Handle delete post
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8080/addPost/${id}`);
//       setPosts(posts.filter((post) => post._id !== id)); // Remove the post from the state
//       updatePostCount(postCount - 1); // Decrement the post count and update AuthContext and localStorage
//     } catch (err) {
//       setError(err); // Handle error
//     }
//   };

//   // Handle edit post
//   const handleEdit = (id) => {
//     console.log(`Edit post with id: ${id}`);
//   };

//   if (loading) {
//     return <div className="text-center text-blue-600 font-bold">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-red-600 text-center">Error: {error.message}</div>;
//   }

//   return (
//     <div className="p-4 bg-gray-600 min-h-screen">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">All Posts</h1>
//       {/* Display the total number of posts from the context */}
//       <div className="text-center text-lg text-gray-800 mb-4">
//         Total Posts: {postCount}
//       </div>

//       <ul className="space-y-4">
//         {posts.map((post) => (
//           <li key={post._id} className="bg-gray-200 shadow-md rounded-lg p-6">
//             <div className="flex items-center justify-between">
//               {/* Left Section - Image and Text */}
//               <div className="flex items-center">
//                 <img
//                   src={post.imageUrl}
//                   alt=""
//                   width={90}
//                   height={90}
//                   className="object-cover rounded-md shadow-black shadow-md mr-8"
//                 />
//                 <div className="flex-grow flex flex-col justify-center">
//                   <h2 className="text-xl font-semibold text-gray-900 text-center">{post.name}</h2>
//                   <p className="text-gray-900 text-center"><strong>Email: </strong>{post.email}</p>
//                   <p className="text-gray-900 mt-2 text-center">{post.note}</p>
//                 </div>
//               </div>

//               {/* Right Section - Edit and Delete Icons */}
//               <div className="flex items-center space-x-4">
//                 <button onClick={() => handleEdit(post._id)} className="text-blue-600">
//                   <FontAwesomeIcon icon={faEdit} size="lg" />
//                 </button>
//                 <button onClick={() => handleDelete(post._id)} className="text-red-600">
//                   <FontAwesomeIcon icon={faTrash} size="lg" />
//                 </button>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AllPost;







import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

const AllPost = () => {
  const [posts, setPosts] = useState([]); // State to hold posts
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [editingPostId, setEditingPostId] = useState(null); // Track the currently editing post ID
  const [editFormData, setEditFormData] = useState({
    name: '',
    imageUrl: '',
    note: ''
  }); // State to hold form data for editing

  const { email, postCount, updatePostCount } = useContext(AuthContext); // Get email and postCount from context

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://login-logout-backend-3.onrender.com/Allpost?email=${email}`); // API call
        setPosts(response.data.posts); // Set the posts data into the state
        updatePostCount(response.data.postCount); // Set the count of posts into AuthContext and localStorage
      } catch (err) {
        setError(err); // Set error if there's an issue with the request
      } finally {
        setLoading(false); // Stop loading after the request completes
      }
    };

    fetchData();
  }, [email]);

  // Handle delete post
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://login-logout-backend-3.onrender.com/addPost/${id}`);
      setPosts(posts.filter((post) => post._id !== id)); // Remove the post from the state
      updatePostCount(postCount - 1); // Decrement the post count and update AuthContext and localStorage
    } catch (err) {
      setError(err); // Handle error
    }
  };

  // Handle edit post
  const handleEdit = (post) => {
    setEditingPostId(post._id); // Set the post ID to be edited
    setEditFormData({
      name: post.name,
      imageUrl: post.imageUrl,
      note: post.note
    }); // Pre-fill the form with existing post data
  };

  // Handle form changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save (submit) the edited post
  const handleSave = async () => {
    try {
      await axios.put(`https://login-logout-backend-3.onrender.com/addPost/${editingPostId}`, editFormData); // Update the post on the backend
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === editingPostId ? { ...post, ...editFormData } : post
        )
      ); // Update the posts state
      setEditingPostId(null); // Exit editing mode
    } catch (err) {
      setError(err); // Handle error
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingPostId(null); // Exit editing mode without saving
  };

  if (loading) {
    return <div className="text-center text-blue-600 font-bold">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center">Error: {error.message}</div>;
  }

  return (
    <div className="p-4 bg-gray-600 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">All Posts</h1>
      <div className="text-center text-lg text-gray-800 mb-4">Total Posts: {postCount}</div>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post._id} className="bg-gray-200 shadow-md rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={post.imageUrl}
                  alt=""
                  width={90}
                  height={90}
                  className="object-cover rounded-md shadow-black shadow-md mr-8"
                />
                {editingPostId === post._id ? (
                  <div className="flex-grow flex flex-col justify-center space-y-4 p-4 bg-white rounded-md shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                    {/* Edit form */}
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleFormChange}
                      className="text-xl font-semibold text-gray-900 bg-gray-100 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 py-2 px-4 rounded-md transition-all duration-300 ease-in-out"
                      placeholder="Edit Name"
                    />
                    <input
                      type="text"
                      name="imageUrl"
                      value={editFormData.imageUrl}
                      onChange={handleFormChange}
                      className="text-gray-900 bg-gray-100 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 py-2 px-4 rounded-md transition-all duration-300 ease-in-out"
                      placeholder="Image URL"
                    />
                    <textarea
                      name="note"
                      value={editFormData.note}
                      onChange={handleFormChange}
                      className="text-gray-900 bg-gray-100 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 py-2 px-4 rounded-md transition-all duration-300 ease-in-out resize-none"
                      placeholder="Add a note"
                    />
                  </div>
                ) : (
                  <div className="flex-grow flex flex-col justify-center">
                    <h2 className="text-xl font-semibold text-gray-900 text-center">{post.name}</h2>
                    <p className="text-gray-900 text-center sm:block hidden"><strong>Email: </strong>{post.email}</p>
                    <p className="text-gray-900 mt-2 text-center">{post.note}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4 flex-wrap justify-end mt-2 sm:mt-0">
                {editingPostId === post._id ? (
                  <>
                    <button onClick={handleSave} className="text-green-600">
                      <FontAwesomeIcon icon={faSave} size="lg" />
                    </button>
                    <button onClick={handleCancel} className="text-red-600">
                      <FontAwesomeIcon icon={faTimes} size="lg" />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(post)} className="text-blue-600">
                      <FontAwesomeIcon icon={faEdit} size="lg" />
                    </button>
                    <button onClick={() => handleDelete(post._id)} className="text-red-600">
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllPost;
