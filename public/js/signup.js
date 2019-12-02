$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var nameInput = $("input#name-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    //create userData object with necessary email, password, and employeeName
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      employeeName: nameInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.employeeName);
    emailInput.val("");
    passwordInput.val("");
    nameInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, employeeName) {
    //post call to add new user to database and authenticate them
    $.post("/api/signup", {
      email: email,
      password: password,
      employeeName: employeeName
    })
      .then(function() {
        window.location.replace("/home");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
