const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  articleList: state => state.article.articleList,
  articleListSearchForm: state => state.article.searchForm
}
export default getters
