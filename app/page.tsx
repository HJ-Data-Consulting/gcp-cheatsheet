import Link from 'next/link';
import { BookOpen, Box, Server, Terminal, Shield } from 'lucide-react';

export default function Home() {
    return (
        <div className="animate-fade-in-up pb-20">
            {/* Hero Section */}
            <div className="text-center pt-20 pb-24 max-w-3xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-apple-dark dark:text-white mb-6">
                    The Cloud. <span className="text-gray-400">Simplified.</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-500 font-normal leading-relaxed max-w-2xl mx-auto">
                    Essential tools and knowledge for developers. <br className="hidden md:block" />
                    No fluff. Just shipping.
                </p>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-6">
                
                {/* Card 1: Cheat Sheet */}
                <Link href="/cheatsheet" className="group block">
                    <div className="card-apple h-[400px] flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.01] transition-transform duration-500">
                        <div className="z-10">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Knowledge Base</h3>
                            <h2 className="text-3xl font-semibold text-apple-dark dark:text-white">GCP Cheat Sheet.</h2>
                            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-sm">
                                A searchable index of services and solutions. Stop digging through documentation.
                            </p>
                        </div>
                        <div className="absolute -bottom-12 -right-12 text-blue-50 opacity-10 dark:opacity-5 transform group-hover:scale-110 transition-transform duration-700">
                             <BookOpen size={300} strokeWidth={1} />
                        </div>
                        <div className="mt-auto">
                             <span className="text-apple-blue font-medium group-hover:underline">Browse Topics &rarr;</span>
                        </div>
                    </div>
                </Link>

                {/* Card 2: Startup Box */}
                <Link href="/tools/startup-box" className="group block">
                    <div className="card-apple h-[400px] flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.01] transition-transform duration-500 bg-black text-white">
                         <div className="z-10">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Generator</h3>
                            <h2 className="text-3xl font-semibold text-white">Startup in a Box.</h2>
                            <p className="mt-4 text-gray-400 max-w-sm">
                                Production-ready infrastructure in seconds. VPCs, VMs, and CI/CD pipelines generated for you.
                            </p>
                        </div>
                         <div className="absolute -bottom-12 -right-12 text-gray-800 opacity-30 transform group-hover:scale-110 transition-transform duration-700">
                             <Box size={300} strokeWidth={1} />
                        </div>
                        <div className="mt-auto">
                             <span className="text-blue-400 font-medium group-hover:underline">Configure Now &rarr;</span>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Secondary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <div className="card-apple p-8 flex flex-col items-center text-center">
                    <Server className="w-12 h-12 text-gray-400 mb-4" />
                    <h3 className="font-semibold text-apple-dark dark:text-white mb-2">Infrastructure as Code</h3>
                    <p className="text-sm text-gray-500">Terraform templates that follow best practices by default.</p>
                </div>
                 <div className="card-apple p-8 flex flex-col items-center text-center">
                    <Terminal className="w-12 h-12 text-gray-400 mb-4" />
                    <h3 className="font-semibold text-apple-dark dark:text-white mb-2">Local First</h3>
                    <p className="text-sm text-gray-500">Deploy from a self-contained Docker container. No messy dependencies.</p>
                </div>
                 <div className="card-apple p-8 flex flex-col items-center text-center">
                    <Shield className="w-12 h-12 text-gray-400 mb-4" />
                    <h3 className="font-semibold text-apple-dark dark:text-white mb-2">Secure by Design</h3>
                    <p className="text-sm text-gray-500"> VPCs, firewalls, and IAM roles configured for production safety.</p>
                </div>
            </div>
        </div>
    );
}