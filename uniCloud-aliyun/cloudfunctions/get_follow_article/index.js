'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate; // 获取一个聚合的操作符

exports.main = async (event, context) => {
	const {
		userId
	} = event;

	let userInfo = await db.collection('user').doc(userId).get()
	let article_likes_ids = userInfo.data[0].article_likes_ids; // 获取用户的收藏文章的数组

	const list = await db.collection('article')
		.aggregate()
		.addFields({
			// 判断这个文章的数组是否包含文章的_id ,$_id 指的是文章列表里面的_id,如果包含，返回true，否则，返回false，在这个里面是过滤查询的每一条记录值
			is_like: $.in(['$_id', article_likes_ids])
		})
		.project({
			content: 0
		})
		.match({
			is_like:true
		})
		.end();

	//返回数据给客户端
	return {
		code: 0,
		msg: "请求成功",
		data: list.data
	}
};
