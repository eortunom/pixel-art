/*eslint no-unused-vars: 0 */
/*eslint-env browser */
/*globals $, MapBuilder, Player */

$(document).ready(function () {
  var $mapElement = $('#map-builder');
  var builder = new MapBuilder($mapElement, {height: 20, width: 20});
  builder.setupPalette();
  builder.setupCanvas();
});
