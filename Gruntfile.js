/*
 * grunt-levin-assets-mapping
 * 
 *
 * Copyright (c) 2015 levin cao
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    copy:{
      main:{
        files:[
          {expand:true,cwd:'test/',src:['module1/**/*','module2/**/*'],dest:'tmp/'}
        ]
      }
    },


    levin_assets_mapping: {
      options:{
        mapping:'{{= dest}}md5conf.json',
        algorithm:'md5'
      },
      asset:{
          files:[
            {
                cwd:'test/module1/',
                src:['**/*.js','**/*.css','**/*.htm','**/*.{jpg,jpeg,gif,png}'],
                dest:'tmp/module1/',
                dependencies:'common/lib.js'
            },
            {
                cwd:'test/module2/',
                src:['**/*.js','**/*.css','**/*.htm','**/*.{jpg,jpeg,gif,png}'],
                dest:'tmp/module2/',
                dependencies:['common/aa.js','common/bb.js']
            }
          ]
      }
    }

    // Unit tests.
    //nodeunit: {
    //  tests: ['test/*_test.js']
    //}

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  //grunt.registerTask('test', ['clean', 'levin_static_pkg', 'nodeunit']);
  //grunt.registerTask('test', ['clean', 'levin_assets_mapping']);
  //grunt.registerTask('test', ['clean','copy','levin_assets_mapping']);
  grunt.registerTask('test', ['levin_assets_mapping']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
