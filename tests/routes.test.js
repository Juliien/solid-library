const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.should();
chai.use(chaiHttp);

describe('Test api routes', () => {
    let testUser = {
        username: 'julien',
        password: 'julien'
    };

    describe('Auth routes', () => {
        it('should not register', (done) => {
            chai.request(server).post('/api/v1/register').send().end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
        });

        it('should login', (done) => {
            chai.request(server).post('/api/v1/login').send(testUser).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
        });
    });
});
