import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faMagnifyingGlass,
  faUserGroup,
  faArrowTrendUp,
  faChartColumn,
} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { GitHubUserDetails } from "../types/github";

const Home = () => {
  const [users, setUsers] = useState<GitHubUserDetails[]>([]);
  return (
    <>
      <main>
        <section className="space-y-4">
          <div className="flex flex-col justify-center items-center max-w-md mx-auto  mt-8 space-y-4 md:max-w-lg lg:max-w-7xl ">
            <div className="code-icon-wrapper rounded-lg w-14 h-14 flex flex-col items-center justify-center ">
              <FontAwesomeIcon
                icon={faCode}
                size="2xl"
                className="code-icon-main text-[#f4b942]"
              />
            </div>
            <Link to="/">
              <h1 className="text-4xl text-center font-semibold lg:text-6xl">
                Tech Talent Explorer
              </h1>
            </Link>
            <p className="tracking-wider text-center">
              Discover and analyze developer profiles, repositories, and
              contributions across the tech ecosystem.
            </p>

            <SearchBar onResults={setUsers} />
            <div className="grid grid cols-1 max-w-xl justify-items-center gap-6 lg:max-w-3xl ">
              <div className="space-x-2  ">
                <FontAwesomeIcon icon={faArrowTrendUp} />
                <span>Popular Searches</span>
              </div>
              <div className="popular-btns gap-4 flex flex-wrap justify-center  font-semibold ">
                <button className="popular-btn p-2 rounded-lg ">
                  Frontend Developer
                </button>
                <button className="popular-btn  p-2 rounded-lg">
                  React Engineer
                </button>
                <button className="popular-btn  p-2 rounded-lg">
                  Full Stack Developer{" "}
                </button>
                <button className="popular-btn  p-2 rounded-lg">
                  DevOps Engineer
                </button>
                <button className="popular-btn  p-2 rounded-lg ">
                  Machine Learning Developer
                </button>
                <button className="popular-btn  p-2 rounded-lg">
                  IOS Developer
                </button>
                <button className="popular-btn p-2 rounded-lg">
                  Rust Developer
                </button>
                <button className="popular-btn p-2 rounded-lg">
                  Go Developer
                </button>
              </div>
            </div>
            <div className="features grid grid-cols-3 gap-4  ">
              <div className="feature-item p-2 space-x-2 flex  items-center gap-2 ">
                {" "}
                <span>
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="feature-icon text-[#f4b942] p-2 bg-gray-700 rounded-xl"
                  />
                </span>
                <span className="text-[#8a93a6] ">Smart Search</span>
              </div>
              <div className="feature-item space-x-2 flex  items-center  gap-2">
                <span>
                  {" "}
                  <FontAwesomeIcon
                    icon={faUserGroup}
                    className="feature-icon text-[#f4b942] p-2 bg-gray-700 rounded-xl"
                  />
                </span>
                <span className="text-[#8a93a6] ">Developer Profiles</span>
              </div>
              <div className="feature-item space-x-2 flex  gap-2 items-center justify-center">
                {" "}
                <span>
                  <FontAwesomeIcon
                    icon={faChartColumn}
                    className="feature-icon text-[#f4b942] p-2 bg-gray-700 rounded-xl"
                  />
                </span>
                <span className="text-[#8a93a6]">Deep Analytics</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
