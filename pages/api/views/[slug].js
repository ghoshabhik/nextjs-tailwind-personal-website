import dbConnect from '../../../utils/dbConnect';
import View from '../../../models/View';

dbConnect();

export default async (req, res) => {
    const {
        query: { slug },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const view = await View.findOne({"slug": slug});

                

                res.status(200).json({ success: true, data: view });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case 'POST':
            try {
                var view = await View.findOne({"slug": slug});
                if(!view){
                    console.log('Not found')
                    const body = {
                        slug: slug,
                        count: 1 
                    }
                    view = await View.create(body);
                } else{
                    console.log(view._id)
                    const body = {
                        slug: view.slug,
                        count: 1 + view.count
                    }
                    console.log(body)
                    view = await View.findByIdAndUpdate(view._id, body)
                    // console.log(view)
                }
                res.status(200).json({ success: true, data: view });
            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false });
            }
            break; 
                   
        case 'PUT':
            try {
                const view = await View.findOneAndUpdate({"slug": slug}, req.body);

                

                res.status(200).json({ success: true, data: view });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const view = await View.deleteOne({ _id: id });

                if (!view) {
                    return res.status(400).json({ success: false })
                }

                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}