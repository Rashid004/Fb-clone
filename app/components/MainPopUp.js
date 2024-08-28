/** @format */

import Image from "next/image";
import { BiVideoPlus } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdPeopleAlt } from "react-icons/md";
import { PiImagesSquareBold } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { useMessage } from "../../firebase/storeContext";
import { useAuth } from "@/firebase/authContext";

function MainPopUp() {
  const {
    handleInputClick,
    handleImageUpload,
    handleVideoUpload,
    addPost,
    post,
    file,
    setPost,
    isLoading,
  } = useMessage();

  const { authUser } = useAuth();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="max-w-lg mx-auto rounded-xl shadow-xl px-4 py-2 mt-12 sm:mt-6 sm:h-auto sm:max-w-xl lg:w-[35%] bg-white">
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
                src={authUser?.imageUrl || ""}
                alt="user"
                width={45}
                height={45}
                className="rounded-full object-cover border"
              />
            </div>
            <div>
              <h2 className="font-semibold text-lg">
                {authUser.userName || "User"}
              </h2>
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
              placeholder={`What's on your mind, ${
                authUser?.userName || "User"
              }?`}
              value={post}
              onChange={(e) => setPost(e.target.value)}
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
                    onChange={handleVideoUpload} // You may want to implement this function if needed
                  />
                </button>
              </div>
            </div>
            {file && (
              <p className="text-sm text-green-600">
                Image selected: {file.name}
              </p>
            )}
            <button
              onClick={addPost}
              disabled={isLoading}
              className={`bg-primary-0 hover:bg-opacity-75 text-white px-4 py-2 w-full rounded-md ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPopUp;
