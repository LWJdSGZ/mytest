/*import Empty from '@/views/frame/empty'

import Comment from './comment.js'
import userCenter from './userCenter/index.js'

import EmptyRouter from '../views/base/EmptyRouter';*/
// const InstanceList = resolve => require(['../views/console/instance'], resolve);
/*const InstanceClassify = resolve => require(['../views/console/instance/classify'], resolve);
const InstanceList = resolve => require(['../views/console/instance/index'], resolve);

const OrderList = resolve => require(['../views/console/order'], resolve);
const OrderDetail = resolve => require(['../views/console/order/detail'], resolve);

const CouponList = resolve => require(['../views/console/cost/coupon'], resolve);

const BillList = resolve => require(['../views/console/cost/bill'], resolve);
const BillUsage = resolve => require(['../views/console/cost/bill/usage'], resolve);*/

export default [
  {
    path: '/console',
    name: '/console',
    component: (resolve) => { require(['@/views/console/index/index.vue'], resolve); }
    /*children: [
      {
        path: 'index',
        name: 'consoleindex',
        component: (resolve) => { require(['@/views/console/index/index.vue'], resolve); }
        },
    ]*/
  },

  /*{
    path: '/console',
    component: resolve => require(['@/views/console/main.vue'], resolve),//懒加载,
    children: [
      {
        path: '/index',
        component: resolve => require(['@/views/console/index/index.vue'], resolve),//懒加载,
        meta: {
          title: '控制台首页',//参数定义当前页面的标题
          isLogin: true,//定义是否需要登陆，ture需要登陆

        }
      },
      {
        path: 'instance',
        component: EmptyRouter,
        children: [
          {
            path: '/',
            component: InstanceList,
            meta: {
              title: '实例列表',
              isLogin: true,
              auth: "myOrder"
            },
          }, {
            path: 'classify',
            component: InstanceClassify,
            meta: {
              title: '实例分类',
              isLogin: true,
              auth: "instanceManage"
            },
          }
        ]
      }, {
        path: 'order',
        component: EmptyRouter,
        children: [
          {
            path: '/',
            component: OrderList,
            meta: {
              title: '订单列表',
              isLogin: true,

            },
          }, {
            path: 'detail',
            component: OrderDetail,
            meta: {
              title: '订单详情',
              isLogin: true,
            },
          }
        ]
      }, {
        path: 'appbase',
        component: resolve => require(['views/console/appbase/index'], resolve),//懒加载,
        meta: {
          title: '应用基线',//参数定义当前页面的标题
          isLogin: true,//定义是否需要登陆，ture需要登陆
          auth: "appbaseManage"
        }
      },
      {
        path: 'costcenter',
        component: resolve => require(['views/console/costcenter/index'], resolve),//懒加载,
        meta: {
          title: '成本中心',//参数定义当前页面的标题
          isLogin: true,//定义是否需要登陆，ture需要登陆
          auth: "costCenter"
        }
      },
      {
        path: 'vpc',
        component: resolve => require(['views/console/vpc'], resolve),
        meta: {
          title: '供应商关联',//参数定义当前页面的标题
          isLogin: true,//定义是否需要登陆，ture需要登陆

        }
      }, {
        path: 'app',
        component: Empty,
        children: [
          {
            path: 'list',
            component: resolve => require(['views/console/app/list'], resolve),
            meta: {
              title: '创新应用列表',
              isLogin: true
            }
          },
          {
            path: 'form',
            component: resolve => require(['views/console/app/form'], resolve),
            meta: {
              title: '创新应用信息',
              isLogin: true
            }
          }
        ]
      }, {
        path: 'frame',
        component: resolve => require(['views/console/frame/frame'], resolve),//懒加载,
        meta: {
          title: '外链窗口',//参数定义当前页面的标题
          isLogin: false,//定义是否需要登陆，ture需要登陆

        }
      },
      ...userCenter,
      ...Comment,
      {
        path: 'cost',
        component: EmptyRouter,
        children: [
          {
            path: 'coupon',
            component: CouponList,
            meta: {
              title: '我的优惠券',
              isLogin: true,
            },
          }, {
            path: 'bill',
            component: Empty,
            children: [
              {
                path: '',
                component: BillList,
                meta: {
                  title: '账单',
                  isLogin: true,
                  auth: "bill"
                },
              },
              {
                path: 'usage',
                component: BillUsage,
                meta: {
                  title: '使用量',
                  isLogin: false
                }
              }
            ]

          }
        ]
      },
    ]

  }*/
]
