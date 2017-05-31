exports.hbsHelper = function (hbs, req, res) {

    var stm = "SELECT * from examen";
    var data =[];
    req.getConnection(function (errs, connection) {
        connection.query(stm, function(err, rows, fields) {

            var size = rows.length;

            dataObj  = {};

            for(i=0; i< size; i++){
                
                dataObj = {id:rows[i].id, descripcion:rows[i].descripcion};
                data.push(dataObj);
            }
            
            hbs.registerHelper('examen', function (cssClass, item) {

                var option = '';
                var selecti = '<select name="examen" id="examen" class="'+cssClass+'">';
                var selectf = '</select>';

                if(typeof(item)=='number'){
                    for(i in data){
                        if(data[i].id == item){
                            option = option + '<option value="' + data[i].id + '" selected>' + data[i].descripcion + '</option>';
                        }else{
                            option = option + '<option value="' + data[i].id + '">' + data[i].descripcion + '</option>';
                        }
                    }
                }else{
                    for(i in data){
                        option = option + '<option value="' + data[i].id + '">' + data[i].descripcion + '</option>';
                    }
                }
                
                return selecti + option + selectf;
            });
        });
    });
};
