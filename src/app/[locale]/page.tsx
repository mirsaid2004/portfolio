import { Hero } from "@/components/hero";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { TechStackSlider } from "@/components/tech-stack-slider";
import { ProjectsShowcase } from "@/components/projects-showcase";
import { NpmContributions } from "@/components/npm-contributions";
import { AboutStats } from "@/components/about-stats";
import { ContactForm } from "@/components/contact-form";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-transparent space-y-24 pb-24">
      <Hero />
      <AboutStats />
      <ExperienceTimeline />
      <TechStackSlider />
      <ProjectsShowcase />
      <NpmContributions />
      <ContactForm />
    </main>
  );
}
