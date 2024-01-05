# CT250 Software Development Project

## Project: **Real-time Art Work Auction Webiste Using Services-based Architecture**
## Đề Tài: **WEBSITE ĐẤU GIÁ TÁC PHẨM NGHỆ THUẬT THEO THỜI GIAN THỰC SỬ DỤNG KIẾN TRÚC DỰA TRÊN DỊCH VỤ**

---

## Frameworks and Technologies:

- **Frameworks:**
  - [Next.js 13.5](https://nextjs.org/)
  - [.NET 8](https://dotnet.microsoft.com/)
  - [MAUI](https://github.com/dotnet/maui) for the mobile app (Comming soon)

- **Technologies:**
  - Utilizing a [three-tier architecture](https://www.ibm.com/topics/three-tier-architecture) for each service
  - [Web Socket (SignalR)](https://dotnet.microsoft.com/apps/aspnet/real-time)
  - [RabbitMQ](https://www.rabbitmq.com/)
  - [Nginx](https://nginx.org/) server and [Yarp](https://github.com/microsoft/reverse-proxy) gateway for Load Balancing and Reverse Proxy
  - [gRPC](https://grpc.io/) to enhance performance
  - [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
  - JWT Token using [NextAuth](https://next-auth.js.org/) and Duende Identity Server
  - Integration of OpenAI's [GPT 3.5](https://openai.com/) for customer support functions
  - [Tailwind CSS](https://tailwindcss.com/) for the user interface (Shadcn/ui)

---

## Testing and Deployment: (Focused on partial system testing)

- Unit Testing and Integration Testing using [xUnit](https://xunit.net/) and [WebFactory](https://learn.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-7.0)
- Utilization of [Docker](https://www.docker.com/)/[Kubernetes](https://kubernetes.io/) for building, managing, and deploying

## Instructions
For a smoother local setup of the app on your computer, follow these steps:

1. Navigate to the ArtElevate directory:
   ```zsh
   cd ArtElevate
   ```

3. Make sure Docker Desktop is installed on your machine. If not, download and install it from Docker ([installation instructions](https://docs.docker.com/desktop/)).

4. Build the services locally:
   ```zsh
   docker compose build
   ```

5. Launch the services:
   ```zsh
   docker compose up -d
   ```

6. Install 'mkcert' on your computer to provide the app with an SSL certificate. Obtain 'mkcert' from [here](https://github.com/FiloSottile/mkcert), and install the local Certificate Authority:
   ```zsh
   mkcert -install
   ```

7. Generate the certificate and key files:
   ```zsh
   mkdir devcerts
   cd devcerts
   mkcert -key-file artelevate.com.key -cert-file artelevate.com.crt app.artelevate.com api.artelevate.com id.artelevate.com
   ```

8. Update your host file:
  - Refer to this [guide](https://phoenixnap.com/kb/how-to-edit-hosts-file-in-windows-mac-or-linux) if necessary.
  - Add the following entry:
    ```
    127.0.0.1 id.artelevate.com app.artelevate.com api.artelevate.com
    ```

9. Open your browser and visit the app at https://app.artelevate.com.