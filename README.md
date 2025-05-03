#api criada com node.js, bibliotecas express e prisma, conectando com o banco MongoDB, realizando manuseio de usuários
Instalar biblioteca express:
npm install express

Instalar biblioteca prisma:
https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb-node-mongodb

npm install prisma --save--dev -> instala o prisma no projeto
npx prisma init -> inicia o prisma, instala arquivos necessarios

o scheme precisa estar assim para conectar com o banco
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
  }

DATABASE_URL é uma variavel salva em .env, DATABASE_URL="mongodb+srv://test:test@cluster0.ns1yp.mongodb.net/myFirstDatabase"

esse modelo precisa estar no scheme
model User {
  id      String   @id @default(auto()) @map("_id") @db.ObjectId -> o prisma cria um ID aleatorio pra cada post
  email   String   @unique -> o prisma define que cada email precisa ser único
  name    String -> se houvesse um ? na frente, o dado seria opcional
  age     String
  }

npm install @prisma/client -> instala o client no projeto
npx prisma generate -> gera os arquivos do client

npx prisma db push -> conecta o prisma com o banco

o generator precisa estar assim no scheme
generator client {
  provider = "prisma-client-js"
  //output   = "../generated/prisma" -> essa parte direciona a instalação do client
  ->se ele estiver diferente do import, vai dar erro, apaga ou comenta essa linha
}

esse é o import, de acordo com o padrão de módulo
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

-> para esse tipo de import funcionar, o package.json precisa ter essa linha
"type": "module"
