import React, {useState, useEffect, useRef} from 'react';
import "./Login.css";
import { AppLogo } from '../Svg/AppLogo';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import gsap from 'gsap';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const inputRef = useRef(null);

    const navigate = useNavigate();
    const navigateRoute = () =>{
        const jwt = Cookies.get('jwtToken');
        console.log(jwt);
        if (jwt !== undefined){
            navigate('/');
        };
    };
    useEffect(()=>{
        navigateRoute();
        gsap.to('#login-submit_button', {opacity:1, delay:0.7})
    },[]);

    useRef(()=>{
        inputRef.current.focus()
    },[])

    const submitForm = async(event) =>{
        event.preventDefault();
        if (username !== "" && password !== ""){
            try{
                const body = {username, password};
                const options = {
                    method: "POST",
                    body: JSON.stringify(body)
                };
                const response = await fetch('https://apis.ccbp.in/login', options);
                if (response.ok){
                    const data = await response.json();
                    Cookies.set("jwtToken", data.jwt_token, {expires: 1});
                    navigateRoute();
                }
            }catch(err){
                console.log(err.message)
            };
        }else{
            console.log("Failed");
        };
    };

    return (
        <div className='login-main-container' >
        <div className='login-form-container' >
            <div className='login-container1' >
                <div className='app-logo-container-login' >
                <AppLogo />
                <p className='app-name' >Tasty Kitchens</p>
                <p className='login-text' >Login</p>
                </div>
                <form onSubmit={submitForm} >
                    <label htmlFor ="username" className='label'  id='username-label' >USERNAME</label>
                    <input href={inputRef} type='text'  placeholder='Username..'  id="username" onChange={(e)=>{setUsername(e.target.value)}} onBlur={(e)=>{e.target.value===""?setUsernameErr('Required'):setUsernameErr('')}} />
                    <p className='err-text'>{usernameErr}</p>
                    <label htmlFor='password' className='label' id = 'password-label' >PASSWORD</label>
                    <input type='password' placeholder='Password..' id= "password" onChange={(e)=>{setPassword(e.target.value)}} onBlur={(e)=>{e.target.value===""?setPasswordErr('Required'):setPasswordErr('')}} />
                    <p  className='err-text'>{passwordErr}</p>
                    <p>{errMsg}</p>
                    <button type='submit' onClick={submitForm} id = 'login-submit_button' className='submit-button' >Submit</button>
                </form>
            </div>
        </div>
        <div className='image-container'>
            <img src="https://s3-alpha-sig.figma.com/img/ceff/20e8/367d1981f2a409a617ac848670d29c7e?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hgOY0sxp-PLLfrJGabk9oC4RoLW2mNioGXZJ6DYdCkIbgT2zyFxzLdTDmbTnQAG1bDyxtt~EQpH-1l0emo6XuYZcjsHsDt6hUi04M6WeNEK5rmaeLb5Qn3ZZLnSbrr9g9dQu4ENHPyH4jEMe~fAeRpQgi8RjepLc4Sq9TWv2e5wSWByAxBH95TuFHCQCnWwpOJdSO32CwJzPqJHQpVCt6V~b7HHssdJTFGDjj4qAuBy7DOqL-3J2Vpm5flsg5sU-hlOznkX2zdQG5-mN7mW3rFl~8FKHZZbU1MUvtSZ6IVt0QbseUGsRTQJlxrd4j-tWxZOHCvIsXFQcWWG7E62SrA__" alt="logo" />
        </div>
        </div>
    );
}
