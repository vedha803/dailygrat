import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function CreatePost({ isAuth }) {
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");

    const postsCollectionRef = collection(db, "posts");
    let navigate = useNavigate();

    const createPost = async () => {
        await addDoc(postsCollectionRef, { 
            title, 
            postText, 
            author: { 
                name: auth.currentUser.displayName, 
                id: auth.currentUser.uid 
            } 
        });
        navigate("/home");
    };

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, [isAuth, navigate]);

    return (
        <div className="createPostPage">
            <div className="cpContainer">
                <h1>Create Post</h1>
                <div className="inputGp">
                    <label>Date:</label>
                    <input
                        placeholder="Date..."
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                    />
                </div>
                <div className="inputGp">
                    <label>Post:</label>
                    <textarea
                        placeholder="Post..."
                        onChange={(event) => {
                            setPostText(event.target.value);
                        }}
                    />
                </div>
                <button onClick={createPost}>Submit Post</button>
            </div>
        </div>
    );
}

export default CreatePost;
