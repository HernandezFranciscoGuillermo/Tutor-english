exports.hbsHelper = function (hbs, req, res) {

    var stm = "SELECT * from user_type";
    var data =[];
    req.getConnection(function (errs, connection) {
        connection.query(stm, function(err, rows, fields) {

            var size = rows.length;
            dataObj  = {};
            for(i=0; i< size; i++){

                dataObj = {id:rows[i].id, tipo: rows[i].tipo};
                data.push(dataObj);
            }
            
            hbs.registerHelper('userTypes', function (cssClass, item) {

                var option = '';
                var selecti = '<select name="userTypes" id="userTypes" class="'+cssClass+'">';
                var selectf = '</select>';

                if(typeof(item)=='number'){
                    for(i in data){
                        if(data[i].id == item){
                            option = option + '<option value="' + data[i].id + '" selected>' + data[i].tipo + '</option>';
                        }else{
                            option = option + '<option value="' + data[i].id + '">' + data[i].tipo + '</option>';
                        }
                    }

                }else{
                    
                    for(i in data){
                        option = option + '<option value="' + data[i].id + '">' + data[i].tipo + '</option>';
                    }
                }
                
                return selecti + option + selectf;
            });
        });
    });
};
