import userModel from "../models/user.models.js";

const createUser = async ({firstName, lastName , email , password}) => {
    if(!firstName || !email || !password){
        throw new Error('All Fields are Required while creating user');
    }
    
    const user = await userModel.create({
        fullName: {
            firstName: firstName,
            lastName: lastName
        },
        email,
        password
    });
    
    return user;
}
export default {
    createUser
};