import dbConnect from "../../../config/dbConnect";
import Users from "../../../models/Users";

dbConnect();

export default async (req, res) => {
    const {method} = req;
    let data = JSON.parse(req.body);
    // console.log(typeof (data));

    switch (method){
        case 'POST':
            try {
                console.log('new data:',data.name);
                const userTestData = await Users.create(data);
                // console.log(userTestData);
                res.status(201).json({success: true, data: userTestData})
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;

        case 'GET':
            try {
                const userTestData = await Users.find();
                res.status(200).json({
                    success: true,
                    data: userTestData
                })
            } catch (error) {
                res.status(400).json({success: false});
            }
            break;

        default:
            res.status(400).json({success: false});
            break;
    }


};