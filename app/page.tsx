import { Hero } from './sections/Hero';
import { Problem } from './sections/Problem';
import { Solution } from './sections/Solution';
import { Features } from './sections/Features';
import { Demo } from './sections/Demo';
import { Installation } from './sections/Installation';
import { CTA } from './sections/CTA';
import { fetchGitHubStats, formatNumber } from '@/lib/github-stats';

export default async function Home() {
  // Fetch GitHub stats at build time
  const stats = await fetchGitHubStats();

  return (
    <main className="flex-1">
      <Hero 
        stars={formatNumber(stats.stars)} 
        forks={formatNumber(stats.forks)} 
        version={stats.latestVersion}
      />
      <Problem />
      <Solution />
      <Features />
      <Demo />
      <Installation />
      <CTA 
        stars={formatNumber(stats.stars)} 
        forks={formatNumber(stats.forks)}
      />
    </main>
  );
}
