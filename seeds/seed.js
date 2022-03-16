const db = require('../config/connection');
const { Message, Profile, Thread, User } = require('../models')

const messageData = require('./messageData.json');
const profileData = require('./profileData.json');
const threadData = require('./threadData.json');
const userData = require('./userData.json');

db.once('open', async () =>{
    await Message.deleteMany({});
    await Profile.deleteMany({});
    await Thread.deleteMany({});
    await User.deleteMany({});

    const messages = await Message.insertMany(messageData);
    const profiles = await Profile.insertMany(profileData);
    const threads = await Thread.insertMany(threadData);
    const users = await User.insertMany(userData);

    console.log('Data seeded!!')
    process.exit(0);
});