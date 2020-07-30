const { index, show, create, update, delete: _delete, dreamTypes } = require('../controllers/DreamsController');

module.exports = router => {

  router.get('/dreams', index);
  router.get('/dreams/:id', show);
  router.post('/dreams', create);
  router.post('/dreams/update', update);
  router.post('/dreams/delete', _delete);
};