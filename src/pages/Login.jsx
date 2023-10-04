import { useUserContext } from "../context/UserContext";
import { login } from "../config/firebase";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";
import useRedirectActiveUser from "../hooks/useRedirectActiveUser";
import { Formik } from "formik";
import * as Yup from "yup";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";

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
            <Box
                sx={{
                    mt: 8,

                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        mb: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <Avatar sx={{ bgcolor: "#007aff" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{ fontWeight: "500" }}
                    >
                       Iniciar sesión
                    </Typography>
                </Box>

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
                        <Box
                            onSubmit={handleSubmit}
                            component="form"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}
                        >
                            <TextField
                                type="text"
                                placeholder="test@example.com"
                                value={values.email}
                                onChange={handleChange}
                                name="email"
                                onBlur={handleBlur}
                                id="email"
                                label="Email"
                                fullWidth
                                error={errors.email && touched.email}
                                helperText={errors.email}
                            />
                            <TextField
                                type="password"
                                placeholder="******"
                                value={values.password}
                                onChange={handleChange}
                                name="password"
                                onBlur={handleBlur}
                                id="password"
                                label="Contraseña"
                                fullWidth
                                error={errors.password && touched.password}
                                helperText={errors.password}
                            />

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                }}
                            >
                                <LoadingButton
                                    sx={{ bgcolor: "#007aff" }}
                                    disabled={isSubmitting}
                                    loading={isSubmitting}
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                >
                                    Iniciar sesión
                                </LoadingButton>

                                <Button
                                    type="submit"
                                    component={Link}
                                    to="/register"
                                    fullWidth
                                >
                                    ¿No tienes cuenta? Regístrate
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Formik>

                <br />
            </Box>
        </>
    );
};

export default Login;
