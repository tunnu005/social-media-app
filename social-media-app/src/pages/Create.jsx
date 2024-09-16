import React, { useState } from 'react';

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle post upload logic here (send data to the backend)
    console.log('File:', file);
    console.log('Caption:', caption);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Create a Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Upload a photo or video</label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 
            file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
            file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600
            hover:file:bg-indigo-100"
          />
        </div>

        {/* Display image preview */}
        {file && (
          <div className="mt-4">
            <label className="block text-gray-700 mb-2">Preview</label>
            <div className="w-32 h-32 overflow-hidden rounded-md">
              {file.type.startsWith('image') ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <video className="w-full h-full object-cover" controls>
                  <source src={URL.createObjectURL(file)} />
                </video>
              )}
            </div>
          </div>
        )}

        <div>
          <label className="block text-gray-700 mb-2">Caption</label>
          <textarea
            value={caption}
            onChange={handleCaptionChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Write a caption..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
