import SectionHeading from "@/components/common/SectionHeading";
import ProjectGallery from "@/components/gallery/ProjectGallery";
import Button from "@/components/common/Button";
import { getFeaturedProjects } from "@/data/projects";

export default function FeaturedProjects() {
  const featured = getFeaturedProjects(6);
  return (
    <section className="bg-forest-50/50 py-16 sm:py-24" aria-labelledby="projects-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="Our Work"
          title="Featured Projects"
          description="A look at some of the landscaping and hardscaping work we've completed across the Bay Area. Filter by category and click any project to see more."
        />
        <div className="mt-12">
          <ProjectGallery projects={featured} paginate={false} />
        </div>
        <div className="mt-12 text-center">
          <Button href="/projects" variant="primary" size="lg">
            View Full Gallery
          </Button>
        </div>
      </div>
    </section>
  );
}
