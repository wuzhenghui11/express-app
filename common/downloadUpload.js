export const upload = async () => {
    if (!this.action && this.action === '') return
    let formData = new FormData()
    formData.append('file', this.choiceFile, this.choiceFile.name)
    for (let [key, value] of Object.entries(this.data)) {
        formData.append(key, value)
    }

    let result = null
    this.loading = true
    await this.$http.post(this.action, formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then((data) => {
        if (data.status === 200) {
            result = data
        } else {
            this.$message.error(data.massage)
        }
    }).catch((e) => {
        console.error(e)
    }).finally(() => {
        this.loading = false
    })
    return result
}

export const download = (arrayBuffer, name, type = 'application/vnd.ms-excel', extension = 'xlsx') => {
    const blob = new Blob([arrayBuffer], { type })
    const fileName = `${name}.${extension}`
    if ('download' in document.createElement('a')) { // 非IE下载
        const elink = document.createElement('a')
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href) // 释放URL 对象
        document.body.removeChild(elink)
    } else { // IE10+下载
        navigator.msSaveBlob(blob, fileName)
    }
}

