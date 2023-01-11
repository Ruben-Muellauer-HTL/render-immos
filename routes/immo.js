import express from 'express';
import { delImmo, delImmos, getImmo, getImmos, addImmo, updImmo } from '../model/immo.js';

const router = express.Router();

router.get('/immos', (req, res) => res.status(200).json(getImmos(req)));
router.get('/immos/:id', (req, res) => {
  const { id } = req.params;
  const immo = getImmo(Number(id));
  if (immo) return res.status(200).json(immo);
  return res.status(404).send('The requested resource was not found');
});

router.delete('/immos', (req, res) => res.status(200).send(delImmos()));
router.delete('/immos/:id', (req, res) => {
  const { id } = req.params;
  if (delImmo(Number(id))) return res.status(200).send('deleted');
  return res.status(404).send('The requested resource was not found');
});

router.post('/immos', (req, res) => res.status(200).json(addImmo(req.body)));

router.patch('/immos/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json(updImmo(Number(id), req.body));
});

export default router;
