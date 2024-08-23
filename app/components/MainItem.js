/** @format */
"use client";
import MainContent from "./MainFeedContent";
import Image from "next/image";
import { FaVideo } from "react-icons/fa6";
import { IoMdPhotos } from "react-icons/io";
import { FaRegSmile } from "react-icons/fa";

import MainPopUp from "./MainPopUp";

import { useMessage } from "../../firebase/storeContext";
import { useAuth } from "@/firebase/authContext";
import { auth } from "@/firebase/firebase";

export default function MainItem() {
  const { isOpen, handleInputClick } = useMessage();
  const { authUser } = useAuth();

  return (
    <main className="flex-1 py-8 relative">
      <div className="bg-white flex flex-col gap-4 py-6 sm:py-8 px-4 sm:px-8 lg:px-4 max-w-full  md:max-w-2xl mx-auto rounded-lg mb-6">
        <div className="flex items-center gap-4  ">
          <Image
            src={authUser?.imageUrl || "/profile.png"}
            alt="user"
            width={40}
            height={40}
            className="rounded-full object-cover border"
          />
          <input
            type="text"
            placeholder={`What's on your mind, ${
              authUser?.userName || "User"
            }?`}
            onClick={handleInputClick}
            className="bg-gray-100 hover:bg-gray-200 pl-4 pr-12 py-3 w-full rounded-full border-none outline-none cursor-pointer"
          />
        </div>
        <hr className="bg-gray-400" />
        <div className="flex items-center justify-around w-full">
          <div className="flex items-center gap-4 hover:bg-gray-300 hover:rounded-md px-4 py-2 w-full">
            <FaVideo className="w-6 h-6 text-red-500" />
            <span className="text-sm sm:text-lg text-gray-500 font-medium">
              Live video
            </span>
          </div>
          <div className="flex items-center gap-4 hover:bg-gray-300 hover:rounded-md px-4 py-2 w-full">
            <IoMdPhotos className="w-6 h-6 text-green-500" />
            <span className="text-sm sm:text-lg text-gray-500 font-medium">
              Photo/video
            </span>
          </div>
          <div className="flex items-center gap-4 hover:bg-gray-300 hover:rounded-md px-4 py-2 w-full">
            <FaRegSmile className="w-6 h-6 text-yellow-500" />
            <span className="text-sm sm:text-lg text-gray-500 font-medium">
              Feeling/activity
            </span>
          </div>
        </div>
      </div>

      {isOpen && <MainPopUp />}
      <MainContent />
    </main>
  );
}
