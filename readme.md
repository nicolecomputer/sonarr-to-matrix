# Sonarr to Matrix

This takes webhook pushes from Sonarr and sends them to matrix. It's meant to be run in a trusted environemnt, in docker, and does no validation of the data from Sonarr.

## Getting started for development and local use

- Install node modules `yarn install`
- Copy the env file `cp .env.example .env`
- Edit the env file with your values for matrix
- Start the server: `yarn start`
