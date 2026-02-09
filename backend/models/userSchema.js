import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema ({
    name: {
        type : String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /.+\@.+\..+/  // Basic email validation regex
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: false,
    },  
},{
    timestamps: true
});


//Hacher le mot de passe avant de sauvegarder l'utilisateur

userSchema.pre('save', async function () {

    if(!this.isModified('password'))return;

    try{
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);

        }catch (err) {

            throw err;
        }
});

userSchema.methods.comparePassword = async function (candidatePassword){

    return await bcrypt.compare(candidatePassword, this.password);

}

userSchema.methods.createJWT = function (){

    return jwt.sign(

        {_id: this._id, email: this.email, isAdmin: this.isAdmin},
        process.env.JWT,
        {expiresIn: '1h'} // la connexion expire après 1 heure

    );

};

export default mongoose.model('User', userSchema);