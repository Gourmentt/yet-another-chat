'use strict';

//Run the app to test it
require('../../app');

const fixtures = require('./fixtures');

before(done => {
    fixtures.
        prepareModels().
            then(() => done()).
            catch(() => done());
});

after(done => {
    fixtures.
        cleanupModels().then(() => done());
});
