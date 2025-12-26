import Link from 'next/link';
import { BookOpen, Box, Server, Terminal } from 'lucide-react';

export default function Home() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
                        Minimalist&apos;s Guide to the <span className="text-blue-600">Cloud</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        The essential toolkit for modern cloud developers. Knowledge, automation, and infrastructure stripped down to the essentials.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Cheat Sheet Card */}
                    <Link href="/cheatsheet" className="group">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 h-full">
                            <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                GCP Cheat Sheet
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300">
                                A searchable knowledge base of GCP services, common errors, and best practices. Stop searching StackOverflow.
                            </p>
                        </div>
                    </Link>

                    {/* Startup in a Box Card */}
                    <Link href="/tools/startup-box" className="group">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-400 h-full">
                            <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Box className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                Startup in a Box
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300">
                                One-click infrastructure generator. Get a production-ready GCP stack with Dev/Prod VMs, Git, and CI/CD in seconds.
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6">
                        <Server className="w-10 h-10 mx-auto text-slate-400 mb-4" />
                        <h3 className="font-semibold text-slate-900 dark:text-white">Infrastructure as Code</h3>
                        <p className="text-sm text-slate-500 mt-2">Best-practice Terraform templates generated for you.</p>
                    </div>
                    <div className="p-6">
                        <Terminal className="w-10 h-10 mx-auto text-slate-400 mb-4" />
                        <h3 className="font-semibold text-slate-900 dark:text-white">Local Installer</h3>
                        <p className="text-sm text-slate-500 mt-2">Run everything from a local Docker container. No dependency hell.</p>
                    </div>
                    <div className="p-6">
                        <Box className="w-10 h-10 mx-auto text-slate-400 mb-4" />
                        <h3 className="font-semibold text-slate-900 dark:text-white">Production Ready</h3>
                        <p className="text-sm text-slate-500 mt-2">Secure VPCs, Firewalls, and VM configurations out of the box.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
