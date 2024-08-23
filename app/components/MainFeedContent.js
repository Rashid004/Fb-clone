/** @format */

// "use client";

import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useMessage } from "../../firebase/storeContext";
import { useAuth } from "@/firebase/authContext";

function MainContent() {
  const { todo, deletePost } = useMessage();
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
      <p className="text-center text-2xl font-semibold animate-bounce ">
        Please sign in to view content...
      </p>
    );
  }

  return (
    <>
      {todo.map((item, index) => (
        <div
          key={item.id || index}
          className="flex flex-col bg-white mx-auto rounded-lg px-5 py-4 max-w-full md:max-w-2xl  shadow-md mb-4"
        >
          <div
            id="post-header"
            className="flex justify-between items-center w-full"
          >
            <div id="left-side" className="flex items-center gap-3">
              <Image
                src={item.userImageUrl || "/profile.png"}
                alt="user"
                width={40}
                height={40}
                className="rounded-full object-cover border border-gray-300"
              />
              <div className="flex flex-col">
                <h2 className="font-semibold text-sm">
                  {item.userName || "User"}
                </h2>
                <p className="text-xs text-gray-500">
                  {formatDate(item.createdAt)}
                </p>
              </div>
            </div>
            <div id="right-side" className="flex gap-6 items-center">
              {/* <button>
                <BsThreeDots size="1.5em" className="text-gray-600" />
              </button> */}
              <div id="right-side" className="flex gap-2 items-center">
                {authUser && authUser.uid === item.userId && (
                  <button onClick={() => deletePost(item.id)}>
                    <RxCross2 size="1.5em" className="text-gray-600" />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="pt-3 w-full">
            <p className="text-sm text-gray-800 leading-relaxed">
              {item.content}
            </p>
          </div>
          {item.imageUrl && (
            <div className="pt-4 ">
              <img
                className="w-full rounded-lg object-cover object-center h-[500px]"
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
