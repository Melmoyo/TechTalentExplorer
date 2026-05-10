import type { GitHubUserDetails } from "../types/github";
export async function getGitHub(): Promise<GitHubUserDetails> {
  const baseURl = "https://api.github.com/user";
  const res = await fetch(baseURl);
  const data = await res.json();
  console.log(data);
  return data;
}
