import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import logo from './logo/logo.png';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";


function TextLinkExample() {
    const navigate = useNavigate();
    const Goto_login = () => {
        navigate('/')
    }
    return (
        <Navbar className='nav-color'>
            <Container>
                <Navbar.Brand className='nav-text'>
                    <img className='logo' src={logo} alt='logo' />
                    <Navbar.Text className='nav-text2'>
                        หน้าแรก 
                    </Navbar.Text>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end ">
                    <Button variant="primary" className='button-t' onClick={Goto_login}>เข้าสู่ระบบ           <FontAwesomeIcon icon={faIdCard} className="icon-t"></FontAwesomeIcon>
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TextLinkExample;