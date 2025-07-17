// src/components/Terms.jsx
import React from 'react'
import Background from './Background'

const Terms = () => (
  <Background>
    <section id="terms-of-service" className="relative z-10 py-20 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Glass-morphism panel */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 space-y-6">
          <h1
            className="text-4xl font-bold"
            style={{ color: '#007AFF' }}
          >
            Terms of Service
          </h1>

          <p className="text-sm text-gray-200">Effective Date: July 15, 2025</p>

          <p className="text-gray-200">
            Welcome to <strong>Smashspeed</strong>, an AI-powered mobile app that analyzes badminton
            rallies and calculates shuttle speed using advanced computer vision and machine
            learning. These Terms of Service (“Terms”) govern your use of Smashspeed and any related
            features, content, or services we provide. By downloading, accessing, or using
            Smashspeed, you agree to these Terms and our Privacy Policy. If you do not agree, please
            do not use the app.
          </p>

          <ol className="list-decimal list-inside space-y-4 text-gray-200">
            <li>
              <strong>Eligibility</strong><br />
              Smashspeed is intended for users of all ages. If you are under the age of majority in
              your jurisdiction, you must have a parent or guardian’s permission to use this app. We
              recommend that younger users seek adult guidance when uploading or analyzing videos.
            </li>

            <li>
              <strong>Use of the App</strong><br />
              Smashspeed allows you to:
              <ul className="list-disc list-inside ml-6">
                <li>Upload badminton rally videos</li>
                <li>Receive AI-generated speed and trajectory analysis</li>
                <li>Access analytics tools for personal skill improvement</li>
              </ul>
              You agree to use the app only for lawful, personal, and non-commercial purposes. You
              may not use Smashspeed in a way that violates applicable laws or regulations.
            </li>

            <li>
              <strong>User-Generated Content</strong><br />
              You retain full ownership of the videos you upload. By uploading content, you grant
              Smashspeed a non-exclusive, royalty-free, worldwide license to use, store, and analyze
              your videos solely for improving our AI algorithms. We do not share your videos with
              third parties; they are used only internally for training, testing, and enhancing
              accuracy.
            </li>

            <li>
              <strong>Accounts and Security</strong><br />
              Some features may require you to create an account. You agree to:
              <ul className="list-disc list-inside ml-6">
                <li>Provide accurate information during registration</li>
                <li>Keep your login credentials secure</li>
                <li>Accept responsibility for any activity under your account</li>
              </ul>
              If you believe your account has been compromised, please contact us immediately.
            </li>

            <li>
              <strong>Prohibited Conduct</strong><br />
              By using Smashspeed, you agree not to:
              <ul className="list-disc list-inside ml-6">
                <li>Upload content that is harmful, illegal, abusive, or infringing</li>
                <li>Reverse engineer, decompile, or alter the app</li>
                <li>Distribute false or misleading information about the app or its capabilities</li>
                <li>Attempt to gain unauthorized access to our systems or data</li>
              </ul>
            </li>

            <li>
              <strong>Modifications to Terms or Service</strong><br />
              We may update these Terms occasionally. Changes will be posted in-app or on our
              website. Continued use of the app after changes means you accept the revised Terms.
            </li>

            <li>
              <strong>Intellectual Property</strong><br />
              All content in Smashspeed (excluding user-submitted videos)—including branding, logos,
              UI design, and software—is owned by us or licensed to us. You may not copy, modify,
              or distribute any part of the app without our permission.
            </li>

            <li>
              <strong>Disclaimer of Warranties</strong><br />
              Smashspeed is provided “as is.” While we strive for accurate analysis, we do not
              guarantee correctness, completeness, or fitness for a particular purpose. Use the app
              at your own risk.
            </li>

            <li>
              <strong>Limitation of Liability</strong><br />
              To the extent permitted by law, Smashspeed is not liable for:
              <ul className="list-disc list-inside ml-6">
                <li>Any indirect, incidental, or consequential damages</li>
                <li>Any loss of data, reputation, or opportunity</li>
                <li>Issues arising from inaccurate AI predictions</li>
              </ul>
            </li>

            <li>
              <strong>Termination</strong><br />
              We reserve the right to suspend or terminate your access to the app if you violate these
              Terms, with or without notice.
            </li>

            <li>
              <strong>Governing Law</strong><br />
              These Terms shall be governed by the laws of British Columbia, Canada, without regard to
              conflict of law principles.
            </li>
          </ol>
        </div>
      </div>
    </section>
  </Background>
)

export default Terms
