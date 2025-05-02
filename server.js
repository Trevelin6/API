import express from 'express'
/*importa o pacote express, que cria APIs e conecta bcd */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const app = express()/*variavel para usar métodos */
app.use(express.json())/*faz o express reconhecer json */

/**adiciona um usuario no banco */
app.post('/usuarios',async (req,res)=>{
    
    await prisma.user.create({
        data: {
            email: req.body.email,
            name : req.body.name,
            age : req.body.age
        }
    })
    res.status(201).json(req.body)
    /**retorna o código 201 especificando que deu tudo certo e o usuario foi criado
     * e retorna o usuario criado
     */
})

/**atualiza os dados de um usuario no banco */
app.put('/usuarios/:id',async (req,res)=>{
    
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name : req.body.name,
            age : req.body.age
        }
    })
    res.status(202).json(req.body)
})

/**retorna todos os usuarios do banco */
app.get('/usuarios',async  (req,res) => {
    let users = []
    if(req.query){/**se as informações de um user forem passadas na req */
        users = await prisma.user.findMany({//mesma função
            where:{//adiciona clausula where
                name: req.query.name,//procura pelo nome enviado
                age: req.query.age,
                email: req.query.email
            }
        })
    }else{//se n, envia de todos
        users = await prisma.user.findMany()
        /**função findMany retorna todos os usuarios no banco */
        /**a requisição precisa ser salva em uma variavel */
    }

    
    res.status(200).json(users)
    /**retorna o codigo 200 especificando que a requisição deu certo */
})

/**deleta um usuario especifico do banco */
app.delete('/usuarios/:id', async (req,res)=>{
    await prisma.user.delete({
        where: {
            id : req.params.id
        }
    })    
    res.status(204).json({ message : "Usuário deletado com sucesso "})
})

app.listen(3000)
/**
 * user:felipegodoi2015
 * pass: NZOLVGOMFZaE1faA
 * npm install mongodb
 * mongodb+srv://felipegodoi2015:NZOLVGOMFZaE1faA@user.rbecqz0.mongodb.net/?retryWrites=true&w=majority&appName=User
 */