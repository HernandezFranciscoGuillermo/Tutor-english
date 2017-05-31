exports.hbsHelper = function (hbs, req, res) {

    var stm  = "SELECT * from genero";
    var data = [];
    req.getConnection(function (errs, connection) {
        connection.query(stm, function(err, rows, fields) {

            var size = rows.length;
            dataObj  = {};
            for(i=0; i< size; i++){

                dataObj = {id:rows[i].id, genero: rows[i].genero};
                data.push(dataObj);
            }
            
            hbs.registerHelper('genero', function (cssClass, item) {
                var selecti;
                var option  = '';
                selecti    = '<select name="genero" name="genero" id="genero" class="'+cssClass+'">';
                var selectf = '</select>';
                if(typeof(item)=='number'){

                    for(i in data){
                        if(data[i].id == item){
                            option = option + '<option value="' + data[i].id + '" selected>' + data[i].genero + '</option>';
                        }else {
                            option = option + '<option value="' + data[i].id + '">' + data[i].genero + '</option>';
                        }
                    }

                }else {
                    for(i in data){
                        option = option + '<option value="' + data[i].id + '">' + data[i].genero + '</option>';
                    }
                }

                return selecti + option + selectf;
            });
        });
    });
};
