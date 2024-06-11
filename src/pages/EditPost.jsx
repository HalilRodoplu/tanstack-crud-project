import React from 'react';
import PostForm from "../components/PostForm.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchPost, updatePost} from "../api/posts.jsx";

const EditPost = () => {


    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {id} = useParams();

    const {isLoading, isError, data: post, error} = useQuery({
        queryKey: ["posts", id],
        queryFn: () => fetchPost(id)
    })

    const updatePostMutation = useMutation({
        mutationFn: updatePost,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["posts"]})
            navigate("/")
        }
    })

    console.log("post----", post)

    if (isLoading) return "loading..."
    if (isError) return `error: ${error.message}`

    const handleSubmit = (updatedPost) => {
        updatePostMutation.mutate({id, ...updatedPost})
    }

    return (
        <div>
            <PostForm initialValues={post} onSubmit={handleSubmit} />
        </div>
    );
};

export default EditPost;