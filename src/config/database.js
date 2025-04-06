const mongoose = require('mongoose');

const connectDB=async ()=>{ await mongoose.connect("mongodb+srv://shaanqureshi770:sara786@shaandb.mibdl85.mongodb.net/")}

module.exports={connectDB};

