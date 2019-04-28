const auth = require("../middleware/auth");
const { Category, validate } = require("../models/category");
const express = require("express");
const router = express.Router();

/**
 * @api {get} /api/categories/ Get all user categories from database
 * @apiName GetCategories
 * @apiGroup Categories
 *
 * @apiHeader {String} x-auth-token Previously generated JWT.
 *
 * @apiSuccess {json} Categories Array of categories.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *          {
 *              "_id": "3ab30d7f1b26580016067995",
 *              "title": "Category title",
 *              "description": "Category description",
 *              "userId": "4bc30d7f1b26580016067995",
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
    await Category.find({
      userId: req.user._id
    })
      .sort("createDate")
      .select("_id title description")
  );
});

/**
 * @api {post} /api/categories/ Add new category to database
 * @apiName AddCategory
 * @apiGroup Categories
 *
 * @apiHeader {String} x-auth-token Previously generated JWT.
 *
 * @apiParam {String} title New category title.
 * @apiParam {String} description New category description.
 *
 * @apiSuccess {json} Category Category that was saved.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "_id": "3ab30d7f1b26580016067995",
 *          "title": "New category title",
 *          "description": "New category description",
 *          "userId": "4bc30d7f1b26580016067995",
 *          "createDate": "2019-04-14T12:44:36.963Z",
 *          "__v": 0
 *      }
 *
 * @apiError InvalidParams Invalid params sent.
 * @apiError AccessDenied Access denied. No token provided.
 * @apiError InvalidToken Invalid token.
 * @apiError InvalidUser The category does not belong to this user!
 */
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = new Category({
    title: req.body.title,
    description: req.body.description,
    userId: req.user._id
  });
  await category.save();

  res.send(category);
});

/**
 * @api {put} /api/categories/:id Update category in database
 * @apiName UpdateCategory
 * @apiGroup Categories
 *
 * @apiHeader {String} x-auth-token Previously generated JWT.
 *
 * @apiParam {String} :id Category id that the user wants to update.
 * @apiParam {String} title New category title.
 * @apiParam {String} description New category description.
 *
 * @apiSuccess {json} Category Category that is updated.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "_id": "3ab30d7f1b26580016067995",
 *          "title": "Category title",
 *          "description": "Category description",
 *          "userId": "4bc30d7f1b26580016067995",
 *          "createDate": "2019-04-14T12:44:36.963Z",
 *          "__v": 0
 *      }
 *
 * @apiError InvalidParams Invalid params sent.
 * @apiError AccessDenied Access denied. No token provided.
 * @apiError InvalidToken Invalid token.
 * @apiError CategoryNotFound The category with the given ID was not found!
 * @apiError InvalidUser The category does not belong to this user!
 */
router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let category = await Category.findById(req.params.id);
  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found!");
  else if (category.userId != req.user._id)
    return res.status(404).send("The category does not belong to this user!");

  category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description ? req.body.description : "",
      userId: req.user._id
    },
    {
      new: true
    }
  );

  res.send(category);
});

/**
 * @api {delete} /api/categories/:id Delete category from database
 * @apiName DeleteCategory
 * @apiGroup Categories
 *
 * @apiHeader {String} x-auth-token Previously generated JWT.
 *
 * @apiParam {String} :id Category id that the user wants to delete.
 *
 * @apiSuccess {json} Category Category that has been deleted.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "_id": "3ab30d7f1b26580016067995",
 *          "title": "Category title",
 *          "description": "Category description",
 *          "userId": "4bc30d7f1b26580016067995",
 *          "createDate": "2019-04-14T12:44:36.963Z",
 *          "__v": 0
 *      }
 *
 * @apiError AccessDenied Access denied. No token provided.
 * @apiError InvalidToken Invalid token.
 * @apiError CategoryNotFound The category with the given ID was not found!
 * @apiError InvalidUser The category does not belong to this user!
 */
router.delete("/:id", auth, async (req, res) => {
  let category = await Category.findById(req.params.id);
  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found!");
  else if (category.userId != req.user._id)
    return res.status(404).send("The category does not belong to this user!");
  category = await Category.findByIdAndRemove(req.params.id);
  res.send(category);
});

/**
 * @api {get} /api/categories/:id Get category from database
 * @apiName GetCategory
 * @apiGroup Categories
 *
 * @apiHeader {String} x-auth-token Previously generated JWT.
 *
 * @apiParam {String} :id Category id that the user wants to get.
 *
 * @apiSuccess {json} Category Category that the user want.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *          "_id": "3ab30d7f1b26580016067995",
 *          "title": "Category title",
 *          "description": "Category description",
 *          "userId": "4bc30d7f1b26580016067995",
 *          "createDate": "2019-04-14T12:44:36.963Z",
 *          "__v": 0
 *      }
 *
 * @apiError AccessDenied Access denied. No token provided.
 * @apiError InvalidToken Invalid token.
 * @apiError CategoryNotFound The category with the given ID was not found!
 * @apiError InvalidUser The category does not belong to this user!
 */
router.get("/:id", auth, async (req, res) => {
  let category = await Category.findById(req.params.id);
  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found!");
  else if (category.userId != req.user._id)
    return res.status(404).send("The category does not belong to this user!");
  res.send(category);
});

module.exports = router;
