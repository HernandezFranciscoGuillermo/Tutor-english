exports.getTemas = function (req, res, callback) {
    var stm = "SELECT temas.id, temas.tema, temas.img, categoria.categoria FROM temas, categoria WHERE temas.categoria_id = categoria.id; ";

    var data     = [];
    var temas    = [];
    var temasobj = {};

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
                        cont = [];
                        ejem = [];
                        pron = [];
                        exam = [];
                        contobj = {parrafo: "",    img: ""};
                        ejemobj = {descripcion:"", ejemplo:""};
                        pronobj = {descripcion:"", ejemplo:""};
                        examobj = {descripcion:""};

                        cont.push(contobj);
                        ejem.push(ejemobj);
                        pron.push(pronobj);
                        exam.push(examobj);
                        temasobj = {"id":rows[i].id, "tema":rows[i].tema, "tipo":rows[i].categoria, img:rows[i].img};
                        //temasobj = {"id":rows[i].id, "tema":rows[i].tema, "tipo":rows[i].categoria, ejemplos:ejem, pronunciacion:pron,contenido:cont,examen:exam};
                        temas.push(temasobj);
                    }
                    callback({temas:temas});
                }
            });

        } catch (err) {
            console.log(err);
        }
    });
};