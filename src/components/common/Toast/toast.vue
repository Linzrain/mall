<template>
	<div class="toast" v-show="isShow">{{message}}</div>
</template>

<script>
	export default {
		name: "Toast",
		data() {
			return {
				isShow: false,
				message: ''
			}
		},
		methods:{
			show(message,duration=2000) {
				this.isShow = true;
				this.message = message;
				setTimeout(() => {
					this.isShow = false;
					this.message = ''
				},duration)
			}
		}
	}
</script>

<style scoped>
.toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background: rgba(0,0,0,.7);
    color: #fff;
    padding: 8px 10px;
    border-radius: 8px;
    z-index: 999;
    animation: show 2s ;
}
@keyframes  show{
    0% {visibility: hidden; background: rgba(0,0,0,0)}
    50% {visibility: visible;  background: rgba(0,0,0,.7)}
    100% {visibility: hidden; background:rgba(255, 255, 255, 0)}
}
</style>
