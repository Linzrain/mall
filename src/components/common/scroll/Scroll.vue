<template>
	<div class="wrapper" ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from "better-scroll"
	
	export default {
		name: "Scroll",
		data() {
			return {
				scroll: null
			}
		},
		mounted() {
			this.scroll = new BScroll(this.$refs.wrapper,{
				scrollY: true,
				click: true
			})
		},
		methods:{
			refresh() {
				this.scroll.refresh()
				console.log("1")
			}
		}
	}
</script>

<style>
</style>
