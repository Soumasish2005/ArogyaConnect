import medicineShopModel from "../models/medicineShop.model.js";

const createMedicineShop = async ({name, licenseNumber, ownerName, email, password, address, contactNumber, openingHours, medicinesAvailable, websiteUrl, ratings}) => {
    if(!name || !licenseNumber || !ownerName || !email || !password || !address || !contactNumber || !openingHours  ){
        throw new Error('All Fields are Required while creating medicine shop');
    }
    
    const medicineShop = await medicineShopModel.create({
        name,
        ownerName,
        email,
        password,
        address,
        licenseNumber,
        contactNumber,
        websiteUrl,
        openingHours,
        medicinesAvailable,
        ratings
    });
    return medicineShop;
}
export default {
    createMedicineShop
};