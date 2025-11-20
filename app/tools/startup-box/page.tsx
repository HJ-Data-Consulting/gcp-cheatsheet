'use client';

import { useState } from 'react';
import { Download, Terminal, CheckCircle, Server } from 'lucide-react';

export default function StartupBoxPage() {
    const [config, setConfig] = useState({
        projectName: 'my-startup',
        region: 'us-central1',
        gitUser: 'admin'
    });

    const handleDownload = () => {
        // In a real app, this would trigger an API call to generate the zip
        alert("This would download the 'installer' folder as a zip file with your config baked in!");
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                        Startup in a Box <span className="text-purple-600">Configurator</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300">
                        Configure your GCP infrastructure stack and download the installer.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Configuration Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                                <Server className="w-5 h-5 text-purple-500" />
                                Stack Configuration
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                        Project Name (GCP)
                                    </label>
                                    <input
                                        type="text"
                                        value={config.projectName}
                                        onChange={(e) => setConfig({ ...config, projectName: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                        Region
                                    </label>
                                    <select
                                        value={config.region}
                                        onChange={(e) => setConfig({ ...config, region: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                    >
                                        <option value="us-central1">us-central1 (Iowa)</option>
                                        <option value="us-east1">us-east1 (South Carolina)</option>
                                        <option value="europe-west1">europe-west1 (Belgium)</option>
                                        <option value="asia-east1">asia-east1 (Taiwan)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                                        Git Username (for Dev VM)
                                    </label>
                                    <input
                                        type="text"
                                        value={config.gitUser}
                                        onChange={(e) => setConfig({ ...config, gitUser: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                            <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-white">Included Components</h2>
                            <ul className="space-y-3">
                                {[
                                    'VPC Network with Firewall Rules',
                                    'Development VM (e2-medium) with Git Server',
                                    'Production VM (e2-medium) with PM2',
                                    'Automated CI/CD Pipeline (Post-receive hooks)',
                                    'Dockerized Installer for One-Click Setup'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Download / Action Panel */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-900 text-white rounded-xl p-6 shadow-lg sticky top-8">
                            <h3 className="text-lg font-semibold mb-4">Ready to Build?</h3>
                            <p className="text-slate-400 text-sm mb-6">
                                Download the installer package. It includes the Dockerfile, Terraform scripts, and Ansible playbooks tailored to your config.
                            </p>

                            <button
                                onClick={handleDownload}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors mb-4"
                            >
                                <Download className="w-5 h-5" />
                                Download Installer
                            </button>

                            <div className="bg-slate-800 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-x-auto">
                                <div className="flex items-center gap-2 text-slate-500 mb-2">
                                    <Terminal className="w-3 h-3" />
                                    <span>How to run</span>
                                </div>
                                <p className="mb-2"># Unzip and enter directory</p>
                                <p className="mb-2">cd startup-installer</p>
                                <p className="mb-2"># Build the installer</p>
                                <p className="mb-2">docker build -t installer .</p>
                                <p># Run it!</p>
                                <p>docker run -it installer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
