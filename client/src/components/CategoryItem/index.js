import { Link } from 'react-router-dom';
import './style.css'

const DoctorItem = (props) => {
    const { category } = props;
    return (
        <li key={category.id} className='category-item'>
            <Link to={`/doctors/${category.id}`} className='link'>
                <img src={category.imageUrl} alt={category.categoryName} className='category-image' />
                <h1 className='category-name'>{category.categoryName}</h1>
                <p className='category-desc'>{category.categoryDesc}</p>
            </Link>
        </li>
    )
}

export default DoctorItem;