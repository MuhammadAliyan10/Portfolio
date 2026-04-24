import HeroAperture from "@/components/sections/HeroAperture";
import StoryIllumination from "@/components/sections/StoryIllumination";
import ExperienceArchive from "@/components/sections/ExperienceArchive";
import ProjectArchive from "@/components/sections/ProjectArchive";
import FooterContact from "@/components/sections/FooterContact";

export default function Home() {
  return (
    <main className="relative bg-black h-full">
      <HeroAperture />
      <StoryIllumination />
      <ExperienceArchive />
      <ProjectArchive />
      <FooterContact />
    </main>
  );
}
