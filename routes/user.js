const path = require('path');
const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/', (req, res, next) => {
    let redirect;
    if(req.session.isLoggedIn) {
        redirect = '/template';
    } else {
        redirect = '/login';
    }

    res.render('landing', {
        redirect: redirect
    });
})

module.exports = router;
