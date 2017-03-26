(function () {
    var database = require("./DalLayer.js");
    //Format validation
    module.exports.validateJSON = function (data) {
        try {
            return JSON.parse(data);
        }
        catch (e) {
            throw new Error("JSON is expected");
        };
    }
    module.exports.execute = function (data) {
        var result = executeCommand(data);
        if (typeof result != 'undefined') {
            return result.toString();
        }
        //Little hack - should return result object
        return "Command " + data.Command + " Suceeded";
    }
    var executeCommand = function (data) {
        if(data.Command == "GetTaxes") {
            return handleGet(data.Parameters);
        }
        if (data.Command == "InsertMunicipality") {
            return handleInsert(data.Parameters);
        }
        throw new Error("Command " + data.Command + " does not exist");
    }
    var handleGet = function (parameters) {
        ValidateGetStructure(parameters);
        var manicipalities = database.getDataTree();
        var result;
        manicipalities.forEach(function (manicipality) {
            if (manicipality.Name == parameters.Name) {
                var rate = getRateByDate(manicipality, parameters.Date);
                if (typeof rate != 'undefined') {
                    result = rate;
                }
            }
        });
        return result;
    }
    var getRateByDate = function (manicipality, date) {
        var rate;
        manicipality.Taxes.forEach(function (tax) {
            if (new Date(tax.From) <= new Date(date) && new Date(tax.To) >= new Date(date)) {
                rate = tax.Rate;
            }
        });
        return rate;
    }
    var handleInsert = function (parameters) {
        validateInsertStructure(parameters);
        validateDuplicate(parameters);
        database.addMunicipality(parameters.Name, parameters.Taxes);
    }
    var validateDuplicate = function (parameters) {
        database.validateDuplicate(parameters.Name);
    }
    var validateInsertStructure = function (parameters) {
        if (typeof parameters.Name == 'undefined') {
            throw new Error("Name has to be provided");
        }
        if (!Array.isArray(parameters.Taxes)) {
            throw new Error("Taxes array has to be provided");
        }
        if (typeof parameters.Taxes.length == 0) {
            throw new Error("At least one tax section has to be provided");
        }
    }
    var ValidateGetStructure = function (parameters) {
        if (typeof parameters.Name == 'undefined') {
            throw new Error("Name has to be provided");
        }
        if (typeof parameters.Date == 'undefined') {
            throw new Error("Date has to be provided");
        }
    }
}());
