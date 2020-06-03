
# 📦 dependency-logs-nest // @thefirstspine/logs-nest

Built on top of <https://github.com/thefirstspine/dependency-logs|@thefirstspine/logs>. Provides Nest services.

## Install

```bash
npm i @thefirstspine/logs-nest@latest
```

## Configuration

The configuration is the same as <https://github.com/thefirstspine/dependency-logs|@thefirstspine/logs> module.

## Documentation

### LogsService

Main service to handle the logs in the TFS Platform.

#### info

Log an information message. An information is has only a purpose for debugging.

**Synopsis:** `info(message: string, data?: any): void`

**Params:**

- `message: string` The message to log.
- `data?: any` The data about the log (context for instance).

#### warning

Log a warning. A warning is an unexpected behavior that occurs in the platform, but handled properly.

**Synopsis:** `warning(message: string, data?: any): void`

**Params:**

- `message: string` The message to log.
- `data?: any` The data about the log (context for instance).

#### error

Log an error. An error should be treated immediatly because this is an unexpected and not handled behavior.

**Synopsis:** `error(message: string, data?: any): void`

**Params:**

- `message: string` The message to log.
- `data?: any` The data about the log (context for instance).

## How to use

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Publish on NPM

```bash
npm publish
```

## License

TFS Platform is NOT licensed. You are free to download, view, run the repository. You are NOT allowed to redistribute this project for both commercial and non-commercial use. Deal with it.
