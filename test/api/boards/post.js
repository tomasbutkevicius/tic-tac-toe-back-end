process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../app');
const db = require('../../../db/index.js');

describe('POST /boards', () => {
    before((done) => {
        db.connect()
            .then(() => done())
            .catch((err) => done(err));
    })

    after((done) => {
        db.close()
            .then(() => done())
            .catch((err) => done(err));
    })

    it('OK, creating a new board works', (done) => {
        request(app).post('/boards').send({
            squares: [
                "O",
                "X",
                "O",
                "O",
                "X",
                "X",
                "X",
                "O",
                "X"
            ],
            xIsNext: false,
            winner: null,
            lastAction: "X to position #6"
        }).then((res) => {
            const body = res.body;
            expect(body).to.contain.property('_id');
            expect(body).to.contain.property('squares');
            expect(body).to.contain.property('xIsNext');
            expect(body).to.contain.property('winner');
            expect(body).to.contain.property('lastAction');
            done();
        })
        .catch((err) => done(err));
    })
});