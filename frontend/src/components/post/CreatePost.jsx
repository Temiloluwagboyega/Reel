import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Api"; // Import configured Axios instance

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState(""); // Track selected category
  const [categories, setCategories] = useState([]); // Store categories from backend
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch categories from the backend on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/content/category/"); // Adjust endpoint as needed
        setCategories(response.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
        setError("Failed to load categories.");
      }
    };

    fetchCategories();
  }, []);

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category); // Append category
    if (file) formData.append("file", file);

    try {
      const response = await api.post("/content/post/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        alert("Post created successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data || "An unexpected error occurred.");
    }
  };

  return (
    <div className="create-post">
      <h2>Create Post</h2>
      {error && <p className="error-message">{JSON.stringify(error)}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="form-input"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="form-input"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>File (Optional)</label>
          <input type="file" onChange={handleFileChange} className="form-input" />
        </div>

        <button type="submit" className="submit-button">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
