import { Navigation } from "@/app/ui/Navigation";

export default function AboutPage() {
  return (
    <main className="min-h-screen p-8 sm:p-12 max-w-6xl mx-auto">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Portfolio</h1>
          <p className="text-neutral-600 mt-1">Photography & Videography</p>
        </div>
        <Navigation />
      </header>
      
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <div className="prose prose-neutral max-w-none">
            <p className="text-lg text-neutral-700 leading-relaxed">
              I'm a passionate photographer and videographer with a keen eye for capturing moments that tell compelling stories. 
              My work spans across various genres, from portrait photography to filmmaking, always striving to 
              create authentic and visually striking content.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Experience</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-neutral-200 pl-4">
              <h4 className="font-medium">Freelance Photographer & Videographer</h4>
              <p className="text-sm text-neutral-600">2018 - Present</p>
              <p className="text-neutral-700 mt-1">
                Specializing in portrait photography, event coverage, and commercial videography. 
                Working with clients across various industries to create compelling visual content.
              </p>
            </div>
            <div className="border-l-4 border-neutral-200 pl-4">
              <h4 className="font-medium">Freelance Filmmaker</h4>
              <p className="text-sm text-neutral-600">2025 - Present</p>
              <p className="text-neutral-700 mt-1">
                Created award-winning documentary films focusing on social issues and human stories. 
                Projects have been featured in film festivals and educational institutions.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Skills & Expertise</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Photography</h4>
              <ul className="text-sm text-neutral-700 space-y-1">
                <li>• Portrait Photography</li>
                <li>• Event Photography</li>
                <li>• Commercial Photography</li>
                <li>• Photo Editing & Retouching</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Videography</h4>
              <ul className="text-sm text-neutral-700 space-y-1">
                <li>• Documentary Filmmaking</li>
                <li>• Commercial Video Production</li>
                <li>• Video Editing & Post-Production</li>
                <li>• Motion Graphics</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <div className="space-y-2 text-neutral-700">
            <p>📧 <a href="mailto:chris.edward.wan@gmail.com" className="underline hover:no-underline">chris.edward.wan@gmail.com</a></p>
            <p>📱 <a href="tel:+15107098975" className="underline hover:no-underline">+1 (510) 709-8975</a></p>
            <p>📍 Based in Irvine, CA</p>
          </div>
        </div>
      </section>
    </main>
  );
}
