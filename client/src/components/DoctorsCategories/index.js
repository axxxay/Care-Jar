import {useState, useEffect} from 'react'
import CategoryItem from '../CategoryItem'
import {ThreeDots} from 'react-loader-spinner'
import './style.css'

const apiStatusConstants = {
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
}

const DoctorsCategories = () => {

    const [categories, setCategories] = useState([]);
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.inProgress);
    
    useEffect(() => {
        const getCategories = async () => {
            const response = await fetch('https://care-jar-backend.onrender.com/categories/');
            if(response.ok === true) {
                const data = await response.json();
                const formattedData = data.map(eachItem => ({
                    id: eachItem.id,
                    categoryName: eachItem.category_name,
                    categoryDesc: eachItem.category_desc,
                    imageUrl: eachItem.image_url
                }))
                setCategories(formattedData);
                setApiStatus(apiStatusConstants.success);
            } else {
                setApiStatus(apiStatusConstants.failure);
            }
        }
        getCategories();
    }, [])

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

    const renderCategories = () => (
        <ul className='category-list'>
            {categories.map(eachItem => (
                <CategoryItem key={eachItem.id} category={eachItem} />
            ))}
        </ul>
    )

    const renderSections = () => {
        switch(apiStatus) {
            case apiStatusConstants.inProgress:
                return renderLoader();
            case apiStatusConstants.success:
                return renderCategories();
            case apiStatusConstants.failure:
                return renderFailure();
            default:
                return null;
        }
    }

    return (
        <div className="categories-con">
            <h2 className='heading'>Categories</h2>
            <div className="categories">
                <h1 className='category-heading'>Book an appointment for an in-clinic consultation</h1>
                <p className='category-para'>Find experienced doctors across all specialities</p>
            </div>
            {renderSections()}
        </div>
    );
}

export default DoctorsCategories;