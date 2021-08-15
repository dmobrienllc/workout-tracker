const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const PostComment = require('./PostComment');
const UserComment = require('./UserComment');

Post.belongsTo(User,{
    foreignKey: 'user_id'
});

User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsToMany(Comment,{
    foreignKey: 'post_id',
    through: PostComment,
    onDelete: 'CASCADE'
});

Comment.belongsToMany(Post,{
    foreignKey: 'comment_id',
    through: PostComment
});

User.belongsToMany(Comment,{
    foreignKey: 'user_id',
    through: UserComment,
    onDelete: 'CASCADE'
});

Comment.belongsToMany(User,{
    foreignKey: 'comment_id',
    through: UserComment
});

module.exports = {
            User,
            Post,
            Comment,
            PostComment,
            UserComment};