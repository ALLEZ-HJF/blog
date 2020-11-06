/** 
 * @api {POST} http://127.0.0.1:3000/api_v1/replys/insertReply 添加回复
 * @apiVersion 1.0.0
 * @apiName insertReply
 * @apiGroup 文章回复
 * @apiDescription 添加回复
 * 
 * @apiParam {int} aid 文章id
 * @apiParam {int} commid 评论id
 * @apiParam {string} content 回复内容
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
 *         'data': {
 *                "pid": 0,
                  "state": "valid",
                  "rid": 2,
                  "commid": "1",
                  "content": "回复测试",
                  "aid": "2",
                  "uid": 1,
                  "create_time": "2020-11-06T08:45:26.141Z",
                  "update_time": "2020-11-06T08:45:26.141Z"
 *          }
 *     }
 * @apiErrorExample Response-Fail:
 *     HTTP 1.1/ 404K
 *     {
 *         'status': 500,
 *         'msg': 'fail'
 *     }
*/


/** 
 * @api {POST} http://127.0.0.1:3000/api_v1/comments/delReply 删除回复
 * @apiVersion 1.0.0
 * @apiName delReply
 * @apiGroup 文章回复
 * @apiDescription 删除回复
 * 
 * @apiParam {int} aid 文章id
 * @apiParam {int} rid 回复id
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
 *         'data': ''
 *     }
 * @apiErrorExample Response-Fail:
 *     HTTP 1.1/ 404K
 *     {
 *         'status': 500,
 *         'msg': 'fail'
 *     }
*/
