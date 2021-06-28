# Contributing

**The issue tracker is only for issue reporting or proposals/suggestions. If you have a question, you can find us in our [Discord Server](https://discord.gg/)**.

To contribute to this repository, feel free to create a new fork of the repository and submit a pull request. We highly suggest [ESLint](https://eslint.org) and [Prettier](https://prettier.io) to be installed in your text editor or IDE of your choice to ensure builds do not fail.

1. Fork, clone, and select the **main** branch.
2. Create a new branch in your fork.
3. Make your changes.
4. Ensure your linting and prettifying.
5. Commit your changes, and push them.
6. Submit a Pull Request [here](https://github.com/RealShadowNova/dominus/pulls)!

## Running Dominus Locally

To run Dominus locally a few steps should be taken.

1. Install [Node.JS](https://nodejs.org) and [Yarn](https://yarnpkg.com)
2. In the Discord Developer portal go to your application and then to the "Bot" menu.
3. Copy and paste the [`config.example.ts`](/src/config.example.ts) file in the `src` directory and rename it to `config.ts`.
4. Scroll down to `export const TOKENS = {`
5. At this section enter your own bot's API token at `BOT_TOKEN`.
6. Fill in any other API keys you have / want to fill in.
7. Install project dependencies with `yarn install`.
8. Start Dominus in development mode with `yarn dev`.

## Dominus Concept Guidelines

There a number of guidelines considered when receiving Pull Requests to be merged. _This is by no means an exhaustive list, but here are some things to consider before/while submitting your ideas._

- Dominus should never change Sapphire's or discord.js's default behavior. Dominus should only add to Sapphire and discord.js, and be as consistent as possible with them.
- Everything in Dominus should be generally useful for the majority of users. Don't let that stop you if you've got a good concept though, as your idea still might be a great addition.
- Everything should be shard compliant. If code you put in a Pull Request would break when sharding, break other things from supporting sharding, or is incompatible with sharding; then you will need to think of a way better way to make it work with sharding in mind before the Pull Request will be accepted and merged.
- Everything should follow [OOP Paradigms](https://en.wikipedia.org/wiki/Object-oriented_programming) and generally rely on behavior over state when possible. This generally helps methods be predictable, keeps the codebase simple and understandable, reduces code duplication through abstraction, and leads to efficiency and therefore scalability.
- Everything should follow our ESLint and Prettier rules as closely as possible, and should pass lint tests even if you must disable a rule for a single line.
- Everything should follow [Discord Bot Best Practices](https://github.com/meew0/discord-bot-best-practices)

## Credits

This guide is heavily based on the [Skyra Contributor Guide](https://github.com/skyra-project/skyra/blob/main/.github/CONTRIBUTING.md)
