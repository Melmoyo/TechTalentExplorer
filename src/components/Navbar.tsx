import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faHeart as faHeartSolid,
  faXmark,
  faUserGroup,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useFavorites } from "../context/FavoritesContext";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import type { GitHubRepo } from "../types/github";

const Navbar = () => {
  const { favorites, removeFavorite, isFavorited } = useFavorites();
  const [showFav, setShowFav] = useState(false);
  const location = useLocation();
  const dev = location.state?.dev;
  const handleShowFavourites = () => {
    setShowFav(!showFav);
  };
  const handleDelete = (id: number) => {
    removeFavorite(id);

    console.log("deleted");
  };
  return (
    <>
      <nav className=" sticky top-0 border-b border-white/20 h-16 py-4">
        <div className="flex flex-row justify-around items-center ">
          <div className="flex space-x-2 items-center">
            <div className="code-icon p-2 rounded-lg ">
              {" "}
              <FontAwesomeIcon icon={faCode} size="xl" color="black" />
            </div>
            <div className="text-2xl font-semibold name">
              {" "}
              <Link to="/" className="cursor-pointer">
                Tech Talent Explorer
              </Link>
            </div>
          </div>
          <div
            onClick={handleShowFavourites}
            className=" flex items-center cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faHeart}
              className=" fav-icon fa-regular fa-heart"
            />
            <span className=" hidden md:flex">Favorites</span>
            <sup className="flex  bg-pink-700 h-6 w-6 rounded-full items-center justify-center">
              {favorites.length}
            </sup>
          </div>
        </div>
      </nav>
      {showFav && (
        <div className="fixed top-16 right-0 z-50 h-full w-80 overflow-hidden bg-[#0b0f1a] bg-opacity-45 backdrop-blur-lg shadow-lg transition-opacity duration-200">
          <div className="  m-4">
            <div className="flex flex-col">
              <div className="flex flex-row  items-center justify-between">
                <div>
                  <h2>
                    <FontAwesomeIcon
                      icon={faHeartSolid}
                      className=" fav-icon fa-regular fa-heart text-[#f4b942] "
                    />
                    Favorites
                  </h2>
                </div>

                <div onClick={handleShowFavourites}>
                  <FontAwesomeIcon icon={faXmark} className=" fav-icon " />
                </div>
              </div>
              {favorites.length > 0 ? (
                <p>You have {favorites.length} saved developers</p>
              ) : (
                <p>
                  No favorites yet. Click the heart icon on developer cards to
                  save them.
                </p>
              )}
            </div>
            {/*Cards*/}
            {favorites.map((fav) => (
              <div
                key={fav.id}
                className="flex flex-col border border-gray-700/20 rounded-lg bg-gray-700/20 p-4"
              >
                <div className="flex flex-row  justify-between">
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <img src={dev.avatar_url} alt={fav.username} />
                    </div>
                    <div>
                      {fav.name}
                      <div>
                        {" "}
                        <FontAwesomeIcon
                          icon={faUserGroup}
                          className=" fav-icon fa-regular fa-heart"
                        />
                        <span>{fav.followers} followers</span>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => handleDelete(fav.id)}
                    className="flex justify-center items-center"
                  >
                    {" "}
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className=" fav-icon fa-regular fa-heart"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
