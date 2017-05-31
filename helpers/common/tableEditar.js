exports.hbsHelper = function (hbs, req, res) {

    hbs.registerHelper('tableEditar', function (data, columnas) {
        var options = arguments[arguments.length - 1];
        var str  = '<table class="table table-hover">';
        var th ='';
        
       var cols = columnas.split(' ');
        for (var j = 0; j<cols.length; j++){
            th += '<th>' + cols[j].replace(/-/g, ' ') + '</th>';
        }

        str +='<thead>'+
            '<tr>'+
            th+
            '</thead>';


        for (var i = 0; i < data.length; i++ ) {
            str += '<tr>';

            for (var key in data[i]) {

                var html = '';

                if(key == 'id'){
                    str += '<td ><a href="/admin/usuarios/editar/'+data[i]['id']+'" class="btn btn-white btn-sm"><i class="fa fa-pencil"></i> Editar</a></td>';
                }

                if(key == 'username'){
                    str += '<td>' + data[i]['username'] + '</td>';
                }

                if(key == 'email'){
                    str += '<td>' + data[i]['email'] + '</td>';
                }

                if(key == 'creacion'){
                    str += '<td>' + data[i]['creacion'] + '</td>';
                }

                if(key == 'modificacion'){
                    str += '<td>' + data[i]['modificacion'] + '</td>';
                }

                if(key == 'user_type'){
                    str += '<td>' + data[i]['user_type'] + '</td>';
                }

                if(key == 'genero'){
                    str += '<td>' + data[i]['genero'] + '</td>';
                }

                if(key == 'status'){

                    if(data[i][key] == 'inactivo'){
                        str += '<td > <span class="label label-default">Unactive</span></td>';
                    }else{
                        str += '<td > <span class="label label-primary">Active</span></td>';
                    }
                }
                //str += '<td>' + data[i][key] +key+ '</td>';
            }
            str += '</tr>';
        }
        str += '</table>';

        return new hbs.SafeString (str);
    });
};
