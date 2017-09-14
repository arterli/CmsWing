/* global Qiniu */
/* global plupload */
/* global FileProgress */
/* global hljs */

$(function() {
  var uploader = Qiniu.uploader({
    runtimes: 'html5,flash,html4',
    browse_button: 'pickfiles',
    container: 'container',
    drop_element: 'container',
    max_file_size: '1000mb',
    flash_swf_url: '/static/admin/js/qiniu/Moxie.swf',
    dragdrop: true,
    chunk_size: '4mb',
    multi_selection: !(mOxie.Env.OS.toLowerCase() === 'ios'),
    uptoken_url: '/' + module + '/file/getqiniuuptoken',
    // uptoken_func: function(){
    //     var ajax = new XMLHttpRequest();
    //     ajax.open('GET', $('#uptoken_url').val(), false);
    //     ajax.setRequestHeader("If-Modified-Since", "0");
    //     ajax.send();
    //     if (ajax.status === 200) {
    //         var res = JSON.parse(ajax.responseText);
    //         console.log('custom uptoken_func:' + res.uptoken);
    //         return res.uptoken;
    //     } else {
    //         console.log('custom uptoken_func err');
    //         return '';
    //     }
    // },
    domain: $('#domain').val(),
    get_new_uptoken: false,
    // downtoken_url: '/downtoken',
    // unique_names: true,
    // save_key: true,
    // x_vars: {
    //     'id': '1234',
    //     'time': function(up, file) {
    //         var time = (new Date()).getTime();
    //         // do something with 'time'
    //         return time;
    //     },
    // },
    multi_selection: false,
    auto_start: true,
    log_level: 5,
    init: {
      'FilesAdded': function(up, files) {
        $('table').show();
        $('#success').hide();
        plupload.each(files, function(file) {
          var progress = new FileProgress(file, 'fsUploadProgress');
          progress.setStatus('等待...');
          progress.bindUploadCancel(up);
        });
      },
      'BeforeUpload': function(up, file) {
        var progress = new FileProgress(file, 'fsUploadProgress');
        var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
        if (up.runtime === 'html5' && chunk_size) {
          progress.setChunkProgess(chunk_size);
        }
      },
      'UploadProgress': function(up, file) {
        var progress = new FileProgress(file, 'fsUploadProgress');
        var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
        progress.setProgress(file.percent + '%', file.speed, chunk_size);
      },
      'UploadComplete': function() {
        $('#success').show();
      },
      'FileUploaded': function(up, file, info) {
        var progress = new FileProgress(file, 'fsUploadProgress');
        progress.setComplete(up, info);
        var data = JSON.parse(info);
        data.size = file.size;
        data.mime = file.type;
        data.id = file.id;
        $.ajax({
          type: 'post',
          url: '/admin/file/qiniuadd',
          data: data,
          success: function(res) {
            $('#pickfilesid').val(res);
            $("[name='size']").val(file.size);
            $('#container').hide();
          }
        });
      },
      'Error': function(up, err, errTip) {
        $('table').show();
        var progress = new FileProgress(err.file, 'fsUploadProgress');
        progress.setError();
        progress.setStatus(errTip);
      }
      // ,
      // 'Key': function(up, file) {
      //     var key = "";
      //     // do something with key
      //     return key
      // }
    }
  });

    // 删除
  $(document).on('click', '#delfile', function() {
    var id = $('#pickfilesid').val();
    swal({
      title: '确认您的操作！',
      text: '删除文件将不能恢复!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: '确定',
      cancelButtonText: '关闭!',
      closeOnConfirm: false
    }, function() {
      $.ajax({
        url: '/' + module + '/file/delqiniufile/?id=' + id,
        success: function(res) {
          if (res.errno == 0) {
            $('#fsUploadProgress').html('');
            $('#success').hide();
            $('#container').show();
            $('#filetable').hide();
            $('#pickfilesid').val('');
            // toastr.success(res.data.name);
            swal(res.data.name, '', 'success');
          } else {
            // toastr.error(res.errmsg);
            swal('res.errmsg', '', 'error');
          }
        }
      });
    });
  });
  uploader.bind('FileUploaded', function() {
    console.log('hello man,a file is uploaded');
  });
  $('#container').on(
    'dragenter',
    function(e) {
      e.preventDefault();
      $('#container').addClass('draging');
      e.stopPropagation();
    }
  ).on('drop', function(e) {
    e.preventDefault();
    $('#container').removeClass('draging');
    e.stopPropagation();
  }).on('dragleave', function(e) {
    e.preventDefault();
    $('#container').removeClass('draging');
    e.stopPropagation();
  }).on('dragover', function(e) {
    e.preventDefault();
    $('#container').addClass('draging');
    e.stopPropagation();
  });

  $('#show_code').on('click', function() {
    $('#myModal-code').modal();
    $('pre code').each(function(i, e) {
      hljs.highlightBlock(e);
    });
  });

  $('body').on('click', 'table a.btn', function() {
    $(this).parents('tr').next().toggle();
  });

  var getRotate = function(url) {
    if (!url) {
      return 0;
    }
    var arr = url.split('/');
    for (var i = 0, len = arr.length; i < len; i++) {
      if (arr[i] === 'rotate') {
        return parseInt(arr[i + 1], 10);
      }
    }
    return 0;
  };

  $('#myModal-img .modal-body-footer').find('a').on('click', function() {
    var img = $('#myModal-img').find('.modal-body img');
    var key = img.data('key');
    var oldUrl = img.attr('src');
    var originHeight = parseInt(img.data('h'), 10);
    var fopArr = [];
    var rotate = getRotate(oldUrl);
    if (!$(this).hasClass('no-disable-click')) {
      $(this).addClass('disabled').siblings().removeClass('disabled');
      if ($(this).data('imagemogr') !== 'no-rotate') {
        fopArr.push({
          'fop': 'imageMogr2',
          'auto-orient': true,
          'strip': true,
          'rotate': rotate,
          'format': 'png'
        });
      }
    } else {
      $(this).siblings().removeClass('disabled');
      var imageMogr = $(this).data('imagemogr');
      if (imageMogr === 'left') {
        rotate = rotate - 90 < 0 ? rotate + 270 : rotate - 90;
      } else if (imageMogr === 'right') {
        rotate = rotate + 90 > 360 ? rotate - 270 : rotate + 90;
      }
      fopArr.push({
        'fop': 'imageMogr2',
        'auto-orient': true,
        'strip': true,
        'rotate': rotate,
        'format': 'png'
      });
    }

    $('#myModal-img .modal-body-footer').find('a.disabled').each(function() {
      var watermark = $(this).data('watermark');
      var imageView = $(this).data('imageview');
      var imageMogr = $(this).data('imagemogr');

      if (watermark) {
        fopArr.push({
          fop: 'watermark',
          mode: 1,
          image: 'http://www.b1.qiniudn.com/images/logo-2.png',
          dissolve: 100,
          gravity: watermark,
          dx: 100,
          dy: 100
        });
      }

      if (imageView) {
        var height;
        switch (imageView) {
          case 'large':
            height = originHeight;
            break;
          case 'middle':
            height = originHeight * 0.5;
            break;
          case 'small':
            height = originHeight * 0.1;
            break;
          default:
            height = originHeight;
            break;
        }
        fopArr.push({
          fop: 'imageView2',
          mode: 3,
          h: parseInt(height, 10),
          q: 100,
          format: 'png'
        });
      }

      if (imageMogr === 'no-rotate') {
        fopArr.push({
          'fop': 'imageMogr2',
          'auto-orient': true,
          'strip': true,
          'rotate': 0,
          'format': 'png'
        });
      }
    });

    var newUrl = Qiniu.pipeline(fopArr, key);

    var newImg = new Image();
    img.attr('src', '/static/admin/js/qiniu/loading.gif');
    newImg.onload = function() {
      img.attr('src', newUrl);
      img.parent('a').attr('href', newUrl);
    };
    newImg.src = newUrl;
    return false;
  });
});
