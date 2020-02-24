module.exports = {
    baseUrl: '/', //根路径
    outputDir: 'dist', //构建输出目录
    // assetsDir: "static",
    lintOnSave: false, //是否开启eslint保存检测 true,false.error
    devServer: {
        open: true,
        host: 'localhost',
        port: 7070,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://localhost:3030/phpkouqin/',
                pathRewrite: { '^/api': '' },
                changeOrigin: true,
                secure: false
            },
        }
    }
}