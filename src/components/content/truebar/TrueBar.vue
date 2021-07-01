<template>
	<bar-box>
		<bar-box-item path="/home" activeColor="deeppink">
			<template #item-icon>
				<img src="~assets/img/barsvg/home.svg"/>
			</template>
			<template #item-slot-active>
				<img src="~assets/img/barsvg/home_active.svg"/>
			</template>
			<template #item-text>首页</template>
		</bar-box-item>
		<bar-box-item path="/category" activeColor="deeppink">
			<template #item-icon>
				<img src="~assets/img/barsvg/category.svg"/>
			</template>
			<template #item-slot-active>
				<img src="~assets/img/barsvg/category_active.svg"/>
			</template>
			<template #item-text>分类</template>
		</bar-box-item>
		<bar-box-item path="/cart" activeColor="deeppink">
			<template #item-icon>
				<img src="~assets/img/barsvg/shopcart.svg"/>
			</template>
			<template #item-slot-active>
				<img src="~assets/img/barsvg/shopcart_active.svg"/>
			</template>
			<template #item-text>购物车</template>
		</bar-box-item>
		<bar-box-item path="/profile" activeColor="deeppink">
			<template #item-icon>
				<img src="~assets/img/barsvg/profile.svg"/>
			</template>
			<template #item-slot-active>
				<img src="~assets/img/barsvg/profile_active.svg"/>
			</template>
			<template #item-text>我的</template>
		</bar-box-item>
	</bar-box>
</template>

<script>
import BarBox from "components/common/tabbar/BarBox"
import BarBoxItem from "components/common/tabbar/BarBoxItem.vue"

export default {
	name: "TrueBar",
	components: {
		BarBox,
		BarBoxItem
	}
}
</script>

<style scoped>
</style>
