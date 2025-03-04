# DETECTION-AND-MITIGATION-DDOS-IN-HYBRID-CLOUD-USING-ML-DL
**Project members**
+ Phạm Công Lập (Clap)
+ Nguyễn Trần Trung Nguyên
+ Lương Hồ Trọng Nghĩa
  
Application Layer in OSI Model

There are three main types of clouds: private cloud, public cloud, and hybrid cloud.

+ private cloud: Controlled and created within a business.

+ public cloud: Controlled by the company providing cloud services, usually a business that sells cloud services.

+ hybrid cloud: A combination of both public and private cloud

## HOW TO RUN THIS PROJECT
### In this project we use python 3.8 (3.8.10), os: windows, machine learning: random forest, svm.

If you do not want to use python 3.8, you can use another version of python, then go here to modify the version.

**__But the best way to avoid library and code conflicts is to use libraries like ours in this project__**

<p align="center">
  <img alt="config_py_version" src="https://github.com/Clapboiz/Detection-and-Mitigation-Web-Attack-in-Hybrid-Cloud-using-ML-DL/assets/112185647/5e913458-c7eb-4dba-a2de-00f330a2e35a">
</p>

<p align="center">
  Figure 1: Config python version
</p>

Here is an example if you want to change version

<p align="center">
  <img alt="example_config_py_version" src="https://github.com/Clapboiz/Detection-and-Mitigation-Web-Attack-in-Hybrid-Cloud-using-ML-DL/assets/112185647/8a17a6d1-d285-4d01-aba4-23aeeae99f85">
</p>

<p align="center">
  Figure 2: Example to config python version
</p>

You must download the dataset in Datasets/about.md, in this file there will be a link to the original dataset for you to download.

To run this project you must download the necessary libraries for python

<p align="center">
  <img alt="Project_architerture" src="https://github.com/Clapboiz/Detection-and-Mitigation-Web-Attack-in-Hybrid-Cloud-using-ML-DL/assets/112185647/3b13e42b-b000-4b52-9e9e-f389241d7a85">
</p>

<p align="center">
  Figure 3: Python libraries required to run this project
</p>

You must download all the libraries as shown in the picture. To avoid library conflicts, please go to our Requirements.txt file to view.

After you download all the above libraries, we proceed to the next step

```
cd web
```
```
npm install
```
```
.\run.bat (powershell)
  or
run.bat (command prompt)
```

**Then open your browser and access:** ```http://localhost:4000/```

<p align="center">
  <img alt="ui_website" src="https://github.com/Clapboiz/Detection-and-Mitigation-Web-Attack-in-Hybrid-Cloud-using-ML-DL/assets/112185647/7c6ded61-abd3-4c9f-8a06-b35b3f4e3700">
</p>

<p align="center">
  Figure 4: UI of web attack detection
</p>

Then go to the predict.txt file to get a benign or malware example to enter for machine detection

<p align="center">
  <img alt="request_benign" src="https://github.com/Clapboiz/Detection-and-Mitigation-Web-Attack-in-Hybrid-Cloud-using-ML-DL/assets/112185647/c771097a-4d14-422b-9a66-94f3fdd6d02a">
</p>

<p align="center">
  Figure 5: Your request is benign
</p>

After you press the predict button, the machine will predict for you whether the result of this request is malware or benign

If your request is benign then when you click ok it will forward you to our website, if your request is malware it will block you

when you click ok then it will forward you to the main website

<p align="center">
  <img alt="your_website" src="https://github.com/Clapboiz/Detection-and-Mitigation-Web-Attack-in-Hybrid-Cloud-using-ML-DL/assets/112185647/ac351c70-5c02-4149-b5c7-538f8d0b2417">
</p>

<p align="center">
  Figure 6: Your website
</p>

We do use authentication and authorization for this site, you can see this in our code

You can create a new user account

And now I will provide you with 2 user and admin accounts so you can test

This is the user's account
```
user
123123
```

This is the admin's account
```
admin
123123
```

<p align="center">
  <img alt="user_web" src="https://github.com/Clapboiz/Detection-and-Mitigation-Web-Attack-in-Hybrid-Cloud-using-ML-DL/assets/112185647/06a87c15-4bf9-4851-84eb-d79c004c52c6">
</p>

<p align="center">
  Figure 7: User's website
</p>

<p align="center">
  <img alt="admin_web" src="https://github.com/Clapboiz/Detection-and-Mitigation-Web-Attack-in-Hybrid-Cloud-using-ML-DL/assets/112185647/7b30317e-52d2-4c6e-904c-7f5df2246128">
</p>

<p align="center">
  Figure 8: Admin's website
</p>

## ARCHITECTURE OF PROJECT
<p align="center">
  <img alt="Project_architerture" src="https://github.com/Clapboiz/Detection-and-Mitigation-Web-Attack-in-Hybrid-Cloud-using-ML-DL/assets/112185647/5804f521-a757-4e05-a465-78f9f0781fd3">
</p>

<p align="center">
  Figure 9: Project architecture
</p>

## REFERENCES

[1]. S. Kautish, R. A and A. Vidyarthi, "SDMTA: Attack Detection and Mitigation Mechanism for DDoS Vulnerabilities in Hybrid Cloud Environment," in IEEE Transactions on Industrial Informatics, vol. 18, no. 9, pp. 6455-6463, Sept. 2022, doi: 10.1109/TII.2022.3146290.

[2]. Lavian, S., & Ariel University, Ariel Cyber Innovation Center (ACIC). (2023). The API Traffic Research Dataset Framework (ATRDF) [Data set]. https://github.com/ArielCyber/Cisco_Ariel_Uni_API_security_challenge

[3]. https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/microservices

[4]. https://github.com/mandar196/Fake_News_Classifier_NLP
