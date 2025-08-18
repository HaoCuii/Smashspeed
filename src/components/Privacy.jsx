// src/components/Privacy.jsx
import React from 'react'
import Background from './Background'

const Privacy = () => (
  <Background>
    <section id="privacy-policy" className="relative z-10 py-20 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Glass-morphism panel */}
        <div className="relative rounded-[35px] bg-white/5 backdrop-blur-xl overflow-hidden shadow-black/10 shadow-2xl">
          {/* subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/15 via-white/5 to-transparent" />
          {/* thin white stroke */}
          <div className="absolute inset-0 rounded-[35px] border border-white/20" />

          {/* content */}
          <div className="relative p-8 space-y-6 text-gray-200">
            <h1 className="text-4xl font-bold" style={{ color: '#007AFF' }}>
              Privacy Policy
            </h1>
            <p className="text-sm">Effective Date: July 15, 2025</p>

            <p>
              Your privacy is important to us. This Privacy Policy outlines how Smashspeed collects,
              uses, stores, and protects your information.
            </p>

            <ol className="list-decimal list-inside space-y-4">
              <li>
                <strong>What We Collect</strong><br />
                We collect the following types of information:
                <ul className="list-disc list-inside ml-6">
                  <li>Videos you upload: Used for analysis and to train/refine our AI.</li>
                  <li>Device and usage data: Includes device type, OS version, error logs, and usage patterns.</li>
                  <li>Optional account info: Email, etc., if you register an account.</li>
                </ul>
              </li>

              <li>
                <strong>How We Use Your Data</strong><br />
                We use your data to:
                <ul className="list-disc list-inside ml-6">
                  <li>Provide shuttle speed analysis and rally breakdowns</li>
                  <li>Enhance and refine our machine learning models</li>
                  <li>Monitor app performance and diagnose issues</li>
                  <li>Understand usage trends to improve UX</li>
                </ul>
                Your videos are never shared with third parties and are not used for advertising or profiling.
              </li>

              <li>
                <strong>Data Storage and Security</strong><br />
                All videos and data are stored on secure servers with industry-standard encryption.
                Access to training data is restricted to authorized personnel only, and we regularly
                audit our systems for vulnerabilities.
              </li>

              <li>
                <strong>User Rights and Controls</strong><br />
                You have the right to:
                <ul className="list-disc list-inside ml-6">
                  <li>Delete your account at any time</li>
                  <li>Request deletion of your uploaded videos and data</li>
                  <li>Withdraw consent by discontinuing use of the app</li>
                </ul>
                We honor these requests promptly and completely.
              </li>

              <li>
                <strong>Children’s Privacy</strong><br />
                Smashspeed is safe for all ages. We do not knowingly collect personal information
                from children beyond what is necessary for video analysis. Parents or guardians may
                contact us to delete any child’s data.
              </li>

              <li>
                <strong>Third-Party Services</strong><br />
                We may use third-party analytics (e.g. Google Analytics for Firebase) to understand
                app usage. These tools collect anonymized technical data only and do not access your
                personal videos or content.
              </li>

              <li>
                <strong>Changes to This Policy</strong><br />
                We can revise this Privacy Policy from time to time. Material changes will be
                communicated in-app or on our website. Continued use of Smashspeed indicates your
                acceptance of any updates.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  </Background>
)

export default Privacy
