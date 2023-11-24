import axios from 'axios';
import bd from "../services/tbUser/TbUser";

const baseURL = 'http://10.0.0.119:8080';

const zerarBDLocal= () => {
    bd.executar("DELETE FROM tb_user;")
}

export async function login(email, password) {
    zerarBDLocal()

    const Data = {
        "email": email,
        "password": password
    };

    console.log("DATA:", Data)
        try {
            const requisicao = await axios.post('http://10.0.0.119:8080/login', Data);
            const retorno = requisicao.data;
            console.log("retorno:", retorno)

            if (retorno !== "") {
                const user = {
                    user_id: parseInt(retorno.user.user_id),
                    user_name: retorno.user.name,
                    user_email: retorno.user.email,
                    user_weight: retorno.user.weight,
                    user_birthday: retorno.user.birthday,
                    user_profession: retorno.user.profession,
                    user_weekly_progress: retorno.user.weeklyProgress,
                    user_daily_progress: retorno.user.dailyProgress,
                    user_session: retorno.token,
                    user_logado: 1
                };

                console.log("USER QUE VAI NO BD", user);
                await bd.create_user(user);

                console.log("Update feito com sucesso no BD.");
                return true;
            } else {
                throw new Error("Nenhum usuario encontrado com essas credenciais");
            }
        } catch (error) {
            if (error.response) {
                throw new Error("Erro na chamada para a API: " + JSON.stringify(error.response.data));
            } else if (error.request) {
                throw new Error("Sem resposta do servidor");
            } else {
                throw new Error("Erro interno: " + error.message);
            }
        }
}


export const registroApi = async (user) => {
    zerarBDLocal()

    try {
        const response = await axios.post('http://10.0.0.119:8080/register', user);
        const newUser = response.data;
        console.log("API Response: ", JSON.stringify(response.data));

        const userData = {
            user_id: parseInt(newUser.user.user_id),
            user_name: newUser.user.name,
            user_email: newUser.user.email,
            user_weight: newUser.user.weight,
            user_birthday: newUser.user.birthday,
            user_profession: newUser.user.profession,
            user_weekly_progress: 0,
            user_daily_progress: 0,
            user_session: newUser.token
        };
        console.log("User Data for Database: ", userData);

        await bd.create_user(userData);
        return true;
    } catch (error) {
        throw new Error(`STATUS: ${JSON.stringify(error.response.status)} || JSON: ${JSON.stringify(error.response.data)}`);
        return false;
    }
};
