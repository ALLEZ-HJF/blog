/** 
 * @api {POST} http://127.0.0.1:3000/api_v1/userGroup/delUserGroup 删除用户组
 * @apiVersion 1.0.0
 * @apiName delUserGroup
 * @apiGroup 用户组管理
 * @apiDescription 删除用户组
 * 
 * @apiParam {String} gid id
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
 *         'msg': '删除成功'
 *     }
 * @apiErrorExample Response-Fail:
 *     HTTP 1.1/ 404K
 *     {
 *         'status': 500,
 *         'msg': 'Fail'
 *     }
*/

/** 
 * @api {POST} http://127.0.0.1:3000/api_v1/userGroup/editUserGroup 修改用户组
 * @apiVersion 1.0.0
 * @apiName insertUserGroup
 * @apiGroup 用户组管理
 * @apiDescription 修改用户组
 * 
 * @apiParam {String} gid id
 * @apiParam {String} groupName 组名
 * @apiParam {String} role 值
 * @apiParam {String} state 状态
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
 *         'msg': '修改成功'
 *     }
 * @apiErrorExample Response-Fail:
 *     HTTP 1.1/ 404K
 *     {
 *         'status': 500,
 *         'msg': 'Fail'
 *     }
*/

/** 
 * @api {POST} http://127.0.0.1:3000/api_v1/userGroup/insertUserGroup 添加用户组
 * @apiVersion 1.0.0
 * @apiName insertUserGroup
 * @apiGroup 用户组管理
 * @apiDescription 添加用户组
 * 
 * @apiParam {String} groupName 组名
 * @apiParam {String} role 值
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
 *         'msg': '添加成功'
 *     }
 * @apiErrorExample Response-Fail:
 *     HTTP 1.1/ 404K
 *     {
 *         'status': 500,
 *         'msg': 'Fail'
 *     }
*/

/** 
 * @api {POST} http://127.0.0.1:3000/api_v1/userGroup/getUserGroupList 用户组列表
 * @apiVersion 1.0.0
 * @apiName getUserGroupList
 * @apiGroup 用户组管理
 * @apiDescription 用户组列表
 * 
 * @apiParam {String} username 用户名
 * @apiParam {String} phone 手机号 
 * @apiParam {int} gid 用户组id 
 * @apiParam {String} state 状态 
 * @apiParam {int} page_num 页码
 * @apiParam {int} page_size 显示个数 
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
 *         'msg': '获取成功',
 *         'data': {
                "count": 2,
                "rows": [
                    {
                    "gid": 1,
                    "groupName": "管理员",
                    "role": "admin",
                    "state": "valid",
                    "update_time": null,
                    "create_time": "2020-11-02 09:06:53"
                    }
                ]
            }
 *     }
 * @apiErrorExample Response-Fail:
 *     HTTP 1.1/ 404K
 *     {
 *         'status': 500,
 *         'msg': 'Fail'
 *     }
*/