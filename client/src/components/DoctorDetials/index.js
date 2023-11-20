import { useState, useEffect } from "react";
import {ThreeDots} from 'react-loader-spinner'
import {useParams} from 'react-router-dom'
import './style.css'
import DoctorItem from "../DoctorItem";

const apiStatusConstants = {
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
}

const DoctorDetails = () => {
    const [doctorDetails, setDoctorDetails] = useState([]);
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.inProgress);

    const { id } = useParams();
    
    useEffect(() => {
        const getDoctorDetails = async () => {
            const response = await fetch(`https://care-jar-backend.onrender.com/doctors/${id}/`);
            if(response.ok === true) {
                const data = await response.json();
                const formattedData = data.map(eachItem => ({
                    id: eachItem.id,
                    doctorName: eachItem.doctor_name,
                    doctorType: eachItem.doctor_type,
                    imageUrl: eachItem.image_url,
                    yearsOfExp: eachItem.years_of_exp,
                    location: eachItem.location,
                    hospitalName: eachItem.hospital_name,
                    fees: eachItem.fees,
                    satisfaction: eachItem.satisfaction,
                    noOfPatientStories: eachItem.no_of_patient_stories,
                }))
                setDoctorDetails(formattedData);
                setApiStatus(apiStatusConstants.success);
            } else {
                setApiStatus(apiStatusConstants.failure);
            }
        }
        getDoctorDetails();
    }, [id])

    const renderLoader = () => (
        <div className='loader-con'>
            <ThreeDots 
                height="80" 
                width="80" 
                radius="9"
                color="#4fa94d" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </div>
    )

    const renderFailure = () => (
        <div className='loader-con'>
            <h1 className='failure-heading'>Failed to load data</h1>
        </div>
    )

    const renderDetails = () => (
        <ul className="doctor-details-list">
            {doctorDetails.map(eachItem => <DoctorItem key={eachItem.id} doctor={eachItem} />)}
        </ul>
    )

    const renderSections = () => {
        switch(apiStatus) {
            case apiStatusConstants.inProgress:
                return renderLoader();
            case apiStatusConstants.success:
                return renderDetails();
            case apiStatusConstants.failure:
                return renderFailure();
            default:
                return null;
        }
    }

    return(
        <div className="doctor-details-con">
            <h1 className="doctor-details-heading">{id}</h1>
            {renderSections()}
        </div>
    )
}

export default DoctorDetails;