module.exports = function (grunt) {

  grunt.initConfig({
    concat: {
      css: {
        src: [
          'public/libs/bootstrap/dist/css/bootstrap.min.css',
          'public/libs/font-awesome/css/font-awesome.min.css',
          'public/css/plugins/iCheck/custom.css',
          'public/css/plugins/steps/jquery.steps.css',
          'public/libs/animate.css/animate.min.css',
          'public/libs/sweetalert/dist/sweetalert.css',
          'public/libs/editor.md/css/editormd.css',
          'public/libs/blueimp-file-upload/css/jquery.fileupload.css',
          'public/libs/blueimp-file-upload/css/jquery.fileupload-ui.css',
          'public/css/style.css'
        ],
        dest: 'public/css/bundle/admin.css'
      },
      csslogin: {
        src: [
          'public/libs/animate.css/animate.min.css',
          'public/libs/bootstrap/dist/css/bootstrap.min.css',
          'public/css/style.css'
        ],
        dest: 'public/css/bundle/login.css'
      },
      csslanding: {
        src: [
          'public/libs/bootstrap/dist/css/bootstrap.min.css',
          'public/css/landing-page.css',
          'public/css/pe-icon-7-stroke.css'
        ],
        dest: 'public/css/bundle/landing.css'
      },
      csserror: {
        src: [
          'public/libs/bootstrap/dist/css/bootstrap.min.css',
          'public/css/style.css'
        ],
        dest: 'public/css/bundle/error.css'
      },
      cssquiz: {
        src: [
          'public/libs/bootstrap/dist/css/bootstrap.min.css',
          'public/css/quiz.css'
        ],
        dest: 'public/css/bundle/quiz.css'
      },
      js: {
        src: [
          'public/libs/jquery/dist/jquery.min.js',
          'public/libs/jquery.iframe-transport/jquery.iframe-transport.js',
          'public/libs/bootstrap/dist/js/bootstrap.min.js',
          'public/libs/metisMenu/dist/metisMenu.min.js',
          'public/libs/jquery-slimscroll/jquery.slimscroll.min.js',
          'public/libs/pace/pace.min.js',
          'public/libs/sweetalert/dist/sweetalert.min.js',
          'public/libs/jquery-validation/dist/jquery.validate.min.js',
          'public/libs/editor.md/editormd.min.js',
          'public/libs/editor.md/languages/en.js',
          'public/libs/jquery-uijquery-ui.min.js',
          'public/libs/blueimp-file-upload/js/vendor/jquery.ui.widget.js',
          'public/libs/blueimp-load-image/js/load-image.all.min.js',
          'public/libs/blueimp-canvas-to-blob/js/canvas-to-blob.min.js',
          'public/libs/jquery.iframe-transport/jquery.iframe-transport.js',
          'public/libs/blueimp-file-upload/js/jquery.fileupload.js',
          'public/libs/blueimp-file-upload/js/jquery.fileupload-process.js',
          'public/libs/blueimp-file-upload/js/jquery.fileupload-image.js',
          'public/libs/blueimp-file-upload/js/jquery.fileupload-audio.js',
          'public/libs/blueimp-file-upload/js/jquery.fileupload-video.js',
          'public/libs/blueimp-file-upload/js/jquery.fileupload-validate.js',
          'public/libs/blueimp-file-upload/js/jquery.fileupload-ui.js',
          'public/libs/idle.js/build/idle.min.js',
          'public/js/inspinia.js'
        ],
        dest: 'public/js/bundle/admin.js'
      },
      login:{
        src:[
          'public/libs/angular/angular.min.js',
          'public/js/login.js'
        ],
        dest:'public/js/bundle/login.js'
      },
      quiz:{
        src:[
          'public/libs/angular/angular.min.js',
          'public/libs/angular-sanitize/angular-sanitize.min.js',
          'public/libs/angular-route/angular-route.min.js',
          'public/js/quiz/app/app.js',
          'public/js/quiz/app/helperService.js',
          'public/js/quiz/app/quizCtrl.js',
          'public/js/quiz/app/createCtrl.js'
        ],
        dest:'public/js/bundle/quiz.js'
      }
    },

    cssmin:{
      target: {
        files: {
          'public/css/dist/61c5d103-5fcc-425a-8c84-d4d0435899-cf751fc8e1-fc1d-4a14-a79b-4b54b20dd20a.min.css': ['public/css/bundle/login.css'],
          'public/css/dist/admin.min.css': ['public/css/bundle/admin.css'],
          'public/css/dist/landing.min.css': ['public/css/bundle/landing.css'],
          'public/css/dist/error.min.css': ['public/css/bundle/error.css'],
          'public/css/dist/d278b0f1-3b5c-4105-bace-e6d212bd981b76-784457-4532-4ebc-9ee4-807971a93446.min.css': ['public/css/bundle/quiz.css']
        }
      }
    },

    uglify: {

      options: {
        compress: true,
        report: true,
        banner: '/*  Tutor app <%= grunt.template.date() %>*/\n'
      },

      js: {
        files: {
          'public/js/dist/admin.min.js': ['public/js/bundle/admin.js'],
          'public/js/dist/61c5d103-5fcc-425a-8c84-d4d0435899-cf751fc8e1-fc1d-4a14-a79b-4b54b20dd20a.min.js':['public/js/bundle/login.js'],
          'public/js/dist/d278b0f1-3b5c-4105-bace-e6d212bd981b76-784457-4532-4ebc-9ee4-807971a93446.min.js':['public/js/bundle/quiz.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['concat:css', 'concat:csslogin', 'concat:csslanding', 'concat:js','concat:login','concat:csserror', 'concat:cssquiz','concat:quiz',  'cssmin', 'uglify']);

};

