<template>
	<nav-bar>
		<template #left>
			<div class="back" @click="backClick">
				<img src="~assets/img/common/back.svg" alt="" />
			</div>
		</template>
		<template #middle>
			<div class="title">
				<div v-for="(item, index) in titles" :key="index"
						class="title-item"
						:class="{active: currentIndex===index}"
						@click="itemClick(index)">
					{{item}}
				</div>
			</div>
		</template>
	</nav-bar>
</template>

<script>
	import NavBar from "components/common/navbar/NavBar"

	export default {
		name: "DetailNavBar",
		components: {
			NavBar
		},
		data() {
			return {
				titles: ['商品', '参数', '评论', '推荐'],
				currentIndex: 0
			}
		},
		methods: {
			backClick() {
				this.$router.back()
			},
			itemClick(index) {
				this.currentIndex = index
				this.$emit("navClick",index)
			}
		}
	}
</script>

<style scoped>
	.back {
		text-align: center;
	}

	.back img {
		vertical-align: middle;
	}
	
	.title {
		display: flex;
		font-size: 13px;
	}
	.title-item {
		flex: 1;
	}
	.active {
		color: var(--color-high-text);
	}
</style>
