'use strict';

const request = require('supertest'),
      serverAddr = 'http://localhost:' + global.config.appPort,
      fixtures = require('../fixtures');

describe('UserController', () => {

    describe('#login', () => {

        it('should authenticate a user', done => {
            request(serverAddr)
                .post('/login')
                .send({
                    login: fixtures.models.existingUser.login,
                    password: fixtures.models.existingUser.password
                })
                .expect(200, done);
        });

        it("HTTP 400 when user doesn't exist", done => {
            request(serverAddr)
                .post('/login')
                .send({
                    login: fixtures.models.wrongPasswordUser.login,
                    password: fixtures.models.wrongPasswordUser.password
                })
                .expect(400, done);
        });

        it('HTTP 400 when used wrong password', done => {
            request(serverAddr)
                    .post('/login')
                    .send({
                        login: fixtures.models.wrongPasswordUser.login,
                        password: fixtures.models.wrongPasswordUser.password
                    })
                    .expect(400, done);
            });
    });

    describe('#logout', () => {
        it('Logout successful', done => {
            request(serverAddr)
                .post('/logout')
                .expect(200, done);
        })
    });

    describe('#register', () => {
        it('Registration successful', done => {
            request(serverAddr)
                .post('/register')
                .send({
                    login: fixtures.models.newUser.login,
                    password: fixtures.models.newUser.password
                })
                .expect(200, done);
        })
    });
});
