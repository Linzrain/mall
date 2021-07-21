import { createRouter,createWebHashHistory } from "vue-router"

import Home from "views/home/Home"
import Category from "views/category/Category"
import Cart from "views/cart/Cart"
import Profile from "views/profile/Profile"
import Detail from "views/detail/Detail"


const routes = [
	{
		path: '',
		redirect: "/home",
	},
	{
		path: '/home',
		component: Home
	},
	{
		path: '/category',
		component: Category
	},
	{
		path: '/cart',
		component: Cart
	},
	{
		path: '/profile',
		component: Profile
	},
	{
		path: '/detail',
		component: Detail
	}
] 
//创建router实例
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//导出router
export default router