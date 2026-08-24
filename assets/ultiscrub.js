
$(document).ready(function() {
  $('body').on('click','.btn.product-form__cart-submit.ulti-hide',function(e) {
    e.preventDefault();
      /*  $(this).attr('disabled');
    $(this).text('Loading'); */
    // before adding to cart, we must pick the right options based on the custom options
    var color = $('.selected-status--color').eq(0).text().trim();
    var border = $('.selected-status--color').eq(1).text().trim().toLowerCase();
    var orientation = $('.selected-status--color').eq(2).text().trim().toLowerCase();
    $('.selector-color-label-text').each(function() {
        var text = $(this).text();
      if (color === text) {
        $(this).trigger('click');
      }
    });
    $('.single-option-selector__option__text').each(function() {
      var text = $(this).text().trim().toLowerCase();
      console.log('my text is ' + text + ' and my border is ' + border + ' and my orientation is ' + orientation);
      if (border === text) {
$(this).trigger('click');
      }
            if (orientation === text) {
$(this).trigger('click');
      }
            if (color === text) {
        $(this).trigger('click');
      }
    })
    console.log('my color is ' + color + ' my border is ' + border + ' and my orientation is ' + orientation)
         $('.addToCartCustomButton').trigger('click'); 
  })
  $('body').on('click','.selector-color-square',function(e) {
    var text = $(this).parent().text().trim();
    console.log('my square text is ' + text);
    $('.selector-color-label-text').each(function() {
      console.log('my label text is ' + $(this).text());
      if (text === $(this).text()) {
        $(this).trigger('click');
      }
    });
  });
$('body').on('input', '.field-wrapper__input', function(i) {
  var object = parseInt($(this).parent().parent().index()) - 7;
  console.log('my index is ' + object);
  var value = parseInt($(this).val());
  var dimARound = $('#dim-a-round').text().trim();
  var dimBRound = $('#dim-b-round').text().trim();
  // before we do any rounding, we first put the value in the actual custom dimension property
  var actualobject = object + 2;
  console.log('my actual object is ' + actualobject + ' and my value is ' + value);
  simulateTyping($('.option-number-input').eq(actualobject), value.toString());
  // Function to round up to the nearest multiple of the round-up value
  function roundUpValue(value, roundUp) {
    console.log('my round up value is ' + roundUp);
    if (roundUp === 0) return value; // Avoid division by zero
    var remainder = value % roundUp;
    console.log('my remainder is ' + remainder);
    if (remainder === 0) return value; // Already a multiple of the round-up value
        console.log('my return value is ' + (value + (roundUp - remainder)));
    return value + (roundUp - remainder); // Add the difference to make it a multiple
  }

  // Apply rounding logic if needed
  if (object === 0 && dimARound !== 'none') {
    dimARound = parseInt(dimARound);
    if (!isNaN(dimARound)) {
      value = roundUpValue(value, dimARound); // Update 'value' to be the rounded value
    }
  }
  // Apply rounding logic if needed
  if (object === 1 && dimBRound !== 'none') {
    dimARound = parseInt(dimBRound);
    if (!isNaN(dimBRound)) {
      value = roundUpValue(value, dimBRound); // Update 'value' to be the rounded value
    }
  }
  // Convert the value back to string before calling simulateTyping
  simulateTyping($('.option-number-input').eq(object), value.toString());
});


const simulateTyping = (inputElement, newValue) => {
                   // Simulate typing delay (adjust the delay duration as needed)
                       // Ensure we're working with the native DOM element
                       const domInputElement = inputElement.get(0); // or inputElement[0]

                       //console.log('simulating', domInputElement, newValue);
                       // Simulate focusing on the input (like a click)

                       for (const char of newValue) {
                           // Create an "input" event and dispatch it for each character
                           const inputEvent = new InputEvent('input', {
                               bubbles: true,
                               cancelable: true,
                               inputType: 'insertText',
                               data: char,
                           });
                           domInputElement.dispatchEvent(inputEvent);
                         //  console.log('dispatched key event!', inputEvent);
                       }

                       // Directly setting the value on the DOM element
                       domInputElement.value = newValue;

                       // Simulate clicking outside the input (like a blur event)
                       domInputElement.blur();
               };
 // Function to handle mutations
    function handleMutation() {
        // Assuming you want to append new content to the div with ID 'error-messages'
        var errorMessageDiv = $('#error-message');
        // Empty the div to avoid duplicating messages
        errorMessageDiv.empty();
          var showATC = 0;
        // Find all elements with 'errorMsgCss' and append their text if not blank
        $('.errorMsgCss').each(function(i) {
            var errorMsg = $(this).text().trim(); // Trim to ensure we don't consider whitespace as content
            if (errorMsg) { // Check if errorMsg is not empty
                // Append each non-empty message as a new <p>
              console.log('appending' + errorMsg);
                var appending = $('<p class="error-detail">Error: ').text(errorMsg);
              if (i === 0) {
                  $('#ProductOption-mat-width-product_custom_option_Un3qhK').parent().find('.error-detail').html(appending);
              }
              else {
                console.log('i found error detail here ' + $('#ProductOption-mat-length-product_custom_option_yM9QDN').parent().find('.error-detail').attr('class'));
                  $('#ProductOption-mat-length-product_custom_option_yM9QDN').parent().find('.error-detail').html(appending);
              }
            }
          else {
            showATC += 1;
                          if (i === 0) {
                  $('#ProductOption-mat-width-product_custom_option_Un3qhK').parent().find('.error-detail').empty();
              }
              else if (i === 1) {
                  $('#ProductOption-mat-length-product_custom_option_yM9QDN').parent().find('.error-detail').empty();
              }
          }
        });
      // after all of this, we check to see if both inputs are populated and there are not error messages
      var checkInputs = false;
        // check to make sure both inputs are populated
        var firstOption = $('#ProductOption-mat-width-product_custom_option_Un3qhK').val();
        var secondOption = $('#ProductOption-mat-length-product_custom_option_yM9QDN').val();
        if (firstOption != '' && secondOption != '' && showATC === 4) {
          checkInputs = true;
        }
        if (checkInputs === true) {
          $('.ulti-hide').show();
        }
        else {
          $('.ulti-hide').hide();
        }
            var additionPriceValue = document.querySelector('.addition-price-value');
      if (additionPriceValue) {
          // Assuming you want to copy its text to another element with the ID 'target-element'
          $('.product__price.ulti-hide').find('.price-item.price-item--regular').text(additionPriceValue.textContent);
      }
    }

    // Delay setting up the observer to ensure target nodes exist
    setTimeout(function() {
        // Options for the observer
        var config = { attributes: false, childList: true, subtree: true, characterData: true };

        // Callback for the observer
        var callback = function(mutationsList, observer) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    handleMutation();
                }
            }
        };

        // Create an instance of MutationObserver
        var observer = new MutationObserver(callback);

        // Start observing each target node
        $('product-options-section').each(function() {
            observer.observe(this, config);
        });

        // Call handleMutation initially in case the content is already present
        handleMutation();
    }, 2500); // Adjust this delay as needed

});