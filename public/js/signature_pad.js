//initializes signaturePad and signaturePad2 which capture Employee and Client signatures respectively
var signaturePad = new SignaturePad(document.getElementById("signature-pad"), {
  backgroundColor: "rgba(255, 255, 255, 0)",
  penColor: "rgb(0, 0, 0)"
});
var signaturePad2 = new SignaturePad(
  document.getElementById("signature-pad2"),
  {
    backgroundColor: "rgba(255, 255, 255, 0)",
    penColor: "rgb(0, 0, 0)"
  }
);
//initialize all save and cancel button objects
var saveButton = document.getElementById("save");
var cancelButton = document.getElementById("clear");
var saveButton2 = document.getElementById("save2");
var cancelButton2 = document.getElementById("clear2");
//get shiftId from hidden field
var shiftId = $("#shiftId").val();
//add eventListeners to listen for save or cancel button clicks
saveButton.addEventListener("click", saveSignature);
cancelButton.addEventListener("click", clearSignature);
saveButton2.addEventListener("click", saveSignature2);
cancelButton2.addEventListener("click", clearSignature2);
//get user data on page load
$.ajax({
  url: "/api/user_data",
  type: "GET"
}).then(function(userData) {
  //use userData to find current shift record
  userId = userData.id;
  $.ajax({
    url: "/api/shiftRecord/" + userId,
    type: "GET"
  }).then(function(shift) {
    //if page is loaded to a complete shift then populate clientSignature and turn off the signature pad
    if (shift.clientSignature) {
      signaturePad2.fromDataURL(shift.clientSignature);
      signaturePad2.off();
    }
  });
});
//functions clearSignature(2) remove all text from current signaturePad
function clearSignature() {
  signaturePad.clear();
}
function clearSignature2() {
  signaturePad2.clear();
}
//function to save Employee Signature
function saveSignature() {
  var data = signaturePad.toDataURL("image/png");
  //object shiftUpdate holds data for shiftId and employeeSignature binary data
  var shiftUpdate = {
    id: shiftId,
    employeeSignature: data
  };
  //put ajax call to update Employee Signature in database
  $.ajax({
    method: "PUT",
    url: "/api/shiftEmployeeSignature",
    data: shiftUpdate
  }).then(function() {
    //hide employee signature button, open all accordian elements, and display shift finalizing data
    $(".ui-accordion-content").show();
    $("#btnEmployeeSign").hide();
    $("#rowFinalize").show();
    $("#modalMatch").modal("toggle");
  });
}
//function to save Client signature
function saveSignature2() {
  var data = signaturePad2.toDataURL("image/png");
  //shiftUpdate object which contains keys for shiftId and clientSignature
  var shiftUpdate = {
    id: $("#shiftId").val(),
    clientSignature: data
  };
  //put ajax call to add employeeSignature to database
  $.ajax({
    method: "PUT",
    url: "/api/shiftClientSignature",
    data: shiftUpdate
  }).then(function() {
    //route user to home on shift completion
    window.location.href = "./home.html";
  });
}
