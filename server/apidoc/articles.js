/** 
 * @api {POST} http://127.0.0.1:3000/api_v1/articles/addArticleLookNum 增加文章阅读量
 * @apiVersion 1.0.0
 * @apiName addArticleLookNum
 * @apiGroup articles
 * @apiDescription 增加文章阅读量
 * 
 * @apiParam {int} aid 文章id 
 * 
 * 
 * @apiSuccess {int} status 状态码
 * @apiSuccess {String} msg 简略描述
 * @apiSuccess {Object} data 返回数据
 * 
 * @apiSuccessExample Response-Success:
 *     HTTP 1.1/ 200K
 *     {
 *         'status': 200,
 *         'msg': 'success',
 *         'data': [
 *             {
                  1
               }
 *          ]
 *     }
 * @apiErrorExample Response-Fail:
 *     HTTP 1.1/ 404K
 *     {
 *         'status': 500,
 *         'msg': 'fail'
 *     }
*/

/** 
 * @api {POST} http://127.0.0.1:3000/api_v1/articles/articleVerify 审核文章
 * @apiVersion 1.0.0
 * @apiName articleVerify
 * @apiGroup articles
 * @apiDescription 审核文章
 * 
 * @apiParam {int} aid 文章id 
 * 
 * 
 * @apiSuccess {int} status 状态码
 * @apiSuccess {String} msg 简略描述
 * @apiSuccess {Object} data 返回数据
 * 
 * @apiSuccessExample Response-Success:
 *     HTTP 1.1/ 200K
 *     {
 *         'status': 200,
 *         'msg': 'success',
 *         'data': [
 *             {
                  1
               }
 *          ]
 *     }
 * @apiErrorExample Response-Fail:
 *     HTTP 1.1/ 404K
 *     {
 *         'status': 500,
 *         'msg': 'fail'
 *     }
*/

/** 
 * @api {POST} http://127.0.0.1:3000/api_v1/articles/editArticle 修改文章
 * @apiVersion 1.0.0
 * @apiName editArticle
 * @apiGroup articles
 * @apiDescription 修改文章
 * 
 * @apiParam {int} aid 文章id 
 * @apiParam {int} uid 用户id
 * @apiParam {int} cid 文章类型id
 * @apiParam {string} title 文章标题
 * @apiParam {string} content 文章内容
 * @apiParam {string} sub_title 副标题
 * @apiParam {string} imgs_str 文章列表图片地址
 * 
 * 
 * @apiSuccess {int} status 状态码
 * @apiSuccess {String} msg 简略描述
 * @apiSuccess {Object} data 返回数据
 * 
 * @apiSuccessExample Response-Success:
 *     HTTP 1.1/ 200K
 *     {
 *         'status': 200,
 *         'msg': 'success',
 *         'data': [
 *             {
                  1
               }
 *          ]
 *     }
 * @apiErrorExample Response-Fail:
 *     HTTP 1.1/ 404K
 *     {
 *         'status': 500,
 *         'msg': 'fail'
 *     }
*/

/** 
 * @api {POST} http://127.0.0.1:3000/api_v1/articles/delArticle 删除文章
 * @apiVersion 1.0.0
 * @apiName delArticle
 * @apiGroup articles
 * @apiDescription 删除文章
 * 
 * @apiParam {int} aid 文章id
 * 
 * 
 * @apiSuccess {int} status 状态码
 * @apiSuccess {String} msg 简略描述
 * @apiSuccess {Object} data 返回数据
 * 
 * @apiSuccessExample Response-Success:
 *     HTTP 1.1/ 200K
 *     {
 *         'status': 200,
 *         'msg': 'success',
 *         'data': [
 *             {
                  1
               }
 *          ]
 *     }
 * @apiErrorExample Response-Fail:
 *     HTTP 1.1/ 404K
 *     {
 *         'status': 500,
 *         'msg': 'fail'
 *     }
*/

/** 
 * @api {POST} http://127.0.0.1:3000/api_v1/articles/insertArticle 发布文章
 * @apiVersion 1.0.0
 * @apiName insertArticle
 * @apiGroup articles
 * @apiDescription 发布文章
 * 
 * @apiParam {int} cid 文章类型id
 * @apiParam {string} title 文章标题
 * @apiParam {string} content 文章内容
 * @apiParam {string} sub_title 副标题
 * @apiParam {string} imgs_str 文章列表图片地址
 * 
 * 
 * @apiSuccess {int} status 状态码
 * @apiSuccess {String} msg 简略描述
 * @apiSuccess {Object} data 返回数据
 * 
 * @apiSuccessExample Response-Success:
 *     HTTP 1.1/ 200K
 *     {
 *         'status': 200,
 *         'msg': 'success',
 *         'data': [
 *             {
                "aid": 9,
                "title": "测试222",
                "sub_title": null,
                "content": "12322",
                "state": "invalid",
                "create_time": "2020-10-31 10:37:40",
                "update_time": "2020-10-31 10:37:40",
                "uid": 1,
                "nickname": "admin",
                "avater": "11"
               }
 *          ]
 *     }
 * @apiErrorExample Response-Fail:
 *     HTTP 1.1/ 404K
 *     {
 *         'status': 500,
 *         'msg': 'fail'
 *     }
*/

/** 
 * @api {POST} http://127.0.0.1:3000/api_v1/articles/getArticleList 获取文章列表
 * @apiVersion 1.0.0
 * @apiName getArticleList
 * @apiGroup articles
 * @apiDescription 获取文章列表
 * 
 * @apiParam {int} aid 文章id
 * @apiParam {int} uid 用户id
 * @apiParam {int} cid 文章类型id
 * @apiParam {string} title 文章标题
 * @apiParam {string} state 状态 valid | invalid | lock
 * @apiParam {int} page_num 页码
 * @apiParam {int} page_size 显示条数
 * 
 * 
 * @apiSuccess {int} status 状态码
 * @apiSuccess {String} msg 简略描述
 * @apiSuccess {Object} data 返回数据
 * 
 * @apiSuccessExample Response-Success:
 *     HTTP 1.1/ 200K
 *     {
 *         'status': 200,
 *         'msg': 'success',
 *         'data': [
 *             {
                "aid": 9,
                "title": "测试222",
                "sub_title": null,
                "content": "12322",
                "state": "invalid",
                "create_time": "2020-10-31 10:37:40",
                "update_time": "2020-10-31 10:37:40",
                "uid": 1,
                "nickname": "admin",
                "avater": "11"
               }
 *          ]
 *     }
 * @apiErrorExample Response-Fail:
 *     HTTP 1.1/ 404K
 *     {
 *         'status': 500,
 *         'msg': 'fail'
 *     }
*/