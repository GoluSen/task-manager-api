import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim : true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim : true,
        },
        password: {
            type: String,
            required: [true, "Password is Required"],

        },
        RefreshToken : {
            type: String,
        },
    },

        { timestamps: true}
        
);

//password save hone se pehle hash karo
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

//Access Token generate karne ka method
userSchema.methods.generateAccessToken =  function() {
    return jwt.sign(
        {_id: this._id, email: this.email, name: this.name},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d"}
    );

};


//Refresh Token generate karne ka method
userSchema.methods.generateRefreshToken =  function() {
    return jwt.sign(
        {_id: this._id},
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "10d"}
    );

};


export const  User = mongoose.model("User", userSchema);




