import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			return res
				.status(401)
				.json({ message: "Unauthorized - No Token Provided" });
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) {
			return res.status(401).json({ message: "Unauthorized - Token Invalid" });
		}

		//find user in DB (in the decoded we hava userId field) - select everything except password field
		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		//if user authorized then add user to req
		req.user = user;

		next();
	} catch (error) {
		console.log("Error in protecedRoute middleware: ", error.message);
		res.status(500).json({ message: "Internal server error" });
	}
};
