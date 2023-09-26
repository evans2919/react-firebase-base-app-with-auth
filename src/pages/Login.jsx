import { useUserContext } from "../context/UserContext";
import { login } from "../config/firebase";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";
import useRedirectActiveUser from "../hooks/useRedirectActiveUser";
import { Formik } from "formik";
import * as Yup from "yup";

const Login = () => {
    usePageTitle();
    const { user } = useUserContext();
    useRedirectActiveUser(user, "/dashboard");

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Email no válido")
            .required("Email requerido"),
        password: Yup.string()
            .trim()
            .min(6, "Mínimo 6 caracteres")
            .required("Contraseña requerida"),
    });

    const onSubmit = async (
        { email, password },
        { setSubmitting, setErrors, resetForm }
    ) => {
        try {
            const userCredential = await login({ email, password });
            console.log(userCredential);
            resetForm();
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                return setErrors({ email: "usuario no encontrado" });
            }
            if (error.code === "auth/wrong-password") {
                return setErrors({ password: "contraseña incorrecta" });
            }
        } finally {
            setSubmitting(false);
        }
        console.log({ email, password });
    };

    return (
        <>
            <h1>Login</h1>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    touched,
                    handleBlur,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && touched && errors.email}
                        <br /> <br />
                        <input
                            type="password"
                            placeholder="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.password && touched && errors.password}
                        <br /> <br />
                        <button type="submit" disabled={isSubmitting}>
                            Login
                        </button>
                    </form>
                )}
            </Formik>

            <br />
            <Link to="/register">
                <button>Register</button>
            </Link>
        </>
    );
};

export default Login;
