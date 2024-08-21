/** @format */
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

function MainContent() {
  // const formatDate = (date) => {
  //   const options = { day: "numeric", month: "long" };
  //   const formattedDate = date.toLocaleDateString("en-US", options);
  //   const time = date.toLocaleTimeString("en-US", {
  //     hour: "numeric",
  //     minute: "numeric",
  //     hour12: true,
  //   });

  //   return `${formattedDate} at ${time}`;
  // };

  // const date = new Date();
  // console.log(formatDate(date));

  return (
    <div className="flex flex-col bg-white mx-auto rounded-lg px-5 py-2 max-w-2xl  h-fit">
      <div id="post-bg" className=" flex justify-between">
        <div id="left-side" className="flex gap-3 w-full">
          <Image
            src="/black-profile.jpeg"
            alt="user"
            width={40}
            height={40}
            className="rounded-full object-cover border border-red-500"
          />{" "}
          <div className="flex flex-col">
            <h2 className="font-semibold text-sm">Ansari Rashid</h2>
            {/* <p className="text-xs text-gray-500">{formatDate(date)}</p> */}
          </div>
        </div>
        <div id="right-side" className="flex gap-4 items-center">
          <button>
            <BsThreeDots size="1.5em" />
          </button>
          <button>
            <RxCross2 size="1.5em" />
          </button>
        </div>
      </div>
      <div className="pt-4">
        <p className="text-sm text-gray-900 text-wrap font-medium">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged.
        </p>
      </div>
      <div className="w-[672px] pt-4">
        <img className="w-[672px]" src="./post1.webp" alt="Post 1" />
      </div>
    </div>
  );
}

export default MainContent;
