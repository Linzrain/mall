<template>
	<div class="comment-info">
		<div class="info-header">
			<div class="header-title">用户评价</div>
			<div class="header-more">更多></div>
		</div>
		<div class="info-content" v-if="commentInfo.list && commentInfo.list.length">
			<div>
				<div class="user">
					<span>
						<img :src="data.user.avatar" alt="">
					</span>
					<span class="name">{{data.user.uname}}</span>
				</div>
				<div class="comment-detail">
					<div class="desc">{{data.content}}</div>
					<div class="other">
						<span class="date">{{formatDate}}</span>
						<span class="color">{{data.style}}</span>
					</div>
					<div class="comment-img" v-if="data.images && data.images.length">
						<img v-for="(item, index) in data.images" :key="index" :src="item" alt="avatar">
					</div>
				</div>
			</div>
		</div>
		<div v-else>暂时没有评论 ≥Ö‿Ö≤ </div>
	</div>
</template>

<script>
	export default {
		name: 'DetailCommentInfo',
		props: {
			commentInfo: {
				type: Object,
				default () {
					return {};
				}
			}
		},
		computed: {
			data() {
				return this.commentInfo.list[0]
			},
			formatDate() {
				return 2021 - 7 - 23
			}
		}
	}
</script>

<style scoped>
	.comment-info {
		padding: 8px 8px 20px;
		border-bottom: solid 4px rgba(100, 100, 100, .1);
	}

	.info-header {
		padding: 10px 0;
		display: flex;
		justify-content: space-between;
		border-bottom: 2px solid rgba(100, 100, 100, .1);
	}

	.info-content {
		margin-top: 8px;
	}

	.info-content .user img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}

	.info-content .user .name {
		position: relative;
		top: -15px;
		left: 8px;
	}

	.comment-detail .desc {
		padding: 4px;
		text-indent: 2em;
		color: var(--color-text);
	}

	.comment-detail .other {
		color: var(--color-text);
	}

	.comment-detail .other span {
		padding: 4px;
	}

	.comment-detail .comment-img {
		display: flex;
	}

	.comment-img img {
		width: 25%;
		padding-right: 6px;
	}
</style>
