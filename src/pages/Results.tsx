import SearchBar from "../components/SearchBar";
import DeveloperCard from "../components/DeveloperCard";
import type { GitHubUserDetails } from "../types/github";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  const [users, setUsers] = useState<GitHubUserDetails[]>(
    location.state?.results || [],
  );

  return (
    <>
      <SearchBar onResults={setUsers} />

      <div className="font-semibold flex justify-start m-8">
        <h2>{users.length} developers found</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto items-stretch px-8 mb-8">
        {users.map((user) => (
          <DeveloperCard
            key={user.id}
            id={user.id}
            avatar={user.avatar_url}
            name={user.name || "Unknown"}
            username={user.login}
            description={user.bio || "No bio"}
            totalStars={user.totalStars || 0}
            repoList={user.repoList ?? []}
            repos={user.public_repos}
            html_url={user.html_url}
            followers={user.followers}
            country={user.location || "Unknown"}
            blog={user.blog || ""}
            company={user.company || ""}
          />
        ))}
      </div>
    </>
  );
};

export default Results;
