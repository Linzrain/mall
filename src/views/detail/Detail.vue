<template>
	<div id="detail">
		<detail-nav-bar class="detail-nav" @navClick="navClick" ref="nav"></detail-nav-bar>
		<scroll class="detail-scroll" :probeType="3" ref="scroll" @scroll="scroll">
			<detail-swiper :images="topImages"></detail-swiper>
			<detail-base-info :goods="goods"></detail-base-info>
			<detail-shop-info :shop="shop"></detail-shop-info>
			<detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
			<detail-param-info :param-info="paramInfo" ref="param" />
			<detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
			<detail-recommend :goods-list="recommendList" ref="recommend"></detail-recommend>
		</scroll>
		<back-top v-show="isShow" @click="backTopClick" ></back-top>
		<detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
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
	import DetailCommentInfo from "./childComps/DetailCommentInfo"
	import DetailRecommend from "./childComps/DetailRecommend"
	import DetailBottomBar from "./childComps/DetailBottomBar"
	import BackTop from "components/content/backTop/BackTop"

	import {
		getDetail,
		getGoodRecommend,
		Goods,
		Shop,
		GoodsParam
	} from "network/detail"

	import {
		debounce
	} from "common/utils.js"


	export default {
		name: "Detail",
		components: {
			DetailNavBar,
			Scroll,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			DetailRecommend,
			DetailBottomBar,
			BackTop
		},
		data() {
			return {
				iid: null,
				topImages: [],
				goods: {},
				shop: {},
				detailInfo: {},
				paramInfo: {},
				commentInfo: {},
				recommendList: [],
				titlePosition: [],
				titleCurrentIndex: 0,
				isShow: false
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
				this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

				// 2.5 获取评论信息
				this.commentInfo = data.rate;

			}).catch(res => {
				console.log(res)
			});

			// 3.请求详情页的推荐数据
			getGoodRecommend().then(res => {
				this.recommendList = res.data.list
			})
		},
		mounted() {
			setTimeout(() => {
				this.$refs.scroll.refresh()
			}, 200)
		},
		methods: {
			imageLoad() {
				this.debounceLoad()
			},
			debounceLoad: debounce(function() {
				this.$refs.scroll.refresh()
				this.titlePosition = [];
				this.titlePosition.push(0);
				this.titlePosition.push(this.$refs.param.$el.offsetTop, this.$refs.comment.$el.offsetTop, this
					.$refs.recommend.$el.offsetTop)
				this.titlePosition.push(Number.MAX_VALUE)
			}, 200),
			navClick(index) {
				this.$refs.scroll.scrollTo(0, -this.titlePosition[index], 100)
			},
			scroll(position) {
				let positionY = -position.y;
				for (let i = 0; i < this.titlePosition.length; i++) {
					if (this.currentIndex !== i && positionY >= this.titlePosition[i] && positionY < this.titlePosition[i +
							1]) {
						this.currentIndex = i;
						this.$refs.nav.currentIndex = i;
					}
				}

				this.isShow = positionY > 1000 ? true : false
			},
			backTopClick() {
				this.$refs.scroll.scrollTo(0,0,50)
			},
			addToCart() {
				this.$toast.show("添加进购物车成功")
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
		position: relative;
		height: calc(100% - 44px - 49px);
	}
</style>
