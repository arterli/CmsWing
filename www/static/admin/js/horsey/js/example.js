void function () {
  'use strict';

  horsey(hy, {
    suggestions: ['banana', 'apple', 'orange']
  });

  horsey(ly, {
    suggestions: function (done) {
      var start = new Date();
      lyr.innerText = 'Loading...';
      setTimeout(function () {
        lyr.innerText = 'Loaded in ' + (new Date() - start) + 'ms!';
        done(['banana', 'apple', 'orange']);
      }, 2000);
    }
  });

  horsey(kv, {
    suggestions: [
      { value: 'banana', text: 'Bananas from Amazon Rainforest' },
      { value: 'apple', text: 'Red apples from New Zealand' },
      { value: 'orange', text: 'Oranges from Moscow' },
      { value: 'lemon', text: 'Juicy lemons from the rich Amalfitan Coast' }
    ]
  });

  horsey(ig, {
    suggestions: [
      { value: 'banana', text: 'Bananas from Amazon Rainforest' },
      { value: 'apple', text: 'Red apples from New Zealand' },
      { value: 'orange', text: 'Oranges from Moscow' },
      { value: 'lemon', text: 'Juicy lemons from Amalfitan Coast' }
    ],
    render: function (li, suggestion) {
      var image = '<img class="autofruit" src="img/fruits/' + suggestion.value + '.png" /> ';
      li.innerHTML = image + suggestion.text;
    }
  });

  function events (el, type, fn) {
    if (el.addEventListener) {
      el.addEventListener(type, fn);
    } else if (el.attachEvent) {
      el.attachEvent('on' + type, wrap(fn));
    } else {
      el['on' + type] = wrap(fn);
    }
    function wrap (originalEvent) {
      var e = originalEvent || global.event;
      e.target = e.target || e.srcElement;
      e.preventDefault  = e.preventDefault  || function preventDefault () { e.returnValue = false; };
      e.stopPropagation = e.stopPropagation || function stopPropagation () { e.cancelBubble = true; };
      fn.call(el, e);
    }
  }
}();
