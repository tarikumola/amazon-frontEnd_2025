import { useState, useContext } from "react";
import { Link, useNavigate , useLocation} from "react-router";
import classes from "./SignUp.module.css";
import {auth} from "../../Utility/firebase";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import {ClipLoader} from "react-spinners";

const Auth = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn:false,
    signUp:false
  });
  const [{user}, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();

  const authHeader = async (e) => {
    e.preventDefault();
    console.log(e.target.name)
    if(e.target.name == "signin"){
      //firebase auth
      setLoading((loading)=>{      //same as // setLoading({...loading, signIn:true});
        return {...loading, signIn:true}
      })
      signInWithEmailAndPassword(auth, email, password).then((userInfo)=> {
        dispatch({
          type:Type.SET_USER,
          user:userInfo.user
        });
        setLoading((loading) => {
          return { ...loading, signIn: false };
        });
        navigate(navStateData?.state?.redirect || "/")
      }).catch((err)=>{
        setError(err.message);
        setLoading((loading) => {
          return { ...loading, signIn: false };
        });
      })


    }else {
      setLoading({ ...loading, signUp:true });
      createUserWithEmailAndPassword(auth, email, password).then((userInfo)=>{
        dispatch({
          type:Type.SET_USER,
          user:userInfo.user
        })
        setLoading({ ...loading, signUp:false });
        navigate(navStateData?.state?.redirect || "/");
      }).catch((err)=> {
        setError(err.message);
        setLoading({ ...loading, signUp: false });
      })

    }

  }

  return (
    <section className={classes.login}>
      {/* logo */}
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      {/* form */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            name="signin"
            onClick={authHeader}
            className={classes.login__signinbtn}
          >
            {loading.signIn ? (
              <ClipLoader color="#000" size={15}></ClipLoader>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* agreement */}
        <p>
          By signing-in, you agree to the Amazone fake clone Conditions of Use
          and Sale. Please see our Privacy Notice, our Cookie Notice and our
          Interest-Based Ads Notice.
        </p>

        {/* create account btn */}
        <button
          type="submit"
          name="signup"
          onClick={authHeader}
          className={classes.login__registerbtn}
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15}></ClipLoader>
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
};

export default Auth;
