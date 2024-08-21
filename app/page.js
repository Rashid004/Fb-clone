/** @format */

import LeftSideNav from "./components/LeftSideNav";
import Main from "./components/Main";
import RightSidebar from "./components/RightSide";

export default function Home() {
  return (
    <main className="grid grid-cols-[300px_1fr_300px] min-h-screen max-w-full">
      <LeftSideNav />
      <Main />
      <RightSidebar />
    </main>
  );
}
