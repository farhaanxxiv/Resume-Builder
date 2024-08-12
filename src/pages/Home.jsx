import { FaGithub, FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "..";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";

export default function Home() {

    const navigate = useNavigate()
    const { user, loading } = useAuth()


    const provider = new GoogleAuthProvider();
    auth.languageCode = 'it';

    function signIn() {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                navigate('/app')
            }).catch((error) => {
                // Handle Errors here. 
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
    return (
        <>
            <section>
                <h1 className="font-semibold text-center text-5xl relative w-fit mx-auto">
                    Resume Builder
                    <div className="bg-white text-black text-sm font-bold px-6 -rotate-[10deg] absolute -bottom-3 -right-8">
                        FREE
                    </div>
                </h1>
            </section>

            {
                loading ? <p className="text-center">Fetching Auth...</p>
                    :
                    user != null
                        ?
                        <Link className="w-fit mx-auto" to='/app'>
                            <button className="w-fit mx-auto transition-all hover:shadow-[0px_0px_60px_#6c6c6c]">
                                Build Resume
                                <br />
                            </button>
                            <p className="text-xs mt-2">Signed In as {user.email}</p>

                        </Link>
                        :
                        <div>
                            <button onClick={() => signIn()} className="w-fit mx-auto">
                                <FcGoogle className="inline mr-2" size={24} /> Sign In With Google

                            </button>
                            <p className="text-xs mt-2 text-center">No Credit Card Required*<br />We Don't Access Your Personal Data</p>
                        </div>

            }


            <section>

            </section>
            <a class="block w-fit mx-auto" href="https://github.com/farhaanxxiv/Resume-Builder" target="_blank" aria-label="GitHub Star">
                <div className="flex gap-x-4 bg-[#202020] p-3 px-6 rounded-xl transition-all hover:shadow-[0px_0px_60px_#6c6c6c]">
                    <FaGithub size={40} />
                    <p className="font-semibold h-fit my-auto"> Star</p>
                </div>
            </a>

        </>
    )

}