<template>
	<goods-list :goods="goodsList"></goods-list>
</template>

<script>
	import GoodsList from "components/content/goods/GoodsList"
	
	export default {
		name: "DetailRecommend",
		components: {
			GoodsList
		},
		props: {
			goodsList: {
				type: Array,
				default() {
					return []
				}
			}
		}
	}
</script>

<style>
</style>
