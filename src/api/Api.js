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
    try {
        const response = await axios.post('http://26.103.139.198:8080/register', user);
        const newUser = response.data;
        console.log("API: ", JSON.stringify(response.data))
        await bd.create_user({
            user_id: parseInt(newUser.user.user_id),
            user_name : newUser.user.name,
            user_email : newUser.user.email,
            user_weight : newUser.user.weight,
            user_birthday : newUser.user.birthday,
            user_profession : newUser.user.profession,
            user_weekly_progress : 0,
            user_daily_progress : 0,
            user_session : newUser.token})
        return true
    } catch (error) {
        console.log('Erro da API:', error.response.data);
        console.log(`STATUS: ${JSON.stringify(error.response.status)} || JSON: ${JSON.stringify(error.response.data)}`);
        return false
    }
}
