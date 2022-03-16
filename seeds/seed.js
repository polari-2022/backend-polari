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

    for (newData of profiles){
        // randomly adding a user to each profile 
        const tempUser = users[Math.floor(Math.random()*users.length)]
        newData.user = tempUser._id;
        await newData.save();        
    };
    for (newRecord of messages){
        // randomly add a thread to each message
        const tempThread = threads[Math.floor(Math.random() * threads.length)];
        newRecord.thread = tempThread._id;
        await newRecord.save();
        // reference message on thread model, too
        tempThread.messages.push(newRecord._id);
        await tempThread.save();
        // add a user to each message
        const tempUser = users[Math.floor(Math.random()* users.length)];
        newRecord.user = tempUser._id;
        await newRecord.save();
    };
    for(newThread of threads){
        // add a user to each thread
        const tempUser = users[Math.floor(Math.random()* users.length)];
        newThread.user = tempUser._id;
        await newThread.save();
        // add a user.match to each thread
        const tempMatch = users[Math.floor(Math.random()* users.length)];
        newThread.match = tempMatch._id;
        await newThread.save();
    };

    console.log('Data seeded!!')
    process.exit(0);
});