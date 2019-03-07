
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
      {
        // $route.params.id
        path:'commen/:id',
        name: 'commen',
        component: (resolve) => { require(['@/views/console/index/commen.vue'], resolve);}
      },
    ]
  },
]
