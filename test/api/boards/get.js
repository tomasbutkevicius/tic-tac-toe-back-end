process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../app');
const db = require('../../../db/index.js');

describe('GET /boards', () => {
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

    it('OK, gettings boards has no boards', (done) => {
        request(app).get('/boards').then((res) => {
            const body = res.body;
            expect(body.length).to.equal(0);
            done();
        })
            .catch((err) => done(err));
    });

    it('OK, gettings boards has 1 board', (done) => {
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
            request(app).get('/boards')
                .then((res) => {
                    const body = res.body;
                    expect(body.length).to.equal(1);
                    done();
                })
        })
            .catch((err) => done(err));
    });

    it('OK, getting latest board', (done) => {
        request(app).post('/boards').send([{
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
            lastAction: "X to position #5"
        },
        {
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
        },
    ]).then((res) => {
            request(app).get('/boards/latest')
                .then((res) => {
                    const body = res.body;
                    expect(body.lastAction).to.equal("X to position #6");
                    done();
                })
        })
            .catch((err) => done(err));
    });
});