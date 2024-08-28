/** @format */
"use client";
import { useState } from "react";
import { FaBars, FaHome } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { CiShop } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";

import { CgMenuGridO } from "react-icons/cg";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

import Link from "next/link";
import { useAuth } from "@/firebase/authContext";
import Image from "next/image";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const { signOut, authUser } = useAuth();

  return (
    <header>
      <nav className="flex items-center justify-between px-5 text-gray-700 py-1">
        <Link href="#" className="flex items-center gap-2 flex-1">
          <FaFacebook className="w-10 h-10" />
          <span className="text-2xl font-semibold">Facebook</span>
        </Link>

        <div className="hidden lg:flex items-center gap-3 ">
          <Link
            href="#"
            className="hover:bg-indigo-500 rounded-md block font-semibold m-3 p-3 text-lg "
          >
            <FaHome className="w-7 h-7 text-primary-0" />
          </Link>
          <Link
            href="#"
            className="hover:bg-indigo-500 rounded-md block font-semibold m-3 p-3 text-lg"
          >
            <BsPeople className="w-7 h-7" />
          </Link>
          <Link
            href="#"
            className="hover:bg-indigo-500 rounded-md block font-semibold m-3 p-3 text-lg"
          >
            <MdOutlineOndemandVideo className="w-7 h-7" />
          </Link>

          <Link
            href="#"
            className="hover:bg-indigo-500 rounded-md block font-semibold m-3 p-3 text-lg"
          >
            <div>
              <CiShop className="w-7 h-7" />
            </div>
          </Link>
        </div>

        <div className="hidden lg:flex flex-1 items-center justify-end gap-4">
          <Link
            href="#"
            className=" flex items-cente justify-center gap-1 text-lg px-2 py-2 rounded-full font-medium border border-gray-400 hover:border-gray-600"
          >
            <div>
              <CgMenuGridO className="w-7 h-7" />
            </div>
          </Link>
          <Link
            href="#"
            className=" flex items-center gap-1 text-lg px-2 py-2 rounded-full font-medium border border-gray-400 hover:border-gray-600"
          >
            <div>
              <FaFacebookMessenger className="w-7 h-7" />
            </div>
          </Link>
          <Link
            onClick={signOut}
            href="#"
            className="flex items-center  hover:bg-indigo-600 p-2  cursor-pointer bg-indigo-500 text-white rounded-md px-4 py-1"
          >
            <IoMdLogOut className="h-6 w-6 mr-3" />
            Logout
          </Link>
          <Link
            href="#"
            className=" flex items-center gap-1 text-lg px-2 py-2  font-medium border rounded-full border-gray-400 hover:border-gray-600"
          >
            <div>
              <Image
                src={authUser?.imageUrl || "/profile.png"}
                alt="user"
                width={40}
                height={40}
                className="rounded-full object-cover border"
              />
            </div>
          </Link>
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className=" text-gray-800 lg:hidden border-none outline-none"
        >
          {isOpen ? (
            <RxCross2 className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>

        {/* {isOpen && (
          <div
            id="nav-dialog"
            className="fixed inset-0 bg-white lg:hidden z-10 h-screen px-5 py-1 overflow-y-auto"
          >
            <div className="flex justify-between mb-6">
              <Link href="#" className="flex items-center gap-2 flex-1">
                <FaFacebook className="w-10 h-10" />
                <span className="text-2xl font-semibold">Facebook</span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-800 lg:hidden border-none outline-none"
              >
                <RxCross2 className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col space-y-3">
              <Link
                href="#"
                className="hover:bg-gray-50 rounded-md block font-semibold p-3"
              >
                <FaHome className="w-7 h-7 text-primary-0" />
              </Link>
              <Link
                href="#"
                className="hover:bg-gray-50 rounded-md block font-semibold p-3"
              >
                <BsPeople className="w-7 h-7" />
              </Link>
              <Link
                href="#"
                className="hover:bg-gray-50 rounded-md block font-semibold p-3"
              >
                <MdOutlineOndemandVideo className="w-7 h-7" />
              </Link>
              <Link
                href="#"
                className="hover:bg-gray-50 rounded-md block font-semibold p-3"
              >
                <CiShop className="w-7 h-7" />
              </Link>
              <Link
                onClick={signOut}
                href="#"
                className="hover:bg-gray-50 rounded-md block font-semibold p-3"
              >
                Logout
              </Link>
            </div>
            <hr className="bg-gray-300 my-6" />
            <button className="w-full flex items-center gap-1 text-lg px-2 py-1 rounded-lg hover:bg-gray-50">
              <span className="text-base font-semibold">
                Electron Developer
              </span>
            </button>
          </div>
        )} */}
      </nav>
    </header>
  );
}

export default Navigation;
