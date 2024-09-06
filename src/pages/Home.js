import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    // Update the post list after deletion
    setPostList(postLists.filter(post => post.id !== id));
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);

  return (
    <div className="homePage">
      {postLists.map((post) => {
        const { title, postText, author } = post;
        return (
          <div className="post" key={post.id}>
            <div className="postHeader">
              <div className="title">
                <h1> {title}</h1>
              </div>
              <div className="deletePost">
                {isAuth && author?.id === auth.currentUser?.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    {" "}
                    &#128465;
                  </button>
                )}
              </div>
            </div>
            <div className="postTextContainer"> {postText} </div>
            <h3>@{author?.name}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
