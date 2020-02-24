export const a = (data) => {
        console.log(data)
    }
    // 邮箱检验
export function isEmail(s) {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

//手机号码
export function isMobile(s) {
    return /^1[0-9]{10}$/.test(s)
}
export const Vpassword = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入密码'))
    }
    if (!/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/.test(value)) {
        return callback(new Error('请输入6-20位英文字母、数字,字母、数字和标点符号至少包含两种'))
    } else {
        return callback();
    }
}
export const Vaccnout = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入账号'))
    }
    if (!/^(?![0-9]*$)(?![a-zA-Z]*$)[a-zA-Z0-9]{6,20}$/.test(value)) {
        return callback(new Error('账号必须为6-20位字母和数字组合'))
    } else {
        return callback();
    }
}

export const Vname = (value) => {
    if (!value) {
        return callback(this.$message.warning('请输入正确的'))
    }
    if (!/^(?![0-9]*$)(?![a-zA-Z]*$)[a-zA-Z0-9]{6,20}$/.test(value)) {
        return callback(new Error('账号必须为6-20位字母和数字组合'))
    } else {
        return callback();
    }
}

export function Vtel(rule, value, callback) {
    if (!value) {
        callback(new Error('请输入电话号码'));

    }
    const reg = /^[1][3-9][0-9]{9}$/;
    if (value == '' || value == undefined || value == null) {
        callback();
    } else {
        if ((!reg.test(value)) && value != '') {
            callback(new Error('请输入正确的电话号码'));
        } else {
            callback();
        }
    }
}

export function Vemail(rule, value, callback) {
    if (!value) {
        callback(new Error('请输入邮箱'));
    }
    const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
    if (value == '' || value == undefined || value == null) {
        callback();
    } else {
        if (!reg.test(value)) {
            callback(new Error('请输入正确的邮箱'));
        } else {
            callback();
        }
    }
}
// 性别
export function Vsex(rule, value, callback) {
    if (!value) {
        callback(new Error('请输入性别'));
    } else if (value == "男" || value == '女') {
        callback();
    }
    callback(new Error('只可以输入男或女'));


}

// 中文校验
export const Vchart = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入地址'))
    }
    if (!/^[\u0391-\uFFE5A-Za-z]+$/.test(value)) {
        callback(new Error('不可输入特殊字符'))
    } else {
        callback()
    }
}