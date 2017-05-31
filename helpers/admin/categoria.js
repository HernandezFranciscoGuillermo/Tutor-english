exports.hbsHelper = function (hbs, req, res) {

    var stm = "SELECT * from categoria";
    var data =[];
    req.getConnection(function (errs, connection) {
        connection.query(stm, function(err, rows, fields) {

            var size = rows.length;
            dataObj  = {};
            for(i=0; i< size; i++){

                dataObj = {id:rows[i].id, categoria: rows[i].categoria};
                data.push(dataObj);
            }
            
            hbs.registerHelper('categorias', function (cssClass) {

                var option = '';
                var selecti = '<select name="categorias" id="categorias" class="'+cssClass+'">';
                var selectf = '</select>';
                
                for(i in data){
                    option = option + '<option value="' + data[i].id + '">' + data[i].categoria + '</option>';
                }
                
                return selecti + option + selectf;
            });
        });
    });
};
