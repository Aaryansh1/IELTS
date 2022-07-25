module.exports = (sequelize,DataTypes) => {
    const Posts = sequelize.define("Posts",{
        postText:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Posts
}; 