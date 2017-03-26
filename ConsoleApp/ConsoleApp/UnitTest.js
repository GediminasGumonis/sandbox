var commandHandler = require('./CommandHandler.js');
const expect = require('chai').expect

//Testing is important part of project - unit testing, integration testing. However since i havent coverd many features and time...
describe('Test something important', function () {
    it('Test 1', function () {
        expect(commandHandler.validateJSON).to.be.a('function')
    });
});
