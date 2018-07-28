

/* 指定月の特定カレンダーからイベントすべてを取得してスプレッドシートに書き出す */
function myFunction() {

  var sheet1 = SpreadsheetApp.getActiveSheet(); //シートを取得
  var mySheet = SpreadsheetApp.getActive().getSheetByName("schedules");

  var RANGE = 2;  // スプレッドシート：開始位置

  var cal_id="di-v.co.jp_uj5alc40s7nivqrap1d43m14q8@group.calendar.google.com";
  var schedules = getEvents(cal_id)//特定IDのカレンダーを取得



  // 予定を繰り返し出力する
  for(var index = 0; index < schedules.length; index++) {
    var range = RANGE + index;
    // 開始時間を出力
    mySheet.getRange(range, 2).setValue(schedules[index].date);
    // イベント内容を出力
    mySheet.getRange(range, 3).setValue(schedules[index].time);
    var slacks = find_slack_id(sheet1, schedules[index].ids);
    // slack_idを出力
    mySheet.getRange(range, 4).setValue(slacks);
  }

} // end function

function getEvents(cal_id)
{
  var event_list =[];
  var cal = CalendarApp.getCalendarById(cal_id);
  var now = new Date();
  var events = cal.getEventsForDay(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2));

  for(var i=0; i < events.length; i++){
    if (!events[i].isAllDayEvent()) {
      var title = events[i].getTitle()
      if (~title.indexOf("渋谷説明会")) {
        var times = str_count(title,/\d\d:?\d\d~/g);
        for (var j = 0; j < times.length; j++) {
          var event = {};
          var date_time =events[i].getEndTime();
          event.date = date_time.getMonth() + "/" + date_time.getDate();
          event.time = times[j];
          event.ids = events[i].getDescription();
          event_list.push(event);
        }
      }

    }


  }

  return event_list;
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
    user_id_list[key] = sheet.getRange(k, 2).getValue();
  }
  var result = "";
  for (var j = 0; j < ids_list.length; j++) {
     result = result + " @" + user_id_list[ids_list[j]];
  }
  return result;
}
