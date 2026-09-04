/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/auth/login",
        destination: "/auth/signup",
        permanent: false,
      },
      // Old /spotlight/* routes → new top-level routes (permanent 308)
      {
        source: "/spotlight/celebrities/:slug",
        destination: "/celebrities/:slug",
        permanent: true,
      },
      {
        source: "/spotlight/celebrities",
        destination: "/celebrities",
        permanent: true,
      },
      {
        source: "/spotlight/property-deals",
        destination: "/property-deals",
        permanent: true,
      },
      {
        source: "/spotlight/franchise-deals",
        destination: "/franchise-deals",
        permanent: true,
      },
      {
        source: "/spotlight/jobs-opportunities-in-mumbai",
        destination: "/jobs-opportunities-in-mumbai",
        permanent: true,
      },
      {
        source: "/spotlight/meetups",
        destination: "/meetups",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
