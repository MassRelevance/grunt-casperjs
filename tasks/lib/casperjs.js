exports.init = function(grunt) {
  var exports = {};
  var _ = grunt.util._;
  var util = require('util');

  exports.casperjs = function(filepath, options, callback) {

    var command = 'casperjs test',
        exec = require('child_process').exec;

    _(options).each(function (value, key) {
      if (_.isArray(value)) {
        command += util.format(' --%s="%s"', key, value.join(','));
      }
      else if (_.isString(value) || _.isNumber(value)) {
        command += util.format(' --%s="%s"', key, value);
      }
      else if (_.isBoolean(value) && value) {
        command += util.format(' --%s', key);
      }
    });

    command += " " + filepath;

    grunt.log.write("Command: " + command);

    function puts(error, stdout, stderr) {
      grunt.log.write('\nRunning tests from "' + filepath + '":\n');
      grunt.log.write(stdout);

      if ( error !== null ) {
        callback(error);
      } else {
        callback();
      }
    }

    exec(command, puts);

  };

  return exports;
};
