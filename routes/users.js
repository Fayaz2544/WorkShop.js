var express = require('express');
var router = express.Router();

var multer = require('multer');
var bcrypt = require('bcrypt');

var jsonwebtoken = require('jsonwebtoken');

const userSchema = require('../models/users.model');
// const res = require('express/lib/response');

/* ------- Config Upload file ------- */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '_' + file.originalname)
  }
})
const upload = multer({ storage: storage })


/* GET users listing. */
router.get('/:id', async function (req, res, next) {
  try {

    let params = req.params
    let querys = req.query

    // let hash = await bcrypt.hash("1234", 10)

    let users = await userSchema.find({})

    // console.log(users)

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.toString())
  }
});

/* POST */
router.post('/', upload.single('profile'), async function (req, res, next) {
  try {
    let { name, age } = req.body

    let user = new userSchema({
      name,
      age,
      file: req.file.filename
    })

    let save = await user.save()

    res.status(200).send(save);
  } catch (error) {
    // console.log(error)
    res.status(500).send(error.toString())
  }
});

router.put('/:id', async function (req, res, next) {
  try {

    let { name, age } = req.body

    let update = await userSchema.findByIdAndUpdate(req.params.id, { name, age }, { new: true });

    res.status(200).send(update);
  } catch (error) {
    res.status(500).send(error.toString())
  }
});

router.delete('/:id', async function (req, res, next) {
  try {

    let delete_user = await userSchema.findByIdAndDelete(req.params.id);

    res.status(200).send(delete_user);
  } catch (error) {
    res.status(500).send(error.toString())
  }
});

module.exports = router;
