import dbConnect from "../../../utils/dbConnect";
import View from "../../../models/View";

dbConnect();

export default async (req, res) => {
    const { method } = req;
    switch (method) {
        case 'GET':
            try {
                const views = await View.find({});

                res.status(200).json({ success: true, data: views })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const view = await View.create(req.body);

                res.status(201).json({ success: true, data: view })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}