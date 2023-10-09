import * as Yup from "yup";
import { Formik } from "formik";
import { loginApp } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";

const Login = () => {

    const { user } = useUserContext();
    
    //** Alternative with hook */
    useRedirectActiveUser(user, "/dashboard");

    const onSubmit = async ({email, password}, { setSubmitting, setErrors, resetForm }) => {
        try {
            await loginApp({ email, password });
            resetForm()
        } catch (error) {
            console.log(error.code);
            console.log(error.message);

            if (error.code === 'auth/user-not-found') {
                return setErrors({email: 'User is not registered'})
            }
            if (error.code === "auth/wrong-password") {
                return setErrors({password: "Email/Password is incorrect"})
            }
        } finally {
            setSubmitting(false);
        }
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Email is not valid").required("Email id required"),
        password: Yup.string().trim().min(6, "Min 6 characters").required("Password is required"),
    });

    return (
        <>
            <h1>Login</h1>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {
                    ({handleSubmit, handleChange, values, isSubmitting, errors, touched, handleBlur}) => (
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="email"
                                placeholder="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {
                                errors.email && touched.email && errors.email
                            }

                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {
                                errors.password && touched.password && errors.password
                            }
                            <button type="submit"  disabled={isSubmitting}>Register</button>
                        </form>
                    )
                }
            </Formik>
        </>
    );
};

export default Login;
