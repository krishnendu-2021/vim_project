import Video from "../models/Video.js";
import User from "../models/User.js";

export const addVedio = async (req, res) => {
  const newVedio = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVedio = await newVedio.save();
    res.status(200).json({ savedVedio });
  } catch (error) {
    console.log(error);
    res.status(504).json(error);
  }
};

export const getVedio = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json({ video });
  } catch (error) {
    res.status(504).send("something went wrong");
  }
};
export const updateVedio = async (req, res) => {
  try {
    const vedio = await Video.findById(req.params.id);
    if (!vedio) return res.status(404).send("Vedio not found");

    if (req.user.id !== vedio.userId)
      return res.status(404).send("only owner can upadate the vedios");
    const updatedVedio = await Video.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ updatedVedio });
  } catch (error) {
    res.status(504).send("something went wrong");
  }
};

export const deleteVedio = async (req, res) => {
  try {
    const vedio = await Video.findById(req.params.id);
    if (!vedio) return res.status(404).send("Vedio not found");

    if (req.user.id !== vedio.userId)
      return res.status(404).send("only owner can delete the vedio");
    await Video.findByIdAndDelete(req.params.id);
    res.status(200).send("Video deletion Successfull");
  } catch (error) {
    res.status(504).send("something went wrong");
  }
};

export const view = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).send("view count increased");
  } catch (error) {
    res.status(504).send("something went wrong");
  }
};

export const trend = async (req, res) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json({ videos });
  } catch (error) {
    res.status(504).send("something went wrong");
  }
};

export const random = async (req, res) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json({ videos });
  } catch (error) {
    res.status(504).send("something went wrong");
  }
};

export const getBytags = async (req, res) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json({ videos });
  } catch (error) {
    res.status(504).send("something went wrong");
  }
};
export const search = async (req, res) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json({ videos });
  } catch (error) {
    console.log(error);
    res.status(504).send("something went wrong");
  }
};

export const sub = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUser;

    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );
    res.status(200).json({ videos: list.flat() });
  } catch (error) {
    res.status(504).send("something went wrong");
  }
};
