exports.hbsHelper = function (hbs, req, res) {

    var stm  = "SELECT * from status";
    var data = [];
    req.getConnection(function (errs, connection) {
        connection.query(stm, function(err, rows, fields) {

            var size = rows.length;
            dataObj  = {};
            for(i=0; i< size; i++){

                dataObj = {id:rows[i].id, status: rows[i].status};
                data.push(dataObj);
            }

            hbs.registerHelper('status', function (cssClass, item) {
                var option = '';
                var selecti = '<select name="status" name="status" id="status" class="'+cssClass+'">';
                var selectf = '</select>';
                data.reverse();

                if(typeof(item)=='number'){

                    for(i in data){

                        if(data[i].id == item){

                            option = option + '<option value="' + data[i].id + '" selected>' + data[i].status + '</option>';
                        }else{
                            option = option + '<option value="' + data[i].id + '">' + data[i].status + '</option>';
                        }
                    }


                }else {

                    for(i in data){
                        option = option + '<option value="' + data[i].id + '">' + data[i].status + '</option>';
                    }
                }

                return selecti + option + selectf;
            });
        });
    });
};
