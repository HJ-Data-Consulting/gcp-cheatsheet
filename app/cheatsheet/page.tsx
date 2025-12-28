import Link from 'next/link';
import { Terminal, Database, Cloud, Globe, Shield, Play } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto pt-10 pb-20 animate-fade-in-up">
      {/* Hero Section */}
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <h1 className="section-title">gcloud Cheat Sheet</h1>
        <p className="section-subtitle">
          Essential CLI commands for Google Cloud Platform. <br/>
          Reference for the modern developer.
        </p>
      </div>

      {/* Command Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">

        {/* Getting Started */}
        <div className="card-apple">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <Play className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-apple-dark dark:text-white">Getting Started</h2>
            </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Initialize gcloud</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud init</code>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Set default project</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud config set project &lt;project-id&gt;</code>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">List configurations</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud config list</code>
            </div>

             <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Authenticate</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud auth login</code>
            </div>
          </div>
        </div>

        {/* Compute Engine */}
        <div className="card-apple">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                    <Terminal className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="text-xl font-semibold text-apple-dark dark:text-white">Compute Engine</h2>
            </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">List instances</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud compute instances list</code>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Create an instance</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud compute instances create &lt;name&gt; --zone=&lt;zone&gt;</code>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Start an instance</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud compute instances start &lt;name&gt;</code>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">SSH into instance</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud compute ssh &lt;instance-name&gt;</code>
            </div>
          </div>
        </div>

        {/* Cloud Storage */}
        <div className="card-apple">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <Database className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold text-apple-dark dark:text-white">Cloud Storage</h2>
            </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">List buckets</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gsutil ls</code>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Create a bucket</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gsutil mb gs://&lt;bucket-name&gt;</code>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Upload file</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gsutil cp &lt;file&gt; gs://&lt;bucket&gt;/</code>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Download file</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gsutil cp gs://&lt;bucket&gt;/&lt;file&gt; .</code>
            </div>
          </div>
        </div>

        {/* Kubernetes Engine (GKE) */}
        <div className="card-apple">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <Cloud className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-apple-dark dark:text-white">Kubernetes (GKE)</h2>
            </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">List clusters</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud container clusters list</code>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Create cluster</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud container clusters create &lt;name&gt;</code>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Get credentials</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud container clusters get-credentials &lt;name&gt;</code>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Delete cluster</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud container clusters delete &lt;name&gt;</code>
            </div>
          </div>
        </div>

        {/* Cloud Functions */}
        <div className="card-apple">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                    <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-xl font-semibold text-apple-dark dark:text-white">Cloud Functions</h2>
            </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">List functions</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud functions list</code>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Deploy function</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud functions deploy &lt;name&gt; --runtime=&lt;runtime&gt;</code>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">View logs</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud functions logs read &lt;name&gt;</code>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Delete function</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud functions delete &lt;name&gt;</code>
            </div>
          </div>
        </div>

        {/* Cloud SQL */}
        <div className="card-apple">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
                    <Database className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-xl font-semibold text-apple-dark dark:text-white">Cloud SQL</h2>
            </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">List instances</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud sql instances list</code>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Create instance</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud sql instances create &lt;name&gt; --tier=&lt;tier&gt;</code>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Connect to instance</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud sql connect &lt;instance&gt; --user=root</code>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Create database</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud sql databases create &lt;db-name&gt; --instance=&lt;instance&gt;</code>
            </div>
          </div>
        </div>

        {/* IAM & Admin */}
        <div className="card-apple">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-50 dark:bg-red-900/30 rounded-lg">
                    <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-xl font-semibold text-apple-dark dark:text-white">IAM & Admin</h2>
            </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">List service accounts</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud iam service-accounts list</code>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Create service account</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud iam service-accounts create &lt;name&gt;</code>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Add IAM policy binding</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud projects add-iam-policy-binding &lt;project-id&gt; \<br />  --member=&lt;member&gt; --role=&lt;role&gt;</code>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">List IAM policies</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud projects get-iam-policy &lt;project-id&gt;</code>
            </div>
          </div>
        </div>

        {/* App Engine */}
        <div className="card-apple">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                    <Cloud className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-xl font-semibold text-apple-dark dark:text-white">App Engine</h2>
            </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Deploy application</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud app deploy</code>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">View app in browser</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud app browse</code>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">View logs</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud app logs tail -s default</code>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">List versions</h3>
              <code className="block bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg text-xs font-mono text-gray-800 dark:text-gray-200">gcloud app versions list</code>
            </div>
          </div>
        </div>

      </div>

      {/* Additional Resources Section */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-16">
        <h2 className="text-2xl font-semibold mb-8 text-center text-apple-dark dark:text-white">Explore More</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/cheatsheet/topics" className="card-apple group hover:bg-gray-50 dark:hover:bg-gray-800">
            <h3 className="text-lg font-semibold mb-2 text-apple-blue group-hover:underline">📚 Topics</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Detailed guides on GCP services and best practices</p>
          </Link>

          <Link href="/cheatsheet/errors" className="card-apple group hover:bg-gray-50 dark:hover:bg-gray-800">
            <h3 className="text-lg font-semibold mb-2 text-apple-blue group-hover:underline">⚠️ Common Errors</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Solutions to frequently encountered GCP errors</p>
          </Link>

          <Link href="/cheatsheet/search" className="card-apple group hover:bg-gray-50 dark:hover:bg-gray-800">
            <h3 className="text-lg font-semibold mb-2 text-apple-blue group-hover:underline">🔍 Search</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Find commands, guides, and solutions quickly</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

