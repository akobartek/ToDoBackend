const auth = require('../middleware/auth');
const {
    Task,
    validate
} = require('../models/task');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    res.send(await Task
        .find({
            userId: req.user._id
        })
        .sort('createDate')
        .select('_id title description isFinished'));
});

router.post('/', auth, async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        userId: req.user._id,
        isFinished: false
    });
    await task.save();

    res.send(task);
});

router.put('/:id', auth, async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send('The task with the given ID was not found!');
    else if (task.userId != req.user._id) return res.status(404).send('The task does not belong to this user!');

    task = await Task.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description ? req.body.description : "",
        userId: req.user._id,
        isFinished: req.body.isFinished
    }, {
        new: true
    });

    res.send(task);
});

router.delete('/:id', auth, async (req, res) => {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send('The task with the given ID was not found!');
    else if (task.userId != req.user._id) return res.status(404).send('The task does not belong to this user!');
    task = await Task.findByIdAndRemove(req.params.id);
    res.send(task);
});

router.get('/:id', auth, async (req, res) => {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send('The task with the given ID was not found!');
    else if (task.userId != req.user._id) return res.status(404).send('The task does not belong to this user!');
    res.send(task);
});

module.exports = router;