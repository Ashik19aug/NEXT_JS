import dbConnect from "../../../config/dbConnect";
import User from "../../../models/User";
import { sign } from 'jsonwebtoken';
import {secret} from "../secret";


dbConnect();

export default async (req, res) => {
    const {method} = req;
    switch (method){
        case 'POST':
            try {
                const loginData =  await User.find({email: req.body.email, password:req.body.password});
                const claims = { sub: loginData[0]._id, myUserEmail: loginData[0].email };
                const jwt = sign(claims, secret, { expiresIn: '1h' });

                res.status(200).json({
                    success: true,
                    data: loginData,
                    authToken: jwt
                })
                //store jwt token
                localStorage.setItem('tokenData',jwt);
                localStorage.getItem('tokenData');

            }
            catch (error){
                console.log(error);
            }
    }
}