var gulp = require("gulp")
var webserver = require("gulp-webserver")
var fs = require("fs")
var path = require("path")
var url = require("url")
var data = require("./data.json")
var clean = require("gulp-clean-css")
var uglify = require("gulp-uglify")
var babel = require("gulp-babel")
var sass = require("gulp-sass")

gulp.task("minsass", function() {
    return gulp.src("./mao/scss/index.scss")
        .pipe(sass())
        .pipe(clean())
        .pipe(gulp.dest("./mao/sss/css"))
})
gulp.task("watch", function() {
    return gulp.watch("./mao/scss/index.scss", gulp.series("minsass"))
})
gulp.task("webserver", function() {
    return gulp.src("./mao/")
        .pipe(webserver({
            port: 3000,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname
                if (pathname == "/favicon.ico") {
                    return res.end("")
                } else if (pathname === "/list") {
                    res.end(JSON.stringify({
                        code: 0,
                        data: data
                    }))
                } else {
                    pathname = pathname == "/" ? "html.html" : pathname
                    res.end(fs.readFileSync(path.join(__dirname, "mao", pathname)))
                }
            }

        }))
})