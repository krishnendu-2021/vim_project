import Comments from "../models/Comments.js";
import Video from "../models/Video.js";

export const addComments = async (req, res) => {
  const newComment = new Comments({ ...req.body, userId: req.user.id });
  try {
    const saveComment = await newComment.save();
    res.status(200).send(saveComment);
  } catch (error) {
    res.status(504).json(error);
  }
};
export const deleteComments = async (req, res) => {
  try {
    const comment = await Comments.findById(req.params.id);
    const video = await Video.findById(req.params.id);
    if (comment.userId === req.user.id || video.id === req.user.id) {
      await Comments.findByIdAndDelete(req.params.id);
      res.status(200).send("deletion successfull");
    } else {
      res.status(404).send("You cannot delete others Comments");
    }
  } catch (error) {
    res.status(504).send("something went wrong");
  }
};
export const getComments = async (req, res) => {
  try {
    const comments = await Comments.find({ videoId: req.params.videoId });
    res.status(200).json({ comments });
  } catch (error) {
    res.status(504).send("something went wrong");
  }
};
