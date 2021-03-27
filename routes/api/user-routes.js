const router = require('express').Router();
const { User } = require('../../models');

//------Routes that resolve at /api/users
//GET all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: {exclude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
//CREATE a user
router.post('/', (req, res) => {
    User.create({
        //key-value pairs
        //key is from Model 
        //value is from req.body
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


//------Routes that resolve at /api/users/:id
//GET one user
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {exclude: ['password']},
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
router.put('/:id', (req, res) => {
    //if req.body has exact key/value pairs to match model, u can use just 'req.body'
    User.update(req.body, {
        individualHooks: true,  //need this to call User model update hook
        where: { id: req.params.id }
    })
    .then(dbUserData => {
        if(!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id'} );
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
//DELETE one user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {id: req.params.id}
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//------Routes that resolve at /api/users/login
router.post('/login', (req, res) => {
    User.findOne({
        where: {email: req.body.email}
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({message: 'No user with that email!'});
            return;
        }
        // res.json({ user: dbUserData });
        //verify user!!
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(418).json({message: 'You shall not pass!'});
            return;
        }

        res.json({ user: dbUserData, message: 'You have chosen wisely.'});
    });
});


module.exports = router;