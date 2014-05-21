baja.started(function() {

  var sub = new baja.Subscriber();

  sub.attach("changed", function() {
    document.getElementById("alarm1").innerHTML = this.getOutDisplay();
    document.getElementById("alarm2").innerHTML = this.getOutDisplay();
    document.getElementById("alarm3").innerHTML = this.getOutDisplay();
  });

  baja.Ord.make("station:|slot:/Services/AlarmService/AlarmCount").get({
    subscriber: sub
  });

  document.getElementById("userID").innerHTML = baja.getUserName();
  document.getElementById("userName").innerHTML = baja.getUserName();

  baja.Ord.make("alarm:|bql:select TOP 5 timestamp, ackState, alarmData where ackState=alarm:AckState.unacked").get({
    cursor: {
      each: function() {
        var x = this.get("timestamp").encodeToString().match(/\d\d:\d\d:\d\d/);
        var y = this.get("alarmData").encodeToString().replace(/.*sourceName\=s\:/, '').replace(/\|.*/, '');
        $("#listID").append("<li><a href=\"#\"><span class=\"notification-icon bg-danger\"><i class=\"fa fa-warning\"></i></span><span class=\"m-left-xs\">" + y + "</span><span class=\"time text-muted\">" + x + "</span></a></li>");
      },
      ok: function() {
        var cnt = $("#listID").contents();
        $("#listID").replaceWith(cnt);
      }
    }
  });   

});

baja.start();