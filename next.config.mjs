/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '9000',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
            },
        ]
    }
};

export default nextConfig;
