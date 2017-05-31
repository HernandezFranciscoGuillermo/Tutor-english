exports.hbsHelper = function (hbs, req, res) {

    var stm = "SELECT * from temas";
    var data =[];
    req.getConnection(function (errs, connection) {
        connection.query(stm, function(err, rows, fields) {

            var size = rows.length;

            dataObj  = {};
            dataObj.id =-1;
            dataObj.tema= 'seleccion';

            for(i=0; i< size; i++){
                
                dataObj = {id:rows[i].id, tema:rows[i].tema};
                data.push(dataObj);
            }
            
            hbs.registerHelper('temas', function (cssClass, item) {

                var option = '';
                var selecti = '<select name="temas" id="temas" class="'+cssClass+'">';
                var selectf = '</select>';

                if(typeof(item)=='number'){
                    for(i in data){
                        if(data[i].id == item){
                            option = option + '<option value="' + data[i].id + '" selected>' + data[i].tema + '</option>';
                        }else{
                            option = option + '<option value="' + data[i].id + '">' + data[i].tema + '</option>';
                        }
                    }
                }else{
                    for(i in data){
                        option = option + '<option value="' + data[i].id + '">' + data[i].tema + '</option>';
                    }
                }
                
                return selecti + option + selectf;
            });
        });
    });
};
