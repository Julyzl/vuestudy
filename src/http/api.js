import http from './http'

const post = (url, params) => {
    return new Promise((resolve, reject) => {
        http.post(url, params)
            .then(
                data => {
                    resolve(data)
                }
            )
            .catch(
                error => {
                    reject(error)
                }
            )
    })
}
const get = (url, params) => {
    return new Promise((resolve, reject) => {
        http.get(url, params).then(
            data => {
                resolve(data)
            }
        ).catch(
            error => {
                reject(error)
            }
        )
    })
}

const gethome = (data) => {
    return post('/api/home/getnewpost.php', data)
}

export {
    gethome
}