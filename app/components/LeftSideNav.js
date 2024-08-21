/** @format */

import Link from "next/link";
import { CgBell } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { MdGroups, MdHomeFilled } from "react-icons/md";

function LeftSideNav() {
  return (
    <div className="flex min-h-screen">
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
            href="#"
            className="flex items-center text-gray-900 hover:bg-gray-200 p-2 rounded-md"
          >
            <IoMdLogOut className="h-6 w-6 mr-3" />
            Logout
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      {/* <main className="flex-1 bg-gray-100 p-8">
        <h1 className="text-2xl font-semibold">Main Content</h1>
      </main>
      <aside className="bg-yellow-700">Right</aside> */}
    </div>
  );
}

export default LeftSideNav;
