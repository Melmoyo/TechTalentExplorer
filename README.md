# TechTalentExplorer

A React app that uses the GitHub REST API to search and explore developer profiles — view repositories, follower counts, and contribution activity in one place.

## Features

- 🔍 Search any GitHub username and pull their profile instantly
- 📁 View all public repositories with descriptions and stats
- 👥 See follower and following counts
- 📊 Contribution activity overview
- 📱 Responsive design for mobile and desktop

## Tech Stack

- **React** — component-based UI
- **TypeScript** — type-safe codebase
- **GitHub REST API** — live developer profile data
- **TailwindCSS** — utility-first styling
- **Vite** — fast dev environment and build tool

## Why I Built This

I wanted to practice consuming a real public REST API and handling async data fetching in React. The GitHub API was a natural fit — it's well documented, requires no auth for public data, and the results are immediately meaningful.

## Live Demo

🔗 [View Live](https://techtalentexplorer.netlify.app/)

## Getting Started

```bash
git clone https://github.com/Melmoyo/TechTalentExplorer.git
cd TechTalentExplorer
npm install
npm run dev
```

> Note: The GitHub API has a rate limit of 60 requests/hour for unauthenticated requests. For higher limits, add a personal access token to a `.env` file as `VITE_GITHUB_TOKEN=your_token_here`
