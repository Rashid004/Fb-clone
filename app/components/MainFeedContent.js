/** @format */

import { useAuth } from "@/firebase/authContext";
import { useMessage } from "@/firebase/storeContext";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";

function MainContent() {
  const { todo, deleteMessage } = useMessage();
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
      <p className="text-center text-2xl font-semibold animate-bounce">
        Please sign in to view content...
      </p>
    );
  }

  return (
    <>
      {todo.map((item, index) => (
        <div
          key={item.id || index}
          className="flex flex-col bg-white mx-auto rounded-lg px-4 sm:px-5 py-4 max-w-full sm:max-w-2xl shadow-md mb-4"
        >
          <div id="post-header" className="flex justify-between items-center">
            <div id="left-side" className="flex items-center gap-2 sm:gap-3">
              <Image
                src={item.userImageUrl || "/profile.png"}
                alt="user"
                width={36}
                height={36}
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
            <div id="right-side" className="flex gap-2 items-center">
              {authUser && authUser.uid === item.owner && (
                <button onClick={() => deleteMessage(item.id)}>
                  <RxCross2 size="1.5em" className="text-gray-600" />
                </button>
              )}
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
                className="w-full rounded-lg object-cover object-center max-h-96 sm:h-[500px]"
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
