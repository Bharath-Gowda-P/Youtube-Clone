import { useContext, useState } from "react";
import { Context } from "../context/AppContext";
import Loader from "../shared/Loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ytlogo from "../images/yt-logo.png";
import ytlogMobile from "../images/yt-logo-mobile.png";
import myImg from "../images/IMG_5360-2.jpg";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { SlMenu } from "react-icons/sl";

function Header() {
  const { loading, mobileMenu, setMobileMenu } = useContext(Context);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pageName = pathname?.split("/")?.filter(Boolean)?.[0];

  function searchQueryHandler(event) {
    if (
      (event.key === "Enter" || event === "searchButton") &&
      searchQuery.length > 0
    ) {
      navigate(`searchResult/${searchQuery}`);
    }
  }

  function mobileMenuToggler() {
    setMobileMenu(!mobileMenu);
  }

  return (
    <div className="sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-black">
      {loading && <Loader />}

      <div className="flex h-5 items-center">
        {pageName !== "video" && (
          <div
            onClick={mobileMenuToggler}
            className="flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
          >
            {mobileMenu ? (
              <CgClose className="text-white text-xl" />
            ) : (
              <SlMenu className="text-white text-xl" />
            )}
          </div>
        )}

        <Link to="/" className="flex h-5 items-center">
          <img src={ytlogo} alt="youtube" className="h-full md:block hidden" />
          <img src={ytlogMobile} alt="" className="h-full md:hidden" />
        </Link>
      </div>

      <div className="group flex items-center">
        <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
          <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
            <IoIosSearch className="text-white text-xl" />
          </div>
          <input
            type="text"
            className="bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            placeholder="Search"
            onKeyDown={searchQueryHandler}
          />
        </div>
        <button
          className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]"
          onClick={() => searchQueryHandler("searchButton")}
        >
          <IoIosSearch className="text-white text-xl" />
        </button>
      </div>

      <div className="flex items-center">
        <div className="hidden md:flex">
          <div className="flex items-center justify-center h-10 w-10 hover:bg-[#303030]/[0.6] cursor-pointer rounded-full">
            <RiVideoAddLine className="text-white text-xl" />
          </div>
          <div className="flex items-center justify-center h-10 w-10 ml-2 hover:bg-[#303030]/[0.6] cursor-pointer rounded-full">
            <FiBell className="text-white text-xl" />
          </div>
        </div>
        <div className="flex h-8 w-8 overflow-hidden rounded-full md:ml-4">
          <img src={myImg} alt="Profile" />
        </div>
      </div>
    </div>
  );
}

export default Header;
