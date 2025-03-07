<a id="readme-top"></a>


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/brandoncintron/cryptotrax_project">
    <img src="frontend/public/cryptotrax.png" alt="Logo" width="150" height="150">
  </a>

<h3 align="center">Cryptotrax</h3>

  <p align="center">
    A Personal Cryptocurrency Tracker
    <br />
    <br />
    <a href="https://cryptotrax.vercel.app/">View Demo</a>
    &middot;
    <a href="https://github.com/brandoncintron/cryptotrax_project/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/brandoncintron/cryptotrax_project/issues/new?labels=enhancement&template=feature-request---.md">Suggest Feature</a>
  </p>
</div>

### Built With

[![React][React.js]][React-url]&nbsp;&nbsp;[![Chakra UI][ChakraUI]][ChakraUI-url]&nbsp;&nbsp;[![Express][Express.js]][Express-url]&nbsp;&nbsp;[![MongoDB][MongoDB]][Mongo-url]&nbsp;&nbsp;[![Node.js][Node.js]][Node-url]

<!-- ABOUT THE PROJECT -->
## About The Project
Originally my Harvard CS50W capstone project, Cryptotrax has evolved as my first deployed portfolio project that utilizes MongoDB, Express, React, and Node.js. My goal for this project was to improve on API call efficiency, utilize session and local storage, and create an overall smooth UX. Overall, this project only calls an external API twice every 3 minutes for most of the data. Users can view cryptocurrency rankings, daily best performing cryptocurrencies, favorite and track their chosen cryptocurrencies, see in-depth cryptocurrency data, and view cryptocurrency related news. (For the purpose of this portfolio project, I used archived news articles.)

<!-- USAGE EXAMPLES -->
## Technical Overview

### **Cryptocurrency Data:**
- **CoinMarketCap API:**
  - Cryptotrax uses the CoinMarketCap API to retreive the entire rankings table (200 cryptos) in 1 api call and the 20 best performers (also in 1 api call) on homepage load.
  - Data is then stored in **session storage** for 3 minutes for efficient API utilization.
  - The only exception is when a user views a specific cryptocurrency page—if the data isn’t in session storage.

### **News Data:**
- Cryptotrax uses a local API to retrieve the archived news directly from **MongoDB**.

### **Favorites Data**
- The favorites data makes no API calls, and instead saves the users' favorites into **local storage** and then fetches from session storage.

### **Additional Features:**
- **Dark Mode:** Offers a visually comfortable interface for users.
- **Pagination & Search:** Enables efficient navigation and filtering through cryptocurrency tables, enhancing UX.

### **Backend:**
- Built with **MongoDB** and **Express**



<!-- CONTACT -->
## Contact

[![LinkedIn Badge](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/brandon-cintron-99311a187/)  [![Email Badge](https://img.shields.io/badge/Email-Contact-blue?style=flat&logo=gmail)](mailto:your.bcintron19@yahoo.com)


<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[Vite.js]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/
[MongoDB]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[Mongo-url]: https://www.mongodb.com/
[Express.js]: https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[ChakraUI]: https://img.shields.io/badge/Chakra%20UI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white
[ChakraUI-url]: https://chakra-ui.com/