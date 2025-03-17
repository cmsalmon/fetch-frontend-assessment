import { Button, Group, Image } from "@mantine/core";
import style from './NavBar.module.scss';
import { logout } from "../../hook/user";

function NavBar({ navigate }) {
    const user = JSON.parse(localStorage.getItem('user'));
    
    return (
        <Group className={style.navBar} justify="space-between">   
            <Image className={style.logo} alt='Fetch Logo' src="https://cdn.brandfetch.io/id7Cm60rQf/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B"/>
            {user && <Button className={style.logout} color='#44055D' size='md'  onClick={() => logout(navigate)}>Logout</Button>}
        </Group>
    );
}

export default NavBar