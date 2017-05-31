$('#location_cover').fileupload({
    dataType:'json',
    url:'/upload/apk',
    autoUpload: true,
    acceptFileTypes:/(\.|\/)(apk)$/i,
    dropZone: $('#cover_dropzone'),
    progressall:function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#cover_progress .progress-bar').css('width', progress + '%');

        if(progress == 100){
            swal({
                title: "Ok",
                text: "El .apk se subio correctamente",
                type: "success",
                showCancelButton: false,
                confirmButtonColor: "#269FAA",
                confirmButtonText: "ok",
                closeOnConfirm: false,
                html: false

            }, function(){
                setTimeout(function(){
                    $(window).attr('location','/admin/');
                }, 2000);
            });
        }
    }
});

$(document).bind('drop dragover', function (e) {
    e.preventDefault();
});