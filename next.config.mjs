/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['img.youtube.com'],
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    }
};

export default nextConfig;
