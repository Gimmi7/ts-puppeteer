const msg = `liveme117209582574935244916232320372802130737"!liveme_01ff1321555fd8c8__d07f5c34(0P@����왁H��������Z�{"pinggoogle":-4,"pingksy":0,"pingws":0,"bitrate":1614,"uid":"1172095825749352449","vsp":95,"vdp":0,"verco
de":"android-43210631","utctick":1623240636218,"poorstreaming":0,"prais":11871,"users":494,"money":0,"roomstate":0,"commonData":"{\"userLevel\":14,\"watchSource\":0,\"watchSource2\":0,\"prerogative\":\"\",\"rewardRight\":\"000000\",\"fanLevel\":0,\"guardType\":0,\"is_new_user\":0,\"adminType\":0,\"familyBadgeUrl\":\"http:\\\/\\\/esx.esxscloud.com\\\/big\\\/liveme\\\/familyicon\\\/92eb57ae355b1014f5d788627147a0c6_icon.png\",\"uid\":\"1172095825749352449\",\"vipBean\":{\"vipUrl\":\"https:\\\/\\\/esx.esxscloud.com\\\/liveglb\\\/202007082221\\\/content\\\/resource_manage\\\/md5_8e02ff0a611bebd5af499ce99be5f61a_.png\",\"vipColorStart\":\"#A1A1A1\",\"vipColorEnd\":\"#A1A1A1\",\"vipBoderColor\":\"-1\",\"vipLevel\":0,\"vipType\":0,\"vipPageUrl\":\"https:\\\/\\\/www.liveme.com\\\/app\\\/vip\\\/dist\\\/index.html\",\"vOverExp\":0,\"vCardTotalExp\":1,\"vCardMinLevel\":0,\"vCardMaxLevel\":1,\"vCardMaxLevelIsSvip\":0,\"vMsgBorderColor\":\"\",\"vBgColor\":\"#6A12AD\",\"vBgLeftIcon\":\"https:\\\/\\\/esx.esxscloud.com\\\/liveglb\\\/202007082050\\\/content\\\/resource_manage\\\/md5_7344dcf5104080128e64e882c4a4d2ce_.png\",\"vBgRightIcon\":\"https:\\\/\\\/esx.esxscloud.com\\\/liveglb\\\/202007082050\\\/content\\\/resource_manage\\\/md5_f8100fdd77da63fe7176bfe540b714f6_.png\",\"vDeltaExp\":\"0\",\"vRechargeTips\":\"充值1金幣，您將會得到VIP1和更多的特權\",\"vPrivileges\":[{\"isLock\":1,\"title\":\"VIP徽章\",\"icon\":\"https:\\\/\\\/esx.esxscloud.com\\\/liveglb\\\/202007101131\\\/content\\\/resource_manage\\\/md5_5336de91d378af942119a0c842d01b49_.png\",\"defaultIcon\":\"https:\\\/\\\/esx.esxscloud.com\\\/liveglb\\\/202007082010\\\/content\\\/resource_manage\\\/md5_fec5475606fb7854dadc3a1d68371a52_.png\",\"titleColor\":\"#BD995E\"}]}}","minGiftGold":0,"hotValue":-1,"suv":31,"interact":4,"interact2":4,"lossrate":0,"heat":1425,"beaminfo":"[{\"uid\":\"1172095825749352449\",\"index\":\"0\"}]","vtype":1,"appStatus":0,"netWork":1,"tqavtype10.66.102.166,"vBitrate":1614,"vFps":19,"vWidth":720,"vHeight":1280,"max_num":9}\``;

let re = /({"(?:.+)})/;
let result = msg.match(re);

// if (result == null) {
//   console.log("result is null")
// } else {
//   console.log(result[1]);
// }


// const u8Str = `
// 1395283858823454721liveme (2162324459806361908038ŷ�/@���/`;
// const b64Str = 'BAoTMTM5NTI4Mzg1ODgyMzQ1NDcyMRoGbGl2ZW1lIAEoATIUMTYyMzI0NDU5ODA2MzYxOTA4MDM4xbfzh58vQLis84efLw==';

// const parsed = Buffer.from(u8Str, 'utf-8').toString('base64');
// const parsedU8 = Buffer.from(b64Str, 'base64').toString('utf-8');
// console.log(b64Str);
// console.log(parsed);

// console.log("")

// console.log(u8Str);
// console.log(parsedU8);
// if (u8Str === parsedU8) {
//   console.log("u8str===parsedU8");
// }

// const enc = "binary";
// const tryEnc = Buffer.from(b64Str, "base64").toString(enc);
// console.log(tryEnc);
// const afterEnc = Buffer.from(tryEnc, enc).toString("base64");
// console.log(afterEnc);
// if (afterEnc === b64Str) {
//   console.log("afterEnc===b64Str");
// }


const b64Arr = [
  'BBoGbGl2ZW1lIAEoATIUMTYyMzI5MjM2ODk3MDUwODM4Njg40oaon58vQP/5p5+fLw==',
  'BBoGbGl2ZW1lIAEoATIUMTYyMzI5NDY2MTQ0MjkxNzMyNjA4iqyxn58vQNqfsZ+fLw=='
]

const vidArr = [
  '16232923689705083868',
  '16232946614429173260'
]

'BBoGbGl2ZW1lIAEoATIUMTYyMzI5NDY2MTQ0MjkxNzMyNjA40oaon58vQP/5p5+fLw==',


b64Arr.forEach(s => {
  const biStr = Buffer.from(s, "base64").toString("binary");
  console.log(biStr);
})

vidArr.forEach(i => {
  const b64Str = Buffer.from(i, 'binary').toString('base64');
  console.log(b64Str);
})
