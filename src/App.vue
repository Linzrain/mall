<template>
	<div id="PageBox">
		<router-view></router-view>
		<true-bar></true-bar>
	</div>
</template>

<script>
	import TrueBar from "components/content/TrueBar"

	export default {
		name: 'App',
		components: {
			TrueBar
		}
	}
</script>

<style scoped>
	@import "assets/css/base.css"
</style>
