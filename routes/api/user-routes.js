const router = require('express').Router();
const { User } = require('../../models');

// Routes that resolve at /api/users
//GET all users
router.get('/', (req, res) => {
    User.findAll()
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//CREATE a user
router.post('/', (req, res) => {});


// Routes that resolve at /api/users/:id
//GET one user
router.get('/:id', (req, res) => {
    User.findOne({
        where: {id: req.params.id}
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this id'})
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//UPDATE one user
router.put('/:id', (req, res) => {});

//DELETE one user
router.delete('/:id', (req, res) => {});


module.exports = router;