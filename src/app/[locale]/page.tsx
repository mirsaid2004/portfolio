import { Hero } from '@/components/hero';
import { BentoGrid } from '@/components/bento-grid';
import { ProjectSection } from '@/components/project-section';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-transparent space-y-24 pb-24">
        <Hero />
        <BentoGrid />
        <ProjectSection />
    </main>
  );
}
