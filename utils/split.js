// 用指定符号 分割字符串
const formatCutMark = (val, size, mark) => {
    const str = (val).toString()
    const regExp1 = new RegExp(`(\\${mark})*`, 'g')
    const regExp2 = new RegExp(`(.{${size}})`, 'g')
    const regExp3 = new RegExp(`^(\\${mark})+|(\\${mark})+$`)
    return str.replace(regExp1, '').replace(regExp2, `$1${mark}`).replace(regExp3, '')
}
const formatNormal = (val, mark) => {
    const regExp = new RegExp(`(\\${mark})*`, 'g')
    return (val).toString().replace(regExp, '')
}