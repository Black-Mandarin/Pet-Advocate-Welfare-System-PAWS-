[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---
  
# Pet-Advocate-Welfare-System 
<details>
  
<summary>Table of Contents</summary>

  
<ol>
  
<li>
  
<a href="#about-the-project">About The Project</a></li>
 
<ul>
  
<li><a href="#built-with">Built With</a></li>

<li><a href="#installation">Installation</a></li>

<li><a href="#license">License</a></li>
  
<li><a href="#contact">Contact</a></li>

<ul>
  
</ol>
  
</details>

## About The Project
 ![ProductScreen Shot](public/assets/product.png)

In this project, the aim was to create a Pet Booking system for a pet daycare centre. This booking system would be used by the staff of the pet daycare centre. The booking information includes the pet id allocated in the system, the pets name, the pet type, the owners name, dropoff and pickup dates, the fee, pet notes, the staff name and id assigned for caring and when the date of when the booking was created. The application allows a staff memeber to sign in or sign up. Once signed in they can access the homepage that displays all pet bookings. There is a personal page that will display the currently signed in staffs bookings where they have been allocated as a carer. There is a create booking page where the user can create a new booking. The application also has features that include editing and deleting bookings. Whenever a booking is created, edited or deleted an email will be sent to the companies email that is supplied when setting up this application. An email will also be sent to the companies email when a new user is signed up and the user signed up will also receive an email to their email showing their staff id. As the aim is to have a simple and efficient system to record and display vital information about pets who are staying as well as new customers, having a one-stop to see all the necessary information about their business is a must in compannies looking to optimise their time and efficiency.

 
 [Click Here to View Our Deployed Page](https://pet-advocate-welfare-system.herokuapp.com/)

 ## Homepage
 ![ProductScreen Shot](public/assets/product2.png)
 ## Booking Page 
 ![ProductScreen Shot](public/assets/product3.png)
 ## Personal Page
 ![ProductScreen Shot](public/assets/product4.png)
 ## Update Page
 ![ProductScreen Shot](public/assets/product5.png)


<p align = "right">(<a href="#top">back to top</a>)</>

## Built With

 * <img align= "left" alt= "nodejs icon" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>

 * <img align= "left" alt= "nodejs icon" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>

 * <img align= "left" alt= "nodejs icon" src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white"/>

 * <img align= "left" alt= "nodejs icon" src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white"/>

 * <img align= "left" alt= "nodejs icon" src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white"/>

 * <img align= "left" alt= "nodejs icon" src="https://img.shields.io/badge/Handlebars.js-f0772b?style=for-the-badge&logo=handlebarsdotjs&logoColor=black"/>
 * [dotenv](https://www.npmjs.com/package/dotenv) 
 * [body-parser](https://https://www.npmjs.com/package/body-parser)
 * [nodemailer](https://https://www.npmjs.com/package/nodemailer)
 * [bcrypt](https://www.npmjs.com/package/bcrypt)
 * [express-session](https://www.npmjs.com/package/express-session)
 * [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize)
  

<p align = "right"> (<a href="#top">back to top</a>)</>

## Getting Started

To get a local copy up and running follow these simple example steps.

## Installation

 1: The application will be invoked by using the following command:

 ```
  git clone git@github.com:Black-Mandarin/Pet-Advocate-Welfare-System-PAWS-.git
 ```

 2: Make sure that .env file has your DB password
 ```
 Please do not forget to write followings in .env file 
 (change the filename from .env.template to .env) 

 DB_NAME=blog_db
 DB_PASSWORD=
 DB_USER=root
 DB_SECRET=
 DB_EMAIL=
 DB_EMAIL_PASSWORD=
 ```

 3: Install npm packages
 ```
 npm i
 ``` 

 4: Run mysql and source db.schema.sql by using the following commands:
  ```
  mysql -u root -p
  ```
   (enter your mysql password)
  ```
  source db/schema.sql;
  ```

 5: Run seed files

 ```
 npm run seed
 ```

 6: Run to start the application
 ```
 npm start 
 ```

<p align="right">(<a href="#top">back to top</a>)</>

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Distributed under MIT License.

See LICENSE.txt for more information.

<p align = "right"> (<a href="#top">back to top</a>)</>

## Contact Us

PAWS Team: 
* [Sean Scott](https://github.com/seanscott95)
* [Ayako Woollan](https://github.com/ayacomputer)
* [Alan Cherian](https://github.com/Black-Mandarin)



Project Link: [https://github.com/Black-Mandarin/Pet-Advocate-Welfare-System-PAWS-](https://github.com/Black-Mandarin/Pet-Advocate-Welfare-System-PAWS-)

Heroku Link: [https://pet-advocate-welfare-system.herokuapp.com/](https://pet-advocate-welfare-system.herokuapp.com/)

<p align="right">(<a href="#top">back to top</a>)</>
