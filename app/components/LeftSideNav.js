/** @format */
"use client";
import { useAuth } from "@/firebase/authContext";
import Link from "next/link";
import { CgBell } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { MdGroups, MdHomeFilled } from "react-icons/md";
import Loading from "../Loading";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function LeftSideNav() {
  const router = useRouter();
  const { authUser, isLoading, signOut } = useAuth();

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/signIn");
    }
  }, [authUser, isLoading, router]);
  return !authUser ? (
    <Loading />
  ) : (
    <div className="lg:flex min-h-screen hidden">
      {/* Sidebar */}
      <aside className="w-64 p-4 flex flex-col space-y-4">
        <div className="text-gray-900 text-xl font-semibold mb-6">Logo</div>
        <nav className="flex flex-col space-y-4">
          <Link
            href="#"
            className="flex items-center text-gray-900 hover:bg-gray-200 p-2 rounded-md"
          >
            <MdHomeFilled className="h-6 w-6 mr-3" />
            Home
          </Link>
          <Link
            href="#"
            className="flex items-center text-gray-900 hover:bg-gray-200 p-2 rounded-md"
          >
            <MdGroups className="h-6 w-6 mr-3" />
            Friends
          </Link>
          <Link
            href="#"
            className="flex items-center text-gray-900 hover:bg-gray-200 p-2 rounded-md"
          >
            <CgBell className="h-6 w-6 mr-3" />
            Notifications
          </Link>
          <Link
            onClick={signOut}
            href="#"
            className="flex items-center text-gray-900 hover:bg-gray-200 p-2 rounded-md"
          >
            <IoMdLogOut className="h-6 w-6 mr-3" />
            Logout
          </Link>
        </nav>
      </aside>
    </div>
  );
}

export default LeftSideNav;
