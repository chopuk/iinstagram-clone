const environments = {
    delevelopment: {
        URL_PREFIX: 'http://192.168.0.220:4000/',
        ANOTHER_VARIABLE: 'chelsea'
    },
    production: {
        URL_PREFIX: 'https://image-server-9vuu.onrender.com/',
        ANOTHER_VARIABLE: 'liverpool'
    }
}

const env = environments.delevelopment
export default env