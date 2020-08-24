---
slug: notes-egghead-cli-tooling-oclif-ts
date: 2020-08-24
title: 'Notes from Build Custom CLI Tooling with oclif and TypeScript course'
description: 'Build Custom CLI Tooling with oclif and TypeScript'
published: true
banner: './banner.png'
---

## Build Custom CLI Tooling with oclif and TypeScript

You can check out the course here: [Build Custom CLI Tooling with oclif and TypeScript](https://egghead.io/courses/build-custom-cli-tooling-with-oclif-and-typescript?af=6p5abz)

[Oclif](https://github.com/oclif/oclif) can be used to easily create CLI tools

Two types of commands:

-   single command
-   multi command

In order to test CLIs locally you can quickly create a `yarn workspace` to call e.g. `yarn mycli init`

You can use a VSCode debugger with `node --inspect-brk ./bin/run init`. You can also use watch expressions in VSCode.

Oclif supports debugging by default: e.g. `DEBUG=* mycommand` / `DEBUG=mycli yarn mycli`. Add `debug` module in order to get a better debugging experience (it's basically a better `console.log`)

[Enquirer](https://github.com/enquirer/enquirer) package allows us to ask all kinds of questions to our users via CLI prompts (even surveys!)

[Cosmiconfig](https://github.com/davidtheclark/cosmiconfig) is an easy way to enable `package.json`/`mycli.rc` and other ways of providing configuration to your cli:

> By default, Cosmiconfig will start where you tell it to start and search up the directory tree for the following:
>
> -   a package.json property
> -   a JSON or YAML, extensionless "rc file"
> -   an "rc file" with the extensions .json, .yaml, .yml, .js, or .cjs
> -   a .config.js or .config.cjs CommonJS module

[copy-template-dir](https://github.com/yoshuawuyts/copy-template-dir) can be used to scaffold projects from templates.
Just create a template directory and copy it over like this:

```ts
const vars = { projectName: name };
const inDir = path.resolve(__dirname, '../templates/template-jquery');
const outDir = path.join(process.cwd(), name);

copy(inDir, outDir, vars, (err: Error, createdFiles: String[]) => {
    if (err) throw err;
    createdFiles.forEach(filePath => console.log(`Created ${filePath}`));
    console.log('done!');
});
```

`"name": "{{projectName}}",` - we can also use `{{}}` in order to inject strings into the templates

[execa](https://github.com/sindresorhus/execa) can be used to execute child processes:

```
This package improves `child_process` methods with:

Promise interface.
Strips the final newline from the output so you don't have to do stdout.trim().
Supports shebang binaries cross-platform.
Improved Windows support.
Higher max buffer. 100 MB instead of 200 KB.
Executes locally installed binaries by name.
Cleans up spawned processes when the parent process dies.
Get interleaved output from stdout and stderr similar to what is printed on the terminal. (Async only)
Can specify file and arguments as a single string without a shell
More descriptive errors.
```
