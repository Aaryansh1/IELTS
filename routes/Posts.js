const express = require('express');
const router = express.Router();
const { Posts } = require("../models");

router.get("/:UserId", async (req,res)=>{
    console.log(req.body);
    const UserId = req.params.UserId;
    const listOfPosts = await Posts.findAll({where:{UserId : UserId}});
res.json(listOfPosts);
});

router.post("/", async(req,res)=> {
    const post = req.body;
    await Posts.create(post);
    res.json(post);
});
router.delete("/remove/:postId", async(req,res)=> {
    const post_id = req.params.postId;
    console.log(post_id);
    await Posts.destroy({where:{id:post_id}})
    res.json("deleted")
});

module.exports = router;