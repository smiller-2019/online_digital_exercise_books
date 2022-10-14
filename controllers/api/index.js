const router = require('express').Router();
const userRoutes = require('./userRoutes');
const exerciseRoutes = require('./exerciseRoutes');
const classRoutes = require('./classRoutes.js');

router.use('/users', userRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/classess', classRoutes);

module.exports = router;
