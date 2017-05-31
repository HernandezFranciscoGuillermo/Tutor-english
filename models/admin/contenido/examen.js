exports.getExamen = function (req, res, callback) {
    // moment.lang("es");

    var stm = "SELECT e.id, e.descripcion, tipo.tipo, temas.tema, e.creacion, e.modificacion FROM examen as e, tipo, temas WHERE e.temas_id = temas.id AND e.tipo_id = tipo.id;";
    var data        = [];
    var examen    = [];
    var examenobj = {};


    req.getConnection(function (errs, connection) {
        try {
            connection.query(stm, function(err, rows, fields) {
                if (errs){
                    data = {message:"error"};
                    res.end(JSON.stringify(data));
                }

                var size = rows.length;

                if(size === 0){

                    data = {message:"data not found"};
                    res.end(JSON.stringify(data));

                }else{

                    for(i=0; i< size; i++){
                        examenobj = {
                            id:            rows[i].id,
                            descripcion:   rows[i].descripcion,
                            tipo:          rows[i].tipo,
                            tema:          rows[i].tema,
                            creacion:      rows[i].creacion,
                            modificacion:  rows[i].modificacion
                        };

                        speaking.push(examenobj);
                    }

                    callback({examen:examen});
                }
            });
        } catch (err) {
            console.log(err);
        }
    });
};

exports.searchById = function (req, res, callback) {

    var id   = req.query['temaId'];
    var stm  = "SELECT e.id, e.descripcion, tipo.tipo, temas.tema, e.creacion, e.modificacion FROM examen as e, tipo, temas WHERE e.temas_id = temas.id AND e.tipo_id = tipo.id AND temas.id = ?";
    var data = [];

    var config = {
        "shuffleQuestions": true,
            "showPager": false,
            "allowBack": false,
            "autoMove": true
    };

    var questions = [{
        "Id": 1010,
        "Name": "Which of the following assemblies can be stored in Global Assembly Cache?",
        "QuestionTypeId": 1,
        "Options": [
            { "Id": 1055, "QuestionId": 1010, "Name": "Private Assemblies", "IsAnswer": false },
            { "Id": 1056, "QuestionId": 1010, "Name": "Friend Assemblies", "IsAnswer": false },
            { "Id": 1057, "QuestionId": 1010, "Name": "Public Assemblies", "IsAnswer": false },
            { "Id": 1058, "QuestionId": 1010, "Name": "Shared Assemblies", "IsAnswer": true }],
        "QuestionType": { "Id": 1, "Name": "Multiple Choice", "IsActive": true }
    },{
            "Id": 1011,
            "Name": "Which of the following .NET components can be used to remove unused references from the managed heap?",
            "QuestionTypeId": 1,
            "Options": [
                { "Id": 1059, "QuestionId": 1010, "Name": "Language Infrastructure", "IsAnswer": false },
                { "Id": 1060, "QuestionId": 1010, "Name": "CLR", "IsAnswer": false },
                { "Id": 1061, "QuestionId": 1010, "Name": "Garbage Collector", "IsAnswer": true },
                { "Id": 1062, "QuestionId": 1010, "Name": "Class Loader", "IsAnswer": false },
                { "Id": 1063, "QuestionId": 1010, "Name": "CTS", "IsAnswer": false }],
            "QuestionType": { "Id": 1, "Name": "Multiple Choice", "IsActive": true }
        }];

    req.getConnection(function (errs, connection) {
        connection.query(stm, [id], function(err, rows, fields) {

            var size = rows.length;
            var data = [];
            dataObj  = {};
            if(size > 0 ){
                for(i=0; i< size; i++){

                    dataObj = {

                        id:            rows[i].id,
                        name:          rows[i].tema,
                        description:   rows[i].descripcion,
                        tipo:          rows[i].tipo,
                        creacion:      rows[i].creacion,
                        modificacion:  rows[i].modificacion
                    };
                }

                callback({quiz:dataObj, config:config, questions:questions});

            }else {

                dataObj = {

                    id:           '-1',
                    name:         'no existe',
                    description:  'no existe',
                    tipo:         'no existe',
                    creacion:     'nunca',
                    modificacion: 'nunca'
                };

                callback({quiz:dataObj});
            }
        });
    });
};

exports.save = function (req, res, fn) {

    var temp = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (errs, connection) {

        if(temp.user_id == null){

            var insert = {
                descripcion: temp.descripcion,
                temas_id:temp.temas,
                tipo_id:temp.tipos
            };

            connection.query("INSERT INTO examen set ? ", insert, function(err, rows) {

                if (err)
                    return fn(false, err);

                return fn(true,"Nuevo Examen se ha creado");
            });

        }else {

        }
    });
};