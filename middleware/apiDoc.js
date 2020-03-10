const wrapper = require('koa-swagger-decorator').wrapper;

// swagger docs avaliable at http://localhost:3000/doc
module.exports = (router) => {
    wrapper(router);
    router.swagger({
        title: '数据服务文档',
        description: 'API DOC',
        version: '1.0.0',
        swaggerHtmlEndpoint: '/doc',
    })
}