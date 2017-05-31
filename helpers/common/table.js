exports.hbsHelper = function (hbs, req, res) {

    hbs.registerHelper('table', function (data, columnas) {
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
                str += '<td>' + data[i][key] + '</td>';
            };
            str += '</tr>';
        };
        str += '</table>';

        return new hbs.SafeString (str);
    });
};
