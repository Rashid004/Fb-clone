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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase/firebase";

import { useAuth } from "@/firebase/authContext";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState();
  const [todo, setTodo] = useState([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(false);

  const { authUser } = useAuth();

  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  const handleImageUpload = (e) => {
    setFile(e.target.files[0]);
  };

  // Add Data into the firebase store
  const addMessage = async () => {
    if (!authUser) {
      alert("Please sign in to post a message");
      return;
    }

    if (!message && !file) {
      alert("Please enter a message or select an image");
      return;
    }

    setIsLoading(true);

    try {
      let imageUrl = null;

      if (file) {
        const storageRef = ref(
          storage,
          `posts/${authUser.uid}/${Date.now()}_${file.name}`
        );
        await uploadBytes(storageRef, file);
        imageUrl = await getDownloadURL(storageRef);
      }

      const docRef = await addDoc(collection(db, "message"), {
        content: message,
        owner: authUser.uid,
        userName: authUser.userName,
        userImageUrl: authUser.imageUrl || "/profile.png",
        imageUrl: imageUrl,
        createdAt: new Date(),
      });

      console.log("Document written with id", docRef.id);
      setMessage("");
      setFile(null);
      handleInputClick();
      getDataFire();
    } catch (error) {
      console.error("Error message:", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const deleteMessage = async (messageId) => {
    if (!authUser) {
      alert("You must be signed in to delete a message");
      return;
    }

    try {
      const messageRef = doc(db, "message", messageId);
      const messageSnap = await getDoc(messageRef);

      if (!messageSnap.exists()) {
        alert("Message not found");
        return;
      }

      if (messageSnap.data().owner !== authUser.uid) {
        alert("You can only delete your own messages");
        return;
      }

      await deleteDoc(messageRef);
      console.log("Message deleted successfully");
      getDataFire(); // Refresh the todo list after deletion
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Failed to delete message. Please try again.");
    }
  };
  /*
  // const getDataFire = async (uid) => {
  //   if (!uid) return;

  //   try {
  //     const q = query(collection(db, "message"), where("owner", "==", uid));

  //     const querySnapshot = await getDocs(q);
  //     let data = [];
  //     querySnapshot.forEach((doc) => {
  //       data.push({ ...doc.data(), id: doc.id });
  //     });

  //     setTodo(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setTodo([]);
  //   }
  // }; */

  // Fetch data from Firebase
  const getDataFire = async () => {
    try {
      const q = query(collection(db, "message"), orderBy("createdAt", "desc"));

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
  // useEffect(() => {
  //   if (authUser) {
  //     getDataFire(authUser.uid);
  //   }
  // }, [authUser]);

  return (
    <MessageContext.Provider
      value={{
        isOpen,
        handleInputClick,
        file,
        setFile,
        message,
        setMessage,
        isLoading,
        setIsLoading,
        handleImageUpload,
        addMessage,
        todo,
        setTodo,
        deleteMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);
