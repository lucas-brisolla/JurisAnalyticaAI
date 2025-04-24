# Assistente Jurídico IA - Projeto Completo

Este projeto implementa a plataforma Assistente Jurídico IA, conforme descrito no plano de negócio.

## Visão Geral

A plataforma consiste em:
* **Frontend:** Interface do usuário construída com React.
* **Backend:** API RESTful construída com Node.js/Express e Prisma (conectado ao PostgreSQL).
* **(Opcional) AI Service:** Microserviço Python para processamento de linguagem natural.
* **Banco de Dados:** PostgreSQL.

## Pré-requisitos

* Docker e Docker Compose instalados.
* Node.js e npm/yarn (para gerenciamento de pacotes local, se necessário).
* Git.

## Configuração (Desenvolvimento Local)

1.  **Clonar o Repositório:**
    ```bash
    git clone <url_do_repositorio>
    cd assistente-juridico-ia
    ```

2.  **Configurar Variáveis de Ambiente:**
    * Copie `backend/.env.example` para `backend/.env`.
    * Edite `backend/.env` com as configurações necessárias (segredo JWT, credenciais de banco de dados - se diferentes do padrão do compose, URLs de serviços externos como S3 ou AI Service API).
    * (Se aplicável) Faça o mesmo para `ai_service/.env.example`.

3.  **Subir os Containers:**
    ```bash
    docker-compose up --build -d
    ```
    O `-d` executa em modo detached (background). Use `docker-compose logs -f` para ver os logs.

4.  **(Apenas na primeira vez ou após mudanças no schema) Rodar Migrations do Banco de Dados:**
    ```bash
    docker-compose exec backend npx prisma migrate dev --name init
    ```
    *(Nota: Pode ser necessário ajustar o comando dependendo da configuração exata do Prisma)*

## Acesso

* **Frontend:** `http://localhost:3000`
* **Backend API:** `http://localhost:3001`

## Deploy (Instruções Gerais)

O deploy em produção envolve mais passos:

1.  **Configurar Infraestrutura na Nuvem:**
    * Provisionar um serviço de banco de dados gerenciado (ex: AWS RDS).
    * Provisionar um serviço de orquestração de containers (ex: AWS ECS/EKS, Google Cloud Run).
    * Configurar um serviço de armazenamento de objetos (ex: AWS S3).
    * Configurar Load Balancer, DNS, Certificados SSL.
2.  **Construir Imagens Docker para Produção:** Otimizadas e sem volumes de desenvolvimento.
3.  **Configurar CI/CD Pipeline:** (ex: GitHub Actions, GitLab CI, Jenkins) para automatizar build, teste e deploy.
4.  **Gerenciar Segredos:** Usar serviços como AWS Secrets Manager ou variáveis de ambiente seguras no provedor de nuvem.
5.  **Monitoramento e Logging:** Configurar ferramentas para monitorar a saúde e performance da aplicação.

*(Instruções mais detalhadas dependeriam do provedor de nuvem escolhido)*

## Documentação da API

*(Link para documentação Swagger/OpenAPI gerada ou arquivo api_docs.md)*

---