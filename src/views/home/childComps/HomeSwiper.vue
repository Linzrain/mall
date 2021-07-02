<template>
	<swiper :slideCounter="slideCounter">
		<swiper-item v-for="(item,index) in banners" :key="index">
			<a :href="item.link">
				<img :src="item.image" alt="" @load="imgLoad" />
			</a>
		</swiper-item>
	</swiper>
</template>

<script>
	import {
		Swiper,
		SwiperItem
	} from "components/common/swiper"

	import {
		debounce
	} from "common/utils"

	export default {
		name: "HomeSwiper",
		props: {
			banners: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				counter: 0,
				slideCounter: 0,
			}
		},
		components: {
			Swiper,
			SwiperItem
		},
		methods: {
			imgLoad() {
				this.counter += 1
				this.allLoad()
			},
			allLoad: debounce(function () {
				this.slideCounter = this.counter
				console.log("已防抖",this.slideCounter)
			}, 50)
		}
	}
</script>

<style scoped>
</style>
