import Image from './resources/ErrorPage.png'
import './components/style.css';

function NoMatch() {
  return (
    <div className="NoMatch">
      <img src={Image} className="Img"/>
      <h1 className='ErrorText'>404</h1>
    </div>
  );
}

export default NoMatch;