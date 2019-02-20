# 项目运行步骤


## 安装
### Mac安装node
执行：brew install node
```
若报错 Homebrew must be run under Ruby 2.3! You're running 2.0.0. (RuntimeError)
修复错误：brew install ruby@2.3
重新执行：brew install node
```

### 其它OS安装node
略略略略略略

## 命令行工具
```
1、下载安装node（npm会自动安装）安装cnpm（npm install -g cnpm --registry=https://registry.npm.taobao.org）
2、安装vue-cli（npm install --global vue-cli）
3、进入本地项目所在目录（cd admin-fed）
4、安装依赖（npm install）
5、启动运行（开发环境）（npm run dev）

编译打包（生产环境）（npm run build）
```

### 工程目录结构
```
build               webpack相关配置文件（一般不需修改）
    build.js                生产环境构建文件
    check-versions.js       版本检查（node、npm）
    utils.js                构建相关工具
    vue-loader.conf.js      css加载器配置
    webpack.base.conf.js    webpack基础配置
    webpack.dev.conf.js     webpack开发环境配置
    webpack.prod.conf.js    webpack生产环境配置
    webpack.test.conf.js    webpack测试环境配置
config              vue基本配置文件
    dev.env.js      开发环境配置文件，请求base路径在该文件中配置，通过配置变量BASE_API
    index.js        运行端口、打包输出等配置（一般不需修改）
    prod.env.js     生产环境配置文件
    test.env.js     测试环境配置文件
dist                编译输出目录（npm run build命令执行生成）
node_modules        依赖包目录（npm install命令执行生成）
src                 源码目录
    assets          静态资源（样式文件、外部js文件）
    components      公共组件
    router          路由
    styles          样式目录（所有的样式文件在该目录管理）
    utils           公共封装
        const.js        常量：枚举值、请求地址等
        request.js      通讯类
    views           页面
        food            服务相关页面
            citic           中信云服务相关页面
                action          中信云服务action
                    Form.vue        新增/修改页面
                    List.vue        列表页面
                key             中信云服务key
                    Form.vue        新增/修改页面
                    List.vue        列表页面
                service         中信云服务
                    Form.vue        新增/修改页面
                    List.vue        列表页面
                value           中信云服务value
                    Form.vue        新增/修改页面
                    List.vue        列表页面
            supplier        供应商服务相关页面
                action          供应商服务action
                    Form.vue        新增/修改页面
                    List.vue        列表页面
                key             供应商服务key
                    Form.vue        新增/修改页面
                    List.vue        列表页面
                service         供应商服务
                    Form.vue        新增/修改页面
                    List.vue        列表页面
                supplier        供应商
                    Form.vue        新增/修改页面
                    List.vue        列表页面
                value           供应商服务value
                    Form.vue        新增/修改页面
                    List.vue        列表页面
    APP.vue     项目根组件
    main.js     入口文件
static          静态资源（json等）
```
