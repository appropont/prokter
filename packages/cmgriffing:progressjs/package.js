Package.describe({
  summary: "A Wrapper for ProgressJS",
  version: "0.1.0"
});

Package.onUse(function(api, where) {
  api.versionsFrom('METEOR@0.9.0');
  //api.use('jquery');
  //api.export('progressJs', 'client');
  api.addFiles('./lib/progress.js', 'client');
  api.addFiles('./lib/progressjs.css', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('cmgriffing:progressjs');
  api.addFiles('cmgriffing:progressjs-tests.js');
});
