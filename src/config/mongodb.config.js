import mongoose from "mongoose";

const connectMongoDb = async () => {
	try {
		const isProductionEnv = process.env.NODE_ENV.toLowerCase().localeCompare("production") >= 0;
		console.log("Production mode:>>", isProductionEnv);
		const databaseUri = isProductionEnv ? process.env.DB_URI : process.env.DB_LOCAL_URI;
		mongoose.set("strictQuery", false);
		await mongoose.connect(databaseUri, { serverSelectionTimeoutMS: 5000 });
		console.log("Connected to database!");
	} catch (error) {
		console.log(error.message);
	}
};

export default connectMongoDb;
