import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {fetchPost} from "../api/posts.jsx";
import {useNavigate, useParams} from "react-router-dom";

const Post = () => {

    const navigate = useNavigate();

    const {id} = useParams();

    const {isLoading, isError, data: post, error} = useQuery({
        queryKey: ["posts", id],
        queryFn: () => fetchPost(id)
    })

    if (isLoading) return "loading..."
    if (isError) return `error: ${error.message}`

    return (
        <div>
            <button onClick={() => navigate("/")}>Back to posts list</button>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
        </div>
    );
};

export default Post;