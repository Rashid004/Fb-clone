/** @format */

"use client";

import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useMessage } from "./storeContext";
import { useAuth } from "@/firebase/authContext";

function MainContent() {
  const { todo, deleteData } = useMessage();
  const { authUser } = useAuth();

  const formatDate = (date) => {
    if (!(date instanceof Date)) {
      date = date.toDate(); // Convert Firestore Timestamp to Date
    }
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleDateString("en-US", options);
  };

  if (!authUser) {
    return (
      <p className="text-center text-2xl font-semibold animate-spin ">
        Please sign in to view content...
      </p>
    );
  }

  return (
    <>
      {todo.map((item, index) => (
        <div
          key={item.id || index}
          className="flex flex-col bg-white mx-auto rounded-lg px-5 py-4 max-w-2xl h-fit shadow-md mb-4"
        >
          <div id="post-header" className="flex justify-between items-center">
            <div id="left-side" className="flex items-center gap-3">
              <Image
                src={authUser.imageUrl || "/default-avatar.png"}
                alt="user"
                width={40}
                height={40}
                className="rounded-full object-cover border border-gray-300"
              />
              <div className="flex flex-col">
                <h2 className="font-semibold text-sm">
                  {authUser.userName || "User"}
                </h2>
                <p className="text-xs text-gray-500">
                  {formatDate(item.createdAt)}
                </p>
              </div>
            </div>
            <div id="right-side" className="flex gap-6 items-center">
              <button>
                <BsThreeDots size="1.5em" className="text-gray-600" />
              </button>
              <button onClick={deleteData}>
                <RxCross2 size="1.5em" className="text-gray-600" />
              </button>
            </div>
          </div>
          <div className="pt-3">
            <p className="text-sm text-gray-800 leading-relaxed">
              {item.content}
            </p>
          </div>
          {item.imageUrl && (
            <div className="pt-4">
              <img
                className="w-full rounded-lg object-cover"
                src={item.imageUrl}
                alt="Post image"
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default MainContent;
