'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FEEDBACK_URL: '"http://feedback.citiccloud-dev.pcloud.citic.com/"',
  //PROTAL_URL: '"http://10.76.54.94:8081"',    //淑梅
  //PROTAL_URL: '"http://10.76.54.44:7998"',       //碧云
  PROTAL_URL: '"http://10.76.54.11:7998"',       //宝华
  FILE_SERVER_URL: '"//fileserver.citiccloud-dev.pcloud.citic.com/file-server-mgt/fileServer/"'
})

