import ConnectionRequestModel from '../models/connection.model.js';

import DoctorModel from '../models/doctor.model.js';
import HospitalModel from '../models/hospital.model.js';


export const getPendingRequests = async (req, res) => {
    const { doctorId } = req.params;

    try {
        const requests = await ConnectionRequestModel.find({ doctor: doctorId, status: 'pending' })
            .populate({
                path: 'hospital',
                select: 'name address.city address.state specialities'
            });

        if (!requests || requests.length === 0) {
            return res.status(200).json({ message: "No pending requests found.", requests: [] });
        }

        res.status(200).json({ requests });

    } catch (error) {
        console.error("Error fetching pending requests:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};


export const createRequest = async (req, res) => {
    const { doctorId } = req.body;

    const hospitalId = req.hospital.id;

    try {
        const doctor = await DoctorModel.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found.' });
        }

        const hospital = await HospitalModel.findById(hospitalId);

        const isAlreadyConnected = hospital.doctors.some(id => id.toString() === doctorId);
        if (isAlreadyConnected) {
            return res.status(400).json({ message: 'This doctor is already connected to your hospital.' });
        }

        const existingRequest = await ConnectionRequestModel.findOne({ hospital: hospitalId, doctor: doctorId });
        if (existingRequest) {
            return res.status(400).json({ message: `A connection request for this doctor is already ${existingRequest.status}.` });
        }

        const newRequest = new ConnectionRequestModel({
            hospital: hospitalId,
            doctor: doctorId
        });
        await newRequest.save();

        res.status(201).json({ message: 'Connection request sent successfully.', request: newRequest });

    } catch (error) {
        console.error("Error creating connection request:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};


export const respondToRequest = async (req, res) => {
    const { reqId } = req.params;
    const { decision } = req.body;
    const doctorId = req.doctor.id;

    if (!['approve', 'decline'].includes(decision)) {
        return res.status(400).json({ message: 'Invalid decision. Must be "approve" or "decline".' });
    }

    try {
        const request = await ConnectionRequestModel.findById(reqId);

        if (!request) {
            return res.status(404).json({ message: 'Request not found.' });
        }
        if (request.doctor.toString() !== doctorId) {
            return res.status(403).json({ message: 'Forbidden: You are not authorized to respond to this request.' });
        }
        if (request.status !== 'pending') {
            return res.status(400).json({ message: `This request has already been ${request.status}.` });
        }

        if (decision === 'approve') {
            request.status = 'approved';

            await HospitalModel.findByIdAndUpdate(request.hospital, {
                $addToSet: { doctors: doctorId }
            });

            await DoctorModel.findByIdAndUpdate(doctorId, {
                $addToSet: { hospitals: { hospitalId: request.hospital } }
            });

            await request.deleteOne();
            return res.status(200).json({ message: 'Request approved. You are now connected to the hospital.' });

        } else {
            request.status = 'declined';
            await request.deleteOne();
            return res.status(200).json({ message: 'Request declined successfully.' });
        }
    } catch (error) {
        console.error("Error responding to request:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export default {
    getPendingRequests,
    createRequest,
    respondToRequest
};