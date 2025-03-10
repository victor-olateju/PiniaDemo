const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/IndexPage.vue') },
      { path: 'entry', component: () => import('src/pages/PageEntrySt.vue') },
      { path: 'entries', component: () => import('pages/PageEntries.vue') },
      { path: 'settings', component: () => import('pages/PageSettings.vue') },
      { path: 'dynamic', component: () => import('pages/DynamicPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
