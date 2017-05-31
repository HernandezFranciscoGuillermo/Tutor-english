exports.hbsHelper = function (hbs, req, res) {

    var stm = "SELECT COUNT(*) AS count FROM temas";
    var data =[];
    req.getConnection(function (errs, connection) {
        connection.query(stm, function(err, results, fields) {
            
            hbs.registerHelper('numOfTemas', function () {

                return results[0].count;
            });
        });
    });
};
