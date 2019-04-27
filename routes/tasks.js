const auth = require("../middleware/auth");
const { Task, validate } = require("../models/task");
const express = require("express");
const router = express.Router();

/**
 * @api {get} /api/tasks/ Get all user tasks
 * @apiName GetAllTasks
 * @apiGroup Tasks
 *
 * @apiHeader {String} x-auth-token Previously generated JWT.
 *
 * @apiSuccess {json} Tasks Array of tasks.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *          {
 *              "_id": "3ab30d7f1b26580016067995",
 *              "title": "Task title",
 *              "userId": "4bc30d7f1b26580016067995",
 *              "categoryId": "5cd30d7f1b26580016067995",
 *              "isFinished": false,
 *              "createDate": "2019-04-14T12:44:36.963Z",
 *              "__v": 0
 *          }
 *      ]
 *
 * @apiError AccessDenied Access denied. No token provided.
 * @apiError InvalidToken Invalid token.
 */
router.get("/", auth, async (req, res) => {
  res.send(
    await Task.find({
      userId: req.user._id
    })
      .sort("createDate")
      .select("_id categoryId title isFinished")
  );
});

/**
 * @api {get} /api/tasks/:categoryId Get all user tasks from category
 * @apiName GetTasksByCategory
 * @apiGroup Tasks
 *
 * @apiHeader {String} x-auth-token Previously generated JWT.
 *
 * @apiParam {String} :categoryId Id of category, that tasks user want to get.
 *
 * @apiSuccess {json} Tasks Array of tasks.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *          {
 *              "_id": "3ab30d7f1b26580016067995",
 *              "title": "Task title",
 *              "userId": "4bc30d7f1b26580016067995",
 *              "categoryId": "5cd30d7f1b26580016067995",
 *              "isFinished": false,
 *              "createDate": "2019-04-14T12:44:36.963Z",
 *              "__v": 0
 *          }
 *      ]
 *
 * @apiError AccessDenied Access denied. No token provided.
 * @apiError InvalidToken Invalid token.
 */
router.get("/:categoryId", auth, async (req, res) => {
  res.send(
    await Task.find({
      userId: req.user._id,
      categoryId: req.params.categoryId
    })
      .sort("createDate")
      .select("_id categoryId title isFinished")
  );
});

/**
 * @api {post} /api/tasks/ Add new task to database
 * @apiName AddTask
 * @apiGroup Tasks
 *
 * @apiHeader {String} x-auth-token Previously generated JWT.
 *
 * @apiParam {String} categoryId Id of category, that task will belong.
 * @apiParam {String} title New task title.
 *
 * @apiSuccess {json} Task Task that was saved.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "_id": "3ab30d7f1b26580016067995",
 *          "title": "New task title",
 *          "userId": "4bc30d7f1b26580016067995",
 *          "categoryId": "5cd30d7f1b26580016067995",
 *          "isFinished": true,
 *          "createDate": "2019-04-14T12:44:36.963Z",
 *          "__v": 0
 *      }
 *
 * @apiError InvalidParams Invalid params sent.
 * @apiError AccessDenied Access denied. No token provided.
 * @apiError InvalidToken Invalid token.
 * @apiError InvalidUser The task does not belong to this user!
 */
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const task = new Task({
    title: req.body.title,
    userId: req.user._id,
    categoryId: req.body.categoryId,
    isFinished: false
  });
  await task.save();

  res.send(task);
});

/**
 * @api {put} /api/tasks/:id Update task in database
 * @apiName UpdateTask
 * @apiGroup Tasks
 *
 * @apiHeader {String} x-auth-token Previously generated JWT.
 *
 * @apiParam {String} :id Id of task that the user wants to update.
 * @apiParam {String} title New task title.
 * @apiParam {Boolean} isFinished New ifFinished value.
 *
 * @apiSuccess {json} Task Task that is updated.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "_id": "3ab30d7f1b26580016067995",
 *          "title": "Task title",
 *          "userId": "4bc30d7f1b26580016067995",
 *          "categoryId": "5cd30d7f1b26580016067995",
 *          "isFinished": false,
 *          "createDate": "2019-04-14T12:44:36.963Z",
 *          "__v": 0
 *      }
 *
 * @apiError InvalidParams Invalid params sent.
 * @apiError AccessDenied Access denied. No token provided.
 * @apiError InvalidToken Invalid token.
 * @apiError TaskNotFound The task with the given ID was not found!
 * @apiError InvalidUser The task does not belong to this user!
 */
router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let task = await Task.findById(req.params.id);
  if (!task)
    return res.status(404).send("The task with the given ID was not found!");
  else if (task.userId != req.user._id)
    return res.status(404).send("The task does not belong to this user!");

  task = await Task.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      userId: req.user._id,
      categoryId: task.categoryId,
      isFinished: req.body.isFinished
    },
    {
      new: true
    }
  );

  res.send(task);
});

/**
 * @api {delete} /api/tasks/:id Delete task from database
 * @apiName DeleteTask
 * @apiGroup Tasks
 *
 * @apiHeader {String} x-auth-token Previously generated JWT.
 *
 * @apiParam {String} :id Id of task that the user wants to delete.
 *
 * @apiSuccess {json} Task Task that has been deleted.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "_id": "3ab30d7f1b26580016067995",
 *          "title": "Task title",
 *          "userId": "4bc30d7f1b26580016067995",
 *          "categoryId": "5cd30d7f1b26580016067995",
 *          "isFinished": false,
 *          "createDate": "2019-04-14T12:44:36.963Z",
 *          "__v": 0
 *      }
 *
 * @apiError AccessDenied Access denied. No token provided.
 * @apiError InvalidToken Invalid token.
 * @apiError TaskNotFound The task with the given ID was not found!
 * @apiError InvalidUser The task does not belong to this user!
 */
router.delete("/:id", auth, async (req, res) => {
  let task = await Task.findById(req.params.id);
  if (!task)
    return res.status(404).send("The task with the given ID was not found!");
  else if (task.userId != req.user._id)
    return res.status(404).send("The task does not belong to this user!");
  task = await Task.findByIdAndRemove(req.params.id);
  res.send(task);
});

/**
 * @api {get} /api/tasks/:categoryId/:taskId Get task from database
 * @apiName GetTask
 * @apiGroup Tasks
 *
 * @apiHeader {String} x-auth-token Previously generated JWT.
 *
 * @apiParam {String} :categoryId Id of category that the task belong to.
 * @apiParam {String} :taskId Id of task that the user wants to get.
 *
 * @apiSuccess {json} Task Task that the user want.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "_id": "3ab30d7f1b26580016067995",
 *          "title": "Task title",
 *          "userId": "4bc30d7f1b26580016067995",
 *          "categoryId": "5cd30d7f1b26580016067995",
 *          "isFinished": false,
 *          "createDate": "2019-04-14T12:44:36.963Z",
 *          "__v": 0
 *      }
 *
 * @apiError AccessDenied Access denied. No token provided.
 * @apiError InvalidToken Invalid token.
 * @apiError TaskNotFound The task with the given ID was not found!
 * @apiError InvalidUser The task does not belong to this user!
 * @apiError InvalidCategory The task does not belong to this category!
 */
router.get("/:categoryId/:taskId", auth, async (req, res) => {
  let task = await Task.findById(req.params.taskId);
  if (!task)
    return res.status(404).send("The task with the given ID was not found!");
  else if (task.categoryId != req.params.categoryId)
    return res.status(404).send("The task does not belong to this category!");
  else if (task.userId != req.user._id)
    return res.status(404).send("The task does not belong to this user!");
  res.send(task);
});

module.exports = router;
