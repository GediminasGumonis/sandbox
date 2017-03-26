(function () {
    //Don't have database so layers to mock db is created
    var fs = require('fs');
    var LINQ = require('node-linq').LINQ;
    var dataTree;
    var contents = fs.readFileSync("./Input.json");
    var dataTree = JSON.parse(contents);
    //Exposing data
    module.exports.getDataTree = function () {
        return dataTree;
    }
    //A feature with data instance manipulation
    //I know we need some kind of presorting of taxes here
    //And yes we dont cover daily dateset here
    module.exports.addMunicipality = function (name, taxesInputs) {
        var taxes = [];
        taxesInputs.forEach(function (taxesInput) {
            taxes.push({
                "Type": taxesInput.Type,
                "From": taxesInput.From,
                "To": taxesInput.To,
                "Rate": taxesInput.Rate
            });
        });
        dataTree.push({ "Name": name, "Taxes": taxes });
    };
    module.exports.validateDuplicate = function (name) {
        //Found linq module
        var result = new LINQ(dataTree).Where(function (treeElement) {
            return treeElement.Name == name
        })
        if (result.ToArray().length != 1) {
            throw new Error("This manicipality already exist");
        }
    };
}());
