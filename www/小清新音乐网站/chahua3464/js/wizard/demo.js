+function ($) {

  $(function(){

    $('#wizardform').bootstrapWizard({
      'tabClass': 'nav nav-tabs',
      'onNext': function(tab, navigation, index) {
        var valid = false;
        $('[data-required="true"]', $( $(tab.html()).attr('href') )).each(function(){
          return (valid = $(this).parsley( 'validate' ));
        });
        return valid;
      },
      onTabClick: function(tab, navigation, index) {
        return false;
      },
      onTabShow: function(tab, navigation, index) {
        var $total = navigation.find('li').length;
        var $current = index+1;
        var $percent = ($current/$total) * 100;
        $('#wizardform').find('.progress-bar').css({width:$percent+'%'});
      }
    });


    var ranNum = Math.floor((Math.random()*50)+1);
    var info = $('#gi'), num='';
    var count = 0;
    $('#gn').on('keydown', function(){info.text('.')});
    $('#guessform').bootstrapWizard({
      'tabClass': 'nav nav-tabs',
      'onNext': function(tab, navigation, index) {        
        var answer = $('#gn').val();
        num = num +' '+ answer;
        count++;
        if(answer > ranNum)
        {
          info.text("Guess lower!");
          return false;
        }
        else if(answer < ranNum)
        {
          info.text("Guess higher!!");
          return false;
        }
        else if(answer==ranNum)
        {
          ranNum = Math.floor((Math.random()*50)+1);
          $('#answer').text(answer);
          $('#count').text(count);
          $('#num').text(num);
          count = 0;
          return true;
        }
      },
      onTabClick: function(tab, navigation, index) {
        return false;
      }
    });
    
  });
}(window.jQuery);