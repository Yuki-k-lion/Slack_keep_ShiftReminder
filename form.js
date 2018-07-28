function sendToSlack(body, channel) {
  var url = "https://hooks.slack.com/services/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";
  var data = { "channel" : channel, "username" : "Googleフォーム Bot", "text" : body, "icon_emoji" : ":date: " };
  var payload = JSON.stringify(data);
  var options = {
    "method" : "POST",
    "contentType" : "application/json",
    "payload" : payload
  };
  var response = UrlFetchApp.fetch(url, options);
}

function test() {
  sendToSlack("テスト通知確認です", "#mentor_conf_notice")
}

function onFormSubmit(e){

  var body = "公開版申請が来たよ\n";
  var applicant = "";
  var itemResponse = e.response.getItemResponses();

  for (var j = 0; j < itemResponse.length; j++){
    var formData = itemResponse[j];
    var title = formData.getItem().getTitle();
    var response = formData.getResponse();

    switch (title) {
      case "1. 名前":
        name = response;
        break;
      case "2. 所属教室":
        class_room = response;
        break;
      case "3. TECH::CAMPのコアの価値3つは理解できましたか？":
        tc_core = response;
        break;
      case "4. なぜ受講生がやり切るまでサポートする必要があるのでしょうか？":
        support_reason = response;
        break;
      case "5. 今回の変更による受講生のTECH::MASTER利用フローは理解できましたか？":
        tm_flow = response;
        break;
      case "6. 5で「理解できなかった」方はどこが理解出来なかったを記入してください":
        five_reason = response;
        break;
      case "7. 今回の変更によるメンターの動きは理解できましたか？":
        mentor_flow = response;
        break;
      case "8. 7で「理解できなかった」方はどこが理解できなかったかを記入してください":
        seven_reason = response;
        break;
      case "9. 教室での面談のフローは完璧に理解できましたか？":
        inter_flow = response;
        break;
      case "10. 9で「理解できなかった」方はどこが理解できなかったかを記入してください":
        nine_reason = response;
        break;
      case "あなたがメンターとして大切にしている事を教えてください。":
        mentor_imp = response;
        break;
      case "その他意見・要望があればご自由に記入してください":
        other = response;
        break;
      default:
        break;
    }
  }
  var bodyPublic = comment + "というフォームがきました" ;
  sendToSlack(bodyPublic, "#mentor_conf_notice");
}
