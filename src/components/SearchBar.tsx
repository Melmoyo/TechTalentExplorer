import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type {
  GitHubSearchResponse,
  GitHubRepo,
  GitHubUserDetails,
} from "../types/github";

interface SearchBarProps {
  onResults: (users: GitHubUserDetails[]) => void;
}

const SearchBar = ({ onResults }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");
  const countries = [
    "All Countries",
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Ecuador",
    "Egypt",
    "Estonia",
    "Ethiopia",
    "Finland",
    "France",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Guatemala",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kuwait",
    "Latvia",
    "Lebanon",
    "Libya",
    "Lithuania",
    "Luxembourg",
    "Malaysia",
    "Mexico",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nigeria",
    "Norway",
    "Pakistan",
    "Panama",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Romania",
    "Russia",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Somalia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tanzania",
    "Thailand",
    "Tunisia",
    "Turkey",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zimbabwe",
  ];
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState("All Countries");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const headers = {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
    };

    try {
      // 1️⃣ Search users
      const searchRes = await fetch(
        `https://api.github.com/search/users?q=${searchValue}+in:login,name,bio${
          selectedCountry !== "All Countries"
            ? `+location:${selectedCountry}`
            : ""
        }+type:user&per_page=9`,
        { headers },
      );

      if (!searchRes.ok)
        throw new Error(`GitHub API error: ${searchRes.status}`);

      const searchData: GitHubSearchResponse = await searchRes.json();

      // 2️⃣ For each user, fetch full profile and repos
      const usersWithDetails = await Promise.all(
        searchData.items.map(async (user) => {
          // Fetch user details
          const profileRes = await fetch(
            `https://api.github.com/users/${user.login}`,
            { headers },
          );
          const profile: GitHubUserDetails = await profileRes.json();
          console.log("profile html_url:", profile.html_url);

          // Fetch user repos to get total stars
          const reposRes = await fetch(
            `https://api.github.com/users/${user.login}/repos`,
            { headers },
          );
          const repos: GitHubRepo[] = await reposRes.json();

          const totalStars = repos.reduce(
            (sum, repo) => sum + repo.stargazers_count,
            0,
          );

          return {
            ...profile,
            totalStars,
            repoList: repos,
          };
        }),
      );

      // 3️⃣ Send the full data to parent
      onResults?.(usersWithDetails);

      // 4️⃣ Navigate to results page
      navigate("/results", { state: { results: usersWithDetails } });
    } catch (err) {
      console.error("Error fetching GitHub users:", err);
    }
  };

  return (
    <>
      <form className="w-full mx-auto mt-8" onSubmit={handleSubmit}>
        <div className="w-full max-w-md mx-auto space-y-2 lg:grid grid-cols-3 gap-4  lg:max-w-6xl">
          <div className="search relative bg-gray-700/20 p-4 h-12 rounded-lg">
            {searchValue === "" && (
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute  top-1/2 -translate-y-1/4 text-muted-foreground"
              />
            )}
            <input
              type="text"
              className="w-full outline-none "
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="     Search by profession, names, or skill..."
            />
          </div>
          <div className="relative ">
            <select
              className=" w-full outline-none  bg-gray-700/20 p-2 rounded-lg h-12 appearance-none text-white "
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              {countries.map((country) => (
                <option
                  key={country}
                  value={country}
                  className="bg-gray-700 text-gray "
                >
                  {country}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0  right-2  top-1/6 translate-y-1/4 flex">
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
          </div>
          <button
            type="submit"
            className="search-btn w-full max-w-md rounded-lg h-12"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            Search
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
