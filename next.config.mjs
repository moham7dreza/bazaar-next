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
            {
                protocol: 'http',
                hostname: 'bazaar.local',
            },
            {
                protocol: 'http',
                hostname: 'bazaar-laravel.test',
            },
        ]
    }
};

export default nextConfig;
