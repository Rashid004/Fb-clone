/** @format */

import LeftSideNav from "../components/LeftSideNav";
import MainItem from "../components/MainItem";
import RightSidebar from "../components/RightSide";

function Mainpage() {
  return (
    <main className=" md:grid md:grid-cols-[300px_1fr_300px] md:min-h-screen max-w-full flex flex-col justify-between ">
      <LeftSideNav />
      <MainItem />
      <RightSidebar />
    </main>
  );
}

export default Mainpage;
