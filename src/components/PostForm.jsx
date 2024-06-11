import React, {useState} from 'react';

const PostForm = ({onSubmit, initialValues}) => {


    const [post, setPost] = useState({
        title: initialValues.title || "",
        body: initialValues.body || ""
    });


    const handleChangeInput = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }

    const renderField = (label) => (
        <div>
            <label htmlFor={label}>{label}</label>
            <input onChange={handleChangeInput} type="text" name={label.toLowerCase()} value={post[label.toLowerCase()]}/>
        </div>
    )

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(post);
        setPost({
            title: "",
            body: ""
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            {renderField("Title")}
            {renderField("Body")}
            <button type="submit">Submit</button>
        </form>
    );
};

export default PostForm;