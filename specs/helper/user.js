// все, что относится к юзерам, будет перенесено сюда (использование контроллеров)
import supertest from "supertest";

import config from "../config";
const {url} = config //вызвали урл из конфига

let token = ''

//контроллер user - это управление юзером
const user = {
    //Функции авторизации

    login: (payload) => {
        //вызвали урл из конфига
        return supertest(url)
        .post('/api/v1/login')
        //вызвали апи и в нее устанавливаем
        .set('Accept', 'application/json')
        //отправили payload
        .send(payload)
    },

    //полуаем токен
    async getAuthToken(){
        const payload = config.credentials
        //дожидаемся авторизации
        const res = await this.login(payload)
        //из тела результата забрали токен
        return res.body.token
    },
    /*вариант получения токена из кэша
    async getTokenInCach(){
        token = await this.getTokenInCach;
        return token;
    },
*/
user: (token) => {
    return supertest(url)
    .get('api/v1/user')
    .set('Accept', 'application/json')
    //синтаксис, который позволяет использовать переменную ${}
    .set ('Authorization', `Bearer ${token}`)
}
}
//экспортируем юзера
export default user


