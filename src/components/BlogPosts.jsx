import React from "react";
import BlogCard from "./BlogCard";
import Button from "./Button";
import { useState } from "react";
import api from "../api/api";
import { useEffect } from "react";

export default function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch Posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex items-center flex-col justify-center gap-12">
      <div className="flex flex-wrap gap-8 items-center justify-center">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
      <Button text="Read All" link="/blog" />
    </div>
  );
}
