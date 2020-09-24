# Chronos

Discord bot to automatically tweak slowmode to match the user activity in the channels.

## Getting started
It's very simple to get this bot up and running for development!

If you wish to contribute you should first fork the repo and clone that rather than the upstream.

If you're a little stuck about contributing may I suggest a great resource by [woojiahao](https://github.com/woojiahao) which can be viewed [here](https://woojiahao.github.io/git-guide/04-collaboration/)
```
$ git clone git@github.com:the-programmers-hangout/Chronos.git
$ npm install
$ npm start
```

## Deploying

You can run the bot locally using Docker.

1. Create `.env` using `create-env.sh`

    ```bash
    chmod +x ./create-env.sh
    bash ./create-env.sh
    ```

2. Run the bot with Docker Compose. `--build` is to be used when there are changes made to the bot and you want them to
   be reflected.

    ```bash
    docker-compose up [--build]
    ```

To take down the bot, you can run `docker-compose down` in the repository.

## Technologies

- Language - Javascript
- Library - Discord.JS
- Framework - discord-akairo
