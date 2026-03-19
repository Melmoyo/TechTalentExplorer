import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodeFork,
  faBuilding,
  faGlobe,
  faLocationDot,
  faArrowUpRightFromSquare,
  faArrowLeft,
  faUserGroup,
  faCircleUser,
  faCircle,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import {
  faStar,
  faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import Repository from "../components/RepoTable";
import { useLocation } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import type { GitHubRepo } from "../types/github";

const Analytics = () => {
  const location = useLocation();
  const dev = location.state?.dev;

  const { addFavorite, removeFavorite, isFavorited } = useFavorites();
  const isFav = isFavorited(dev.id);

  const handleFavorite = () => {
    if (isFav) {
      removeFavorite(dev.id);
    } else {
      addFavorite(dev);
    }
  };

  let languages: { name: string; count: number }[] = [];
  let total = 0;
  try {
    // count how many repos use each language
    const languageMap = dev.repoList?.reduce(
      (acc: Record<string, number>, repo: GitHubRepo) => {
        if (repo.language) {
          acc[repo.language] = (acc[repo.language] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    // convert to array and sort by count
    languages = Object.entries(languageMap || {})
      .map(([name, count]) => ({ name, count: count as number }))
      .sort((a, b) => b.count - a.count);

    total = languages.reduce((sum, l) => sum + l.count, 0);
  } catch (err) {
    console.error("language calc error:", err);
  }

  const COLORS = [
    "text-yellow-500",
    "text-sky-500",
    "text-pink-500",
    "text-green-500",
    "text-orange-200",
    "text-gray-500",
    "text-purple-500",
    "text-red-500",
  ];

  const CHART_COLORS = [
    "#eab308",
    "#0ea5e9",
    "#ec4899",
    "#22c55e",
    "#fed7aa",
    "#6b7280",
    "#a855f7",
    "#ef4444",
  ];
  return (
    <>
      <div className="grid grid-cols-1  ">
        <div className="mx-8 my-8 ">
          <Link to="/results">
            <FontAwesomeIcon icon={faArrowLeft} size="sm" />
            <span className="text-sm ml-2">Back to results</span>
          </Link>
        </div>
      </div>

      <div className="md: grid grid-cols-1">
        {/* CARD */}
        <div className="grid grid-cols-1 text-white  ">
          <div className="flex flex-col justify-between  h-full  p-6 gap-4   ">
            <div className="flex items-center justify-between ">
              <div className="flex items-start gap-4">
                <div className="text-3xl">
                  <FontAwesomeIcon icon={faCircleUser} size="2xl" />
                </div>
                <div className="gap-4 flex flex-wrap  ">
                  <div className="space-y-2   ">
                    <h2 className="font-semibold text-2xl ">
                      {dev.name}
                      <span className="ml-4 text-sm ">US</span>
                    </h2>
                    <h3 className="text-md">{dev.login}</h3>
                    <p className="text-md ">{dev.bio}</p>
                  </div>

                  <div className="flex   gap-4">
                    {dev.company && (
                      <div>
                        {" "}
                        <FontAwesomeIcon icon={faBuilding} size="sm" />
                        <span>{dev.company}</span>
                      </div>
                    )}
                    <div>
                      {" "}
                      <FontAwesomeIcon icon={faLocationDot} size="sm" />
                      <span>{dev.location}</span>
                    </div>
                    {dev.blog && (
                      <div className="hover:text-[#f4b942] cursor-pointer">
                        {" "}
                        <FontAwesomeIcon icon={faGlobe} size="sm" />
                        <span>
                          <a href={dev.blog} target="_blank" rel="noreferrer">
                            Website
                          </a>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex mx-8 gap-4 ">
          {isFav ? (
            <button
              onClick={handleFavorite}
              className="border border-white p-2 rounded-lg space-x-2 w-30 flex justify-items-around bg-[#f4b942] text-black"
            >
              <span>
                <FontAwesomeIcon icon={faHeartSolid} color="black" size="sm" />
              </span>
              <span>Favorited</span>
            </button>
          ) : (
            <button
              onClick={handleFavorite}
              className="border border-white p-2 rounded-lg space-x-2 w-30 flex justify-items-around hover:bg-gray-700/20 hover:text-black"
            >
              <span>
                <FontAwesomeIcon icon={faHeartRegular} size="sm" />
              </span>
              <span>Favorite</span>
            </button>
          )}
          <a
            href={dev.html_url}
            target="_blank"
            rel="noreferrer"
            className="border border-white p-2 rounded-lg space-x-2 w-30  flex justify-items-around hover:bg-gray-700/20 hover:text-black"
          >
            <span>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" />
            </span>
            <span className="text-md">Github</span>
          </a>
        </div>

        {/* Analytics */}
        <div className="md:flex mb-8 ">
          <div>
            <div className="grid grid-cols-2 border border-gray-700/20 mt-8 h-[150px] rounded-lg mx-8 bg-gray-700/10 md:max-w-md grid-cols-1">
              <div className="flex flex-row  gap-4 mx-auto p-8 overflow-hidden">
                <div className="flex items-center bg-green-300/10   rounded-lg p-2 w-15 h-15">
                  {" "}
                  <span className=" ">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-green-300 "
                      size="2xl"
                    />
                  </span>
                </div>
                <div className="flex flex-col w-full">
                  {" "}
                  <div className="text-2xl font-semibold">{dev.totalStars}</div>
                  <div className="text-sm">Total Stars</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 border border-gray-700/20 mt-8 h-[150px] rounded-lg mx-8 bg-gray-700/10  md:max-w-md">
              <div className="flex flex-row  gap-4 mx-auto p-8 overflow-hidden">
                <div className="flex items-center bg-[#f4b942]/20  rounded-lg p-2 w-15 h-15">
                  {" "}
                  <span className=" ">
                    <FontAwesomeIcon
                      icon={faUserGroup}
                      className="text-[#f4b942] "
                      size="2xl"
                    />
                  </span>
                </div>
                <div className="flex flex-col w-full">
                  {" "}
                  <div className="text-2xl font-semibold">{dev.followers}</div>
                  <div className="text-sm">Followers</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 border border-gray-700/20 mt-8 h-[150px] rounded-lg mx-8 bg-gray-700/10  md:max-w-md">
              <div className="flex flex-row  gap-4 mx-auto p-8 overflow-hidden">
                <div className="flex items-center bg-sky-600/20   rounded-lg p-2 w-15 h-15">
                  {" "}
                  <span className=" ">
                    <FontAwesomeIcon
                      icon={faCodeFork}
                      className="text-sky-500 "
                      size="2xl"
                    />
                  </span>
                </div>
                <div className="flex flex-col w-full">
                  {" "}
                  <div className="text-2xl font-semibold">{dev.repos}</div>
                  <div className="text-sm">Repositories</div>
                </div>
              </div>
            </div>
          </div>

          {/* LANGUAGE DISTRIBUTION */}
          <div className="border border-gray-700/20 mt-8 grid grid-cols-1 mb-8 h-auto mx-8 rounded-lg bg-gray-700/10 w-full md:h-[510px]">
            <div className="m-8">
              <h2 className="text-lg font-semibold">Language Distribution</h2>

              {/* DONUT CHART */}
              <div className="chart flex justify-center my-4">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={languages}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      dataKey="count"
                      nameKey="name"
                    >
                      {languages.map((_, index) => (
                        <Cell
                          key={index}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [
                        `${(((value as number) / total) * 100).toFixed(1)}%`,
                        name as string,
                      ]}
                      contentStyle={{ background: "#1a2233", border: "none" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* LEGEND */}
              <div className="languages text-sm">
                <div className="flex flex-wrap gap-4">
                  {languages.map((lang, index) => (
                    <div key={lang.name} className="flex items-center gap-1">
                      <FontAwesomeIcon
                        icon={faCircle}
                        size="xs"
                        className={COLORS[index % COLORS.length]}
                      />
                      <span>{lang.name}</span>
                      <span className="text-gray-400">
                        {((lang.count / total) * 100).toFixed(0)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Repository />
    </>
  );
};

export default Analytics;
