var register = function(Handlebars) {

    var helpers = {
        // put all of your helpers inside this object
        urlize: function(text){
           return text.replace("-", "/");
        }
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        // register helpers
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        // just return helpers object if we can't register helpers here
        return helpers;
    }

};

// client
if (typeof window !== "undefined") {
    register(Handlebars);
}
// server
else {
    module.exports.register = register;
    module.exports.helpers = register(null);
}