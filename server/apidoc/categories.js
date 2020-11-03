

/** 
 * @api {POST} http://127.0.0.1:3000/api_v1/category/delCategory 删除分类
 * @apiVersion 1.0.0
 * @apiName delCategory
 * @apiGroup 分类管理
 * @apiDescription 删除分类
 * 
 * @apiParam {int} cid 分类id
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
 *         'data': ''
 *     }
 * @apiErrorExample Response-Fail:
 *     HTTP 1.1/ 404K
 *     {
 *         'status': 500,
 *         'msg': 'fail'
 *     }
*/

/** 
 * @api {POST} http://127.0.0.1:3000/api_v1/category/editCategory 修改分类
 * @apiVersion 1.0.0
 * @apiName editCategory
 * @apiGroup 分类管理
 * @apiDescription 修改分类
 * 
 * @apiParam {int} cid 分类id
 * @apiParam {int} name 分类名称
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
 *         'data': ''
 *     }
 * @apiErrorExample Response-Fail:
 *     HTTP 1.1/ 404K
 *     {
 *         'status': 500,
 *         'msg': 'fail'
 *     }
*/

/** 
 * @api {POST} http://127.0.0.1:3000/api_v1/category/insertCategory 添加分类
 * @apiVersion 1.0.0
 * @apiName insertCategory
 * @apiGroup 分类管理
 * @apiDescription 添加分类
 * 
 * @apiParam {int} pid 分类父id 默认 0
 * @apiParam {int} name 分类名称
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
                "pid": 0,
                "state": "valid",
                "cid": 2,
                "name": "后端",
                "create_time": "2020-11-01T06:16:25.123Z"
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
 * @api {POST} http://127.0.0.1:3000/api_v1/category/getCategoryList 获取分类列表
 * @apiVersion 1.0.0
 * @apiName getCategoryList
 * @apiGroup 分类管理
 * @apiDescription 获取分类列表
 * 
 * @apiParam {int} pid 分类父id 默认 0
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
                "cid": 2,
                "pid": 0,
                "name": "后端",
                "state": "valid",
                "update_time": null,
                "create_time": "2020-11-01 14:16:25"
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