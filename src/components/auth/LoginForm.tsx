import { useState } from 'react';
import { InputWithLabel } from '../ui/InputWithLabel';
import { FormSubmitButton } from '../ui/FormSubmitButton';
import { useAuth } from '../../Auth/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export const LoginForm = () => {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [formDisabled, setFormDisabled] = useState(false);

    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();
    
    // 1) если нас редиректнуло на страницу логина, то надо будет потом вернуться назад
    // 2) если же мы сами пришли на страницу логина, 
    // то после входа надо будет перейти на главную страницу
    let from = location.state?.from?.pathname || "/";

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setFormDisabled(true);

        // без useState можно вытаскивать значения из формы так:
        //let formData = new FormData(event.currentTarget);
        //let username = formData.get("username") as string;

        // но у нас с useState
        let loginData = {
            Username: username,
            Password: password
        }
        
        try {
            // если логин произошёл успешно, но редиректим на путь из from
            // replace: true означает, что в истории не будет записано, что мы заходили на страницу входа
            // (чтоб нельзя было залогиненным уже перейти назад на страницу входа, что было бы нелогично)
            await auth.signIn(loginData, () => navigate(from, { replace: true }));
        } catch(ex) {
            alert(ex);
        } finally {
            setFormDisabled(false);
        }
    };

    const redirectToRegistration = () => {
        navigate('/register', { state:{ from: location.state?.from }, replace: true });
    }

    return (
        <>
            { (from != "/") &&
                <div className="w-full max-w-xs m-auto text-indigo-500 bg-indigo-100 rounded px-5 py-3 my-2">
                    You must log in to view the page at: {from}
                </div> }
            <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5 pb-8 my-2">
                <form onSubmit={handleSubmit} autoComplete='off'>
                    <InputWithLabel name="username" labelText='Username' type='text'
                                onChange={(new_val) => setUsername(new_val)} value={username}/>
                    <InputWithLabel name="password" labelText='Password' type='password'
                        onChange={(new_val) => setPassword(new_val)} value={password}/>
                    <FormSubmitButton text='Log In' disabled={formDisabled}/>    
                </form>  
                <footer className=''>
                    {/*<a className="text-indigo-700 hover:text-pink-700 text-sm float-left" href="#">Forgot Password?</a>*/}
                    <a className="text-indigo-700 hover:text-pink-700 text-sm float-right mb-3" 
                        onClick={redirectToRegistration}> Create Account
                    </a>
                </footer>
            </div>
        </>
    );
}