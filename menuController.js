const Menu = require('../models/Menu');

exports.getMenu = async (req, res) => {
  const menu = await Menu.find({ isAvailable: true }).sort({ createdAt: -1 });
  res.json(menu);
};

exports.addMenu = async (req, res) => {
  const menu = await Menu.create(req.body);
  res.status(201).json(menu);
};

exports.updateMenu = async (req, res) => {
  const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(menu);
};

exports.deleteMenu = async (req, res) => {
  await Menu.findByIdAndDelete(req.params.id);
  res.json({ message: 'Menu deleted' });
};
