import User from "../models/User.js";
import Video from "../models/Video.js";

export const update = async (req, res) => {
  console.log(req.user);
  if (req.params.id === req.user.id) {
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.user.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).send(updateUser);
    } catch (error) {
      console.log(error);
      res.status(404).json({ error });
    }
  } else {
    return res.status(404).send("YOU CAN UPDATE YOUR ACCOUNT ONLY");
  }
};
export const del = async (req, res) => {
  if (req.params.id === req.user.id) {
    try {
      const delUser = await User.findOneAndDelete(req.user.id);
      res.status(200).send("user deleted");
    } catch (error) {
      console.log(error);
      res.status(404).json({ error });
    }
  } else {
    return res.status(404).send("YOU CAN DELETE YOUR ACCOUNT ONLY");
  }
};
export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.status(200).send(user);
  } catch (err) {
    res.status(504).send("Something went wrong");
  }
};
export const subscribe = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUser: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).send("Subscription added successfully");
  } catch (error) {
    res.status(504).send("Something went wrong");
  }
};
export const unsubscribe = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUser: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).send("UnSubscription successfully");
  } catch (error) {
    res.status(504).send("Something went wrong");
  }
};
export const like = async (req, res) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });

    res.status(200).send("liked");
  } catch (error) {
    res.status(504).json(error);
  }
};
export const dislike = async (req, res) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });

    res.status(200).send("disliked");
  } catch (error) {
    res.status(504).json(error);
  }
};
