import axios from 'axios';
import bd from "../services/tbUser/TbUser";

const baseURL = 'http://10.0.0.119:8080';
export async function login(email, password) {
    const Data = {
        "email": email,
        "password": password
    };
    if (email != "" && password != ""){
        try {
            const response = await axios.post('http://10.0.0.119:8080/login', Data);
            console.log(response.data);
            await bd.executar("UPDATE tb_user SET user_session = ?, user_id = ?, user_logado = ?;", [response.data.token, response.data.id, 1]);
            console.log("Update feito com sucesso no BD.");
            return true
        } catch (error)
            {
                if (error.response) {
                    console.error("Erro na chamada para a API:", JSON.stringify(error.response.data));
                    return false
                } else if (error.request) {
                    console.error("Sem resposta do servidor");
                    return false
                } else {
                    console.error("Erro interno:", error.message);
                    return false
                }
            }
        }
}


export const registroApi = async (user) => {
    try{

    }
    catch (

        )

}
