module.exports = {
    experimental: {
        outputStandalone: true
    },
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
    publicRuntimeConfig: {
        serverVersion: process.env.SERVER_VERSION,
        chestHostUrl: process.env.CHEST_HOST_URL,
        chestEndpointInfos: process.env.CHEST_ENDPOINT_INFOS,
        chestEndpointItems: process.env.CHEST_ENDPOINT_ITEMS,
        chestEndpointUsers: process.env.CHEST_ENDPOINT_USERS,
    }
}
