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

- Clone the project with your favorite git tool.
- Run "IQuiz.sln" inside the "IQuiz\IQuiz" folder.
- Once the project is loaded, press "Crtl+B" to build the project. The first time you do this, VS will automatically download and install all the needed dependencies. As such, this part of the process might take a few seconds. When done, you will see a message similar to this in your output console:
    "========== Build: 0 succeeded, 0 failed, 1 up-to-date, 0 skipped =========="
- Inside VS, press "Crt+Q" to activate the "find" function. Then type "Package Manager Console" and press Enter.

<img src="https://i.imgur.com/rjNoIz8.png"></img>

- Once up, type in "update-database" and press enter.
- When done, the package manager will produce the following output:
    Build started...
    Build succeeded.
    Done.

## Contact <a name="about"></a>

