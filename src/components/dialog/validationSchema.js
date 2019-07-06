import * as Yup from "yup";

export default Yup.object().shape({
    firstName: Yup.string().required("Required."),
    lastName: Yup.string().required("Required."),
    email: Yup.string().required("Required.")
});
