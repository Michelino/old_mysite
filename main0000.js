$(document).ready(function()
{

    $('#repository_check').click(function() {
      $(this).fadeTo('slow', 0.3);
      $('#indicator').show();
        $.ajax({
            type: "POST",
            data: 'url='+$('#repository_url').val(),
            url: $(this).attr('data-url'),
            context: document.body,
            complete: function() {
              $('#indicator').hide();
            },
            error: function(data) {
              $('#extra_form').html('<span style="color: #990000; font-weight: bold;">Error. Please check your URL if it is valid GitHub repository</span>');
            },
            success: function(data) {
                $('#extra_form').prepend('<span style="color: #006400;  font-weight: bold;">Success!</span>');
                $('#extra_form').html(data);
            }
        });
    });

    $('.search input[name=q]').focusin(function() {
      if ($(this).val() == 'Find a Javascript library') $(this).val('');
        $(this).css('color','#333');
    });
    $('.search input[name=q]').focusout(function() {
        if ($(this).val() == '') $(this).val('Find a Javascript library');
    });

    $('#repository_url').focusin(function() {
        if ($(this).val() == '(skip if none)') $(this).val('');
    });
    $('#repository_url').focusout(function() {
        if ($(this).val() == '') $(this).val('(skip if none)');
    });

    $('a.readme').click(function() {
       $('#readme').toggle();
    });



    $('#rate').raty({
        path:			'/img/rates/',
        start:     $('#rate').attr('data-value'),
        readOnly: ($('#rate').attr('data-disabled') == 'true'),
        number: 5,
        showHalf:  true,
        onClick: function(score) {
            $.ajax({
                type: 'POST',
                url: $('#rate').attr('data-url'),
                data: 'rate='+score,
                success: function(data){
                    data = $.parseJSON(data);
                    $('#rate').raty.start(data.rate);
                    $('#rate_message').text('Thank you for your vote! Current rate is '+data.rate);
                }
            });

        }
    });

    if ($('#rate').attr('data-disabled') == 'true' ) $('#rate').CreateBubblePopup({ innerHtml: 'Please login with your GitHub account to rate this repository', themePath: '/images/', themeName: 'all-grey' });


    $('#repository_url').focusin(function() {
        if ($(this).val() == 'https://github.com/') $(this).val('');
    });

  $('.tags_save').click(function() {
    $.ajax({
      type: 'POST',
      url: $(this).parent().attr('action'),
      data: $(this).parent().serialize(),
      success: function(){
      }
    });
    // $(this).parent().children('input[name=tag]').val('');
    $(this).parent().children('.message').text('Tags were saved!');
    return false;
  });

    $('.verify').click(function () {
        $(this).fadeOut();
        var id = $(this).attr('data-id');
        $.ajax({
          type: 'POST',
          url: $(this).attr('href'),
          data: 'repository_id='+id,
          success: function(){
          }
        });
        return false;
    });
    $('.ribbon .project').qtip({
        content: {
            title: function () {  return $(this).data('name'); },
            text: function () { return $(this).data('desc'); }
        },
        show: {
            effect: true
        },
        style: {
       		classes: 'qtip-bootstrap tip-jster'
       	},
        position: {
            my: 'top center',
            at: 'bottom center'
        }
    });

    $('.categories li a').qtip({
        content: {
            attr: 'data-title'
        },
        show: {
            effect: true
        },
        style: {
       		classes: 'qtip-bootstrap tip-jster'
       	},
        position: {
            my: 'left center',
            at: 'right center'
        }
    });

    $('.rate, .thumbs, .stars, .forks').qtip({
        content: {
            attr: 'data-title'
        },
        show: {
            effect: true
        },
        style: {
       		classes: 'qtip-bootstrap'
       	},
        position: {
            my: 'top center',
            at: 'bottom center'
        }
    });

    $('#readme a.link').click(function () {
       $('.readme_js').toggle();
       $(this).toggleClass('active');
       if ($(this).html() == 'View Readme') {
           $(this).html('Hide Readme');
       } else {
           $(this).html('View Readme');
       }

       return false;
    });

    $('#libs').masonry({
      itemSelector: '.repo',
      gutterWidth: 10,
      columnWidth: 230
    });


    $('#libs h3 a').each(function () {
        var title = $(this).text();
        title = title.replace(/([a-z\d])([A-Z]+)/g, '$1&#173;$2').replace(/[-\s]+/g, '&#173;').replace('.', '.&#173;');
        $(this).html(title);
    });

    $('#repository_category_id').chosen();
    $('#repository_plugin_of').chosen();
});