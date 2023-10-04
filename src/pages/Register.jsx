import { register } from "../config/firebase";
import usePageTitle from "../hooks/usePageTitle";
import { useUserContext } from "../context/UserContext";
import useRedirectActiveUser from "../hooks/useRedirectActiveUser";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { LoadingButton } from "@mui/lab";

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
            <Box
                sx={{
                    my: 8,
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
                        <PersonIcon />
                    </Avatar>
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{ fontWeight: "500" }}
                    >
                        Registro
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
                        handleBlur,
                        handleSubmit,
                        touched,
                        errors,
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
                                placeholder="email@example.com"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="email"
                                label="Email"
                                error={errors.email && touched.email}
                                helperText={errors.email}
                            />
                            <TextField
                                type="password"
                                placeholder="******"
                                label="Contraseña"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="password"
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
                                    Registrarse
                                </LoadingButton>

                                <Button
                                    type="submit"
                                    component={Link}
                                    to="/"
                                    fullWidth
                                >
                                    ¿Ya tienes cuenta? Ingresa
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Formik>
            </Box>
        </>
    );
};

export default Register;
