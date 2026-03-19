import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faUpDown,
} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { useLocation } from "react-router-dom";
import type { GitHubRepo } from "../types/github";
const Repository = () => {
  const location = useLocation();
  const dev = location.state?.dev;
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays === 0) return "today";
    if (diffDays === 1) return "yesterday";
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };
  return (
    <>
      {/* REPOSITORIES */}
      <div className="border border-gray-700/20 bg-gray-700/10   mx-8 rounded-lg ">
        <div className="p-8">
          <div className="text-lg font-semibold ">
            <h2>Repositories</h2>
          </div>

          {/* TABLE */}
          <div className="table overflow-x-auto w-full ">
            <table className=" w-full  table-fixed border-collapse ">
              <thead>
                <tr className="border-b border-white/40  ">
                  <th className="text-left w-1/2 font-semibold py-2 ">Name</th>
                  <th className="font-semibold py-2">
                    <div className="hover:bg-[#f4b942] rounded-sm w-20">
                      Stars
                      <FontAwesomeIcon icon={faUpDown} size="sm" />
                    </div>
                  </th>
                  <th className="text-left py-2 font-semibold">
                    <div className=" hover:bg-[#f4b942] rounded-sm hover:text-white">
                      Updated <FontAwesomeIcon icon={faUpDown} size="sm" />
                    </div>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {dev.repoList?.map((repo: GitHubRepo) => (
                  <tr
                    key={repo.id}
                    className="hover:bg-green-300/10 border-b border-white/40  w-full"
                  >
                    <td>
                      <div>{repo.name}</div>
                      <div className="overflow-hidden  whitespace-nowrap text-sm">
                        {repo.description || "No description"}
                      </div>
                    </td>
                    <td>
                      <div className="ml-8">
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-green-400"
                          size="sm"
                          color="black"
                        />
                        <span>{repo.stargazers_count.toLocaleString()}</span>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm">
                        {formatDate(repo.updated_at)}
                      </div>
                    </td>
                    <td>
                      <a href={repo.html_url} target="_blank" rel="noreferrer">
                        <FontAwesomeIcon
                          icon={faArrowUpRightFromSquare}
                          className="hover:text-[#f4b942]"
                        />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default Repository;
