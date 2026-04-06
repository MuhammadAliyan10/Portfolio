import { Mail, ArrowRight, ExternalLink } from "lucide-react";

export default function Page() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-600 selection:text-white font-sans px-6 md:px-12 lg:px-24 py-16 md:py-32">
      <div className="max-w-4xl mx-auto space-y-24 md:space-y-32">
        {/* Hero Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-sm font-medium text-blue-500 tracking-widest uppercase">
              Muhammad Aliyan Nadeem
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              I architect and deploy high-performance, fault-tolerant software
              systems.
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed">
              Specializing in zero-to-one SaaS development, distributed
              architectures, and real-time infrastructure.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
            <a
              href="mailto:aliyannadeem10@gmail.com"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors flex items-center gap-2 group"
            >
              Discuss a Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com/MuhammadAliyan10"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                GitHub
                <ExternalLink size={14} />
              </a>
              <a
                href="https://linkedin.com/in/muhammad-aliyan-1900a7275"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                LinkedIn
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* Proof of Work */}
        <section className="space-y-12">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 border-b border-gray-800 pb-4">
            Proof of Work
          </h3>

          <div className="space-y-16">
            {/* Project 1 */}
            <div className="group space-y-4">
              <div className="flex items-baseline justify-between gap-4">
                <h4 className="text-2xl font-bold">Quanta</h4>
                <span className="text-xs text-blue-500 font-mono">
                  Browser Automation SaaS
                </span>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
                Architecting a high-throughput, distributed platform engineered
                with Go, NATS, and Temporal.io for fault-tolerant workflow
                orchestration and scalable commercial execution.
              </p>
            </div>

            {/* Project 2 */}
            <div className="group space-y-4">
              <div className="flex items-baseline justify-between gap-4">
                <h4 className="text-2xl font-bold">Sentinel</h4>
                <span className="text-xs text-blue-500 font-mono">
                  Access Control
                </span>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
                Engineered a comprehensive security suite for live events
                featuring role-based web portals and a React Native mobile
                scanner. Architected a Supabase backend that successfully
                validated 468 concurrent attendees during peak traffic spikes
                with zero downtime.
              </p>
            </div>

            {/* Project 3 */}
            <div className="group space-y-4">
              <div className="flex items-baseline justify-between gap-4">
                <h4 className="text-2xl font-bold">Pacedream</h4>
                <span className="text-xs text-blue-500 font-mono">
                  Frontend Engineering
                </span>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
                Executed critical UI features for a US-based travel platform
                during an 8-week rapid development sprint. Engineered core
                flight booking interfaces integrating backend REST APIs under
                strict startup constraints.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Arsenal */}
        <section className="space-y-12">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 border-b border-gray-800 pb-4">
            Technical Arsenal
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h5 className="text-sm text-gray-500 font-medium">Languages</h5>
              <div className="flex flex-wrap gap-2">
                {[
                  "TypeScript",
                  "JavaScript",
                  "Python",
                  "Go",
                  "German (B1)",
                ].map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-gray-900 text-gray-300 text-sm border border-gray-800"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-sm text-gray-500 font-medium">
                Frontend & Mobile
              </h5>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "React", "React Native", "Tailwind CSS"].map(
                  (item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-gray-900 text-gray-300 text-sm border border-gray-800"
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-sm text-gray-500 font-medium">
                Backend & APIs
              </h5>
              <div className="flex flex-wrap gap-2">
                {["Node.js", "Express", "Flask", "FastAPI", "REST APIs"].map(
                  (item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-gray-900 text-gray-300 text-sm border border-gray-800"
                    >
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-sm text-gray-500 font-medium">
                Infrastructure & DB
              </h5>
              <div className="flex flex-wrap gap-2">
                {[
                  "PostgreSQL",
                  "MySQL",
                  "MongoDB",
                  "Redis",
                  "Supabase",
                  "AWS",
                  "Azure",
                  "Temporal",
                  "CI/CD",
                  "Distributed Systems",
                ].map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-gray-900 text-gray-300 text-sm border border-gray-800"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-16 border-t border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-2">
            <p className="text-gray-400">
              Available for contract architecture and full-stack development.
            </p>
            <p className="text-sm text-gray-600">
              © {currentYear} Muhammad Aliyan Nadeem.
            </p>
          </div>
          <a
            href="mailto:aliyannadeem10@gmail.com"
            className="text-blue-500 hover:text-blue-400 font-medium flex items-center gap-2 group"
          >
            aliyannadeem10@gmail.com
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </footer>
      </div>
    </main>
  );
}
