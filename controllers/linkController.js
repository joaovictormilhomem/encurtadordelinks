const Link = require('../models/Link');

const redirect = async (req, res) => {
  let title = req.params.title;
  try {
    let doc = await Link.findOneAndUpdate({ title }, { $inc: { click: 1 } });
    res.redirect(doc.url);
  } catch (error) {
    res.send(error)
  }
};

const addLink = async (req, res) => {
  let link = new Link(req.body);
  link.click = 0;
  try {
    let doc = await link.save();
    res.redirect('/');
  } catch (error) {
    res.send(error)
  }
}

const getAllLinks = async (_, res) => {
  try {
    let links = await Link.find({});
    res.render('all', { links });
  } catch (error) {
    res.send(error)
  }
}

const deleteLink = async (req, res) => {
  let id = req.params.id ? req.params.id : req.body.id;

  try {
    res.send(await Link.findByIdAndDelete(id));
  } catch (error) {
    res.status(404).send(error);
  }
}

const loadLink = async (req, res) => {
  let id = req.params.id;
  try {
    let doc = await Link.findById(id);
    res.render('edit', { body: doc });
  } catch (error) {
    res.status(404).send(error);
  }
}

const editLink = async (req, res) => {
  let id = req.params.id;
  let link = {
    title: req.body.title,
    url: req.body.url,
    description: req.body.description,
  };
  try {
    await Link.updateOne({_id: id}, link);
    res.redirect('/');
  } catch (error) {
    res.render('edit', { body: req.body });
  }
}

module.exports = { redirect, addLink, getAllLinks, deleteLink, loadLink, editLink };