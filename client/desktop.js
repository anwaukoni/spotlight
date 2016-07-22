var state = 'initializing';
var initializing = 'tl';
var corners = {
  tl: { a: 0, b: 0, g: 0 },
  tr: { a: 0, b: 0, g: 0 },
  bl: { a: 0, b: 0, g: 0 },
  br: { a: 0, b: 0, g: 0 },
};

// Add nonce code to screen for mobile users to enter
document.getElementById('nonce-container').innerHTML =
  'Mobile code: <span>' + imperio.nonce + '</span>';

// Use roomId from cookies to create a room
imperio.listenerRoomSetup();
imperio.roomUpdate();
imperio.dataListener(confirmInitialization);
imperio.gyroscopeListener(handleGyroStream);

function confirmInitialization(data) {
  console.log('confirmInitialization invoked:', data);
  var target = document.getElementById('initialization-data');
  target.innerHTML = JSON.stringify(data);
  var feedbackMap = {
    tl: 'top-left-feedback',
    tr: 'top-right-feedback',
    bl: 'bottom-left-feedback',
    br: 'bottom-right-feedback',
  };
  console.log('data:', data);
  console.log('targetId', feedbackMap[data.target]);
  var cornerTarget = document.getElementById(feedbackMap[data.target]);
  initializing = data.target;
  delete data.target;
  corners[initializing] = data;
  cornerTarget.innerHTML = JSON.stringify(data);
  var cornersState = document.getElementById('corners-state');
  cornersState.innerHTML = JSON.stringify(data);
}

function handleGyroStream(gyroData) {
  var target = document.getElementById('initialization-data');
  target.innerHTML = JSON.stringify(gyroData);
}
