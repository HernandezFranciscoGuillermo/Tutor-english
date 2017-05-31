$('#location_cover').fileupload({
    dataType:'json',
    url:'/upload/sound',
    autoUpload: true,
    acceptFileTypes:/(\.|\/)(mp3)$/i,
    process:[
        {
            action:'load',
            fileTypes:/^audio\/(mp3)$/,
            maxFileSize: 20000000 // 20MB
        }
    ],
    dropZone: $('#cover_dropzone'),
    progressall:function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#cover_progress .progress-bar').css('width', progress + '%');
    },
    filesContainer:$('#upload_cover_files'),
    uploadTemplate:function (o) {
        var rows = $();
        $.each(o.files, function (index, file) {
            var row = $('<li class="template-upload">' +
                '<div class="outer"><div class="preview"><span class="fade"></span></div>' +
                '<span class="cancel"><button type="button">Eliminar</button></span>' +
                '<span class="name"></span>' +
                '<span class="size"></span>' +
                (file.error ? '<span class="error">Error</span>' :
                    '<p><div class="progress">' +
                        '<div class="bar" style="width:0%;"></div></div></p>' +
                        '<span class="start"><button type="button">Enviar</button></span>') +
                '</div></li>');
            row.find('.name').text(file.name);
            row.find('.size').text(o.formatFileSize(file.size));
            if (file.error) {
                row.find('.error').text(file.error || 'File upload error');
            }
            rows = rows.add(row);
        });
        return rows;
    },
    downloadTemplate: function (o) {
        var rows = $();
        $.each(o.files, function (index, file) {

            var row = $('<li class="template-download">' +
                '<div class="outer">' +
                (file.error ? '<span class="name"></span>' +
                    '<span class="size"></span><span class="error"></span>' :
                    '<div class="preview"></div>' +
                        '<span class="name"><a></a></span>' +
                        '<span class="size"></span>') +
                '<br><span class="delete"><button type="button">Eliminar</button></span></div></li>');
            row.find('.size').text(o.formatFileSize(file.size));

            if (file.error) {

                row.find('.name').text(file.name);
                row.find('.error').text(file.error || 'File upload error');

            } else {

                row.find('.name a').text(file.name);
                if (file.url) {
                    //row.find('.preview').append('<audio src=""></audio>').setAttribute('src',file.mediumUrl)
                    //$('.preview').append('<audio ></audio>').setAttribute('src',file.mediumUrl);
                    //row.find('.preview').append('<audio >').prop('src',file.mediumUrl);
                    //var audio = "<audio controls>";
                    //audio.setAttribute('src',file.mediumUrl);
                    //row.find('.preview').append('<audio controls>');
                        //.find('audio').prop('src', file.mediumUrl);
                    //row.find('a').prop('rel', 'gallery');
                }

                row.find('a').prop('href', file.url);
                row.find('.delete button')
                    .attr('data-type', file.delete_type)
                    .attr('data-url', file.deleteUrl);
                // add file data input
                row.append('<input type="hidden" name="audioFile">')
                    .find('input[name="audioFile"]').val(file.name);
                row.find('audio').data('fileinfo',file);
            }
            rows = rows.add(row);
        });
        return rows;
    }
});

$(document).bind('drop dragover', function (e) {
    e.preventDefault();
});
