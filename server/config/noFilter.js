const { version } = require('./config')
module.exports.path = [
    `/api_v${version}/users/web/login`,
    `/api_v${version}/users/web/register`,
    `/api_v${version}/users/web/sendCode`,
    `/api_v${version}/articles/web/getArticleList`,
    `/api_v${version}/articles/web/getArticleByAid`,
    `/api_v${version}/articles/web/addArticleLookNum`,
    `/api_v${version}/users/web/getUserRankingList`,
    `/api_v${version}/category/web/getCategoryList`,
    `/api_v${version}/comments/web/getCommentByAid`,
    `/api_v${version}/stat/web/insertDayData`,
    `/api_v${version}/upload/web/uploadFile`
]