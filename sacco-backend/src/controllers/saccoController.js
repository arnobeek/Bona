const Sacco = require('../models/saccoModel');

const joinSacco = async (req, res) => {
  const { userId, saccoId } = req.body;
  try {
    const sacco = await Sacco.findById(saccoId);
    sacco.members.push(userId);
    await sacco.save();
    res.status(200).json({ message: 'Joined SACCO successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error joining SACCO', error });
  }
};

const makeDeposit = async (req, res) => {
  const { userId, saccoId, amount } = req.body;
  try {
    const sacco = await Sacco.findById(saccoId);
    sacco.deposits.push({ user: userId, amount });
    await sacco.save();
    res.status(200).json({ message: 'Deposit made successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error making deposit', error });
  }
};

module.exports = { joinSacco, makeDeposit };