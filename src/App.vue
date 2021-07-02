<template>
	<div id="PageBox">
		<router-view v-slot="{ Component }">
			<keep-alive>
				<component :is="Component"></component>
			</keep-alive>
		</router-view>
		<true-bar></true-bar>
	</div>
</template>

<script>
	import TrueBar from "components/content/truebar/TrueBar"

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
