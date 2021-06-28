<template>
	<div class="bar-box-item" @click="itemClick">
		<slot v-if="!isActive" name="item-icon"></slot>
		<slot v-else name="item-slot-active"></slot>
		<div :style="isActiveStyle">
			<slot name="item-text"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: "BarBoxItem",
		props: {
			path: String,
			activeColor: {
				type:String,
				default: 'red'
			}
		},
		data() {
			return {
				// isActive: false
			}
		},
		computed: {
			isActive() {
				return this.$route.path.indexOf(this.path) !== -1
			},
			isActiveStyle() {
				return this.isActive ? {color: this.activeColor} : {}
			}
		},
		methods: {
			itemClick() {
				this.$router.replace(this.path)
			}
		}
	}
</script>

<style>
	.bar-box-item {
		flex: 1;
		text-align: center;
		height: 49px;
		font-size: 14px;
	}

	.bar-box-item img {
		width: 24px;
		height: 24px;
		margin-top: 3px;
		margin-bottom: 2px;
		vertical-align: middle;
	}
</style>
