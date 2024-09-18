import mongoose from "mongoose";

const FFschema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // References to followers
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});



const FollowFriendship = mongoose.model('FollowFriendship', FFschema);