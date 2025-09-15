import hospitalModel from "../models/hospital.model.js";

const createHospital = async ({ name, email, password, address, phoneNumber, beds, reviews, ratings, description, website, imageUrl, doctors, specialities, establishedAt, servicesOffered, emergencyServices, ambulanceAvailable, pharmacyAvailable, labServicesAvailable, paymentMethods }) => {
    if (!name || !email || !password || !address || !phoneNumber) {
        throw new Error('All Fields are Required while creating hospital');
    }

    const hospital = await hospitalModel.create({
        name,
        email,
        password,
        address,
        phoneNumber,
        beds,
        reviews,
        ratings,
        description,
        website,
        imageUrl,
        doctors,
        specialities,
        establishedAt,
        servicesOffered,
        emergencyServices,
        ambulanceAvailable,
        pharmacyAvailable,
        labServicesAvailable,
        paymentMethods
    });

    return hospital;
}
export default {
    createHospital
};