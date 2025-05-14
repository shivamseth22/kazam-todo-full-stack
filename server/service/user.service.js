import userModel from '../model/user.model.js';

// Function to create the user in the DB
export const createUser = async ({ email, password }) => {
    console.log("email", email);
    console.log("password", password);

    // Field check
    if (!email || !password) {
        throw new Error("All fields are required!!");
    }

    // Create the user in the DB
    const user = await userModel.create({

        email,
        password,
    });

    return user;
};
