module.exports = {
    async rewrites() {
        return [
            {
                source: '/version',
                destination: 'http://localhost:8081/version',
            },
        ]
    },
}