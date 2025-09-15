import doctorModel from "../models/doctor.model.js";

const createDoctor = async ({name, email , password, specialization, hospitals, feesPerConsultation, phone, experience, rating, reviews, appointments}) => {
    if(!name || !email || !password || !specialization || !feesPerConsultation){
        throw new Error('All Fields are Required while creating doctor');
    }
    
    const doctor = await doctorModel.create({
        name,
        email,
        password,
        specialization,
        hospitals,
        feesPerConsultation,
        phone,
        experience,
        rating,
        reviews,
        appointments
    });
    
    return doctor;
}
export default {
    createDoctor
};