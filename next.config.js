module.exports = {
    async rewrites() {
        return [
            {
                source: '/healthcheck',
                destination: 'http://localhost:8081/healthcheck',
            }, {
                source: '/user/:path*',
                destination: 'http://localhost:8081/user/:path*',
            },
        ]
    },
}