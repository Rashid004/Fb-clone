/** @format */
"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useAuth } from "@/firebase/authContext";
import Loading from "./Loading";
import { FaRegSmile, FaVideo } from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";
import Image from "next/image";
import { useMessage } from "@/firebase/storeContext";
// import Navigation from "./components/Navigation";
// import MainPopUp from "./components/MainPopUp";
// import MainContent from "./components/MainFeedContent";

const Navigation = dynamic(() => import("./components/Navigation"), {
  ssr: false,
});
const MainContent = dynamic(() => import("./components/MainFeedContent"), {
  ssr: false,
});
const MainPopUp = dynamic(() => import("./components/MainPopUp"), {
  ssr: false,
});

export default function Home() {
  const { isOpen, handleInputClick } = useMessage();
  const { isLoading, authUser } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return <Loading />;
  }

  if (!authUser) {
    router.push("/signIn");
    return null;
  }
  return (
    <main>
      <Navigation />
      <div className="md:min-h-screen max-w-full flex flex-col justify-center px-8 md:px-4">
        <main className="flex-1 py-8 relative w-full">
          <div className="bg-white flex flex-col gap-4 py-6 sm:py-8 px-4 sm:px-8 lg:px-4 w-full lg:max-w-2xl mx-auto rounded-lg mb-6">
            <div className="flex items-center gap-4">
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
      </div>
    </main>
  );
}
