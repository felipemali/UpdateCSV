import * as Yup from "yup";

export const schema = Yup.object().shape({
  email: Yup.string()
    .email("Digite um email válido")
    .required("* Email obrigatório"),
  password: Yup.string().required("* Senha obrigatória"),
});
