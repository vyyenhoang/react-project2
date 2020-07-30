const Dream = require('../models/dream');
const User = require('../models/user');

const getUser = async req => {
  const { user: email } = req.session.passport;
  return await User.findOne({email: email});
}


exports.index = async (req, res) => {
  try {
    const user = await getUser(req);

    const dreams = await Dream
      .find({user: user._id})
      .populate('user')
      .sort({updatedAt: 'desc'});
    
    res.status(200).json(dreams);
  } catch (error) {
    console.error(error);
    res.status(400).json({status: 'failed', message: `There was an error in retrieving the dreams.`, error});
  }
};

exports.show = async (req, res) => {
  try {
    const user = await getUser(req);

    const dream = await Dream
      .findOne({user: user._id, _id: req.params.id})
      .populate('user');
      
    if (!dream) throw new Error('Dream could not be found');
    
    res.status(200).json(dream);
  } catch (error) {
    console.error(error);
    res.status(400).json({status: 'failed', message: `There was an error in retrieving the dream.`, error});
  }
};

exports.create = async (req, res) => {
  try {
    const user = await getUser(req);

    const dream = await Dream.create({user: user._id, ...req.body});

    res.status(200).json(dream);
  } catch (error) {
    console.error(error);
    res.status(400).json({status: 'failed', message: `There was an error in creating the dream.`, error});
  }
};

exports.update = async (req, res) => {
  try {
    const user = await getUser(req);
    let dream = await Dream
      .findOne({user: user._id, _id: req.body.id});
    
    if (!dream) throw new Error('Dream could not be found');
    
    const attributes = {user: user._id, ...req.body};
    await Dream.validate(attributes);   

    await Dream.updateOne({_id: req.body.id, user: user._id}, {...req.body});

    res.status(200).json(dream);
  } catch (error) {
    console.error(error);
    res.status(400).json({status: 'failed', message: `There was an error in updating the dream.`, error});
  }
};

exports.delete = async (req, res) => {
  try {
    const user = await getUser(req);
    let dream = await Dream
      .findOne({user: user._id, _id: req.body.id});
      if (!dream) throw new Error('Dream could not be found');

    await Dream.deleteOne({_id: req.body.id, user: user._id});

    res.status(200).json({message: 'Dream was deleted successfully'});
  } catch (error) {
    console.error(error);
    res.status(400).json({status: 'failed', message: `There was an error in deleting the dream.`, error});
  }
};
