import { AiTwotoneLike } from "react-icons/ai";
import { IoMdCalendar } from "react-icons/io";
import './style.css'

const DoctorItem = ({ doctor }) => {
    const { doctorName, doctorType, imageUrl, yearsOfExp, location, hospitalName, fees, satisfaction, noOfPatientStories } = doctor;
    
    return (
        <li className="doctor-details-item">
            <img src={imageUrl} alt="" className="doctor-details-image" />
            <div className="doctor-details">
                <div className="doctor-details-left">
                    <h1 className="doctor-details-name">Dr. {doctorName}</h1>
                    <p className="doctor-type">{doctorType}</p>
                    <p className="doctor-exp">{yearsOfExp} years experience overall</p>
                    <p className="doctor-details-loc-clinic"><span className="location">{location}</span> • {hospitalName}</p>
                    <p className="doctor-details-fee">₹{fees} Consultation fee at clinic</p>
                    <div className="doctor-details-rating">
                        <div className="doctor-details-rating-con">
                            <AiTwotoneLike className="icon" />
                            <p className="rating">{satisfaction}</p>
                        </div>
                        <p className="patients">{noOfPatientStories} Patients Stories</p>
                    </div>
                </div>
                <div className="doctor-details-right">
                    <div className="doctor-details-avail">
                        <IoMdCalendar className="icon2" />
                        <p className="avail">Available Today</p>
                    </div>
                    <button className="book-appointment-btn">
                        Book Appointment
                        <br />
                        <span className="book-appointment-btn-span">No Booking Fee</span>
                    </button>
                </div>
            </div>
        </li>
    )
}

export default DoctorItem;