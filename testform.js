function sendToSlack(body, channel) {
  Logger.log("send now");
  var url = "https://hooks.slac";
  var data = { "channel" : channel, "username" : "Briefing session bot", "text" : body, "icon_emoji" : ":date: " };
  var payload = JSON.stringify(data);
  var options = {
     "method" : "POST",
     "contentType" : "application/json",
     "payload" : payload
   };
  var response = UrlFetchApp.fetch(url, options);
}

function sendToSlack2(body, channel) {
  var url = "https://hooks.slack.co";
  var data = { "channel" : channel, "username" : "Briefing session bot", "text" : body, "icon_emoji" : ":date: " };
  var payload = JSON.stringify(data);
  var options = {
     "method" : "POST",
     "contentType" : "application/json",
     "payload" : payload
   };
  var response = UrlFetchApp.fetch(url, options);
}

function test() {
 sendToSlack2("テスト", "#cvr100")
}


function onFormSubmit(e){
 var body = "test\n";
 var applicant = "";
 var itemResponse = e.response.getItemResponses();
 for (var j = 0; j < itemResponse.length; j++){
   var formData = itemResponse[j];
   var title = formData.getItem().getTitle();
   var response = formData.getResponse();
   switch (title) {
     case "test":
       name = response;
       break;
     case "test":
       student = response;
       break;
     case "月":
       month = response;
       break;
     case "日":
       day = response;
       break;
     case "学生社会人":
       student_or_society = response;
       break;
     case "年代":
       age = response;
       break;
     case "性別":
       sex = response;
       break;
     case "拠点":
       class_place = response;
       break;
     case "結果":
       cv_result = response;
       break;
     case "登録":
       line_at = response;
       break;
     case "理由":
       study_reason = response;
       break;
     case "理由の詳細":
       study_reason_detail = response;
       break;
     case "転職":
       if (response == "なし") {
         work_change = response;
        } else {
         work_change = response + " チェック！";
       };
       break;
     case "コンテンツ":
       favorite_contents = response;
       break;
     case "経験":
       programming_study = response;
       break;
     case "上記「あり」の場合の言語と学習期間":
       programming_study_detail = response;
       break;
     case "備考":
       other = response;
       break;
     case "原因":
       no_cv_reason = response;
       break;
     case "どういうアプローチをしたか":
       approach = response;
       break;
     case "どういう風に断られたか":
       turn_down = response;
       break;
     case "次回対応をすれば良いか":
       next_action = response;
       break;
     case "アプローチをすれば良いか":
       line_at_approach = response;
       break;
     case "理由":
       cv_reason = response;
       break;
     default:
       break;
   }
 }
      var base_section =
                       "*■投稿者名:* " + name +
                       "\n*■参加者名:* " + student +
                       "\n*■日付:* " + month + "/" + day +
                       "\n*■教室:* " + class_place +
                       "\n*■CV結果:* `" + cv_result + "`" +
                       "\n*■LINE@登録:* " + line_at +
                       "\n*■理由:* " + study_reason +
                       "\n*■理由の詳細*\n" + study_reason_detail +
                       "\n*■転職希望:* " + work_change +
                       "\n*■興味を持って頂いたコンテンツ:*\n" + favorite_contents;
  Logger.log("base");
     var other_section = "\n*■その他備考*\n" + other;
  Logger.log("other");
  if (cv_result == "CV") {
            var no_cv_section =
                       "\n*■原因:* " + no_cv_reason +
                       "\n*■どういうアプローチ*\n" + approach +
                       "\n*■断られたか*\n" + turn_down +
                       "\n*■対応\n" + next_action +
                       "\n*■LINE@の\n" + line_at_approach;
    Logger.log("no_cv");
    var bodyPublic = base_section + no_cv_section + other_section;
  } else {
    var cv_section = "\n*■理由*\n" + cv_reason;
    var bodyPublic = base_section + cv_section + other_section;
    Logger.log("cv");
  };
  sendToSlack2(bodyPublic, "#cvr100");
}
