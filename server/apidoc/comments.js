/** 
 * @api {POST} http://127.0.0.1:3000/api_v1/comments/delComment 删除评论
 * @apiVersion 1.0.0
 * @apiName delComment
 * @apiGroup comments
 * @apiDescription 删除评论
 * 
 * @apiParam {int} commid 评论id
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


/** 
 * @api {POST} http://127.0.0.1:3000/api_v1/comments/insertComment 添加评论
 * @apiVersion 1.0.0
 * @apiName insertComment
 * @apiGroup comments
 * @apiDescription 添加评论
 * 
 * @apiParam {int} aid 文章id
 * @apiParam {String} content 内容
 * @apiParam {String} imgs 图片
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
 *              "state": "valid",
                  "commid": 3,
                  "aid": "1",
                  "content": "333",
                  "imgs": "htp",
                  "uid": 1,
                  "nickname": "admin",
                  "avatar": "11",
                  "create_time": "2020-11-02T06:56:51.608Z"
            ]
 *     }
 * @apiErrorExample Response-Fail:
 *     HTTP 1.1/ 404K
 *     {
 *         'status': 500,
 *         'msg': 'fail'
 *     }
*/

/** 
 * @api {POST} http://127.0.0.1:3000/api_v1/comments/getCommentList 获取文章评论列表
 * @apiVersion 1.0.0
 * @apiName getCommentList
 * @apiGroup comments
 * @apiDescription 获取文章评论列表
 * 
 * @apiParam {int} aid 文章id
 * @apiParam {int} uid 用户id
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
                "imgs": "",
                "commid": 2,
                "aid": 1,
                "uid": 1,
                "nickname": "admin",
                "avatar": "11",
                "content": "2222",
                "state": "valid",
                "update_time": null,
                "create_time": "2020-11-02 14:34:23"
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