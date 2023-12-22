# CT250 Software Development Project

## Project Topic: **Real-time Online Art Work Auction System based on Microservices Architecture (Mobile and Web App)**
## Đề Tài: **XÂY DỰNG WEBSITE ĐẤU GIÁ THEO THỜI GIAN THỰC DỰA TRÊN KIẾN TRÚC HƯỚNG DỊCH VỤ**

#### Programming Languages Used in this Project: C# and TypeScript

#### Project Start Date: January 2024

#### Includes: Software Requirements Specification, Source Code, and Project Report

---

## Frameworks and Technologies:

- **Frameworks:**
  - [Next.js 13.5](https://nextjs.org/)
  - [.NET 8](https://dotnet.microsoft.com/)
  - [MAUI](https://github.com/dotnet/maui) for the mobile app

- **Technologies:**
  - Utilizing a [three-tier architecture](https://www.ibm.com/topics/three-tier-architecture) for each service
  - [Web Socket (SignalR)](https://dotnet.microsoft.com/apps/aspnet/real-time)
  - [RabbitMQ](https://www.rabbitmq.com/)
  - [Nginx](https://nginx.org/) server and [Yarp](https://github.com/microsoft/reverse-proxy) gateway for Load Balancing and Security
  - [gRPC](https://grpc.io/) to enhance performance
  - [tRPC](https://trpc.io/) for secure API endpoints
  - [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
  - Prisma ORM in Next.js Server Actions
  - [Redis](https://redis.io/) caching
  - [Stripe](https://stripe.com/) for online payments
  - JWT Token using [NextAuth](https://next-auth.js.org/) for the client and Identity Server for the server
  - [Redis](https://redis.io/) for caching
  - Integration of OpenAI's [GPT 3.5](https://openai.com/) for customer support functions
  - Utilization of [OpenAPI](https://swagger.io/specification/) for API documentation
  - [Tailwind CSS](https://tailwindcss.com/) for the user interface (Shadcn)

---

## Testing and Deployment: (Focused on partial system testing)

- Unit Testing and Integration Testing using [xUnit](https://xunit.net/) and [WebFactory](https://learn.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-7.0)
- Utilization of [Docker](https://www.docker.com/)/[Kubernetes](https://kubernetes.io/) for building, managing, and deploying
