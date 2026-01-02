# Doutor Agenda

![Status](https://img.shields.io/badge/status-production-green)
![Tech Stack](https://img.shields.io/badge/stack-Next.js%20|%20TypeScript%20|%20Drizzle%20ORM%20|%20Stripe-blue)

## 🚀 Descrição

Doutor Agenda é uma aplicação **full-stack** para gerenciamento de agendamentos de consultas médicas com pagamento integrado.  
O sistema faz uso de tecnologias modernas como **Next.js**, **TypeScript**, **Drizzle ORM** com banco **PostgreSQL (NeonDB)**, **Stripe para pagamentos**, **Zod para validação de dados** e **better-auth para autenticação de usuários**.

Este projeto foi desenvolvido com foco em **produção real**, arquitetura escalável e preparado para uso profissional — ideal para startups ou equipes modernas de desenvolvimento.

---

## 🧠 Tecnologias

- **Front-end:** Next.js (App Router) + TypeScript
- **Back-end:** API Server Actions + Next.js
- **Banco de Dados:** PostgreSQL (NeonDB) com **Drizzle ORM**
- **Validação de dados:** Zod
- **Autenticação:** better-auth (com roles/autorizações)
- **Pagamentos:** Stripe (checkout + webhooks)
- **Estilo:** Tailwind CSS
- **Deploy:** Vercel

---

## 📌 Funcionalidades Principais

✔ Cadastro e login de usuários  
✔ Autenticação segura com roles (ex.: paciente / médico / admin)  
✔ Agendamento de consultas  
✔ Pagamento de consultas via **Stripe**  
✔ Integração de **webhooks** do Stripe para atualização automática do status  
✔ Validação de dados com **Zod**  
✔ Banco de dados relacional com Drizzle ORM

---

🌐 Deploy

Site em produção:
🔗 https://doutor-agenda-liard.vercel.app/

---

🗂️ Estrutura de Banco de Dados

Principais entidades (relacionadas ao contexto):

users – Usuários com roles e permissões

appointments – Agendamentos de consultas

payments – Informações de pagamento recebidas do Stripe

doctors / patients – Perfis de usuários com papéis específicos

📌 Todas as migrations estão organizadas via Drizzle ORM.

---

📈 Melhorias Futuras

✔ Painel administrativo avançado
✔ Notificações por e-mail após pagamento
✔ Testes automatizados (Vitest / Cypress)
✔ Integração com IA para recomendação de horários
✔ Suporte a múltiplos idiomas (i18n)

---

💡 Por que este projeto é relevante

Este projeto demonstra:

Aplicação real com backend e frontend integrados

Pagamentos online com Stripe

Autenticação e validações robustas

Arquitetura profissional com tecnologias modernas

Perfeito para apresentação em portfólio profissional e entrevistas técnicas.

---

📞 Contato

GitHub: https://github.com/Luciolcjdev

Deploy: https://doutor-agenda-liard.vercel.app/
