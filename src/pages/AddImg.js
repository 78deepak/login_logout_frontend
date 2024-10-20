import React, { useState, useEffect } from 'react';

function AddImg() {
  const [image, setImage] = useState("");

  // Function to convert the selected image to base64
  function convertoBase64(e) {
    const file = e.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result;
        setImage(base64String);  // Set the base64 string as image state
      };
      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    }
  }

  // Use the useEffect hook to log the image state whenever it changes
  useEffect(() => {
    console.log(image);
  }, [image]);

  // Function to upload the image to the server
  function uploadImage() {
    if (!image) {
      console.error("No image selected");
      return;
    }
  
    const file = new File([image], 'image.jpg', { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append('image', file);
    console.log(formData)
  
    fetch("https://login-logout-backend-3.onrender.com/upload-img", {
      method: 'POST',
      body: formData,
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("Image uploaded successfully:", data);
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
    });
  }

  return (
    <div>
      <div>
        <h3>Let's upload an image</h3>
        <input
          type="file"
          accept="image/*"
          onChange={convertoBase64}  // Trigger the conversion on file selection
        />
      </div>
      {image && (
        <div>
          <img width={100} height={100} src={image} alt="Selected Preview" />
        </div>
      )}
      <button onClick={uploadImage}>Upload</button>
    </div>
  );
}

export default AddImg;