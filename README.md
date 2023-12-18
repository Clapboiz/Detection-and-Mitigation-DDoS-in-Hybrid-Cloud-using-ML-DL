# Detection-and-Mitigation-DDoS-in-Hybrid-Cloud-using-ML-DL
Application Layer in OSI Model

There are three main types of clouds: private cloud, public cloud, and hybrid cloud.

+ private cloud: Controlled and created within a business.

+ public cloud: Controlled by the company providing cloud services, usually a business that sells cloud services.

+ hybrid cloud: A combination of both public and private cloud

### Architecture of project
![Alt text](Architecture.png)

# Implementation

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
