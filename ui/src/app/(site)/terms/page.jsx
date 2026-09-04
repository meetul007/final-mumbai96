import TocNav from "@/components/common/TocNav";

export const metadata = {
  title: "Terms of Service — Mumbai96",
  description: "Mumbai96 terms of service — rules, guidelines, and legal agreement governing your use of the Mumbai96 platform.",
};

const tocItems = [
  ["s1", "1. Acceptance of Terms"],
  ["s2", "2. About Mumbai96"],
  ["s3", "3. User Accounts"],
  ["s4", "4. Listings & Content"],
  ["s5", "5. Prohibited Conduct"],
  ["s6", "6. Intellectual Property"],
  ["s7", "7. Fraud Prevention"],
  ["s8", "8. Disclaimers"],
  ["s9", "9. Limitation of Liability"],
  ["s10", "10. Termination"],
  ["s11", "11. Governing Law"],
  ["s12", "12. Contact"],
];
const Terms = () => {
  return (
    <>
      <div className="legal-hero">
        <div className="con legal-hero-inner">
          <div className="legal-kicker">Legal · Mumbai96</div>
          <h1 className="legal-h1">
            TERMS OF
            &nbsp;
            <em>SERVICE.</em>
          </h1>
          <div className="legal-meta">
            <strong>Effective Date:</strong> 1 January 2025 &nbsp;·&nbsp;
            <strong>Last Updated:</strong> 17 March 2026 &nbsp;·&nbsp;
            <strong>Version:</strong> 2.1
          </div>
        </div>
      </div>

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
                <strong>Please read carefully.</strong> By accessing or using
                Mumbai96, you agree to be bound by these Terms of Service. If
                you do not agree, please discontinue use of our platform
                immediately.
              </div>

              <div className="legal-section" id="s1">
                <h2>
                  <span className="ls-num">01</span>ACCEPTANCE OF TERMS
                </h2>
                <p>
                  These Terms of Service ("Terms") constitute a legally binding
                  agreement between you ("User", "you", or "your") and Mumbai96
                  ("we", "us", or "our"), governing your access to and use of
                  the Mumbai96 platform, website, and all related services
                  (collectively, the "Service").
                </p>
                <p>
                  By accessing our platform at{" "}
                  <a href="https://mumbai96.vercel.app">mumbai96.vercel.app</a>{" "}
                  or any associated subdomain, by creating an account, by adding
                  a listing, or by using any feature of our platform in any
                  manner, you acknowledge that you have read, understood, and
                  agree to be bound by these Terms and our{" "}
                  <a href="/privacy">Privacy Policy</a>.
                </p>
                <p>
                  If you are using the Service on behalf of an organisation or
                  business entity, you represent that you have the authority to
                  bind that entity to these Terms.
                </p>
              </div>

              <div className="legal-section" id="s2">
                <h2>
                  <span className="ls-num">02</span>ABOUT MUMBAI96
                </h2>
                <p>
                  Mumbai96 is a free, community-driven local platform
                  exclusively covering Mumbai, Maharashtra, India. We provide:
                </p>
                <ul>
                  <li>
                    A free business listing directory covering 96+ Mumbai
                    neighbourhoods
                  </li>
                  <li>
                    Neighbourhood-specific local content including guides, food,
                    nightlife and travel
                  </li>
                  <li>Community features including meetups and local events</li>
                  <li>
                    Safety resources including fraud reporting, women's safety
                    and child safety
                  </li>
                  <li>Tourist and visitor guides to Mumbai</li>
                  <li>Property, franchise and job listings</li>
                </ul>
                <p>
                  Mumbai96 is headquartered at Laxmi Plaza, Laxmi Industrial
                  Estate, Andheri West, Mumbai — 400053. Contact:{" "}
                  <a href="mailto:info@mumbai96.com">info@mumbai96.com</a>
                </p>
              </div>

              <div className="legal-section" id="s3">
                <h2>
                  <span className="ls-num">03</span>USER ACCOUNTS
                </h2>
                <h3>Registration</h3>
                <p>
                  To add a listing or access certain features, you must register
                  for a free account. You agree to provide accurate, current,
                  and complete information during registration and to update
                  this information to keep it accurate and current.
                </p>
                <h3>Account Security</h3>
                <p>
                  You are responsible for maintaining the confidentiality of
                  your account credentials and for all activities that occur
                  under your account. You agree to notify us immediately at{" "}
                  <a href="mailto:info@mumbai96.com">info@mumbai96.com</a> of
                  any unauthorised use of your account.
                </p>
                <h3>Account Requirements</h3>
                <ul>
                  <li>
                    You must be at least 18 years of age to create an account
                  </li>
                  <li>One account per person or business entity</li>
                  <li>
                    Account information must accurately represent a real person
                    or business
                  </li>
                  <li>
                    You may not impersonate another person, business, or
                    Mumbai96 itself
                  </li>
                  <li>
                    Accounts created solely to spam, harass, or defraud other
                    users will be terminated
                  </li>
                </ul>
              </div>

              <div className="legal-section" id="s4">
                <h2>
                  <span className="ls-num">04</span>LISTINGS &amp; CONTENT
                </h2>
                <h3>Free Listings</h3>
                <p>
                  Mumbai96 provides free business listings to all users. We do
                  not charge for creating, maintaining, or updating listings.
                  This is a permanent commitment to our community — free
                  listings will remain free.
                </p>
                <h3>Content Standards</h3>
                <p>
                  By submitting any content to Mumbai96 — including business
                  listings, descriptions, photos, reviews, or messages — you
                  represent and warrant that:
                </p>
                <ul>
                  <li>
                    You own or have the right to use all content you submit
                  </li>
                  <li>The content is accurate and not misleading</li>
                  <li>
                    The content does not violate any applicable laws or
                    regulations
                  </li>
                  <li>
                    The content does not infringe any third-party intellectual
                    property rights
                  </li>
                  <li>
                    Photos uploaded are genuine images of your actual business
                  </li>
                </ul>
                <h3>Licence to Mumbai96</h3>
                <p>
                  By submitting content to Mumbai96, you grant us a
                  non-exclusive, worldwide, royalty-free licence to use,
                  display, reproduce, and distribute that content solely for the
                  purpose of operating and improving our platform. You retain
                  all ownership of your content.
                </p>
                <h3>Content Removal</h3>
                <p>
                  We reserve the right to remove any content that violates these
                  Terms, our community standards, or applicable law, without
                  prior notice.
                </p>
              </div>

              <div className="legal-section" id="s5">
                <h2>
                  <span className="ls-num">05</span>PROHIBITED CONDUCT
                </h2>
                <p>You agree not to use Mumbai96 to:</p>
                <ul>
                  <li>
                    Post false, misleading, or fraudulent business listings or
                    reviews
                  </li>
                  <li>Impersonate any business, person, or entity</li>
                  <li>
                    Post content that is defamatory, obscene, harassing, or
                    hateful
                  </li>
                  <li>Collect or harvest user data without consent</li>
                  <li>
                    Transmit spam, unsolicited messages, or commercial
                    communications
                  </li>
                  <li>
                    Attempt to gain unauthorised access to our systems or data
                  </li>
                  <li>
                    Use automated tools to scrape, crawl, or extract data from
                    our platform
                  </li>
                  <li>
                    Interfere with or disrupt the integrity or performance of
                    the Service
                  </li>
                  <li>
                    Post content that promotes violence, self-harm, or illegal
                    activities
                  </li>
                  <li>
                    Violate any applicable local, state, national, or
                    international law
                  </li>
                </ul>
                <div className="highlight-box">
                  <strong>Zero tolerance for fake listings:</strong> Creating
                  fake or duplicate listings, posting fake reviews, or
                  impersonating a business will result in immediate and
                  permanent account termination and may be reported to
                  appropriate authorities.
                </div>
              </div>

              <div className="legal-section" id="s6">
                <h2>
                  <span className="ls-num">06</span>INTELLECTUAL PROPERTY
                </h2>
                <p>
                  All content, features, and functionality of the Mumbai96
                  platform — including but not limited to the Mumbai96 name,
                  logo, design, code, text, graphics, and data — are owned by
                  Mumbai96 and are protected by applicable intellectual property
                  laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, or create
                  derivative works of any Mumbai96-owned content without our
                  prior written consent.
                </p>
                <p>
                  The Mumbai96 name, "Mumbaikar's Very Own Platform" tagline,
                  "Everything ——— Mumbai" tagline, and associated branding are
                  trademarks of Mumbai96. Unauthorised use of these marks is
                  strictly prohibited.
                </p>
              </div>

              <div className="legal-section" id="s7">
                <h2>
                  <span className="ls-num">07</span>FRAUD PREVENTION POLICY
                </h2>
                <p>
                  Mumbai96 operates a zero-tolerance policy towards fraud,
                  scams, and deceptive listings. Our platform includes dedicated
                  fraud reporting tools and we take all reports seriously.
                </p>
                <h3>Reporting Fraud</h3>
                <p>
                  Users may report suspected fraud or scams at any time via our{" "}
                  <a href="/report-fraud-scam">Fraud Report page</a>. Reports
                  may be submitted anonymously. We commit to reviewing all
                  reports within 24 hours.
                </p>
                <h3>Actions We May Take</h3>
                <ul>
                  <li>
                    Immediate suspension or removal of fraudulent listings
                  </li>
                  <li>Permanent termination of accounts engaged in fraud</li>
                  <li>
                    Publication of fraud alerts to warn the Mumbai96 community
                  </li>
                  <li>
                    Reporting of serious cases to Mumbai Cyber Police or other
                    relevant authorities
                  </li>
                </ul>
                <p>
                  Mumbai96 does not accept liability for losses arising from
                  user-to-user fraud; however, we actively cooperate with law
                  enforcement in fraud investigations.
                </p>
              </div>

              <div className="legal-section" id="s8">
                <h2>
                  <span className="ls-num">08</span>DISCLAIMERS
                </h2>
                <p>
                  The Service is provided on an "as is" and "as available" basis
                  without any warranties of any kind, either express or implied.
                </p>
                <p>We do not warrant that:</p>
                <ul>
                  <li>
                    The Service will be uninterrupted, error-free, or completely
                    secure
                  </li>
                  <li>
                    Information on the platform is accurate, complete, or
                    current
                  </li>
                  <li>
                    Listed businesses are legitimate, licensed, or operating as
                    described
                  </li>
                  <li>
                    Reviews or ratings reflect genuine customer experiences
                  </li>
                </ul>
                <p>
                  Mumbai96 is a directory and community platform. We are not a
                  party to any transaction, service, or agreement between users
                  and listed businesses. Interactions with businesses listed on
                  our platform are entirely at your own risk.
                </p>
              </div>

              <div className="legal-section" id="s9">
                <h2>
                  <span className="ls-num">09</span>LIMITATION OF LIABILITY
                </h2>
                <p>
                  To the maximum extent permitted by applicable law, Mumbai96
                  and its officers, directors, employees, and agents shall not
                  be liable for any indirect, incidental, special,
                  consequential, or punitive damages — including loss of
                  profits, data, goodwill, or other intangible losses — arising
                  from:
                </p>
                <ul>
                  <li>Your use of or inability to use the Service</li>
                  <li>Any content obtained from the Service</li>
                  <li>
                    Transactions or interactions with businesses or other users
                    found through our platform
                  </li>
                  <li>
                    Unauthorised access to or alteration of your account or
                    content
                  </li>
                </ul>
                <p>
                  Our total liability to you for any claim arising out of or
                  related to these Terms or the Service shall not exceed INR
                  1,000 (One Thousand Indian Rupees).
                </p>
              </div>

              <div className="legal-section" id="s10">
                <h2>
                  <span className="ls-num">10</span>TERMINATION
                </h2>
                <p>
                  We may suspend or terminate your account and access to the
                  Service at any time, with or without notice, for any reason
                  including if we reasonably believe you have violated these
                  Terms.
                </p>
                <p>
                  You may terminate your account at any time by contacting us at{" "}
                  <a href="mailto:info@mumbai96.com">info@mumbai96.com</a>. Upon
                  termination, your listings will be removed from the platform
                  within 7 business days.
                </p>
                <p>
                  Provisions of these Terms that by their nature should survive
                  termination shall survive, including intellectual property
                  provisions, disclaimers, and limitations of liability.
                </p>
              </div>

              <div className="legal-section" id="s11">
                <h2>
                  <span className="ls-num">11</span>GOVERNING LAW &amp; DISPUTES
                </h2>
                <p>
                  These Terms are governed by and construed in accordance with
                  the laws of India, specifically the laws applicable in the
                  state of Maharashtra, without regard to conflict of law
                  principles.
                </p>
                <p>
                  Any dispute arising out of or relating to these Terms or the
                  Service shall be subject to the exclusive jurisdiction of the
                  courts located in Mumbai, Maharashtra, India.
                </p>
                <p>
                  We encourage users to first attempt to resolve disputes by
                  contacting us directly at{" "}
                  <a href="mailto:info@mumbai96.com">info@mumbai96.com</a>. Many
                  issues can be resolved quickly through direct communication.
                </p>
              </div>

              <div className="legal-section" id="s12">
                <h2>
                  <span className="ls-num">12</span>CONTACT &amp; UPDATES
                </h2>
                <p>
                  For any questions regarding these Terms, please contact us:
                </p>
                <ul>
                  <li>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:info@mumbai96.com">info@mumbai96.com</a>
                  </li>
                  <li>
                    <strong>Phone:</strong> +91 9819365030
                  </li>
                  <li>
                    <strong>Address:</strong> Laxmi Plaza, Laxmi Industrial
                    Estate, Andheri West, Mumbai — 400053
                  </li>
                </ul>
                <p>
                  We reserve the right to update these Terms at any time.
                  Material changes will be notified via the email address
                  associated with your account or by a prominent notice on our
                  platform. Continued use of the Service after changes
                  constitutes acceptance of the revised Terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
