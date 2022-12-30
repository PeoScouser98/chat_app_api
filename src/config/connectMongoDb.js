import mongoose from "mongoose";

const connectMongoDb = async () => {
	try {
		const isProductionEnv = process.env.NODE_ENV.toLowerCase().localeCompare("production");
		const databaseUri = isProductionEnv ? process.env.DB_URI : process.env.DB_LOCAL_URI;
		mongoose.set("strictQuery", false);
		const data = await mongoose.connect(process.env.DB_URI, { serverSelectionTimeoutMS: 5000 });
		if (data) console.log("Connected to database!");
	} catch (error) {
		console.log(error.message);
	}
};

export default connectMongoDb;
