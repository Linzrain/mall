<template>
	<div id="home">
		<nav-bar class="home-nav">
			<template #middle>
				<div>首页</div>
			</template>
		</nav-bar>
		<scroll class="scroll" ref="scroll">
			<home-swiper :banners="banners"></home-swiper>
			<recommend-view :recommends="recommends"></recommend-view>
			<feature></feature>
			<tab-control :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
			<goods-list :goods="showGoods"></goods-list>
		</scroll>
	</div>
</template>

<script>
	import HomeSwiper from "./childComps/HomeSwiper"
	import RecommendView from "./childComps/RecommendView"
	import Feature from "./childComps/Feature"

	import NavBar from "components/common/navbar/NavBar"
	import TabControl from "components/content/tabControl/TabControl"
	import GoodsList from "components/content/goods/GoodsList.vue"
	import Scroll from "components/common/scroll/Scroll.vue"

	import {
		getHomeMultidata,
		getHomeGoods
	} from "network/home"

	export default {
		name: "Home",
		components: {
			HomeSwiper,
			RecommendView,
			Feature,
			NavBar,
			TabControl,
			GoodsList,
			Scroll
		},
		data() {
			return {
				banners: [],
				recommends: [],
				goods: {
					"pop": {
						page: 0,
						list: []
					},
					"new": {
						page: 0,
						list: []
					},
					"sell": {
						page: 0,
						list: []
					}
				},
				currenType: "pop",
				isShowBackTop: false
			}
		},
		computed: {
			showGoods() {
				return this.goods[this.currenType].list
			}
		},
		created() {
			this.getHomeMultidata()
			this.getHomeGoods("pop")
			this.getHomeGoods("new")
			this.getHomeGoods("sell")
		},
		methods: {
			tabClick(index) {
				switch (index) {
					case 0:
					this.currenType = "pop"
					break
					case 1:
					this.currenType = "new"
					break
					case 2:
					this.currenType = "sell"
					break
				}
			},
			getHomeMultidata() {
				getHomeMultidata().then(res => {
					this.banners = res.data.banner.list
					this.recommends = res.data.recommend.list
				})
			},
			getHomeGoods(type) {
				const page = this.goods[type].page + 1;
				getHomeGoods(type, page).then(res => {
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page += 1
				})
			},
			debounce(func,delay) {
				let timer = null;
				return function (...args) {
					if(timer) clearTimeout(timer);
					timer = setTimeout(() => {
						func.apply(this,args)
					},delay)
				}
			}
		},
		mounted() {
			const refresh = this.debounce(this.$refs.scroll.refresh,100)
			this.$mybus.on('imageLoad',() => {
				refresh()
			})

		}
	}
</script>

<style scoped>
	.home{
		position: relative;
	}
	.home-nav {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		background-color: var(--color-tint);
		color: #fff;
		z-index: 9;
	}
	
	.scroll{
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
	}
</style>
