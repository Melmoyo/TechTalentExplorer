export interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
}
export interface GitHubSearchResponse {
  total_count: number;
  items: GitHubUser[];
}
export interface GitHubUserDetails {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  followers: number;
  public_repos: number;
  location: string | null;
  html_url: string;
  bio: string | null;
  totalStars?: number;
  repoList?: GitHubRepo[];
  repos: number;
  blog: string | null;
  company: string | null;
}
export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
  description: string | null;
  updated_at: string;
  language: string | null;
}
