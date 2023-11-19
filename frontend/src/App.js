import { Switch, Route } from 'react-router-dom';
import './App.css';
import DoctorsCategories from './components/DoctorsCategories';
import DoctorDetails from './components/DoctorDetials';

const App = () => (
    <Switch>
      <Route exact path='/' component={DoctorsCategories} />
      <Route exact path='/doctors/:id' component={DoctorDetails} />
    </Switch>
);


export default App;
