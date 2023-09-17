'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const {
		userId,
		feedbackImageList,
		content
	} = event
	
	await db.collection('feedback').add({
		user_id:userId,
		feedbackImageList,
		content
	})
	return {
		code:0,
		data:{
			msg:"提交反馈成功"
		}
	}
};
