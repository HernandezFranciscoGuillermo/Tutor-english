function pad(num) {
    return (num > 9 ? "" : "0") + num;
}
 
function generator(time, index) {
    if(! time)
        return "file.log";
 
    var month  = time.getFullYear() + "" + pad(time.getMonth() + 1);
    var day    = pad(time.getDate());
    var hour   = pad(time.getHours());
    var minute = pad(time.getMinutes());
 
    return "/storage/" + month + "/" + month +
        day + "-" + hour + minute + "-" + index + "-file.log";
}

var logDirectory = path.join(__dirname, 'log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
var accessLogStream = rfs(generator, {
  interval: '10m', // rotate daily
  path: logDirectory,
  size:     '1M',
});

app.use(logger('combined', {stream: accessLogStream}));
