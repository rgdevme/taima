# taima

Taima is Condor's internal time tracking assistant.

It aims to reduce logging time, actively engage the user to reduce mistakes, and motivate them to track their time.

## Environment

Node: > 20
Package manager: NPM

## Technologies

| Area     | Technology                                                            | Description                                      |
| -------- | --------------------------------------------------------------------- | ------------------------------------------------ |
| Repo     | [TypeScript](https://www.typescriptlang.org/)                         | Typing                                           |
|          | [Parcel](https://parceljs.org/)                                       | Problem free bundling                            |
|          | [Storybook](https://storybook.js.org/)                                | Documentation and components building            |
| Server   | [Express.js](https://expressjs.com/)                                  | Run a local server to handle requests            |
|          | Cors, BodyParser, Axios                                               | Handle and make requests with json formated data |
| API      | [ClickUp](https://clickup.com/api/)                                   | Retrieve and save time entries                   |
| Frontend | [Electron.js](https://www.electronjs.org/)                            | Wrap the app to run it at system level           |
|          | [React.js](https://react.dev/)                                        | UI framework                                     |
|          | [Mantine](https://mantine.dev/)                                       | Production ready UI components & hooks           |
|          | [Tailwind](https://tailwindcss.com/) + [Emotion](https://emotion.sh/) | Styling                                          |

## Branch strategy

- `main` can only updated through PRs from `hotfix/` and `release/` branches.
- `dev` can only be updated through PRs from `hotfix/` and `feature/` branches.
- `dev` must always be functional and deployable.
- `hotfix/` must branch from `main` to fix critical bugs.
- `feature/` must branch from `dev` when developing new features.
- `release/` must branch from `dev` when a required set of features is completely developed and functioning in dev.
- `release/` branch can only accept direct changes to fix bugs.
- `release/` & `hotfix/` branches must be tagged.

![Example](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*G2z5FjDvIsQRfKvM.png)

## PR Strategy

Merging code through PRs (pull requests or merge requests) is an effective way to code review your peers, inform yourself about the project status, and learn different ways to write the same code. It is a dev's qa tool, as much as a learning tool.

When making a PR, we use the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard. The author and the assignee of the PR must be different.

A PR message should look something like:

```
type (scope): title
```

For example:

```
feat (tracking): add tracking components for current view
```

Its description should include a more elaborate explanation of what's been done and why.

## Documentation

For each component file a [file].stories.tsx must be written following the [Component Story Format](https://storybook.js.org/docs/api/csf).

This allow us to review and test components in an isolated environment.
