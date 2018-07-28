// トリガー時刻設定
function setTrigger() {
  var triggerDay = new Date();
  triggerDay.setHours(19);
  triggerDay.setMinutes(00);
  ScriptApp.newTrigger("myFunction").timeBased().at(triggerDay).create();
}

// その日のトリガーを削除する関数(消さないと残る)
function deleteTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for(var i=0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() == "myFunction") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

/* 指定月の特定カレンダーからイベントすべてを取得してスプレッドシートに書き出す */
function myFunction() {

  var sheet1 = SpreadsheetApp.getActiveSheet(); //シートを取得
  var mySheet = SpreadsheetApp.getActive().getSheetByName("schedules");

  var RANGE = 2;  // スプレッドシート：開始位置

  var cal_id="di-v.co.jp_uj5alc40s7nivqrap1d43m14q8@group.calendar.google.com";
  var schedules = getEvents(cal_id);//特定IDのカレンダーを取得

  reset_contents(mySheet); //データリセット


  // 予定を繰り返し出力する
  for(var index = 0; index < schedules.length; index++) {
    var range = RANGE + index;
    // idを出力
    mySheet.getRange(range, 1).setValue(index + 1);
    // 開始時間を出力
    mySheet.getRange(range, 2).setValue(schedules[index].date);
    // イベント内容を出力
    mySheet.getRange(range, 3).setValue(schedules[index].time);
    var slacks = find_slack_id(sheet1, schedules[index].ids);
    // slack_idを出力
    mySheet.getRange(range, 4).setValue(slacks[0]);
    // divのslack_idを出力
    mySheet.getRange(range, 5).setValue(slacks[1]);
  }

} // end function

function getEvents(cal_id) {
  var event_list =[];
  var cal = CalendarApp.getCalendarById(cal_id);
  var now = new Date();
  var events = cal.getEventsForDay(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1));

  for(var i=0; i < events.length; i++){
    if (!events[i].isAllDayEvent()) {
      var title = events[i].getTitle()
      if (~title.indexOf("説明会")) {  //　説明会
        var event = {};
        var date_time =events[i].getEndTime();
        event.date = date_time.getMonth() + "/" + date_time.getDate();
        event.time = str_maker(title,/\d\d:?\d\d~/g);
        event.ids = events[i].getDescription();
        event_list.push(event);
      }

    }

  }

  return event_list;
}

// return Strings of strings which adapt in regular expression part in all
function str_maker(all, part) {
  var result = str_count(all, part);
  var str_result = "";
  result.forEach(function(str) {
    str_result = str_result + " " + str;
  });
  return str_result;
}

// return array of strings which adapt in regular expression part in all
function str_count(all, part) {
  var result = [];
  result = all.match(part)
  return result;
}

// return Strings of slack id from ids via sheet1
function find_slack_id(sheet, ids) {
  var ids_list = str_count(ids, /<@\w+>/g);
  var user_id_list = {};
  for (var k = 3; k < 17; k++) {
    var key = sheet.getRange(k, 3).getValue();
    user_id_list[key] = [sheet.getRange(k, 2).getValue(), sheet.getRange(k, 4).getValue()];
  }
  var result = "";
  var d_result = "";
  for (var j = 0; j < ids_list.length; j++) {
     result = result + " @" + user_id_list[ids_list[j]][0];
     d_result = d_result + " @" + user_id_list[ids_list[j]][1];
  }
  return [result, d_result];
}

// delete rows except heading
function reset_contents(sheet) {
  //　date will be remine(heading)
  var arrData = sheet.getDataRange().getValues();

  var nrow = arrData.length;
  var ncol = arrData[0].length;
  arrData.splice(1,nr-1);

  sheet.clearContents();
  sheet.getRange(1,1,1,nc).setValues(arrData);

}
