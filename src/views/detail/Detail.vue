<template>
	<div id="detail">
		<detail-nav-bar class="detail-nav"></detail-nav-bar>
		<scroll class="detail-scroll" ref="scroll">
			<detail-swiper :images="topImages"></detail-swiper>
			<detail-base-info :goods="goods"></detail-base-info>
			<detail-shop-info :shop="shop"></detail-shop-info>
			<detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
			<detail-param-info :param-info="paramInfo" />
		</scroll>
	</div>
</template>

<script>
	import DetailNavBar from "./childComps/DetailNavBar"
	import Scroll from "components/common/scroll/Scroll"
	import DetailSwiper from "./childComps/DetailSwiper"
	import DetailBaseInfo from './childComps/DetailBaseInfo'
	import DetailShopInfo from './childComps/DetailShopInfo'
	import DetailGoodsInfo from './childComps/DetailGoodsInfo'
	import DetailParamInfo from './childComps/DetailParamInfo'

	import {
		getDetail,
		Goods,
		Shop,
		GoodsParam
	} from "network/detail"


	export default {
		name: "Detail",
		components: {
			DetailNavBar,
			Scroll,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo
		},
		data() {
			return {
				iid: null,
				topImages: [],
				goods: {},
				shop: {},
				detailInfo: {},
				paramInfo: {}
			}
		},
		created() {
			// 1.保存传入的iid
			this.iid = this.$route.query.iid;

			// 2.根据iid请求详情数据
			getDetail(this.iid).then(res => {
				const data = res.result;
				this.topImages = data.itemInfo.topImages

				// 2.1 获取商品信息
				this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

				// 2.2 创建店铺信息的对象
				this.shop = new Shop(data.shopInfo)

				// 2.3 保存商品的详情数据
				this.detailInfo = data.detailInfo;

				// 2.4 获取参数的信息
				this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
			})
		},
		mounted() {
			setTimeout(() => {
				this.$refs.scroll.refresh()
			}, 200)

		},
		methods: {
			imageLoad() {
				this.$refs.scroll.refresh()
			}
		}
	}
</script>

<style scoped>
	#detail {
		position: relative;
		background-color: #fff;
		height: 100vh;
		z-index: 9;
	}

	.detail-nav {
		position: relative;
		z-index: 9;
		background-color: #fff;
	}

	.detail-scroll {
		height: calc(100% - 44px);
	}
</style>
