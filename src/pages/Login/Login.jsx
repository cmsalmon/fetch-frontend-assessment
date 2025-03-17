import { useForm, isEmail, hasLength } from '@mantine/form';
import { TextInput, Box, Button, Stack, Group, Title, Divider } from '@mantine/core';
import style from './Login.module.scss'
import { handleLogin } from '../../hook/user';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';


function Login() {
    const navigate = new useNavigate();
    
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            email: '',
        },
        validate: {
            name: hasLength({min: 1}, 'Username must have 1 or more characters'),
            email: isEmail('Invalid email'),
        }
    });

    return (
        <Box className={style.main}>
            <NavBar navigate={navigate} />
            <Group justify='center'>
                <form onSubmit={form.onSubmit((e) => handleLogin(e, navigate))}>
                    <Stack className={style.login} justify='space-between'>
                        
                        <Stack className={style.formContent} justify='space-between'>
                            <Title>Login to start!</Title>
                            <Divider />
                            <TextInput 
                                key={form.key('name')}
                                label='Username'
                                placeholder='Username'
                                withAsterisk
                                {...form.getInputProps('name')}
                            />
                            <TextInput
                                key={form.key('email')}
                                label='Email'
                                placeholder='youremail@provider.com'
                                withAsterisk
                                {...form.getInputProps('email')}
                            />
                        </Stack>
                        <Button color='#44055D' size='xl' type='submit'>Login</Button>
                    </Stack>
                </form>
                
            </Group>
        </Box>
    );
}

export default Login