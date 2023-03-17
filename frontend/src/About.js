import Header from './components/Header';
import { ControlsContext } from './Root.js';
import './components/style.css';
import { useContext } from 'react';
import TableOfContents from './components/TableOfContents';
import Contents from './components/Contents';

function About() {

    const { loggedIn, userEmail } = useContext(ControlsContext);

    return (
      <div className="About">
        <Header className="header" isLoggedIn={loggedIn} userEmail={userEmail} />
        <div className="Layout">
          <TableOfContents/>
          <Contents/>
        </div>
      </div>
    );
}

export default About;