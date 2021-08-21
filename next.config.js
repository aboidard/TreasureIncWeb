module.exports = {
    async rewrites() {
        return [
            {
                source: '/version',
                destination: 'http://localhost:8081/version',
            }, {
                source: '/user/:path*',
                destination: 'http://localhost:8081/user/:path*',
            },
        ]
    },
}