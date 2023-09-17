'use strict';
exports.main = async (event, context) => {
  const { phone } = event;
  // 创建一个随机数，返回给前端
  const currentNumber = Math.random().toString().substr(2, 6)

  try {
    const res = await uniCloud.sendSms({
      appid: '__UNI__600EB91', // mainfest.json中进行获取
      smsKey: '25cfa81fcade420555022b1ee4021a8a',
      smsSecret: 'd79e45ec2456c4d6ffc7956dba4e1f43',
      phone,
      templateId: '12333', // 获取的短信模版
      data: {
        code: currentNumber,
        expMinute: '1',
      }
    })
    // 调用成功，请注意这时不代表发送成功
    return {
      code: 0,
      data: {
        mobileCode: currentNumber,
        msg: "请在手机注意查收验证码",
      }
    }
  } catch (err) {
    return {
      code: 1,
      msg: '短信验证码发送失败'
    }
  }
};
