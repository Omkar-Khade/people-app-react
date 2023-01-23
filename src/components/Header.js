import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import "./Header.css"

const Header = (props) => {
  return (
    <div className='header'>
      <HomeIcon fontSize='large' />
      <div className='headerText'>
        <div>{props.currentUser.fullName}</div>
        <ExitToAppIcon fontSize='large' />
      </div>
    </div>
  );
}

export default Header