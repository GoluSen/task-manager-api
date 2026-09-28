import { User } from "../user.model.js";

const registerUser = async(req,res) => {
    try {
        const { name,email,password} = req.body;
         if(!name || !email || !password) {
            return res.status(400).json({ message:"All fields are required"});
    }

    const existedUser = await User.findOne({ email });
    if(existedUser) {
        return res.status(409).json({message:"User already exists"});
    }
    const user = await User.create({ name, email, password});

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    return res.status(201).json({
        message: "User registered succesfully",
        data: createdUser,
    });
}  catch (error) {
    return res.status(500).json({
        message: error.message
    });
}

    };

    const loginUser = async( req, res) => {
        try {
            const {email, password} = req.body;
            if( !email || !password) {
                return res.status(400).json({ message: "Email and password are required"})
            }
            const user = await User.findOne({email});
            if(!user){
                return res.status(404).json({message: "User doest not exist"})
            }
            const isPasswordValid =  await user.isPasswordCorrect(password);
            if(!isPasswordValid){
                return res.status(401).json({message: "Invalid credentials"})
            }

            const accessToken = user.generateAccessToken();
            const refreshToken = user.generateRefreshToken();

            user.refreshToken = refreshToken;
            await user.save({ validateBeforeSave: false });

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        const options = {
            httpOnly: true,
            secure: true,
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                message: "User logged in successfully",
                data: { user: loggedInUser, accessToken },
            });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export { registerUser, loginUser }
