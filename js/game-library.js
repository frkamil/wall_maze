// GAME LIBRARY for HTML CANVAS

// Global Variables
let mouseX;
let mouseY;

let keyPressed = {};

// Event Stuff
document.addEventListener("mousemove", mousemoveLibHandler);
document.addEventListener("keydown", keydownLibHandler);
document.addEventListener("keyup", keyupLibHandler);

function mousemoveLibHandler(e) {
  // Get rectangle info about canvas location
  let cnvRect = cnv.getBoundingClientRect();

  // Calc mouse coordinates using mouse event and canvas location info
  mouseX = Math.round(e.clientX - cnvRect.left);
  mouseY = Math.round(e.clientY - cnvRect.top);
}

function keydownLibHandler(e) {
  keyPressed[e.code] = true;
}

function keyupLibHandler(e) {
  keyPressed[e.code] = false;
}

// Helper Functions

/*
 * dist(x1, y1, x2, y2)
 * Determines distance between two points (x1, y1), (x2, y2)
 * param: x1 (x-coordinate of first point)
 * param: y1 (y-coordinate of first point)
 * param: x2 (x-coordinate of second point)
 * param: y2 (y-coordinate of second point)
 * return: distance between (x1, y1) and (x2, y2)
 */
function dist(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

/*
 * constrain(val, low, high)
 * Constrain a value to be within a range.
 * param: val (the value to constrain)
 * param: low (minimum limit of range, inclusive)
 * param: high (maximum limit of range, inclusive)
 * return: the constrained value (provided value is not modified)
 */
function constrain(val, low, high) {
  if (val > high) {
    val = high;
    return val;
  } else if (val < low) {
    val = low;
    return val;
  } else {
    return val;
  }
}

/*
 * ptInRect(x, y, rect)
 * Determine if a point is within a rectangle object
 * param: x (x-coordinate of point)
 * param: y (y-coordiante of point)
 * param: rect (rectangle object with x, y, w and h properties)
 * return: true or false
 */
function ptInRect(x, y, rect) {
  if (x > rect.x && x < rect.x + rect.w && y > rect.y && y < rect.y + rect.h) {
    return true;
  } else {
    return false;
  }
}

/*
 * ptInCircle(x, y, circle)
 * Determine if a point is within a circle object
 * param: x (x-coordinate of point)
 * param: y (y-coordiante of point)
 * param: circle (circle object with x, y and r properties)
 * return: true or false
 */
function ptInCircle(x, y, circle) {
  let d = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
  if (d < circle.r) {
    return true;
  } else {
    return false;
  }
}

/*
 * rectCollide(rect1, rect2)
 * Determine if two rectangle objects collide
 * param: rect1 (rectangle object with x, y, w and h properties)
 * param: rect2 (rectangle object with x, y, w and h properties)
 * return true or false
 */
function rectCollide(rect1, rect2) {
  if (
    rect1.x + rect1.w > rect2.x &&
    rect1.x < rect2.x + rect2.w &&
    rect1.y + rect1.h > rect2.y &&
    rect1.y < rect2.y + rect2.h
  ) {
    return true;
  } else {
    return false;
  }
}

/*
 * circleCollide(circle1, circle2)
 * Determine if two circle objects collide
 * param: circle1 (circle object with x, y and r properties)
 * param: circle2 (circle object with x, y and r properties)
 * return true or false
 */
function circleCollide(circle1, circle2) {
  let distance = Math.sqrt(
    (circle1.x - circle2.x) ** 2 + (circle1.y - circle2.y) ** 2
  );
  if (distance < circle1.r + circle2.r) {
    return true;
  } else {
    return false;
  }
}
