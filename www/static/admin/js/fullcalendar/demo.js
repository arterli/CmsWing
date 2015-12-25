+function ($) {

  $(function(){

    // fullcalendar
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var addDragEvent = function($this){
      // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
      // it doesn't need to have a start or end
      var eventObject = {
        title: $.trim($this.text()), // use the element's text as the event title
        className: $this.attr('class').replace('label','')
      };
      
      // store the Event Object in the DOM element so we can get to it later
      $this.data('eventObject', eventObject);
      
      // make the event draggable using jQuery UI
      $this.draggable({
        zIndex: 999,
        revert: true,      // will cause the event to go back to its
        revertDuration: 0  //  original position after the drag
      });
    };
    $('.calendar').each(function() {
      $(this).fullCalendar({
        header: {
          left: 'prev',
          center: 'title',
          right: 'next'
        },
        editable: true,
        droppable: true, // this allows things to be dropped onto the calendar !!!
        drop: function(date, allDay) { // this function is called when something is dropped
          
            // retrieve the dropped element's stored Event Object
            var originalEventObject = $(this).data('eventObject');
            
            // we need to copy it, so that multiple events don't have a reference to the same object
            var copiedEventObject = $.extend({}, originalEventObject);
            
            // assign it the date that was reported
            copiedEventObject.start = date;
            copiedEventObject.allDay = allDay;
            
            // render the event on the calendar
            // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
            
            // is the "remove after drop" checkbox checked?
            if ($('#drop-remove').is(':checked')) {
              // if so, remove the element from the "Draggable Events" list
              $(this).remove();
            }
            
          }
        ,
        events: [
          {
            title: 'All Day Event',
            start: new Date(y, m, 1),
            className:'b-l b-2x b-info'
          },
          {
            title: 'Long Event',
            start: new Date(y, m, d-5),
            end: new Date(y, m, d-2),
            className:'bg-success bg'
          },
          {
            id: 999,
            title: 'Event',
            start: new Date(y, m, d-5, 16, 0),
            allDay: false,
            className:'b-l b-2x b-warning'
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: new Date(y, m, d+4, 16, 0),
            allDay: false,
            className:'b-l b-2x b-warning'
          },
          {
            title: 'Meeting',
            start: new Date(y, m, d, 10, 30),
            allDay: false,
            className:'b-l b-2x b-danger'
          },
          {
            title: 'Lunch',
            start: new Date(y, m, d, 12, 0),
            end: new Date(y, m, d, 14, 0),
            allDay: false,
            className:'b-l b-2x b-primary'
          },
          {
            title: 'Birthday Party',
            start: new Date(y, m, d+1, 19, 0),
            end: new Date(y, m, d+1, 22, 30),
            allDay: false,
            className:'b-l b-2x b-warning'
          },
          {
            title: 'Click for Google',
            start: new Date(y, m, 28),
            end: new Date(y, m, 29),
            url: 'http://google.com/',
            className:'b-l b-2x b-primary'
          }
        ]
      });
    });
    $('#myEvents').on('change', function(e, item){
      addDragEvent($(item));
    });

    $('#myEvents li > div').each(function() {
      addDragEvent($(this));
    });

    $(document).on('click', '#dayview', function() {
      $('.calendar').fullCalendar('changeView', 'agendaDay')
    });

    $('#weekview').on('click', function() {
      $('.calendar').fullCalendar('changeView', 'agendaWeek')
    });

    $('#monthview').on('click', function() {
      $('.calendar').fullCalendar('changeView', 'month')
    });

  });
}(window.jQuery);