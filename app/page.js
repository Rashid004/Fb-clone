/** @format */

import LeftSideNav from "./components/LeftSideNav";
import Main from "./components/MainItem";
import Navigation from "./components/Navigation";
import RightSidebar from "./components/RightSide";
import Mainpage from "./main/page";

export default function Home() {
  return (
    <div>
      <Navigation />
      <Mainpage />
    </div>
  );
}
