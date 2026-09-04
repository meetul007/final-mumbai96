import TocNav from "@/components/common/TocNav";

export const metadata = {
  title: "Privacy Policy — Mumbai96",
  description: "Mumbai96 privacy policy — how we collect, use, and protect your data. Your privacy matters to us.",
};

export default function PrivacyPolicy() {
  const tocItems = [
    ["p1", "1. Introduction"],
    ["p2", "2. Information We Collect"],
    ["p3", "3. How We Use Your Data"],
    ["p4", "4. Cookies & Tracking"],
    ["p5", "5. Data Sharing"],
    ["p6", "6. Data Security"],
    ["p7", "7. Data Retention"],
    ["p8", "8. Your Rights"],
    ["p9", "9. Children's Privacy"],
    ["p10", "10. Third-party Links"],
    ["p11", "11. Changes to Policy"],
    ["p12", "12. Contact Us"],
  ];

  return (
    <>
      {/* HERO */}
      <div className="legal-hero">
        <div className="con legal-hero-inner">
          <div className="legal-kicker">Legal · Mumbai96</div>
          <h1 className="legal-h1">
            PRIVACY
            &nbsp;
            <em>POLICY.</em>
          </h1>
          <div className="legal-meta">
            <strong>Effective Date:</strong> 1 January 2025 &nbsp;·&nbsp;
            <strong>Last Updated:</strong> 17 March 2026 &nbsp;·&nbsp;
            <strong>Version:</strong> 2.0
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="legal-body">
        <div className="con">
          <div className="legal-grid">
            {/* TOC */}
            <div className="legal-toc">
              <TocNav items={tocItems} />
            </div>

            {/* CONTENT */}
            <div className="legal-content">
              <div className="highlight-box">
                <strong>Your privacy matters to us.</strong> Mumbai96 does not
                sell, rent, or trade your personal data to any third party,
                advertiser, or data broker. Ever. This policy explains clearly
                what we collect, why we collect it, and how you can control it.
              </div>

              <div className="legal-section" id="p1">
                <h2>
                  <span className="ls-num">01</span>INTRODUCTION
                </h2>
                <p>
                  Mumbai96 ("we", "us", or "our") is committed to protecting the
                  privacy of our users. This Privacy Policy describes how we
                  collect, use, store, and protect information when you use our
                  platform at{" "}
                  <a href="https://mumbai96.vercel.app">mumbai96.vercel.app</a>{" "}
                  and all associated services.
                </p>
                <p>
                  This policy applies to all visitors, registered users,
                  business owners with listings, and anyone who interacts with
                  Mumbai96 in any way. By using our platform, you consent to the
                  practices described in this policy.
                </p>
                <p>
                  This policy is compliant with the{" "}
                  <strong>Information Technology Act, 2000</strong>, the{" "}
                  <strong>Information Technology (Amendment) Act, 2008</strong>,
                  the{" "}
                  <strong>
                    IT (Reasonable Security Practices) Rules, 2011
                  </strong>
                  , and applicable provisions of India's emerging data
                  protection framework.
                </p>
              </div>

              <div className="legal-section" id="p2">
                <h2>
                  <span className="ls-num">02</span>INFORMATION WE COLLECT
                </h2>
                <h3>Information You Provide Directly</h3>
                <ul>
                  <li>
                    <strong>Account Registration:</strong> Name, email address,
                    phone number, password
                  </li>
                  <li>
                    <strong>Business Listings:</strong> Business name,
                    description, address, phone, email, website, photos, hours
                  </li>
                  <li>
                    <strong>Enquiry Forms:</strong> Name, phone, email, message
                    content
                  </li>
                  <li>
                    <strong>Fraud Reports:</strong> Description of reported
                    fraud (anonymous submission available)
                  </li>
                  <li>
                    <strong>Contact Forms:</strong> Name, email, phone, message
                  </li>
                  <li>
                    <strong>Reviews:</strong> Star rating, review text, name
                  </li>
                </ul>
                <h3>Information Collected Automatically</h3>
                <ul>
                  <li>
                    <strong>Usage Data:</strong> Pages visited, time spent,
                    features used, clicks
                  </li>
                  <li>
                    <strong>Device Information:</strong> Browser type, operating
                    system, screen resolution
                  </li>
                  <li>
                    <strong>IP Address:</strong> Used for approximate location
                    (city-level) and security
                  </li>
                  <li>
                    <strong>Referral Data:</strong> How you arrived at Mumbai96
                    (search engine, direct, social)
                  </li>
                </ul>
                <h3>Information from Third Parties</h3>
                <p>
                  If you sign in using Google OAuth, we receive your name, email
                  address, and profile picture from Google, as permitted by your
                  Google privacy settings. We do not access any other Google
                  account data.
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>Data Type</th>
                      <th>Source</th>
                      <th>Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Name &amp; Email</td>
                      <td>You / Google OAuth</td>
                      <td>Account identification</td>
                    </tr>
                    <tr>
                      <td>Phone Number</td>
                      <td>You</td>
                      <td>Business contact, alerts</td>
                    </tr>
                    <tr>
                      <td>IP Address</td>
                      <td>Automatic</td>
                      <td>Security, approximate location</td>
                    </tr>
                    <tr>
                      <td>Usage Analytics</td>
                      <td>Automatic</td>
                      <td>Platform improvement</td>
                    </tr>
                    <tr>
                      <td>Business Photos</td>
                      <td>You</td>
                      <td>Display on your listing</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="legal-section" id="p3">
                <h2>
                  <span className="ls-num">03</span>HOW WE USE YOUR DATA
                </h2>
                <p>
                  We use the information we collect for the following purposes:
                </p>
                <ul>
                  <li>
                    <strong>Operating the Platform:</strong> Creating and
                    managing your account, displaying your listings, processing
                    enquiries
                  </li>
                  <li>
                    <strong>Communication:</strong> Sending enquiry
                    notifications, service updates, and security alerts
                  </li>
                  <li>
                    <strong>Safety &amp; Fraud Prevention:</strong> Detecting,
                    investigating and preventing fraudulent listings and abuse
                  </li>
                  <li>
                    <strong>Platform Improvement:</strong> Analysing usage
                    patterns to improve features and user experience
                  </li>
                  <li>
                    <strong>Search &amp; Discovery:</strong> Indexing your
                    listing content to make it searchable by users
                  </li>
                  <li>
                    <strong>Legal Compliance:</strong> Meeting our obligations
                    under applicable Indian law
                  </li>
                </ul>
                <div className="highlight-box">
                  <strong>
                    We do not use your data for advertising targeting,
                    profiling, or any commercial purpose beyond operating our
                    free platform.
                  </strong>
                </div>
                <h3>Legal Bases for Processing</h3>
                <ul>
                  <li>
                    <strong>Contract performance</strong> — processing necessary
                    to provide you with our Service
                  </li>
                  <li>
                    <strong>Legitimate interests</strong> — fraud prevention,
                    platform security, analytics
                  </li>
                  <li>
                    <strong>Consent</strong> — marketing communications (which
                    you may opt out of at any time)
                  </li>
                  <li>
                    <strong>Legal obligation</strong> — compliance with Indian
                    law and court orders
                  </li>
                </ul>
              </div>

              <div className="legal-section" id="p4">
                <h2>
                  <span className="ls-num">04</span>COOKIES &amp; TRACKING
                </h2>
                <p>
                  Mumbai96 uses cookies and similar technologies to provide core
                  platform functionality and improve your experience.
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>Cookie Type</th>
                      <th>Purpose</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Essential Cookies</td>
                      <td>Login session, security tokens, form protection</td>
                      <td>Session / 30 days</td>
                    </tr>
                    <tr>
                      <td>Preference Cookies</td>
                      <td>Language, display preferences</td>
                      <td>1 year</td>
                    </tr>
                    <tr>
                      <td>Analytics Cookies</td>
                      <td>
                        Anonymous usage statistics (no personal identification)
                      </td>
                      <td>90 days</td>
                    </tr>
                    <tr>
                      <td>Performance Cookies</td>
                      <td>Page load optimisation</td>
                      <td>Session</td>
                    </tr>
                  </tbody>
                </table>
                <p>
                  We do <strong>not</strong> use advertising cookies, tracking
                  pixels from ad networks, or any cookies that profile you for
                  commercial targeting.
                </p>
                <p>
                  You may disable cookies in your browser settings; however,
                  disabling essential cookies will prevent login and some
                  platform features from functioning correctly.
                </p>
              </div>

              <div className="legal-section" id="p5">
                <h2>
                  <span className="ls-num">05</span>DATA SHARING
                </h2>
                <p>
                  Mumbai96 does not sell, rent, or trade your personal data. We
                  may share limited information only in these specific
                  circumstances:
                </p>
                <ul>
                  <li>
                    <strong>Service Providers:</strong> Trusted third-party
                    vendors who operate our hosting, email delivery, and
                    analytics infrastructure, bound by strict data processing
                    agreements
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> When required by law,
                    court order, or lawful request from Indian government
                    authorities
                  </li>
                  <li>
                    <strong>Fraud &amp; Safety:</strong> With Mumbai Police
                    Cyber Cell or CERT-In when investigating fraud, cybercrime,
                    or serious safety concerns
                  </li>
                  <li>
                    <strong>Business Transfer:</strong> In the event of a
                    merger, acquisition, or asset sale, user data would transfer
                    subject to the same privacy protections
                  </li>
                </ul>
                <p>
                  When an enquiry is sent to a business via Mumbai96, your name,
                  phone, and message are shared directly with that business.
                  This is the core function of the enquiry feature — please be
                  mindful of what personal information you include in enquiry
                  messages.
                </p>
              </div>

              <div className="legal-section" id="p6">
                <h2>
                  <span className="ls-num">06</span>DATA SECURITY
                </h2>
                <p>
                  We implement industry-standard security measures to protect
                  your personal information:
                </p>
                <ul>
                  <li>All data transmitted via HTTPS with TLS encryption</li>
                  <li>
                    Passwords stored using bcrypt hashing — never in plain text
                  </li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>
                    Access controls ensuring staff access to personal data on a
                    need-to-know basis
                  </li>
                  <li>Secure cloud infrastructure with automated backups</li>
                </ul>
                <p>
                  Despite these measures, no internet transmission is 100%
                  secure. If you believe your account has been compromised,
                  contact us immediately at{" "}
                  <a href="mailto:security@mumbai96.com">
                    security@mumbai96.com
                  </a>
                  .
                </p>
                <p>
                  In the event of a data breach affecting your personal
                  information, we will notify you and relevant authorities
                  within 72 hours as required by applicable law.
                </p>
              </div>

              <div className="legal-section" id="p7">
                <h2>
                  <span className="ls-num">07</span>DATA RETENTION
                </h2>
                <table>
                  <thead>
                    <tr>
                      <th>Data Type</th>
                      <th>Retention Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Account &amp; profile data</td>
                      <td>Duration of account + 2 years after deletion</td>
                    </tr>
                    <tr>
                      <td>Business listing data</td>
                      <td>Duration listing is active + 1 year after removal</td>
                    </tr>
                    <tr>
                      <td>Enquiry messages</td>
                      <td>6 months from submission</td>
                    </tr>
                    <tr>
                      <td>Fraud reports</td>
                      <td>5 years (for regulatory compliance)</td>
                    </tr>
                    <tr>
                      <td>Analytics data (anonymised)</td>
                      <td>36 months</td>
                    </tr>
                    <tr>
                      <td>Server &amp; access logs</td>
                      <td>90 days</td>
                    </tr>
                  </tbody>
                </table>
                <p>
                  After the retention period, data is securely deleted or
                  anonymised. You may request earlier deletion of your personal
                  data by contacting us (subject to legal retention
                  obligations).
                </p>
              </div>

              <div className="legal-section" id="p8">
                <h2>
                  <span className="ls-num">08</span>YOUR RIGHTS
                </h2>
                <p>
                  You have the following rights regarding your personal data:
                </p>
                <ul>
                  <li>
                    <strong>Right to Access:</strong> Request a copy of all
                    personal data we hold about you
                  </li>
                  <li>
                    <strong>Right to Correction:</strong> Update or correct
                    inaccurate personal data in your account settings or by
                    contacting us
                  </li>
                  <li>
                    <strong>Right to Deletion:</strong> Request deletion of your
                    personal data (subject to legal retention obligations)
                  </li>
                  <li>
                    <strong>Right to Portability:</strong> Receive your data in
                    a structured, machine-readable format
                  </li>
                  <li>
                    <strong>Right to Object:</strong> Object to processing of
                    your data for analytics or direct marketing
                  </li>
                  <li>
                    <strong>Right to Withdraw Consent:</strong> Withdraw consent
                    for optional processing at any time
                  </li>
                </ul>
                <p>
                  To exercise any of these rights, email us at{" "}
                  <a href="mailto:privacy@mumbai96.com">privacy@mumbai96.com</a>{" "}
                  with the subject "Privacy Request — [Your Request Type]". We
                  will respond within 30 days. Verification of identity may be
                  required.
                </p>
              </div>

              <div className="legal-section" id="p9">
                <h2>
                  <span className="ls-num">09</span>CHILDREN'S PRIVACY
                </h2>
                <p>
                  Mumbai96 is not directed at children under the age of 13. We
                  do not knowingly collect personal information from children
                  under 13. If you are a parent or guardian and believe your
                  child has provided us with personal information, please
                  contact us immediately at{" "}
                  <a href="mailto:info@mumbai96.com">info@mumbai96.com</a> and
                  we will delete that information promptly.
                </p>
                <p>
                  Users between 13 and 18 years of age must have parental
                  consent before creating an account or submitting any personal
                  information.
                </p>
              </div>

              <div className="legal-section" id="p10">
                <h2>
                  <span className="ls-num">10</span>THIRD-PARTY LINKS
                </h2>
                <p>
                  Mumbai96 may contain links to third-party websites, including
                  business websites, Google Maps, social media profiles, and
                  government resources. These links are provided for convenience
                  only.
                </p>
                <p>
                  We have no control over the privacy practices or content of
                  third-party sites. Once you leave Mumbai96, this Privacy
                  Policy no longer applies. We encourage you to review the
                  privacy policies of any third-party sites you visit.
                </p>
              </div>

              <div className="legal-section" id="p11">
                <h2>
                  <span className="ls-num">11</span>CHANGES TO THIS POLICY
                </h2>
                <p>
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices, technology, legal requirements, or
                  for other operational reasons. All changes will be posted on
                  this page with an updated "Last Updated" date.
                </p>
                <p>
                  For material changes — changes that significantly affect how
                  we process your personal data — we will provide prominent
                  notice via email (to the address on your account) or via a
                  notice on our platform, at least 14 days before the change
                  takes effect.
                </p>
                <p>
                  Your continued use of Mumbai96 after any changes to this
                  policy constitutes your acceptance of the updated terms.
                </p>
              </div>

              <div className="legal-section" id="p12">
                <h2>
                  <span className="ls-num">12</span>CONTACT US
                </h2>
                <p>
                  For any privacy-related questions, requests, or concerns,
                  please contact our Privacy Officer:
                </p>
                <ul>
                  <li>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:privacy@mumbai96.com">
                      privacy@mumbai96.com
                    </a>
                  </li>
                  <li>
                    <strong>General Enquiries:</strong>{" "}
                    <a href="mailto:info@mumbai96.com">info@mumbai96.com</a>
                  </li>
                  <li>
                    <strong>Phone:</strong> +91 9819365030
                  </li>
                  <li>
                    <strong>Address:</strong> Mumbai96 Privacy Officer, Laxmi
                    Plaza, Laxmi Industrial Estate, Andheri West, Mumbai —
                    400053
                  </li>
                </ul>
                <p>
                  If you are unsatisfied with our response to a privacy concern,
                  you may lodge a complaint with the relevant Indian data
                  protection authority or seek legal recourse in the courts of
                  Mumbai, Maharashtra.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
