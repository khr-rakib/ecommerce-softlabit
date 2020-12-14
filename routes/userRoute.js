const router = require('express').Router();

// middleware
const { runValidator } = require('../validators');
const { signupValidator, signinValidator } = require('../validators/userValidator');

const { signup, signin, signout, requireSignIn } = require('../controllers/userController');


router.post("/user/signup", signupValidator, runValidator, signup);
router.post("/user/signin", signinValidator, runValidator, signin);
router.get("/user/signout", signout);

// test
// router.get('/secret', requireSignIn, (req, res) => {
//     res.json({ msg: "this is a secret page" });
// })

module.exports = router;