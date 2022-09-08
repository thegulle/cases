import CreateBlog from '@/views/CreateBlog.vue'
import UpdateBlog from '@/views/UpdateBlog.vue'

const routes = [
  { path: '/', name: 'create', component: CreateBlog },
  { path: '/update-blog/:id', name: 'update-blog', component: UpdateBlog },
]

export default routes