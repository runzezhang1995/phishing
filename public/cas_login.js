$(document).ready(function(){

  // login page

  $("input[type='submit']").click(function(){
    if(check()){
        return true;
    }else{
        return false;
        //如果不返回return是不会阻止submit的默认动作的！
    }
});

    var check = function(){ 
      //typeof "" ==string typeof null == object 
      var pass = true
      $('.errors').html("");

       if(($("#username").val() == "" )||($("#username").val()== null)){
          console.log('check');
          $('.errors').prop("hidden",false); 
          $('.errors').append("<p>GT Account: is required.</p>");
          papss =  false;
      }

      if(($("#password").val() == "" )||($("#password").val()== null)){
        console.log('check');
        $('.errors').prop("hidden",false); 
        $('.errors').append("<p>Password: is required.</p>");
        pass =  false;
      }
      return pass;
    }

  var form = $('.gt_form');
  
  if (form.length) {

    //focus username or password field, first that is empty
    var username = $('#username');
    if (username.val() == '') {
      username.focus();
    } else {
      $('#password').focus();
    }

    if (!window.console || window.console == {}) {
        window.console.log = function() {};
    }

    setTimeout(function() {
      $('body').on('submit', '.gt_form', function(e) {
        alert('here');
        e.preventDefault();
        form.find('input.btn-submit').prop('disabled', true).attr('value', 'LOGGING IN...');
        $('body').off('submit', '#fm1');

        $.get(window.location.href, function(result) {
          var selector = '.buttons.btn-row input[type="hidden"]';
          var newHiddens = $(result).find(selector);
          $(selector).replaceWith(newHiddens);
          form.find('input.btn-submit').prop('disabled', false).click().prop('disabled', true);
        });
      });
    }, 3595000);
  }

  // load duo status from Passport
  var statusBox = $('.duo_status');
  if (statusBox.length) {
    var url = statusBox.attr('data-url');
    statusBox.html('<p class="loading">Loading duo status...</p>');
    $.get(url, function(result) {
      statusBox.html(result.markup);
      statusBox.addClass(result.status);
      // show non-green status at top of page on mobile devices
      if (result.status !== 'green' && $(window).width() <= 640) {
         statusBox.hide();
         $('.info h2').after(statusBox);
         statusBox.slideDown();
      }
    });
  }

});

