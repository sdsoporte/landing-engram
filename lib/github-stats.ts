// Fetch GitHub stats at build time
interface GitHubStats {
  stars: number;
  forks: number;
  latestVersion: string;
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  try {
    // Fetch repo data
    const repoRes = await fetch('https://api.github.com/repos/Gentleman-Programming/engram', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Add token if rate limited: 'Authorization': 'token YOUR_TOKEN'
      },
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!repoRes.ok) {
      console.warn('GitHub API error, using fallback stats');
      return {
        stars: 2400,
        forks: 253,
        latestVersion: 'v1.11.0'
      };
    }

    const repoData = await repoRes.json();

    // Fetch latest release
    const releaseRes = await fetch('https://api.github.com/repos/Gentleman-Programming/engram/releases/latest', {
      headers: { 'Accept': 'application/vnd.github.v3+json' },
      next: { revalidate: 3600 }
    });

    let latestVersion = 'v1.11.0';
    if (releaseRes.ok) {
      const releaseData = await releaseRes.json();
      latestVersion = releaseData.tag_name;
    }

    return {
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      latestVersion
    };
  } catch (error) {
    console.error('Failed to fetch GitHub stats:', error);
    // Fallback values
    return {
      stars: 2400,
      forks: 253,
      latestVersion: 'v1.11.0'
    };
  }
}

// Format numbers for display
export function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}
