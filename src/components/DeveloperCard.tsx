import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup, faCodeFork } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import type { GitHubRepo } from "../types/github";

interface DeveloperCardProps {
  id: number;
  avatar: string;
  name: string;
  username: string;
  repos: number;
  description: string;
  followers: number;
  totalStars?: number;
  country: string;
  repoList?: GitHubRepo[];
  html_url: string;
  blog?: string;
  company?: string;
}
const DeveloperCard = ({
  id,
  name,
  avatar,
  username,
  description,
  repos,
  followers,
  totalStars,
  repoList,
  country,
  html_url,
  blog,
  company,
}: DeveloperCardProps) => {
  const navigate = useNavigate();

  const handleAnalytics = () => {
    navigate("/analytics", {
      state: {
        dev: {
          id,
          name,
          username,
          description,
          followers,
          country,
          avatar,
          totalStars,
          repoList,
          repos,
          html_url,
          blog,
          company,
        },
      },
    });
  };
  const { addFavorite, removeFavorite, isFavorited } = useFavorites();
  const favorited = isFavorited(id);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorited) {
      removeFavorite(id);
    } else {
      addFavorite({
        id,
        name,
        username,
        repos,
        description,
        followers,
        country,
      });
    }
  };
  return (
    <>
      {/* CARD */}
      <div
        onClick={handleAnalytics}
        className=" group flex flex-col  mx-8 h-full p-6 border border-gray-700/20 rounded-lg bg-gray-700/10 hover:border-[#f4b942] hover:shadow-[0_6px_5px_-7px_#f4b942] transition gap-4"
      >
        {/* ROW 1 — HEADER */}
        <div className="flex items-center justify-between ">
          <div className="flex  items-center justify-between gap-3">
            <div className="profile group-hover:text-[#f4b942] transition">
              <img
                src={avatar}
                alt={username}
                className="rounded-full w-10 h-10"
              />
            </div>

            <div>
              <h2 className="font-semibold group-hover:text-[#f4b942] transition">
                {name}
              </h2>
              <h3 className="text-md">{username} </h3>
            </div>

            <div onClick={handleHeartClick} className="flex justify-end">
              {favorited ? (
                <FontAwesomeIcon
                  icon={faHeartSolid}
                  size="lg"
                  className="p-2 rounded-lg hover:bg-[#f4b942] hover:text-[#1a2233] transition"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faHeartRegular}
                  size="lg"
                  className="p-2 rounded-lg hover:bg-[#f4b942] hover:text-[#1a2233] transition"
                />
              )}
            </div>
          </div>
        </div>

        {/* ROW 2 — DESCRIPTION */}
        <p className="text-md truncate md:whitespace-normal md:overflow-visible md:text-ellipsis-auto">
          {description}
        </p>

        {/* ROW 3 — STATS */}
        <div className="grid grid-cols-2 md:flex flex-wrap gap-4 text-sm">
          <div>
            <FontAwesomeIcon icon={faCodeFork} /> <span>{repos} repos</span>
          </div>

          <div>
            <FontAwesomeIcon icon={faUserGroup} />{" "}
            <span>{followers} followers</span>
          </div>

          <div>
            <span>{country}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeveloperCard;
