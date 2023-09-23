import supertest from "supertest";
import user from "../helper/user";
import config from "../config";
import { async } from "regenerator-runtime";

//describe('user', () => {
  describe('POST /api/v1/login', () => {
    test('Метод должен существовать', async () => {
      const res = await supertest('https://try.vikunja.io')
          .post('/api/v1/login')
          .send({})

      expect(res.status).not.toEqual(404);
    })

    test('Авторизация должна проходить успешно с правильным логином и паролем', async () => {
      const res = await user.login(config.credentials)

      expect(res.status).toEqual(200);
      expect(typeof res.body.token).toEqual('string')
    })

    test('Авторизация должна возвращать статус с кодом ошибки если логин неверный', async () => {
      const res = await user.login({username: 'demo4', password: 'demo'})

      expect(res.status).toEqual(412);
      expect(res.body.code).toEqual(1011)
    })

    test('Авторизация должна возвращать статус с кодом ошибки если пароль неверный', async () => {
      const res = await user.login({username: 'demo', password: 'demo3'})

      expect(res.status).toEqual(412);
      expect(res.body.code).toEqual(1011)
    })
  })

  describe('GET /api/v1/user', () => {
    test('Получение информации о пользователе', async() => {
      const token = await user.getAuthToken();
      // т.к. токен был получен ранее, можно к нему обратиться
      const res = await user.user(token);
      expect(res.status).toEqual(200);
    })
  })
  

