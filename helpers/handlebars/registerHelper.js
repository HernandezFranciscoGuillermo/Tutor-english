exports.hbsHelpers = function (hbs) {

    /**
     *  Helper para crear un select con los años
     */

    hbs.registerHelper('eachYear', function(options) {
        var data = '';
        var d = new Date(); // Get user current date
        var year = d.getFullYear(); // Get year from date created;

        for(var x = 1922; x <= year; x++) {
            data = data + '<option value="' + x + '">' + x + '</option>';
        }

        return data;
    });

    /**
     *  Helper para crear links
     */

    hbs.registerHelper('link', function(text, options) {
        var attrs = [];
        for(var prop in options.hash) {
            attrs.push(prop + '="' + options.hash[prop] + '"');
        }

        return new hbs.SafeString(
            "<a " + attrs.join(" ") + ">" + text + "</a>"
        );
    });
};
