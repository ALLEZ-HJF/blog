/** 
 * @api {POST} http://127.0.0.1:3000/api_v1/upload/uploadFile 文件上传
 * @apiVersion 1.0.0
 * @apiName uploadFile
 * @apiGroup 上传管理
 * @apiDescription 文件上传
 * 
 * @apiParam {Array} file 文件
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
 *             'http://localhost:3000/uploads/1604306254155.png'
 *          ]
 *     }
 * @apiErrorExample Response-Fail:
 *     HTTP 1.1/ 404K
 *     {
 *         'status': 500,
 *         'msg': 'fail'
 *     }
*/
