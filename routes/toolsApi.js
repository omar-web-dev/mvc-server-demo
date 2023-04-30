const express = require('express');
const { getAllTools, saveTools, updateUser, getToolsById } = require('../controllars/toolsControllars');
const viewMiddleware = require('../middleware/viewCounte');
const limiter = require('../middleware/limiter');
const router = express.Router()


router.route("/")
.get(viewMiddleware, limiter, getAllTools)
.post(saveTools);


router.route("/:id")
.get(getToolsById)

module.exports = router