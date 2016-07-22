// Add nonce code to screen for mobile users to enter
document.getElementById('nonce-container').innerHTML =
  'Mobile code: <span>' + imperio.nonce + '</span>';

// Use roomId from cookies to create a room
imperio.listenerRoomSetup();
imperio.roomUpdate();
imperio.dataListener(confirmInitialization);

function confirmInitialization(data) {
  console.log('confirmInitialization invoked:', data);
  var target = document.getElementById('initialization-data');
  target.innerHTML = JSON.stringify(data);
}
