/*eslint no-unused-vars: 0 */
/*eslint-env browser */
/*globals $, CanvasSetup */

$(document).ready(function () {
  var $canvasElement = $('#canvas-setup');
  var builder = new CanvasSetup($canvasElement, {height: 20, width: 20});
  builder.setupPalette();
  builder.setupCanvas();
});
