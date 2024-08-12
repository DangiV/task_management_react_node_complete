import ProductModel from "../Model/ProductModel.js";

// controller for creating task
export const Createproduct = async (req, res) => {
    const { Title, Description } = req.body;
    const createdById = req.User;
    console.log(1212121, req.User)
    try {
        const createProduct = await ProductModel.create({
            Title: Title,
            Description: Description,
            createdBy: createdById
        })
        res.status(200).json(createProduct);
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}

//controller to get all task
export const GetAppData = async (req, res) => {
    try {
            const fincData = await ProductModel.find( {createdBy:req.User} );
            console.log("fincData", fincData)
        res.status(200).json(fincData);
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
}

//controller for edit task
export const EditTask = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await ProductModel.findByIdAndUpdate(id, req.body);
        res.status(200).json("data updated")
    } catch (error) {
        res.status(400).json(error);
        console.log(error)
    }
}

//controller for delete task
export const DeleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await ProductModel.findByIdAndDelete(id);
        res.status(200).json('task deleted')
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

//get task details by id
export const getByIdTask = async (req, res) => {
    const { id } = req.params;
    try {
        const findData = await ProductModel.findById(id);
        res.status(200).json(findData)
    } catch (error) {
        console.log(error)
    }
}