
export default [
  {
    path: '/console',
    name: '/console',
    component:  (resolve) => { require(['@/views/console/main.vue'], resolve); },
    children: [
      {
        path: 'index',
        name: 'consoleIndex',
        component: (resolve) => { require(['@/views/console/index/index.vue'], resolve); }
      },
    ]
  },
]
