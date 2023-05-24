import React from "react";
import { useContext } from "react";
import { categories } from "../utils/constants";
import LeftNavMenuItem from "./LeftNavMenuItem";
import { Context } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function LeftNav() {
  const { setSelectedCategory, selectedCategory, mobileMenu } =
    useContext(Context);
  const navigate = useNavigate();

  function clickHandler(name, type) {
    if (type === "category") {
      setSelectedCategory(name);
    }
  }

  return (
    <div
      className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all ${
        mobileMenu ? "translate-x-0" : ""
      }`}
    >
      <div className="flex flex-col px-5">
        {categories.map((item) => {
          return (
            <React.Fragment key={item.name}>
              <LeftNavMenuItem
                text={item.name}
                icon={item.icon}
                classname={`${
                  selectedCategory === item.name ? "bg-white/[0.15]" : ""
                }`}
                action={() => {
                  clickHandler(item.name, item.type);
                  navigate("/");
                }}
              />
              {item.divider && <hr className="my-5 border-white/[0.2]" />}
            </React.Fragment>
          );
        })}
        <hr className="my-5 border-white/[0.2]" />
        <div className="text-white/[0.5] text-[12px]">
          Clone by: Bharath Gowda
        </div>
      </div>
    </div>
  );
}

export default LeftNav;
