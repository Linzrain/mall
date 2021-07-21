<template>
	<swiper :slideCounter="slideCounter" class="detail-swiper">
		<swiper-item v-for="(item,index) in images" :key="index">
			<img :src="item" @load="imgLoad"/>
		</swiper-item>
	</swiper>
</template>

<script>
	import {
		Swiper,
		SwiperItem
	} from "components/common/swiper"
	
	// import {
	// 	debounce
	// } from "common/utils"

	export default {
		name: "DetailSwiper",
		components: {
			Swiper,
			SwiperItem
		},
		props: {
			images: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				slideCounter: 0,
				counter: 0
			}
		},
		methods:{
			imgLoad() {
				this.counter += 1
				if(this.counter===this.images.length) {
					this.slideCounter = this.counter
				}
			}
		}
	}
</script>

<style scoped>
	.detail-swiper {
		height: 300px;
	}
</style>
