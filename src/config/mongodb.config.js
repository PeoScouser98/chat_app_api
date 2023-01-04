import mongoose from "mongoose";
import { databaseURI } from "./env.config";

const connectMongoDb = async () => {
	try {
		mongoose.set("strictQuery", false);
		await mongoose.connect(databaseURI, { serverSelectionTimeoutMS: 5000 });
		console.log("Connected to database!");
	} catch (error) {
		console.log(error.message);
	}
};

export default connectMongoDb;
