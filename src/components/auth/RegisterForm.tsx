import { useState } from 'react';
import { InputWithLabel } from '../ui/InputWithLabel';
import { FormSubmitButton } from '../ui/FormSubmitButton';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Auth/AuthContext';

export const RegisterForm = () => {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');
    let [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();

    let from = location.state?.from?.pathname || "/";

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        setSubmitButtonDisabled(true);

        let registerData = {
            Username: username,
            Password: password,
            ConfirmPassword: confirmPassword
        }

        try {
            await auth.signUp(registerData, () => navigate(from, { replace: true }));
        } catch(ex) {
            alert(ex);
        } finally {
            setSubmitButtonDisabled(false);
        }
    };

    return (
        <>
            { (from != "/") &&
                <div className="w-full max-w-xs m-auto text-indigo-500 bg-indigo-100 rounded px-5 py-3 my-2">
                    You must log in to view the page at: {from}
                </div> }
            <div className="w-full max-w-xs m-auto bg-indigo-100 rounded px-5 py-1 my-2">   
                <form onSubmit={handleSubmit} autoComplete='off'>
                    <InputWithLabel name="username" labelText='Username' type='text'
                        onChange={(new_val) => setUsername(new_val)} value={username}/>
                    <InputWithLabel name="password" labelText='Password' type='password'
                        onChange={(new_val) => setPassword(new_val)} value={password}/>
                    <InputWithLabel name="confirm_password" labelText='Confirm Password' type='password'
                        onChange={(new_val) => setConfirmPassword(new_val)} value={confirmPassword}/>
                    <FormSubmitButton text='Register' disabled={submitButtonDisabled}/>
                </form>
            </div>
        </>
        
    );
}