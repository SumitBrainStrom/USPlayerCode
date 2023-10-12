videojs.registerPlugin('UK-Store-Player', function(pluginOptions) {
  var myPlayer = this,
    passwordToMatch = '',
    myModal,
    modalOptions = {},
    formButton,
    passwordInput,
    // Create div which will hold content for ModalDialog
    newElement = document.createElement('div'),
    // Get a ModalDialog object
    ModalDialog = videojs.getComponent('ModalDialog');

  myPlayer.muted(false);

  // +++ Display ModalDialog +++
  // Read password from options
  passwordToMatch = pluginOptions.password;
  siteLocal = pluginOptions.locale;
  email = pluginOptions.email;

  //Create a div in which to place HTML content
  newElement.setAttribute("style", "display:flex;justify-content:center;align-items:center;");

  // Create content for ModalDialog
  newElement.innerHTML = '<div class="wrap"><h2>Enter Store Details</h2><p>Enter Locale</p><select class="theFormInput" name="siteInputID" id="siteInputID"><option value="US">US</option><option value="UK">UK</option></select><p>Enter Email</p><input class="theFormInput" type="email" id="emailInputID"><p>Enter Password</p><input class="theFormInput" type="password" id="passwordInputID"><br><input id="formButtonID" class="theForm" type="submit" value="View"></div>';

  // Be sure user cannot close ModalDialog, set content
  modalOptions.uncloseable = true;
  modalOptions.content = newElement;

  // Create a specific ModalDialog and display it
  myModal = new ModalDialog(myPlayer, modalOptions);
  myPlayer.addChild(myModal);
  myModal.open();

  // +++ Add event listeners to check password +++
  // Add an event listener to the button
  formButton = newElement.querySelector('#formButtonID');
  myPlayer.on(formButton, 'click', closeModal);

  // Add event listener if user presses Enter key after entering password
  passwordInput = newElement.querySelector('#passwordInputID');
  myPlayer.on(passwordInput, 'keydown', function(event) {
    if (event.keyCode === 13) {
      closeModal();
    }
  });

  // Add event listener if user presses Enter key after entering password
  siteInput = newElement.querySelector('#siteInputID');
  myPlayer.on(siteInput, 'keydown', function(event) {
    if (event.keyCode === 13) {
      closeModal();
    }
  });

  // Add event listener if user presses Enter key after entering password
  emailInput = newElement.querySelector('#emailInputID');
  myPlayer.on(emailInput, 'keydown', function(event) {
    if (event.keyCode === 13) {
      closeModal();
    }
  });

  // +++ Check entered password against saved password and act accordingly +++
  function closeModal() {
    var userInputPassword = document.getElementById('passwordInputID').value;
    var userInputSite = document.getElementById('siteInputID').value;
    var userInputEmail = document.getElementById('emailInputID').value;
    // If passwords match close ModalDialog and play video
    if (userInputPassword == passwordToMatch && userInputSite == siteLocal && userInputEmail == email) {
      myModal.close();
      myPlayer.play();
      // If passwords do not match display dialog indicating so
    } else if (userInputPassword != passwordToMatch){
      window.alert('Sorry, password is incorrect. Try again.')
    } else if (userInputSite != siteLocal){
      window.alert('Sorry, Local is incorrect. Try again.')
    } else if (userInputEmail != email){
      window.alert('Sorry, Email is incorrect. Try again.')
    }
  }
})