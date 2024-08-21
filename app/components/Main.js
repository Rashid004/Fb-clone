/** @format */
"use client";
import { useState } from "react";
import MainContent from "./MainContent";
import Image from "next/image";
import { FaVideo } from "react-icons/fa6";
import { IoMdPhotos } from "react-icons/io";
import { FaRegSmile } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

import { MdPeopleAlt } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";

import { PiImagesSquareBold } from "react-icons/pi";
import { BiVideoPlus } from "react-icons/bi";

export default function Main() {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  const handleImageUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleVideoUpload = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <main className="flex-1 py-8 px-4 sm:px-8 lg:px-0 relative">
      <div className="bg-white flex flex-col gap-4 py-6 sm:py-8 px-4 max-w-2xl mx-auto rounded-lg mb-6">
        <div className="flex items-center gap-4">
          <Image
            src="/black-profile.jpeg"
            alt="user"
            width={40}
            height={40}
            className="rounded-full object-cover border border-red-500"
          />
          <input
            type="text"
            placeholder="What's on your mind, Ansari?"
            onClick={handleInputClick}
            className="bg-gray-100 hover:bg-gray-200 pl-4 pr-12 py-3 w-full rounded-full border-none outline-none cursor-pointer"
          />
        </div>
        <hr className="bg-gray-400" />
        <div className="flex items-center justify-around">
          <div className="flex items-center gap-4 hover:bg-gray-300 hover:rounded-md px-4 py-2">
            <FaVideo className="w-6 h-6 text-red-500" />
            <span className="text-lg text-gray-500 font-medium">
              Live video
            </span>
          </div>
          <div className="flex items-center gap-4 hover:bg-gray-300 hover:rounded-md px-4 py-2">
            <IoMdPhotos className="w-6 h-6 text-green-500" />
            <span className="text-lg text-gray-500 font-medium">
              Photo/video
            </span>
          </div>
          <div className="flex items-center gap-4 hover:bg-gray-300 hover:rounded-md px-4 py-2">
            <FaRegSmile className="w-6 h-6 text-yellow-500" />
            <span className="text-lg text-gray-500 font-medium">
              Feeling/activity
            </span>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className=" fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="max-w-lg mx-auto  rounded-xl shadow-xl px-4 py-2 mt-12 sm:mt-6 sm:h-auto sm:max-w-xl lg:w-[35%] bg-white">
            <div className="flex items-center justify-between gap-4 mb-4 pt-2">
              <h1 className="text-lg font-semibold">Create Post</h1>
              <button
                onClick={handleInputClick}
                className="bg-gray-200 rounded-full px-2 py-2 cursor-pointer"
              >
                <RxCross2 className="text-gray-600 w-4 h-4 font-semibold" />
              </button>
            </div>
            <hr className="bg-gray-400" />
            <div className="flex flex-col items-start mt-4 gap-4">
              <div className="flex gap-3 w-full">
                <div>
                  <Image
                    src="/black-profile.jpeg"
                    alt="user"
                    width={45}
                    height={45}
                    className="rounded-full object-cover border border-red-500"
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">Ansari Rashid</h2>
                  <p className="flex items-center gap-1 bg-gray-300 text-black text-sm font-semibold rounded-md px-2 py-1">
                    <MdPeopleAlt />
                    <span>Friends</span>
                    <IoMdArrowDropdown />
                  </p>
                </div>
              </div>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="What's on your mind, Ansari Rashid?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="outline-none border-none w-full text-xl py-5 px-1 pr-8"
                />
              </div>
              <div className="flex flex-col gap-4 w-full">
                <div className="border border-gray-300 flex items-center justify-between rounded-md w-full px-4 py-2">
                  <h3 className="text-lg font-medium">Add to your post</h3>
                  <div className="flex items-center gap-4">
                    <button>
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <PiImagesSquareBold
                          className="text-yellow-500 hover:text-yellow-600"
                          size="1.8em"
                        />
                      </label>
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </button>
                    <button>
                      <label htmlFor="video-upload" className="cursor-pointer">
                        <BiVideoPlus
                          className="text-green-500 hover:text-green-600"
                          size="1.8em"
                        />
                      </label>
                      <input
                        type="file"
                        id="video-upload"
                        accept="video/*"
                        className="hidden"
                        onChange={handleVideoUpload}
                      />
                    </button>
                  </div>
                </div>
                <button className="bg-primary-0 hover:bg-opacity-75 text-white px-4 py-2 w-full rounded-md">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <MainContent />
    </main>
  );
}
