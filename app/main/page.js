/** @format */

import LeftSideNav from "../components/LeftSideNav";
import MainItem from "../components/MainItem";
import RightSidebar from "../components/RightSide";

function Mainpage() {
  return (
    <main className="grid grid-cols-[300px_1fr_300px] min-h-screen max-w-full">
      <LeftSideNav />
      <MainItem />
      <RightSidebar />
    </main>
  );
}

export default Mainpage;
