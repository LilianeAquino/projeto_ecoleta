# Semana NLW - ECOLETA

Para gerar o arquivo de configuração do typescript: npx tsc --init.
Para rodar a aplicação: npx ts-node src/server.ts || npm run dev || yarn dev
para gerar as migrations: npx knex --knexfile knexfile.ts migrate:latest || npm run knex:migrate
para gerar seeds: npx knex --knexfile knexfile.ts seed:run || npm run knex:seed