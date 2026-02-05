# ucs-app-integration-pub-sub

A simple database synchronization prototype for college using Google PubSub

## How it Works

There are 2 AdonisJS APIs, each one responsible for one PostgreSQL database. In both databases there is a table User, so that when, I.E. API1 receives a request to delete, update or create an user, a PubSub message is published to the Topic both APIs listen to, and API2, that has not received the modification request, will be able to replicate the state of database1 to database2, based on the message provided by API1. This flow works both ways.

## Technologies used

- AdonisJS (Node + TypeScript)
- Google PubSub
- PostgreSQL
- Docker
