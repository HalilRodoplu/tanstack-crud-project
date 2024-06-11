import React from 'react';
import PostForm from "./PostForm.jsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createPost} from "../api/posts.jsx";
import {v4 as uuidv4} from "uuid";

const AddPost = () => {

    const queryClient =useQueryClient();

    const createPostMutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["posts"]})
        }
    })

    const handleAddPost = (post) => {
        createPostMutation.mutate({
            id: uuidv4(),
            ...post
        })
    }

    return (
        <div>
            <h2>Add new post</h2>
            <PostForm onSubmit={handleAddPost} initialValues={{}}/>
        </div>
    );
};

export default AddPost;