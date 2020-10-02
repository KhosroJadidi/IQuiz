# IQUIZ

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [About The Author](#about)

## About IQUIZ <a name = "about"></a>

IQUIZ is a simple quiz web application with full database support.
You can create an account and take a quiz. Upon finishing a session, your scores get submitted in the database. The app also features a top 10 feature that shows the top 10 scores gained by players. This list is dynamically updated.

## Getting Started <a name = "getting_started"></a>

Here we will go through the software that you will need to launch this project. Furthermore, som instructions for launching the project for the first time will be given.

### Prerequisites

Microsoft Visual Studio 2019

<a href="https://visualstudio.microsoft.com/vs/">
<img src="https://icons.iconarchive.com/icons/dakirby309/simply-styled/256/Microsoft-Visual-Studio-icon.png"></img>
</a>

### Installing

#### Microsoft Visual Studio 2019

Make sure that "ASP.NET and web development" is selected during the installation process.

<img src="https://i.imgur.com/IJe7UY1.png"></img>

#### IQUIZ
<br>
- Clone the project with your favorite git tool.
- Run "IQuiz.sln" inside the "IQuiz\IQuiz" folder.
- Once the project is loaded, press "Crtl+B" to build the project. The first time you do this, VS will automatically download and install all the needed dependencies. As such, this part of the process might take a few seconds. When done, you will see a message similar to this in your output console:
<br>
    "========== Build: 0 succeeded, 0 failed, 1 up-to-date, 0 skipped =========="
<br>
- Inside VS, press "Crt+Q" to activate the "find" function. Then type "Package Manager Console" and press Enter.
<br>
<img src="https://i.imgur.com/rjNoIz8.png"></img>
<br>
- Once up, type in "update-database" and press enter.
- When done, the package manager will produce the following output:
    Build started...
    Build succeeded.
    Done.
<br>
<img src="https://i.imgur.com/kiF4qqB.png"></img>
<br>
- -Run the project.
- A new instance of your web browser will be launched. It shows you the landing page for the web application.
- in the URL field of your browser window, append the following to your  existing URL address and press enter:
<br>
"ResetAndReseed/reset"
<br>
So, if the existing URL is:
<br> 
"http://localhost:53134/"
<br>
navigate to :
<br>
"http://localhost:53134/ResetAndReseed/reset"
<br>
After a few seconds, the following message will be displayed on :
<br>
"Everything that could have been reset has now been reset."
<br>
This message indicates that the database has now been reset and seeded with default data, which makes testing very easy!
It also adds a user to the database, that you can log in as and test the functionalities of the app.
<br>
user name: Khosro@Mail.com
password:1234
<br>
You may reset the database at any given time, by navigating to the same address.
<br>

## About The Author <a name = "about"></a>

