import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import { errors } from 'celebrate';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errors());

// Rota: endereço completo da requisição
// Recurso: Qual entidade estamos acessando do sistema (caso abaixo, usuários)

// Request Param: Parâmetros que vem na prórpia rota que identificam um recurso
// Query Param: São parâmetros que vem na prórpia rota, geralmente opicionais para filtros, paginação
// Request Body: parâmetros para criação/ atualização de informações

// knex('users').where('name', 'Caio').select('*');

/* const users = [
    'Caio',
    'Goku',
    'Slash',
    'Axl', 
    'Duff'
];

app.get('/users', (request, response) => {
    const search = String(request.query.search); 

    const filreredUser = search ? users.filter(user => user.includes(search)) : users;

    return response.json(filreredUser);
});

app.get('/users/:id', (request, response) => {
    const id = Number(request.params.id);

    const user = users[id];

    return response.json(user)
})

app.post('/users', (request, response) => {
    const data = request.body;
    console.log(data)
    const user = {
        name: data.name,
        email: data.email
    };

    return response.json(user);
})
 */


app.listen(3333);