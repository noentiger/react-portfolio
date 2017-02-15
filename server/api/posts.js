import { Router } from 'express';
import fakeDB from '../fakeDB';

const router = new Router();

router.get('/', (req, res) => {
  res.status(200).json(fakeDB);
});

router.get('/:slug', (req, res) => {
  const index = fakeDB.findIndex(el => el.slug === req.params.slug);
  if (index < 0) {
    res.status(404).json({
      error: 'Post does not exist in db',
    });
  }
  res.status(200).json(fakeDB[index]);
});

module.exports = router;
