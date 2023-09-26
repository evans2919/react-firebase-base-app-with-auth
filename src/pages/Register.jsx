import { register } from "../config/firebase";
import usePageTitle from "../hooks/usePageTitle";
import { useUserContext } from "../context/UserContext";
import useRedirectActiveUser from "../hooks/useRedirectActiveUser";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

const Register = () => {
    usePageTitle();
    const { user } = useUserContext();
    useRedirectActiveUser(user, "/dashboard");

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Email inválido").required("Email requerido"),
        password: Yup.string()
            .trim()
            .min(6, "Mínimo 6 caracteres")
            .required("Contraseña requerida"),
    });

    const onSubmit = async (
        { email, password },
        { setErrors, resetForm, setSubmitting }
    ) => {
        try {
            const userCredential = await register({ email, password });
            console.log(userCredential);
            resetForm();
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                return setErrors({ email: "Email en uso" });
            }
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <>
            <h1>Register</h1>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    touched,
                    errors,
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
                            Register
                        </button>
                    </form>
                )}
            </Formik>

            <br />
            <Link to="/">
                <button>Log in</button>
            </Link>
        </>
    );
};

export default Register;
