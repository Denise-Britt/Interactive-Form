//PUT `NAME` TEXT FIELD IN FOCUS WHEN PAGE LOADS
$('#name')
.ready()
.focus(); 

//HIDES `OTHER` JOB ROLE INPUT
$('#other-title')
.hide();

// `OTHER` JOB ROLE INPUT IS DISPLAYED IF `OTHER` JOB ROLE OPTION IS SELECTED
$('#title').change( (e) => {
    if ($('#title option:selected').val() === 'other') {
        $('<input type="text" name="job_role_other" placeholder="Your Job Role" id="other-title">').insertAfter($('#title')).addClass('#other-title');
        $('#other-title').slideDown();
    } else {
        $('#other-title').fadeOut();
    }

});

// HIDES FIRST DESIGN OPTION
$('#design option')
.eq(0)
.ready()
.hide();

// ADD TEXT
$('#colors-js-puns label')
.ready()
.text('Please select a T-shirt theme:');

// HIDE COLOR OPTION
$('#color option')
.ready()
.hide();

///////////////////////////////////////////////////////
///////// ***** DESIGN & COLOR SECTION ***** /////////
/////////////////////////////////////////////////////

$('#design').change( (e) => {
  
    if ($('#design option:selected').val() === "js puns") {
      // IF `JS PUNS` DESIGN IS SELECTED, ONLY SHOW ELIGIBLE COLOR OPTIONS, HIDE INCOMPATIBLE COLOR OPTIONS
        $('#color option:selected').removeAttr('selected');
        $('#color option[value ="cornflowerblue"]').show().attr("selected", true);
        $('#color option[value ="darkslategrey"]').show();
        $('#color option[value ="gold"]').show();
        $('#color option[value ="tomato"]').hide();
        $('#color option[value ="steelblue"]').hide();
        $('#color option[value ="dimgrey"]').hide();
      }else if($('#design option:selected').val() === "heart js") {
      // IF `HEART JS` DESIGN IS SELECTED, ONLY SHOW ELIGIBLE COLOR OPTIONS, HIDE INCOMPATIBLE COLOR OPTIONS
        $('#color option:selected').removeAttr('selected');
        $('#color option[value ="tomato"]').show().attr("selected", true);
        $('#color option[value ="steelblue"]').show();
        $('#color option[value ="dimgrey"]').show();
        $('#color option[value ="cornflowerblue"]').hide();
        $('#color option[value ="darkslategrey"]').hide();
        $('#color option[value ="gold"]').hide();
      };
})

///////////////////////////////////////////////////////
/////////// ***** ACTIVITIES SECTION ***** ///////////
/////////////////////////////////////////////////////

// LISTEN FOR CHANGES IN ACTIVITY SECTION
    
let total = 0;
$(`.activities input`).change(function(e) {
  if (e.target.checked) {
    total += parseInt(e.target.value);
  } else if (!e.target.checked) {
    total -= parseInt(e.target.value);
  }
  //IF JAVASCRIPT LIBRARIES WORKSHOP IS CHOSEN DISABLE NODE.JS WORKSHOP OPTION
  if (e.target.name === "js-libs" && e.target.checked) {
    $(`input[name="node"]`).attr("disabled", "disabled");
  } else if (e.target.name === "js-libs" && !e.target.checked) {
    $(`input[name="node"]`).removeAttr("disabled");
  }
  //IF NODE.JS WORKSHOP IS CHOSEN DISABLE JAVASCRIPT LIBRARIES WORKSHOP OPTION
  if (e.target.name === "node" && e.target.checked) {
    $(`input[name="js-libs"]`).attr("disabled", "disabled");
  } else if (e.target.name === "node" && !e.target.checked) {
    $(`input[name="js-libs"]`).removeAttr("disabled");
  }
  //IF JAVASCRIPT FRAMEWORKS WORKSHOP IS CHOSEN DISABLE EXPRESS WORKSHOP OPTION
  if (e.target.name === "js-frameworks" && e.target.checked) {
    $(`input[name="express"]`).attr("disabled", "disabled");
  } else if (e.target.name === "js-frameworks" && !e.target.checked) {
    $(`input[name="express"]`).removeAttr("disabled");
  }
  //IF EXPRESS WORKSHOP IS CHOSEN DISABLE JAVASCRIPT FRAMEWORKS WORKSHOP OPTION
  if (e.target.name === "express" && e.target.checked) {
    $(`input[name="js-frameworks"]`).attr("disabled", "disabled");
  } else if (e.target.name === "express" && !e.target.checked) {
    $(`input[name="js-frameworks"]`).removeAttr("disabled");
  }
  //UPDATE TOTAL VALUE
  $(`.activities h3`).remove();
  $(`.activities`).append(`<h3>Total: $${total} </h3>`);
});
//GIVE VALUE OF `$100` TO ACTIVITIES
$(`.activities input`).val(100);
//GIVE VALUE TO FIRST ACTIVITY
$(`.activities input:first`).val(200);
//SET TOTAL VALUE 
$(`.activities`).append(`<h3>Total: $${total} </h3>`);

///////////////////////////////////////////////////////
////////// ***** PAYMENT INFO SECTION ***** //////////
/////////////////////////////////////////////////////


  

$("fieldset div p").css("display", "none");
$(`[value="select_method"]`).css("display", "none");

$("#payment").change(function() {
  if ($(this).val() === "credit card") {
    $("#credit-card").slideDown(500);
    $("fieldset div p").css("display", "none");
  } else if ($(this).val() === "paypal") {
    $("fieldset div p:first").slideDown(500);
    $("fieldset div p:last").css("display", "none");
    $("#credit-card").slideUp();
  } else if ($(this).val() === "bitcoin") {
    $("fieldset div p:last").slideDown(500);
    $("fieldset div p:first").css("display", "none");
    $("#credit-card").css("display", "none");
  } else {
    $("#credit-card").css("display", "");
    $("fieldset div p:first").css("display", "");
    $("fieldset div p:second").css("display", "");
  }
});

///////////////////////////////////////////////////////
///////////// ***** FORM VALIDATION ***** ////////////
/////////////////////////////////////////////////////

$(`button[type="submit"]`).click(function(e) {
  resetForm();
  //CHECK NAME INPUT
  if (!/^\D*[a-z]+/i.test($("#name").val())) {
    e.preventDefault();
    $("#name").css("border-color", "indianred");
    $(`[for="name"]`).append(`<p style="color: indianred;">Oops! You forgot to tell us your name!</p>`);
  }
  //CHECK EMAIL INPUT
  if (!/^[\w\.]+@[a-z]+\.[a-z]+$/i.test($("#mail").val())) {
    e.preventDefault();
    $("#mail").css("border-color", "indianred");
    $(`[for="mail"]`).append(
      `<p style="color: indianred;">Sorry! Looks like this isn't a valid email. Let's try again.</p>`
    );
  }

  //CHECK IF TOTAL IS = 0
  if (total === 0) {
    e.preventDefault();
    $(".activities legend").css("color", "indianred");
  }
  //CHECK IF SHIRT DESIGN IS SELECTED
  if ($("#design").val() !== "js puns" && $("#design").val() !== "heart js") {
    e.preventDefault();
    
    $(`.shirt legend`).css("color", "indianred");
    $("#design").css("border-color", "indianred");
    $("#size").css("border-color", "indianred");
    $("#color").css("border-color", "indianred");
  }
  //CHECK FOR PAYMENT OPTION SELECTION
  if (
    $("#payment").val() !== "credit card" &&
    $("#payment").val() !== "bitcoin" &&
    $("#payment").val() !== "paypal"
  ) {
    e.preventDefault();
    $("#payment").css("border-color", "indianred");
    $(`[for="payment"]`).css("color", "indianred");
  }
  //IF `credit card` IS CHOSEN, CHECK FOR VALID ENTRIES
  if ($("#payment").val() === "credit card") {
    if (!/^\d{13,16}$/.test($("#cc-num").val())) {
      e.preventDefault();
      $("#cc-num").css("border-color", "indianred");
    }
    if (!/^\d{5}$/.test($("#zip").val())) {
      e.preventDefault();
      $("#zip").css("border-color", "indianred");
    }
    if (!/^\d{3}$/.test($("#cvv").val())) {
      e.preventDefault();
      $("#cvv").css("border-color", "indianred");
    }
  }
});

// FORM RESET
const resetForm = (e) => {
  $(`[for="name"] p`).remove();
  $("[type='text']").css("border-color", "#c1deeb");
  $(`[for="mail"] p`).remove();
  $("#mail").css("border-color", "#c1deeb");
  $(".activities legend").css("color", "#184f68");
  $("#payment").css("border-color", "rgb(166, 166, 166)");
  $(`[for="payment"]`).css("color", "black");
  $("#design").css("border-color", "rgb(166, 166, 166)");
  $(`.shirt legend`).css("color", "#184f68");
};

$('form').submit( (e) => {
  if (validateForm() === false) {
    e.preventDefault();
    return false;
  }

})
/////////////////////////////////////////////////////////
////** REAL-TIME ERROR MSG / CONDITONAL ERROR MSG **////
///////////////////////////////////////////////////////

//CHECK NAME INPUT
$("#name").on("keyup", (e) => {
  if (/^[a-z]+/i.test($("#name").val())) {
    $("#name").css("border-color", "#c1deeb");
    $(`[for="name"] p`).remove();
  } else if (!$("#name").val()) {
    $(`[for="name"] p`).remove();
    $("#name").css("border-color", "indianred");
    $(`[for="name"]`).append(`<p style="color: indianred;">Oops! You forgot to tell us your name!</p>`);
  }
});

//CHECK IF USER HAS REGISTERED FOR ACTIVITIES
$(".activities input").change( (e) => {
  $(".activities legend").css("color", "#184f68");
  if (total === 0) {
    $(".activities legend").css("color", "indianred");
  }
});
