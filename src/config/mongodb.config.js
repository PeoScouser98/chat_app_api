import mongoose from "mongoose";

const connectMongoDb = async () => {
	try {
		const isProductionEnv = process.env.NODE_ENV.toLowerCase().localeCompare("production") >= 0;
		console.log(isProductionEnv);
		const databaseUri = isProductionEnv ? process.env.DB_URI : process.env.DB_LOCAL_URI;
		console.log(databaseUri);
		mongoose.set("strictQuery", false);
		const data = await mongoose.connect(databaseUri, { serverSelectionTimeoutMS: 5000 });
		if (data) console.log("Connected to database!");
	} catch (error) {
		console.log(error.message);
	}
};

export default connectMongoDb;
