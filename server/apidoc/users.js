/** 
 * @api {POST} http://127.0.0.1:3000/api_v1/users/editUser 修改用户
 * @apiVersion 1.0.0
 * @apiName editUser
 * @apiGroup User
 * @apiDescription 修改用户
 * 
 * @apiParam {String} username 用户名
 * @apiParam {String} password 密码
 * @apiParam {String} nickname 昵称 
 * @apiParam {String} avater 用户头像 
 * @apiParam {String} phone 手机号 
 * @apiParam {String} introduction 个人介绍
 * @apiParam {int} gid 用户组id 
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
 *         'msg': 'success'
 *     }
 * @apiErrorExample Response-Fail:
 *     HTTP 1.1/ 404K
 *     {
 *         'status': 500,
 *         'msg': 'Fail'
 *     }
*/

/** 
 * @api {POST} http://127.0.0.1:3000/api_v1/users/delUser 删除用户
 * @apiVersion 1.0.0
 * @apiName delUser
 * @apiGroup User
 * @apiDescription 删除用户
 * 
 * @apiParam {int} uid 用户id
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
 *         'msg': 'success'
 *     }
 * @apiErrorExample Response-Fail:
 *     HTTP 1.1/ 404K
 *     {
 *         'status': 500,
 *         'msg': 'Fail'
 *     }
*/


/** 
 * @api {POST} http://127.0.0.1:3000/api_v1/users/register 用户注册
 * @apiVersion 1.0.0
 * @apiName register
 * @apiGroup User
 * @apiDescription 用户注册
 * 
 * @apiParam {String} username 用户名
 * @apiParam {String} password 密码
 * @apiParam {String} nickname 昵称 
 * @apiParam {String} avater 用户头像 
 * @apiParam {String} phone 手机号 
 * @apiParam {String} introduction 个人介绍
 * @apiParam {int} gid 用户组id 
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
 *         'msg': 'success'
 *     }
 * @apiErrorExample Response-Fail:
 *     HTTP 1.1/ 404K
 *     {
 *         'status': 500,
 *         'msg': 'Fail'
 *     }
*/

/** 
 * @api {POST} http://127.0.0.1:3000/api_v1/users/getUserList 用户列表
 * @apiVersion 1.0.0
 * @apiName getUserList
 * @apiGroup User
 * @apiDescription 用户列表
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
                        "username": "admin",
                        "nickname": "admin",
                        "phone": "123456",
                        "avater": "123456",
                        "introduction": "123456",
                        "state": "valid",
                        "gid": 1
                    },
                    {
                        "username": "user",
                        "nickname": "user",
                        "phone": "123456",
                        "avater": "123456",
                        "introduction": "123456",
                        "state": "valid",
                        "gid": 2
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