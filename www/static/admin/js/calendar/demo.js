$(document).ready( function(){
  var cTime = new Date(), month = cTime.getMonth()+1, year = cTime.getFullYear();

	theMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	theDays = ["S", "M", "T", "W", "T", "F", "S"];
    events = [
      [
        "4/"+month+"/"+year, 
        'Meet a friend', 
        '#', 
        '#177bbb', 
        'Contents here'
      ],
      [
        "7/"+month+"/"+year, 
        'Kick off meeting!', 
        '#', 
        '#1bbacc', 
        'Have a kick off meeting with .inc company'
      ],
      [
        "17/"+month+"/"+year, 
        'Milestone wangEditor',
        '#', 
        '#fcc633', 
        'Contents here'
      ],
      [
        "19/"+month+"/"+year, 
        'A link', 
        'http://www.google.com', 
        '#e33244'
      ]
    ];
    $('#calendar').calendar({
        months: theMonths,
        days: theDays,
        events: events,
        popover_options:{
            placement: 'top',
            html: true
        }
    });
});