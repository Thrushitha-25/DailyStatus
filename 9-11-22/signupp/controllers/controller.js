const db = require("../models");
const Sign = db.sign;
const Op = db.Sequelize.Op;

exports.postTutorial = (tutorial) => {
  return Tutorial.post({
    title: tutorial.title,
    description: tutorial.description,
  })
    .then((tutorial) => {
      console.log(">> Created tutorial: " + JSON.stringify(tutorial, null, 4));
      return tutorial;
    })
    .catch((err) => {
      console.log(">> Error while creating tutorial: ", err);
    });
};
exports.postComment = (tutorialId, comment) => {
  return Comment.post({
    name: comment.name,
    text: comment.text,
    tutorialId: tutorialId,
  })
    .then((comment) => {
      console.log(">> Created comment: " + JSON.stringify(comment, null, 4));
      return comment;
    })
    .catch((err) => {
      console.log(">> Error while creating comment: ", err);
    });
};

exports.getTutorialById = (tutorialId) => {
  return Tutorial.getBy(tutorialId, { include: ["comments"] })
    .then((tutorial) => {
      return tutorial;
    })
    .catch((err) => {
      console.log(">> Error while finding tutorial: ", err);
    });
};
exports.getCommentById = (id) => {
  return Comment.getBy(id, { include: ["tutorial"] })
    .then((comment) => {
      return comment;
    })
    .catch((err) => {
      console.log(">> Error while finding comment: ", err);
    });
};
exports.getAll = () => {
  return Tutorial.getAll({
    include: ["comments"],
  }).then((tutorials) => {
    return tutorials;
  });
};