/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['img.youtube.com', 'img.clerk.com'],
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    }
};

export default nextConfig;
