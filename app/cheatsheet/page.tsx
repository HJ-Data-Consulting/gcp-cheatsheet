import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">gcloud Cheat Sheet</h1>
        <p className="text-xl text-gray-600">
          Quick reference for essential Google Cloud Platform CLI commands
        </p>
      </div>

      {/* Command Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">

        {/* Getting Started */}
        <div className="notebook-card text-blue-500 rounded-lg shadow-md p-6 border-t-4 border-blue-500">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Getting Started</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Initialize gcloud:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud init</code>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Set default project:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud config set project &lt;project-id&gt;</code>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">List configurations:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud config list</code>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Authenticate:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud auth login</code>
            </div>
          </div>
        </div>

        {/* Compute Engine */}
        <div className="notebook-card text-yellow-500 rounded-lg shadow-md p-6 border-t-4 border-yellow-500">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Compute Engine</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">List instances:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud compute instances list</code>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Create an instance:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud compute instances create &lt;name&gt; --zone=&lt;zone&gt;</code>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Start an instance:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud compute instances start &lt;name&gt;</code>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">SSH into instance:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud compute ssh &lt;instance-name&gt;</code>
            </div>
          </div>
        </div>

        {/* Cloud Storage */}
        <div className="notebook-card text-green-500 rounded-lg shadow-md p-6 border-t-4 border-green-500">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Cloud Storage</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">List buckets:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gsutil ls</code>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Create a bucket:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gsutil mb gs://&lt;bucket-name&gt;</code>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Upload file:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gsutil cp &lt;file&gt; gs://&lt;bucket&gt;/</code>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Download file:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gsutil cp gs://&lt;bucket&gt;/&lt;file&gt; .</code>
            </div>
          </div>
        </div>

        {/* Kubernetes Engine (GKE) */}
        <div className="notebook-card text-blue-600 rounded-lg shadow-md p-6 border-t-4 border-blue-600">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Kubernetes Engine (GKE)</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">List clusters:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud container clusters list</code>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Create cluster:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud container clusters create &lt;name&gt;</code>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Get credentials:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud container clusters get-credentials &lt;name&gt;</code>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Delete cluster:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud container clusters delete &lt;name&gt;</code>
            </div>
          </div>
        </div>

        {/* Cloud Functions */}
        <div className="notebook-card text-orange-500 rounded-lg shadow-md p-6 border-t-4 border-orange-500">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Cloud Functions</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">List functions:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud functions list</code>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Deploy function:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud functions deploy &lt;name&gt; --runtime=&lt;runtime&gt;</code>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">View logs:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud functions logs read &lt;name&gt;</code>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Delete function:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud functions delete &lt;name&gt;</code>
            </div>
          </div>
        </div>

        {/* Cloud SQL */}
        <div className="notebook-card text-purple-500 rounded-lg shadow-md p-6 border-t-4 border-purple-500">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Cloud SQL</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">List instances:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud sql instances list</code>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Create instance:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud sql instances create &lt;name&gt; --tier=&lt;tier&gt;</code>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Connect to instance:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud sql connect &lt;instance&gt; --user=root</code>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Create database:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud sql databases create &lt;db-name&gt; --instance=&lt;instance&gt;</code>
            </div>
          </div>
        </div>

        {/* IAM & Admin */}
        <div className="notebook-card text-pink-500 rounded-lg shadow-md p-6 border-t-4 border-pink-500">
          <h2 className="text-2xl font-bold mb-4 text-red-600">IAM & Admin</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">List service accounts:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud iam service-accounts list</code>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Create service account:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud iam service-accounts create &lt;name&gt;</code>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Add IAM policy binding:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud projects add-iam-policy-binding &lt;project-id&gt; \<br />  --member=&lt;member&gt; --role=&lt;role&gt;</code>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">List IAM policies:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud projects get-iam-policy &lt;project-id&gt;</code>
            </div>
          </div>
        </div>

        {/* App Engine */}
        <div className="notebook-card text-indigo-500 rounded-lg shadow-md p-6 border-t-4 border-indigo-500">
          <h2 className="text-2xl font-bold mb-4 text-red-600">App Engine</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Deploy application:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud app deploy</code>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">View app in browser:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud app browse</code>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">View logs:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud app logs tail -s default</code>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">List versions:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">gcloud app versions list</code>
            </div>
          </div>
        </div>

      </div>

      {/* Additional Resources Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Explore More</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/cheatsheet/topics" className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2 text-blue-600">📚 Topics</h3>
            <p className="text-gray-600">Detailed guides on GCP services and best practices</p>
          </Link>

          <Link href="/cheatsheet/errors" className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2 text-red-600">⚠️ Common Errors</h3>
            <p className="text-gray-600">Solutions to frequently encountered GCP errors</p>
          </Link>

          <Link href="/cheatsheet/search" className="bg-white rounded-lg p-6 shadow hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2 text-green-600">🔍 Search</h3>
            <p className="text-gray-600">Find commands, guides, and solutions quickly</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

