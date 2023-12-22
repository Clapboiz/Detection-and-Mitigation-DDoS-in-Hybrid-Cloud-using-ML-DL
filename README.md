# DETECTION-AND-MITIGATION-DDOS-IN-HYBRID-CLOUD-USING-ML-DL
Application Layer in OSI Model

There are three main types of clouds: private cloud, public cloud, and hybrid cloud.

+ private cloud: Controlled and created within a business.

+ public cloud: Controlled by the company providing cloud services, usually a business that sells cloud services.

+ hybrid cloud: A combination of both public and private cloud

## WHAT IS MICROSERVICE 

Microservices architecture is a software development method in which a large application is built as a set of small, independent services that communicate with each other through APIs (Application Programming Interfaces). clearly defined. Each microservice is designed to perform a specific function and can be developed, deployed, and scaled independently.

This architectural model contrasts with monolithic architecture, in which an application is built as a tightly integrated unit.

<p align="center">
  <img alt="microservices-logical" src="https://github.com/Clapboiz/Detection-and-Mitigation-DDoS-in-Hybrid-Cloud-using-ML-DL/assets/112185647/c4ffcae3-7931-442e-b5ad-5bd939fee846">
</p>

<p align="center">
  Figure 1: Microservices architecture
</p>

**Important characteristics of microservices architecture include:**

+ Modularity: The application is divided into small services, each responsible for a certain function.

+ Independence: Microservices are developed and deployed independently. This means that changes in one microservice do not necessarily cause changes in other microservices.

+ Scalability: Each microservice can be scaled independently based on its specific resource requirements, allowing for better utilization of resources.

+ Fault Tolerance: Since each microservice is a separate entity, if one service fails, this does not necessarily affect the entire system. This helps build fault-tolerant and consistent systems.

+ Technology Diversity: Different microservices can be developed using different technologies and programming languages, as long as they comply with the specified interfaces.

+ Continuous Development and Deployment: Microservices support continuous integration and continuous development/deployment (CI/CD) practices, enabling faster and more frequent releases.

+ Ease of Maintenance: The modularity of microservices simplifies maintenance and updates, as changes can be isolated to specific services without affecting the entire application. Easy to read code

**However, it should also be noted that although microservices architecture brings many benefits, it also poses challenges, such as increased communication over the network, data consistency challenges, and the need for management and Discover effective service.**

**Implementing microservices requires careful planning and design to achieve the full benefits and manage the complex aspects associated with this architectural model.**

**It is very difficult to debug code**

### KONG API GATEWAY VS AWS API GATEWAY VS AZURE API GATEWAY

| **Feature / Criteria**      | **Kong API Gateway**                     | **AWS API Gateway**                      | **Azure API Gateway**                    |
|-----------------------------|-----------------------------------------|-----------------------------------------|-----------------------------------------|
| **Architecture & Deployment**| Open-source <br> On-premises (On-premise allows businesses to have full control over their data) <br> Cloud          | AWS-managed cloud service               | Azure-managed cloud service              |
| **Key Features**             | API management, authentication, monitoring, traffic management | User management, authentication, access control, API monitoring | Traffic management, security, authentication, monitoring |
| **Integration**              | Flexible integration with various backends and databases | Tight integration with AWS ecosystem (Lambda, S3, CloudWatch) | Deep integration with Azure services     |
| **Performance & Scaling**    | Uses Nginx for high performance, scalable deployment | Flexible and auto-scaling based on demand, integrates with AWS services for optimization | Scalable and flexible, integrates with various Azure services |
| **Cost**                     | Free open-source version, Enterprise version pricing based on features and support | Pay-as-you-go pricing based on usage, API calls, and features | Pay-as-you-go pricing based on usage and features |
| **Flexibility**              | Independent and adaptable to various ecosystems | Tightly integrated with AWS services, optimized for AWS environment | Deep integration with Azure services, adaptable to Azure environment |
| **Ease of Integration**      | Moderate learning curve, adaptable to various environments | Seamless integration with AWS services, AWS Lambda for serverless integration | Smooth integration with Azure services, Azure Functions for serverless |
| **Scalability**              | Easily scalable, flexible deployment options | Auto-scaling based on demand, scalable architecture | Scalable architecture, adapts to changing workloads |
| **Ecosystem Compatibility**  | Compatible with various ecosystems | Integrated with AWS services and serverless ecosystem | Integrated with Azure services and serverless ecosystem |
| **Community Support**        | Active open-source community, enterprise support available | Well-documented, AWS community support | Well-documented, Microsoft Azure community support |

**_=> In this project we use Azure api gateway_**

## ARCHITECTURE OF PROJECT
<p align="center">
  <img alt="Project_architerture" src="https://github.com/Clapboiz/Detection-and-Mitigation-DDoS-in-Hybrid-Cloud-using-ML-DL/assets/112185647/a8959dfc-2cf8-412c-9090-ca914251b64f">
</p>

<p align="center">
  Figure 2: Project architecture
</p>

## IMPLEMENTATION

+ Public cloud: Virtual machine

+ Private cloud: simulated or virtual machine

**Azure**

| Feature                               | IaaS                                        | PaaS                                        |
|---------------------------------------|---------------------------------------------|---------------------------------------------|
| **Definition**                        | Provides virtualized computing resources over the internet. Offers virtual machines, storage, and networking components as a service. Users can deploy and run their applications on these virtualized resources without worrying about managing the underlying physical infrastructure. | A cloud computing service that provides a platform allowing customers to develop, run, and manage applications without dealing with the complexity of building and maintaining the underlying infrastructure. Typically includes development frameworks, databases, middleware, and other tools needed to build applications. |
| **Level of Abstraction**              | Provides a lower level of abstraction. Users have more control over the virtualized infrastructure, including operating systems, applications, and network configurations. | Offers a higher level of abstraction. Developers focus more on the application layer, relying on the platform to manage the underlying infrastructure details. |
| **Responsibility**                   | Users are responsible for managing and maintaining the operating systems, middleware, applications, and data. The cloud provider takes care of the virtualization, storage, and networking. | The cloud provider takes care of managing the entire stack, including the runtime, operating system, middleware, and development framework. Users are responsible for managing their applications and data. |
| **Flexibility**                      | Offers more flexibility and control, allowing users to choose and configure their own operating systems, applications, and development frameworks. | Provides less flexibility in terms of infrastructure choices. Users work within the platform's constraints and predefined environments. |
| **Scalability**                      | Users can manually configure and scale resources up or down based on their requirements. Scaling is often more granular and under the control of the user. | Scaling is usually automatic and managed by the platform. The platform itself handles resource allocation and scaling based on application demand. |
| **Use Cases**                       | Suitable for users who need more control over the infrastructure and want to manage the entire software stack, including applications. | Ideal for developers who want to focus on building and deploying applications without dealing with the complexities of infrastructure management. |
| **Examples**                         | Amazon Web Services (AWS) EC2, Microsoft Azure Virtual Machines, Google Cloud Compute Engine. | Heroku, Google App Engine, Microsoft Azure App Service. |


## REFERENCES

[1]. S. Kautish, R. A and A. Vidyarthi, "SDMTA: Attack Detection and Mitigation Mechanism for DDoS Vulnerabilities in Hybrid Cloud Environment," in IEEE Transactions on Industrial Informatics, vol. 18, no. 9, pp. 6455-6463, Sept. 2022, doi: 10.1109/TII.2022.3146290.

[2]. Lavian, S., & Ariel University, Ariel Cyber Innovation Center (ACIC). (2023). The API Traffic Research Dataset Framework (ATRDF) [Data set]. https://github.com/ArielCyber/Cisco_Ariel_Uni_API_security_challenge

[3]. https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/microservices
