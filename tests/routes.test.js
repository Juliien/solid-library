const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.should();
chai.use(chaiHttp);

describe('Test api routes', () => {
    let testUser = {
        _id:'',
        token: '',
        username: 'julien',
        password: 'julien',
        borrowed: [],
        isAdmin: false
    };

    let book = {
        isAvailable: true,
        _id: "60217cfba15aeb0a64e3fcd8",
        title: 'The Hunger Games #1',
        author: 'Suzanne Collins',
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
            chai.request(server).post('/api/v1/login')
                .send({
                    username: testUser.username,
                    password: testUser.password
                }).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                testUser._id = res.body._id;
                testUser.token = res.body.token;
                testUser.borrowed = res.body.borrowed;
                done();
            });
        });
    });

    describe('Book routes', () => {
        it('should get all books', (done) => {
            chai.request(server).get('/api/v1/books')
                .send().end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });

        it('should get book by id', (done) => {
            chai.request(server).get('/api/v1/book/'+ book._id)
                .send().end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.title.should.be.a('string');
                res.body.author.should.be.a('string');
                res.body.isAvailable.should.be.a('boolean');
                done();
            });
        });
    });
});
