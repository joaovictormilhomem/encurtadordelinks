const express = require('express');
const linkController = require('../controllers/linkController');
const router = express.Router();

router.get('/', linkController.getAllLinks);
router.get('/add', (req, res) => res.render('add'));
router.get('/edit/:id', linkController.loadLink);
router.get('/:title', linkController.redirect);

router.post('/', express.urlencoded({ extended: true }), linkController.addLink);
router.post('/edit/:id', express.urlencoded({ extended: true }), linkController.editLink);

router.delete('/:id', linkController.deleteLink);
router.delete('/', express.urlencoded({ extended: true }), linkController.deleteLink);

module.exports = router;