import getConfig from 'next/config'
const { publicRuntimeConfig: config } = getConfig()

/**
 * représente une erreur API
 */
export class ApiError {
    constructor(error) {
        this.error = error
    }
}
export class ApiNotFoundError extends ApiError {

}


/**
 * 
 * @param {string} endpoint 
 * @param {object} option 
 */
export async function apiFetch(endpoint, options = {}) {
    const { limit, page } = options
    if (!endpoint.startsWith("/")) endpoint = "/" + endpoint
    let url = new URL(config.chestHostUrl + endpoint)
    let params = { limit: limit, page: page }
    url.search = new URLSearchParams(params).toString();
    const response = await fetch(url, {
        credentials: 'omit',
        headers: {
            accept: 'application/json',
        },
        ...options
    })

    if (response.status === 204) {
        return null
    }
    const responseData = await response.json()

    if (response.ok) {
        return responseData
    } else {
        if (response.status === 404) {
            if (responseData.message) {
                throw new ApiNotFoundError(responseData.message)
            }
        }
        if (response.status === 500) {
            if (response.statusText) {
                throw new ApiError(response.statusText)
            }
        }
        if (responseData.errors) {
            throw new ApiError(response.statusText)
        }
    }
}