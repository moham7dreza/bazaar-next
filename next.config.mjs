/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '9000',
                pathname: '/images/uploads/**'
            }
        ]
    }
};

export default nextConfig;
