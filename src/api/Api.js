import axios from 'axios';
import bd from "../services/tbUser/TbUser";

const baseURL = '10.0.0.119';

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
            const requisicao = await axios.post('http://'+baseURL+':8080/login', Data);
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
        const response = await axios.post('http://'+baseURL+':8080/register', user);
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
}

export async function atualizaProgressoBd(astrTipo, astrQtdade) {
        if (astrTipo !== "D" && astrTipo !== "W") {
            throw new Error("Invalid astrTipo value. It should be 'D' or 'W'.");
        }
        const progressColumn = astrTipo === "D" ? "user_daily_progress" : "user_weekly_progress";
        const lstrSQL = `UPDATE tb_user SET ${progressColumn} = ${progressColumn} + ?`;
        try {
            const response = await bd.executar(lstrSQL, [astrQtdade]);
            const userData = await bd.consultar("SELECT user_daily_progress, user_weekly_progress, user_session, user_id from tb_user;");
            if (userData.length > 0) {
                const data = {
                    weeklyProgress: userData[0].user_weekly_progress,
                    dailyProgress: userData[0].user_daily_progress,
                };
                const headers = { 'Authorization': userData[0].user_session };
                const id = userData[0].user_id;
                const url = `http://${baseURL}/tb_user/${parseInt(id)}`;
                try {
                    const apiResponse = await axios.put(url, data, { headers });
                    return true;
                } catch (apiError) {
                    throw new Error("Erro ao enviar os dados de progresso para API: " + apiError.message);
                }
            }
        } catch (dbError) {
            throw new Error("Erro ao atualizar o progresso: " + dbError.message);
        }
    }

export async function BuscaDadosUsuario() {
    try {
        const users = await bd.findAll();
        if (users && users.length > 0) {
            return users;
        } else {
            throw new Error('Erro ao buscar usuários: Nenhum usuário encontrado.');
        }
    } catch (dberror) {
        throw new Error('Erro ao buscar usuários: ' + dberror.message);
    }
}

export const enviarPeso = async (dataUpdate) => {
    try {
        const result = await bd.consultar("SELECT user_id, user_session FROM tb_user");
        console.log("BANCO:", result[0].user_id)
        if (result && result.length > 0) {
            const headers = { 'Authorization': result[0].user_session };
            const mId = result[0].user_id;
            const url = 'http://'+baseURL+':8080/tb_user/' + parseInt(mId);
            const response = await axios.put(url, dataUpdate, { headers });
            await bd.executar("UPDATE tb_user SET user_weight = ?, user_birthday = ?, user_profession = ?;", [
                dataUpdate.weight,
                dataUpdate.birthday,
                dataUpdate.profession
            ]);
            return true
        } else {
            throw new Error("Usuário não encontrado.");
        }
    } catch (error) {
        throw new Error(JSON.stringify(error.response.data));
    }
};
