const Cookie = {
    setCookie(name, value) {
        const days = 30;
        const exp = new Date()
        exp.setTime = (exp.getTime() + days * 24 * 60 * 60 * 100).toGMTString()
        document.cookie = name + `=` + value + `;expires=` + exp;
    },
    getCookie(name) {
        const cookie = document.cookie
        const arr = cookie.split(';');
        let data
        arr.forEach(i => {
            if (i.match(name)) {
                data = i.split('=')[1]
            }
        })
        return data;
    }
}
export default Cookie