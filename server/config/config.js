let password =  ''
let host = ''
let port = 3306
let name = ''
let dbName = ''
if (process.env.NODE_ENV === 'development') {
    host =  'localhost'
    port = 3306
    name = 'root'
    password = '123456'
    dbName = 'blog'
} else {
    host = '39.102.41.4'
    port = 3306
    name = 'root'
    password = 'Allez12345.'
    dbName = 'blog'
}
module.exports = {
    host: host,
    port: port,
    name: name,
    password: password,
    dbName: dbName,
    singKey: 'blogToken',
    version: 1,
    emailUser: '254534216@qq.com',
    emailPass: 'dhttgfwozmflcabi'
}