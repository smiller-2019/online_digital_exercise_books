const router = require('express').Router();
const userRoutes = require('./userRoutes');
const exerciseRoutes = require('./exerciseRoutes');
const pageRoutes = require('./pageRoutes')
//const classRoutes = require('./classRoutes.js'); //further development

router.use('/users', userRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/pages', pageRoutes);
//router.use('/classes', classRoutes); //further development

module.exports = router;
