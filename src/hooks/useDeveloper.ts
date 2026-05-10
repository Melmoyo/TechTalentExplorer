import type { GitHubUserDetails } from "../types/github";
import { getGitHub } from "../apis/githubApi";
import { useState, useEffect } from "react";
export const useDeveloper = () => {
  const [data, setData] = useState<GitHubUserDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchDevs = async () => {
      try {
        setLoading(true);
        const res = await getGitHub();
        setData(res);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Couldnt fetch");
      }
      setLoading(false);
    };
    fetchDevs();
  }, []);
  return {
    users: data,
    loading,
    error,
  };
};
