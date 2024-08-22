/** @format */

"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase/firebase";

import { doc, getDoc, updateDoc, deleteField } from "firebase/firestore";
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
        imageUrl: imageUrl,
        createdAt: new Date(),
      });

      console.log("Document written with id", docRef.id);
      setMessage(""); // Clear message input after adding the message
      setFile(null);
      handleInputClick(); // Close the popup
      getDataFire(authUser.uid);
    } catch (error) {
      console.error("Error message:", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const getDataFire = async (uid) => {
    if (!uid) return;

    try {
      const q = query(collection(db, "message"), where("owner", "==", uid));

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
    if (authUser) {
      getDataFire(authUser.uid);
    }
  }, [authUser]);

  const deleteData = async (messageId) => {
    try {
      const messageRef = doc(db, "message", messageId); // Reference to the specific document
      const docSnap = await getDoc(messageRef); // Fetch the document

      if (docSnap.exists()) {
        const data = docSnap.data();

        // Check if the current user is the owner of the message
        if (data.owner === authUser.uid) {
          // Proceed with deleting the 'owner' field or the entire document
          await updateDoc(messageRef, {
            owner: deleteField(),
          });

          console.log("Field deleted successfully.");
        } else {
          console.log("You do not have permission to delete this data.");
        }
      } else {
        console.log("No such document exists.");
      }
    } catch (err) {
      console.error("Error deleting document:", err);
    }
  };

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
        deleteData,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);
