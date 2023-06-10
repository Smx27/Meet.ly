# Description
 Meetly is a straightforward social media app built on the Angular 14 framework for the frontend and .NET Core 7 for the backend. It aims to provide users with a platform to connect and interact with others in a user-friendly and intuitive manner.

# Installation
Copy this code create a file name `install.sh`.
```
#!/bin/bash

# Install dotnet sdk 7.0.5
curl -sS https://dotnetcli.azurewebsites.net/dotnet-install.sh | bash

# Install node version 16.20.0
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash - &&\
sudo apt-get install -y nodejs

# Install angular 14.2.0
sudo npm install -g @angular/cli@14
```

To use this script, save it as a file with a .sh extension, and then run it using the following command:

```
bash install.sh
```

This script will download and install the latest versions of dotnet sdk, node, and angular. Once the installation is complete, you can start using these tools to develop your applications.

Here are some additional details about the commands that are used in this script:

* The `curl` command is used to download a file from a URL. In this case, it is used to download the dotnet sdk installer.
* The `bash` command is used to execute a bash script. In this case, it is used to execute the dotnet sdk installer.
* The `sudo` command is used to run a command with elevated privileges. In this case, it is used to install node and angular.
* The `npm` command is used to install Node Package Manager (npm) packages. In this case, it is used to install the angular CLI.


# Features:

* User Registration and Authentication: Meetly allows users to create accounts by registering with their email or through social media authentication. It ensures secure access to the app's features and maintains user privacy.

* User Profiles: Each user has a profile where they can add personal information, such as profile pictures, a bio, and contact details. Users can customize their profiles to reflect their personality and interests.

* News Feed: The app features a news feed where users can view posts and updates from their connections. Users can like, comment on, and share posts, fostering engagement and interaction among the community.

* Friend Connections: Meetly enables users to send friend requests to connect with others on the platform. Once connected, users can view each other's profiles, send private messages, and stay updated on their activities.

* Notifications: The app notifies users about various activities, such as friend requests, likes, comments, and new messages. These notifications help users stay informed and engaged with the app's content.

* Direct Messaging: Meetly provides a messaging system that allows users to communicate with their friends privately. Users can send text messages, share media files, and have group conversations, facilitating easy and convenient communication.

* Search and Discover: The app includes a search feature that enables users to find other users based on their names, interests, or other criteria. This helps users discover and connect with like-minded individuals within the community.

* Privacy and Security: Meetly prioritizes the privacy and security of its users. It implements measures to protect user data and offers options to control the visibility of profiles, posts, and personal information.

* Notifications and Settings: Users can customize their notification preferences and adjust various settings to personalize their Meetly experience. This includes options for email notifications, privacy settings, and account management.

Overall, Meetly is a user-friendly social media app built on Angular 14 and .NET Core 7. It offers essential features such as user profiles, news feeds, friend connections, direct messaging, and search functionality, providing a platform for users to connect, share, and interact with others in a safe and engaging manner.
