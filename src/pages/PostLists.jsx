import React from 'react';
import AddPost from "../components/AddPost.jsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deletePost, fetchPosts} from "../api/posts.jsx";
import {useNavigate} from "react-router-dom";

const PostLists = () => {

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const {isLoading, isError, data: posts, error} = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts
    })

    const deletePostMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["posts"]})
        }
    })

    const handleDelete = (id) => {
        deletePostMutation.mutate(id)
    }

    if (isLoading) return "loading..."
    if (isError) return `error: ${error.message}`


    return (
        <div>
            Post lists
            <AddPost/>
            {posts.map(post => (
                <div key={post.title} style={{backgroundColor: "#777"}}>
                    <h4 style={{cursor: "pointer"}} onClick={() => navigate(`post/${post.id}`)}>{post.title}</h4>
                    <p>{post.body}</p>
                    <button onClick={() => navigate(`post/${post.id}/edit`)}>Edit</button>
                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default PostLists;