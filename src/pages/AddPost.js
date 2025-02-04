

// import React, { useContext, useState } from 'react';
// import { handleSuccess, handleerror } from '../utills'; // Corrected import path
// import { useLocation } from 'react-router-dom';
// import { AuthContext } from '../AuthContext';
// import { FadeLoader } from 'react-spinners';
// import { useNavigate } from 'react-router-dom';


// import axios from 'axios';

// function AddPost() {
//     const location = useLocation();
//     const navigate = useNavigate(); 
//     const { email } = useContext(AuthContext);
//     const [loading, setLoading] = useState(false);
//     const [formValues, setFormValues] = useState({
//         name: '',
//         note: '',
//         image: null, // To hold the selected image file
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormValues(prevValues => ({ ...prevValues, [name]: value }));
//     };

//     const handleImageChange = (e) => {
//         setFormValues(prevValues => ({
//             ...prevValues,
//             image: e.target.files[0], // Update image in state
//         }));
//     };

//     const uploadImageToCloudinary = async (file) => {
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('upload_preset', 'mytodo'); // Replace with your Cloudinary upload preset
//         formData.append('folder', `user_${email}`); // Upload to a folder specific to the user

//         try {
//             const response = await axios.post('https://api.cloudinary.com/v1_1/dzipucmjc/image/upload', formData);
//             return response.data.secure_url; // Return the image URL

//         } catch (error) {
//             console.error('Error uploading image:', error);
//             throw new Error('Failed to upload image.');
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const { name, note, image } = formValues;

//         if (!name || !note) {
//             return handleerror('All fields are required, including the image.');
//         }

//         setLoading(true);  // Set loading true before starting the process

//         try {
//             let uploadedImageUrl = null;
//             // If an image is selected, upload it to Cloudinary
//             if (image) {
//                 uploadedImageUrl = await uploadImageToCloudinary(image);
//             }
//             // Upload the image to Cloudinary and get the image URL
//             // const uploadedImageUrl = await uploadImageToCloudinary(image);

//             // After successfully uploading the image, include the URL in your request body
//             const response = await fetch('https://login-logout-backend-3.onrender.com/addPost', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     name,
//                     note,
//                     email,
//                     imageUrl: uploadedImageUrl, // Send image URL to the server
//                 }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 console.log('Success:', data.message);
//                 handleSuccess("Data added successfully.");
//                 // Optionally, reset form after successful submission
//                 setFormValues({
//                     name: '',
//                     note: '',
//                     image: null,
//                 });
//                 // Optionally, reset the file input value
//                 document.getElementById('image').value = null;
//                 navigate('/allpost');
//             }
      
//             else {
//                 console.log('Error:', data.error);
//                 handleerror(data.error);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             handleerror('An unexpected error occurred.');
//         } finally {
//             setLoading(false);  // Stop loading once the process is done
//         }
//     };

//     return (
//         <div className='container bg-gray-300 min-w-full h-screen flex items-center justify-center'>
//             <form onSubmit={handleSubmit} className="bg-gray-600 p-8 shadow-md w-full max-w-sm rounded-md">
//                 <div>
//                     <label className="block text-sm font-medium text-white mb-1" htmlFor="name">Your Name </label>
//                     <input
//                         className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400'
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={formValues.name}
//                         onChange={handleChange}
//                         placeholder='Enter your name'
//                         required
//                     />
//                 </div>
//                 <div className='py-4'>
//                     <label className="block text-sm font-medium text-white mb-1" htmlFor="note">Your Note</label>
//                     <textarea
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
//                         name="note"
//                         id="note"
//                         value={formValues.note}
//                         onChange={handleChange}
//                         placeholder='Enter your note'
//                         required
//                         rows="4"
//                     />
//                 </div>
//                 <div className='py-4'>
//                     <label className="block text-sm font-medium text-white mb-1" htmlFor="image">Upload Image</label>
//                     <input
//                         className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400'
//                         type="file"
//                         id="image"
//                         name="image"
//                         accept="image/*" // Optional: Restrict to image files
//                         onChange={handleImageChange}
//                     // required
//                     />
//                 </div>
//                 <div>
//                     <button
//                         className={`w-full bg-red-500 text-white py-2 rounded-md transition duration-300 transform shadow-md ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-red-600 hover:shadow-lg'}`}
//                         type="submit"
//                         disabled={loading}
//                     >
//                         {/* {loading ? <FadeLoader size={20} color="#fff" /> : 'Submit'} */}
//                         {loading ? (
//                             <div className="flex justify-center items-center">
//                                 <FadeLoader size={15} color="#fff" className="mr-2" />
//                                 <span className="text-white">Loading...</span>
//                             </div>
//                         ) : (
//                             'Add Post'
//                         )}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default AddPost;





import React, { useContext, useState } from 'react';
import { handleSuccess, handleerror } from '../utills'; // Corrected import path
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { FadeLoader } from 'react-spinners';
import axios from 'axios';

function AddPost() {
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0); // State to track upload progress
    const [formValues, setFormValues] = useState({
        name: '',
        note: '',
        image: null, // To hold the selected image file
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevValues => ({ ...prevValues, [name]: value }));
    };

    const handleImageChange = (e) => {
        setFormValues(prevValues => ({
            ...prevValues,
            image: e.target.files[0], // Update image in state
        }));
    };

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'mytodo'); // Replace with your Cloudinary upload preset
        formData.append('folder', `user_${email}`); // Upload to a folder specific to the user

        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/dzipucmjc/image/upload',
                formData,
                {
                    onUploadProgress: (progressEvent) => {
                        const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setProgress(percentage); // Update progress state
                    },
                }
            );
            setProgress(0); // Reset progress after upload
            return response.data.secure_url; // Return the image URL
        } catch (error) {
            console.error('Error uploading image:', error);
            setProgress(0); // Reset progress on error
            throw new Error('Failed to upload image.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, note, image } = formValues;

        if (!name || !note) {
            return handleerror('All fields are required.');
        }

        setLoading(true);

        try {
            let uploadedImageUrl = null;
            if (image) {
                uploadedImageUrl = await uploadImageToCloudinary(image);
            }
       // const response = await fetch('https://login-logout-backend-3.onrender.com/addPost', {
            const response = await fetch('https://login-logout-backend-3.onrender.com/addPost', {
     
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    note,
                    email,
                    imageUrl: uploadedImageUrl,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                handleSuccess("Data added successfully.");
                setFormValues({ name: '', note: '', image: null });
                navigate('/allpost');
            } else {
                handleerror(data.error);
            }
        } catch (error) {
            handleerror('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container bg-gray-300 min-w-full h-screen flex items-center justify-center'>
            <form onSubmit={handleSubmit} className="bg-gray-600 p-8 shadow-md w-full max-w-sm rounded-md">
                <div>
                    <label className="block text-sm font-medium text-white mb-1" htmlFor="name">Your Name</label>
                    <input
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400'
                        type="text"
                        id="name"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                        placeholder='Enter your name'
                        required
                    />
                </div>
                <div className='py-4'>
                    <label className="block text-sm font-medium text-white mb-1" htmlFor="note">Your Note</label>
                    <textarea
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                        name="note"
                        id="note"
                        value={formValues.note}
                        onChange={handleChange}
                        placeholder='Enter your note'
                        required
                        rows="4"
                    />
                </div>
                <div className='py-4'>
                    <label className="block text-sm font-medium text-white mb-1" htmlFor="image">Upload Image</label>
                    <input
                        className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400'
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                {progress > 0 && (
                    <div className="my-4">
                        <div className="w-full bg-gray-200 rounded-full">
                            <div
                                className="bg-green-500 text-xs leading-none py-1 text-center text-white rounded-full"
                                style={{ width: `${progress}%` }}
                            >
                                {progress}%
                            </div>
                        </div>
                    </div>
                )}
                <div>
                    <button
                        className={`w-full bg-red-500 text-white py-2 rounded-md transition duration-300 transform shadow-md ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-red-600 hover:shadow-lg'}`}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <FadeLoader size={15} color="#fff" className="mr-2" />
                                <span className="text-white">Loading...</span>
                            </div>
                        ) : (
                            'Add Post'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddPost;
