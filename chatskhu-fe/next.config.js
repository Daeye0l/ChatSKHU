/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['k.kakaocdn.net'],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        // 'fs' 모듈 오류 방지
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            net: false,
        };

        return config;
    },
    compiler: {
        styledComponents: true,
    },
};

module.exports = nextConfig;
