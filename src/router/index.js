const router = [
  {
    title: '控制台',
    icon: 'home',
    key: '/index'
  },
  {
    title: '用户管理',
    icon: 'laptop',
    key: '/index/user',
    children: [
      {key: '/index/user/index', title: '用户列表', icon: ''},
      {key: '/index/user/add', title: '添加用户', icon: ''},
    ]
  },
  {
    title: '部门管理',
    icon: 'bars',
    key: '/index/department',
    children: [
      {key: '/index/department/index', title: '部门列表', icon: ''},
      {key: '/index/department/add', title: '添加部门', icon: ''},
    ]
  },
  {
    title: 'tesr',
    icon: 'bars',
    key: '/index/navigations',
  }
]

export default router