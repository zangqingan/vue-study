
// 配置代理
// vue.config.js
const targetApi1 = process.env.NODE_ENV === 'development' ? "http://www.xxx1.com" : "http://www.ccc1.com"
const targetApi2 = process.env.NODE_ENV === 'development' ? "http://www.xxxx2.com" : "http://www.ccc2.com"
module.exports = {
    devServer: {
        proxy: {
            '/api1': {
                target: targetApi1,
                changeOrigin: true,
                pathRewrite: {
                    '/api1': ""
                }
            },
            '/api2': {
                target: targetApi2,
                changeOrigin: true,
                pathRewrite: {
                    '/api2': ""
                }
            },
        }
    }
}
