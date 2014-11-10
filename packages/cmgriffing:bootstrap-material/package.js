Package.describe({
  summary: "A Wrapper for Bootstrap Material",
  version: "0.1.0"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.0');
  api.use('jquery');
  api.addFiles('lib/js/ripples.js', 'client');
  //api.export('ripples', 'client');
  api.addFiles('lib/js/material.js', 'client');
  api.addFiles('lib/css/ripples.css', 'client');
  api.addFiles('lib/css/material-wfont.css', 'client');
  api.addFiles('lib/fonts/Material-Design-Icons.eot', 'client');
  api.addFiles('lib/fonts/Material-Design-Icons.woff', 'client');
  api.addFiles('lib/fonts/Material-Design-Icons.ttf', 'client');
  api.addFiles('lib/fonts/Material-Design-Icons.svg', 'client');


});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('cmgriffing:bootstrap-material');
  api.addFiles('cmgriffing:bootstrap-material-tests.js');
});
