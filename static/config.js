/* eslint-disable prefer-template */
/* eslint-disable object-shorthand */
/* eslint-disable no-var */
// eslint-disable-next-line func-names
(function (window) {
  var jsapiUrl = 'http://localhost:8086/';
  var config = {
    jsapiUrl: jsapiUrl,
    arcgisJsApi: jsapiUrl + 'arcgis_js_v410_api/4.10/dojo/dojo.js',
  };

  // eslint-disable-next-line no-param-reassign
  window.appcfg = config;
}(window));
