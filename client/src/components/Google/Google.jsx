import axios from "axios";
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";


export default function Google({ setLoginForm, setError }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLoginSuccess = async (response) => {
        const { credential } = response;

        try {
            const res = await axios.post('http://localhost:5000/auth/google-login',
                { token: credential },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const data = res.data;
            console.log('User authenticated:', data);

            dispatch(setUser({
                id: data.userId,
                email: data.email,
            }));

            navigate('/');

        } catch (error) {
            console.error('Error during authentication:', error);
            setError('حدث خطأ أثناء تسجيل الدخول عبر جوجل. يرجى المحاولة مرة أخرى.');
        }
    };



    const handleLoginFailure = (error) => {
        console.error('Google Login Failure:', error);
        setError('فشل تسجيل الدخول عبر جوجل. حاول مرة أخرى أو استخدم طريقة أخرى.');
        setLoginForm({ email: '', password: '' });
    };

    return (
        <div className="mt-6">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                        أو سجّل دخول باستخدام
                    </span>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3">
                <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginFailure}
                    useOneTap
                    shape="rectangular"
                    theme="filled_blue"
                    size="large"
                />
            </div>
        </div>
    )
}
