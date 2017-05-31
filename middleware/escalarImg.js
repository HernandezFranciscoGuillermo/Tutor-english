const fs = require('fs');
const resizeImg = require('resize-img');

exports.escalarImg = function(file){
 
    if (file == null) {
       console.log('send image file'); 

    }else{
        //resizeImg(fs.readFileSync(file), {width: 128, height: 128}).then(buf => {
        //    fs.writeFileSync('128px_' + file, buf);
        //});
    }
};