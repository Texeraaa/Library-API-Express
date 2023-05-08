import mongoose from "mongoose";

mongoose.connect("mongodb+srv://pedroteixeira:pedroteixeira@cluster0.qcerfyi.mongodb.net/API-rest-express")

let db = mongoose.connection;

export default db;