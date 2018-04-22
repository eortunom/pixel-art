/*eslint no-unused-vars: 0 */
/*eslint-env browser */
/*globals $, CanasSetup, Player */

$(document).ready(function () {
  var $canvasElement = $('#canvas-setup');
  var builder = new CanvasSetup($canvasElement, {height: 20, width: 20});
  builder.setupPalette();
  builder.setupCanvas();
});
