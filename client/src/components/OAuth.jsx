import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";

const OAuth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const res = await fetch("/api/auth/google", {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                }),
            });

            const data = await res.json();

            dispatch(signInSuccess(data));
            navigate("/");
            
        } catch (error) {
            console.log("Could not sign in with Google", error);
        }
    };


  return (
  <button
  type="button"
  onClick={handleGoogleClick}
  className="w-full flex items-center justify-center gap-3
  px-4 py-3
  bg-white dark:bg-slate-800
  text-slate-700 dark:text-white
  border border-slate-300 dark:border-slate-700
  rounded-xl
  shadow-sm hover:shadow-md
  hover:bg-slate-50 dark:hover:bg-slate-700
  transition-all duration-300"
>
  <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    alt="google"
    className="w-5 h-5"
  />
  <span className="font-medium">
    Continue with Google
  </span>
</button>
  )
}

export default OAuth;