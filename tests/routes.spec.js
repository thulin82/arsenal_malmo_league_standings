var testCase = require('mocha').describe;
var it = require('mocha').it;
var after = require('mocha').after;
var server = require('../tests/utils/server.mock');
var expect = require('chai').expect;
// eslint-disable-next-line no-unused-vars
var should = require('chai').should();

testCase('Routes', () => {
    after(() => server.close());

    it('GET /malmo should return json', (done) => {
        server.get('/malmo')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.type).to.eql('application/json');
                done();
            });
    });
    it('GET /arsenal should return json', (done) => {
        server.get('/arsenal')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.type).to.eql('application/json');
                done();
            });
    });
    it('GET / should return html', (done) => {
        server.get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.type).to.eql('text/html');
                done();
            });
    });
});
