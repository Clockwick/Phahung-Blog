# `chan-chara` 👴👵

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![code lint: eslint](https://img.shields.io/badge/code_linter-eslint-blueviolet.svg)](https://github.com/eslint/eslint)

| Packages                           | Description               |
| ---------------------------------- | ------------------------- |
| 💻 **Apps**                        |
| `@chan-chala/chan-chara-app`       | Chan Chara frontend       |
| `@chan-chala/chan-chara-admin-app` | Chan Chara Admin frontend |
| 💻 **Configs**                     |
| `@chan-chala/eslint-config`        | Eslint config             |
| `@chan-chala/prettier-config`      | Prettier config           |
| 💻 **UI**                          |
| `@chan-chala/uikit`                | React Storybook UIkit     |

## Getting Started

### Installation

1. Clone repo
   ```sh
   git clone git@git.everythink.dev:tamsang-tamsong/chan-chara/chan-chara-frontend.git
   ```
2. Install package
   ```sh
   yarn install
   ```

### Development

- @chan-chala/chan-chara-app
  ```sh
  yarn start:chan-chara-app
  ```
- @chan-chala/chan-chara-admin-app
  ```sh
  yarn start:chan-chara-admin-app
  ```
- @chan-chala/uikit
  ```sh
  yarn start:uikit
  ```

### Deployment

- Builds the app for production to the `dist` folder.
  ```sh
  yarn build
  ```

## Project structure

```
  .
  ├── ...
  ├── packages
  │   ├── apps                # chan-chala apps
  │   │   ├── chan-chara
  │   │   │   ├── dist        # production app
  │   │   │   ├── src         # source code
  │   │   │   └── ...
  │   │   └── ...
  │   └── ...
  └── ...
```
