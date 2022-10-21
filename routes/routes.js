import express from "express";

export const PORT = process.env.PORT || 3000;

import myDB from "../db/MyMongoDB.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const user = req.body;

  // TODO check that we got the correct info

  if (await myDB.authenticate(user)) {
    req.session.user = user.user;

    res.redirect("/?msg=authenticated");
  } else {
    res.redirect("/?msg=error authenticating");
  }
});

router.get("/users", (req, res) => {
  res.send("Users will be here!");
});

router.get("/getUser", (req, res) => {
  res.json({ user: req.session.user });
});

export default router;
