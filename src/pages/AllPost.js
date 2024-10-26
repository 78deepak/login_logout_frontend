import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FadeLoader } from 'react-spinners';

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    imageUrl: '',
    note: ''
  });
  const { email, postCount, updatePostCount } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://login-logout-backend-3.onrender.com/Allpost?email=${email}`);
        setPosts(response.data.posts);
        updatePostCount(response.data.postCount);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  const handleDelete = async (id, imageUrl) => {
    try {
      await axios.delete(`https://login-logout-backend-3.onrender.com/addPost?id=${id}&imageUrl=${imageUrl}`);
      setPosts(posts.filter((post) => post._id !== id));
      updatePostCount(postCount - 1);
    } catch (err) {
      setError(err);
    }
  };

  const handleEdit = (post) => {
    setEditingPostId(post._id);
    setEditFormData({
      name: post.name,
      imageUrl: post.imageUrl,
      note: post.note
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://login-logout-backend-3.onrender.com/addPost/${editingPostId}`, editFormData);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === editingPostId ? { ...post, ...editFormData } : post
        )
      );
      setEditingPostId(null);
    } catch (err) {
      setError(err);
    }
  };

  const handleCancel = () => {
    setEditingPostId(null);
  };

  if (loading) {
    return (
      <div className="text-center text-blue-600 font-bold my-10">
        <FadeLoader color="#fff" size={15} className="mr-2" />
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center">Error: {error.message}</div>;
  }

  return (
    <div className="p-4 bg-gray-600 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">All Posts</h1>
      <div className="text-center text-lg text-gray-800 mb-4">Total Posts: {postCount}</div>
      {posts.length === 0 ? (
        <div className="text-center text-gray-800 font-bold mt-8">No posts available</div>
      ) : (
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
                    <div className="flex-grow flex flex-col justify-center space-y-4 p-4 bg-white rounded-md shadow-lg">
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name}
                        onChange={handleFormChange}
                        className="text-xl font-semibold text-gray-900 bg-gray-100 border-b-2 border-gray-300 py-2 px-4 rounded-md"
                        placeholder="Edit Name"
                      />
                      <input
                        type="text"
                        name="imageUrl"
                        value={editFormData.imageUrl}
                        onChange={handleFormChange}
                        className="text-gray-900 bg-gray-100 border-b-2 border-gray-300 py-2 px-4 rounded-md"
                        placeholder="Image URL"
                      />
                      <textarea
                        name="note"
                        value={editFormData.note}
                        onChange={handleFormChange}
                        className="text-gray-900 bg-gray-100 border-b-2 border-gray-300 py-2 px-4 rounded-md resize-none"
                        placeholder="Add a note"
                      />
                    </div>
                  ) : (
                    <div className="flex-grow flex flex-col justify-center">
                      <h2 className="text-xl font-semibold text-gray-900 text-center">{post.name}</h2>
                      <p className="text-gray-900 text-center sm:block hidden"><strong>Email: </strong>{post.email}</p>
                      <p className="text-gray-900 mt-2 text-center">{post.note}</p>
                      <p className="">{post.imagePublicId}</p>
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
                    <div className="flex space-x-2 sm:space-x-4">
                      <button
                        onClick={() => handleEdit(post)}
                        className="text-blue-600 text-sm sm:text-base p-1 sm:p-2"
                      >
                        <FontAwesomeIcon icon={faEdit} size="lg" />
                      </button>
                      <button
                        onClick={() => handleDelete(post._id, post.imageUrl)}
                        className="text-red-600 text-sm sm:text-base p-1 sm:p-2"
                      >
                        <FontAwesomeIcon icon={faTrash} size="lg" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllPost;
