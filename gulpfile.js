var gulp = require('gulp'), // 載入 gulp
    gulpUglify = require('gulp-uglify'), // 載入 gulp-uglify
    gulpSass = require('gulp-sass'), // 載入 gulp-sass
    gulpCompass = require('gulp-compass'), //載入 gulp-compass
    gulpPlumber = require('gulp-plumber'); // 載入 gulp-plumber



gulp.task('watch', function() {
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('sass/**/*.scss', ['styles']);
});

gulp.task('script', function() {
    gulp.src('js/*.js') // 指定要處理的原始 JavaScript 檔案目錄
        .pipe(gulpPlumber()) //判斷除錯
    // .on('error', console.error.bind(console)) // 使用錯誤事件處理例外
    .pipe(gulpUglify()) // 將 JavaScript 做最小化
        .pipe(gulp.dest('dist')); // 指定最小化後的 JavaScript 檔案目錄
});

gulp.task('styles', function() {
    // gulp.src('sass/**/*.scss') // 指定要處理的 Scss 檔案目錄
    //     .pipe(gulpPlumber()) //判斷除錯
    //     // .on('error', console.error.bind(console)) // 使用錯誤事件處理例外
    //     .pipe(gulpSass({ // 編譯 Scss
    //         outputStyle: 'compressed'
    //     }))
    //     .pipe(gulp.dest('css')); // 指定編譯後的 css 檔案目錄
    gulp.src('resources/assets/sass/**/*.sass') // sass 來源路徑
    .pipe(gulpPlumber()) //判斷除錯
        .pipe(gulpCompass({
            css: 'css', // compass 輸出位置
            sass: 'sass/**/*.scss', // sass 來源路徑
            image: 'images', // 圖片來源路徑
            style: 'compressed', // CSS 處理方式，預設 nested（expanded, nested, compact, compressed）
            comments: false, // 是否要註解，預設(true)
            require: ['susy'], // 額外套件 susy
        }));
    // .pipe(gulp.dest('app/assets/temp')); // 輸出位置(非必要)
});

gulp.task('default', ['script', 'styles', 'watch']);
