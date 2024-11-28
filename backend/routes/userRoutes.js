// backend/routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();
const passport = require('passport');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      // Aquí puedes redirigir a tu frontend con un token o sesión establecida
      res.redirect('/'); // Redirigir al home o a una página específica
    }
  );

module.exports = router;