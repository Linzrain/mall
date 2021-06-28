<template>
	<div id="swiper-box">
		<div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
			<slot></slot>
		</div>
		<div class="indicator" v-if="showIndicator && slideCount>1 ">
			<slot name="indicator">
				<div v-for="(item, index) in slideCount" class="indi-item" :class="{active: index === currentIndex-1}"
					:key="index"></div>
			</slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Swiper",
		props: {
			animeDuration: {
				type: Number,
				default: 500
			},
			interval: {
				type: Number,
				default: 3500
			},
			moveRatio: {
				type: Number,
				default: 0.25
			},
			showIndicator: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				slideCount: 0, // 元素个数
				slideWidth: 0, // slide的宽度
				swiperStyle: {}, // swiper的样式
				currentIndex: 1, // 当前的index
				scrolling: false // 是否正在滚动
			}
		},
		mounted() {
			//<<<<<<<<<<<  入口  初始化要移动Dom      >>>>>>>>>>>>>>>
			setTimeout(() => {
				//1. 初始化要移动的Dom和其子元素 
				this.handleDom();

				//2. 开启定时器
				this.starTimer();

			}, 150)
		},
		methods: {

			//初始化函数
			handleDom() {
				//1.1 获取要移动的Dom
				let swiperEle = document.querySelector('.swiper');
				let slideEles = swiperEle.getElementsByClassName("slide");

				//1.2 获取要移动的Dom中子元素的个数并保存
				this.slideCount = slideEles.length

				//1.3 如果子元素个数大于1，则在前后分别添加一个slide以达到可循环
				if (this.slideCount > 1) {
					let cloneFirst = slideEles[0].cloneNode(true);
					let cloneLast = slideEles[this.slideCount - 1].cloneNode(true);
					swiperEle.insertBefore(cloneLast, slideEles[0]);
					swiperEle.appendChild(cloneFirst);
					this.slideWidth = swiperEle.offsetWidth;
					this.swiperStyle = swiperEle.style; // swiper的样式地址赋值给this.swiperStyle，以便监听

					//1.4 让swiper元素初始化位置以便显示正确的第一张图片
					this.setTransform(-this.slideWidth)
				}
			},

			//使swiper移动的函数
			setTransform(position) {
				this.swiperStyle.transform = `translate(${position}px,0)`;
				this.swiperStyle["-webkit-transform"] = `translate(${position}px,0)`;
				this.swiperStyle["-ms-transform"] = `translate(${position}px,0)`;
			},

			//开启定时器的函数
			starTimer() {
				//2.1 记录开启的定时器
				this.playTimer = window.setInterval(() => {
					//2.1.1 当前索引+1
					this.currentIndex++;

					//2.1.2 滚动动画
					this.scrollContent(-this.currentIndex * this.slideWidth)
				}, this.interval)
			},

			//关闭定时器的函数
			stopTimer() {
				window.clearInterval(this.playTimer)
			},

			// 滚动动画的函数
			scrollContent(currentPosition) {
				//2.2 表示开始滚动
				this.scrolling = true;

				//2.3 开始滚动动画
				this.swiperStyle.transition = 'transform ' + this.animeDuration + 'ms'
				this.setTransform(currentPosition);

				//2.4 滚动完成后移动到正确的位置
				this.checkPosition();

				//2.5 表示结束滚动
				this.scrolling = false
			},

			// 滚动完成后移动到正确的位置的函数
			checkPosition() {
				//2.4.1 先校验正确位置
				if (this.currentIndex >= this.slideCount + 1) {
					this.currentIndex = 1
				} else if (this.currentIndex <= 0) {
					this.currentIndex = this.slideCount;
				}

				window.setTimeout(() => {
					//2.4.2 先停止动画效果
					this.swiperStyle.transition = 'transform 0s'

					//2.4.3 再移动到正确位置
					this.setTransform(-this.currentIndex * this.slideWidth)

					//2.4.3 结束移动后回调
					this.$emit('transitionEnd', this.currentIndex - 1)
				}, this.animeDuration)
			},

			// 拖动事件
			// 开始拖动的事件
			touchStart(e) {
				// 1.如果正在滚动,不可拖动
				if (this.scrolling) return;
				console.log("start")
				// 2.停止定时器
				this.stopTimer();

				//3.保存开始滚动的位置
				this.startX = e.touches[0].pageX;
			},

			// 拖动中的事件
			touchMove(e) {
				// 1.计算出用户拖动的距离
				this.currentX = e.touches[0].pageX;
				this.distance = this.currentX - this.startX;
				let currentPosition = -this.currentIndex * this.slideWidth;
				let movDistance = this.distance + currentPosition;
				console.log("move")
				// 2.设置当前位置
				this.setTransform(movDistance)
			},
			//  拖动结束的事件
			touchEnd() {
				// 1.获取移动的距离
				let currentMove = Math.abs(this.distance);
				console.log("end")
				// 2.判断最终的距离
				if (this.distance === 0) {
					return
				} else if (this.distance > 0 && currentMove > this.slideWidth * this.moveRatio) {
					this.currentIndex--
				} else if (this.distance < 0 && currentMove > this.slideWidth * this.moveRatio) {
					this.currentIndex++
				}

				// 3.移动到正确的位置
				this.scrollContent(-this.currentIndex * this.slideWidth)


				// 4.移动完成后重新开启定时器
				this.starTimer()
			}
		}



	}
</script>

<style scoped>
	#swiper-box {
		overflow: hidden;
		position: relative;
	}

	.swiper {
		display: flex;

	}

	.indicator {
		display: flex;
		justify-content: center;
		position: absolute;
		width: 100%;
		bottom: 8px;
	}

	.indi-item {
		box-sizing: border-box;
		width: 8px;
		height: 8px;
		border-radius: 4px;
		background-color: #fff;
		line-height: 8px;
		text-align: center;
		font-size: 12px;
		margin: 0 5px;
	}

	.indi-item.active {
		background-color: rgba(212, 62, 46, 1.0);
	}
</style>
