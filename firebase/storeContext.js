/** @format */

"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  getDocs,
  orderBy,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "@/firebase/firebase";

import { useAuth } from "@/firebase/authContext";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [post, setPost] = useState("");
  const [todo, setTodo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { authUser } = useAuth();

  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  const handleImageUpload = (e) => {
    setFile(e.target.files[0]);
  };
  const handleVideoUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const addPost = async () => {
    if (!authUser) {
      alert("Please sign in to post a message");
      return;
    }

    if (!post && !file) {
      alert("Please enter a message or select an image");
      return;
    }

    setIsLoading(true);

    try {
      let imageUrl = null;

      if (file) {
        const fileName = `${Date.now()}_${file.name}`;
        const storageRef = ref(storage, `posts/${authUser.uid}/${fileName}`);
        await uploadBytes(storageRef, file);
        imageUrl = await getDownloadURL(storageRef);
      }

      const docRef = await addDoc(collection(db, "post"), {
        content: post,
        userId: authUser.uid,
        imageUrl: imageUrl,
        createdAt: new Date(),
        userName: authUser.userName,
        userImageUrl: authUser.imageUrl,
      });

      console.log("Document written with id", docRef.id);
      setPost("");
      setFile(null);
      handleInputClick();
      getDataFire();
    } catch (error) {
      console.error("Error message:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePost = async (postId) => {
    if (!authUser) {
      alert("You must be signed in to delete a post");
      return;
    }

    try {
      const postRef = doc(db, "post", postId);
      const postSnap = await getDoc(postRef);

      if (!postSnap.exists()) {
        alert("Post not found");
        return;
      }

      if (postSnap.data().userId !== authUser.uid) {
        alert("You can only delete your own post");
        return;
      }

      // Delete the image from storage if it exists
      if (postSnap.data().imageUrl) {
        const imageRef = ref(storage, postSnap.data().imageUrl);
        await deleteObject(imageRef);
      }

      await deleteDoc(postRef);
      console.log("Post deleted successfully");
      getDataFire(); // Refresh the todo list after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    }
  };

  const getDataFire = async () => {
    try {
      const q = query(collection(db, "post"), orderBy("createdAt", "desc"));

      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });

      setTodo(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setTodo([]);
    }
  };

  useEffect(() => {
    getDataFire();
  }, []);

  return (
    <MessageContext.Provider
      value={{
        isOpen,
        handleInputClick,
        file,
        setFile,
        post,
        setPost,
        isLoading,
        setIsLoading,
        handleImageUpload,
        handleVideoUpload,
        addPost,
        todo,
        setTodo,
        deletePost,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);
