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
var saveButton = document.getElementById("save");
var cancelButton = document.getElementById("clear");
var saveButton2 = document.getElementById("save2");
var cancelButton2 = document.getElementById("clear2");
var shiftId = $("#shiftId").val();

saveButton.addEventListener("click", saveSignature);
cancelButton.addEventListener("click", clearSignature);
saveButton2.addEventListener("click", saveSignature2);
cancelButton2.addEventListener("click", clearSignature2);

$.ajax({
  url: "/api/user_data",
  type: "GET"
}).then(function(userData) {
  userId = userData.id;
  $.ajax({
    url: "/api/shiftRecord/" + userId,
    type: "GET"
  }).then(function(shift) {
    if (shift.clientSignature) {
      signaturePad2.fromDataURL(shift.clientSignature);
      signaturePad2.off();
    }
  });
});

function clearSignature() {
  signaturePad.clear();
}
function clearSignature2() {
  signaturePad2.clear();
}

function saveSignature() {
  var data = signaturePad.toDataURL("image/png");

  var shiftUpdate = {
    id: shiftId,
    employeeSignature: data
  };

  $.ajax({
    method: "PUT",
    url: "/api/shiftEmployeeSignature",
    data: shiftUpdate
  }).then(function() {
    $(".ui-accordion-content").show();
    $("#btnEmployeeSign").hide();
    $("#rowFinalize").show();
    $("#modalMatch").modal("toggle");
  });
}

function saveSignature2() {
  var data = signaturePad2.toDataURL("image/png");

  var shiftUpdate = {
    id: $("#shiftId").val(),
    clientSignature: data
  };
  // Send data to server instead...
  //window.open(data);
  $.ajax({
    method: "PUT",
    url: "/api/shiftClientSignature",
    data: shiftUpdate
  }).then(function() {
    window.location.href = "./home.html";
  });
}
