# Tsismis (Gossip)

Here is a working 
[DEMO](https://tsismis.dionaguilar.com) that you could visit. Please be responsible enough not to post or exhaust the demo server.

## Description

This project is a React TypeScript application built using Vite, aiming to provide users with a platform to create and share gossips, along with features for account creation and management.

## Features

- **Gossip Creation**: Users can create gossips to share with others.
- **Gossip Browsing**: Users can browse and check out gossips created by others.
- **Account Creation**: Users can create an account to access additional features.
- **Registration**: Users can register their accounts for personalized experiences.

## Key Features

- **Lazy Loading**: Utilizes lazy loading to enhance performance by loading components only when needed.
- **API Integration**: Connects to a backend API, allowing seamless communication for data retrieval and storage.
- **Proper Routing**: Implements proper routing practices to ensure smooth navigation and bookmarking within the application.
- **Observes Code Structure**: Follows a structured code organization to enhance readability, maintainability, and scalability.

## Missing or To-Follow Work

- **Unit Testing**: Implementation of unit tests to ensure code reliability and maintainability.
- **Notifications**: Integrate notifications system to alert users about relevant activities.
- **Follow and Unfollow**: Implement functionality for users to follow and unfollow each other.

## Requirements

- Node.js version 20.12.1 or higher

## Installation

1. Clone the repository:

```
git clone https://github.com/diontristen/tsismis-fe
```

2. Install dependencies:

```
cd tsismis-fe
npm install
```
3. Create an .env file to your root directory
```
VITE_PORT=5000 // PORT NUMBER
VITE_APP_API=http://localhost:5001
```

4. Start the development server:

```
npm run dev
```

If we are using a windows and linux and encountered this issue
```
Error: Cannot find module @rollup/rollup-linux-x64-gnu. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). Please try `npm i` again after removing both package-lock.json and node_modules directory.
```
You would need to remove `package-lock.json` as I initially built this in a mac OS m1 machine
```
rm -rf node_modules
rm -rf package-lock.json

npm install
```


##OR##
### Using Docker
1. Clone the repository
```
git clone https://github.com/diontristen/tsismis-fe
```
2. Navigate to the project directory:
```
cd tsismis-fe
```
3. Build and run the docker container
```
docker-compose up
```
4. Access the app http://localhost:5000

**Note: Adjust the ports in the Dockerfile and docker-compose.yaml relative to your liking

## Usage

1. Access the application through the provided URL.
2. Sign up for an account or log in if already registered.
3. Explore the features to create gossips, browse gossips, and manage your account.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/improvement`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin feature/improvement`).
6. Create a new Pull Request.

---

**Note:** This project is connected with a backend repository hosted at [https://github.com/diontristen/tsismis-be](https://github.com/diontristen/tsismis-be).
