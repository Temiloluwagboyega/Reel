import React, { useEffect, useState } from "react";
import api from "../../Api";
import profile from "../../assets/team-3.jpg";

function ListPost() {
  const [post, setPost] = useState([]); //
  // Fetch categories from the backend on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/content/post/list/"); // Adjust endpoint as needed
        setPost(response.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
        setError("Failed to load categories.");
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
  <div className="list grid gap-9">
  {post.map((posts) => (
      <div className="post-card bg-white rounded-lg p-6">
        <div className="post-profile flex gap-2">
          <img
            src={profile}
            alt=""
            className="rounded-full w-12 border-2 border-solid border-green-600 "
          />
          <p className="self-center">@{posts.author_name}</p>
        </div>
        <div className="post">
            <>
              <h1 className="font-bold">{posts.title}</h1>
              <h1>{posts.content}</h1>
              <div className="img flex justify-center">
                <img src={posts.file} alt="" className=" w-3/6" />
              </div>
              <div className="reaction flex justify-between">
                <p className="rounded-3xl border-2 border-solid border-green-400 px-12 py-2">
                  Like
                </p>
                <p className="rounded-3xl border-2 border-solid border-green-400 px-12 py-2">
                  Comment
                </p>
              </div>
            </>
        </div>
      </div>
          ))}
  </div>
    </>
  );
}

export default ListPost;
