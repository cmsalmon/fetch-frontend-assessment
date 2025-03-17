export const  handleLogin = (e, navigate) => {
    
    const loginUser = async(e) => {
        try {
            await fetch(
                `${import.meta.env.VITE_FETCH_BASE_URL}/auth/login`,
                {
                    method: 'POST',
                    body: JSON.stringify(e),
                    headers: {
                        'Content-Type': 'application/JSON'
                    },
                    credentials: 'include',
                },       
            );
            localStorage.setItem('user', JSON.stringify(e)); 
            navigate('/');
        } catch (error) {
            console.error(error); 
        }
    };
    return loginUser(e); 
};

export const  logout = (navigate) => {
    const logoutUser = async() => {
        try {
            await fetch(
                `${import.meta.env.VITE_FETCH_BASE_URL}/auth/logout`,
                {
                    method: 'POST',
                    credentials: 'include',
                },       
            );
            localStorage.removeItem('user'); 
            navigate('/login');
        } catch (error) {
            console.error(error); 
        }
    };
    return logoutUser(); 
};