const { version } = require('./config')
module.exports.path = [
    `/api_v${version}/users/login`,
    `/api_v${version}/users/register`,
    `/api_v${version}/users/sendCode`,
    `/api_v${version}/articles/getArticleList`,
    `/api_v${version}/articles/getArticleByAid`,
    `/api_v${version}/users/getUserRankingList`,
    `/api_v${version}/category/getCategoryList`,
    /^\/uploads/
]