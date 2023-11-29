# Contributing

The core developer team of Fleek Non-Fungible Apps welcomes all contributions from the community to achieve consistent code updates and enhancements.

If you want to help us improve the project you can always start a conversation through the [discussions page](https://github.com/fleekxyz/non-fungible-apps/discussions). Please, make sure you are respectful towards all members of the community. We take our open-source community seriously and hold ourselves and our contributors to high communication standards. If an issue is spotted, you can use the [issues page](https://github.com/fleekxyz/non-fungible-apps/issues).

## Getting Started

Contributions are made to this repository via Issues and Pull Requests (PRs). A few general guidelines that cover both:

1. Search for existing related Issues and PRs before creating your own.
2. Make sure you are clear about your ideas and expose as much information as you possibly can, as that can help the investigation process immensly. (e.g. code samples, images).
3. We work hard to handle and respond to all Issues as soon as possible, but it can take time to investigate root causes. Please be patient.

If you don't know where to start, you can take a look at the [Getting Started section on our wiki](https://github.com/fleekxyz/non-fungible-apps/wiki/%F0%9F%93%98-Getting-Started).

## Issues

The issues page is open to discuss any subject that is related to the project, such as code changes, feature requestes, potential enhancements, etc...

If you find any topic related to your subject, please feel free to post your story and provide any information you think might help.

## Pull Requests

All PRs are welcome. PRs are the fastest way to solve your issue. We are going to review all of them as fast as possible.

You can create branches from the `develop` branch and name them in accordance with **conventional
commits** [here](https://www.conventionalcommits.org/en/v1.0.0/), or follow the examples below:

```txt
test: adding missing tests
feat: a new feature
fix: a bug fix
chore: build process or auxiliary tool changes
docs: documentation only changes
refactor: code change that neither fixes a bug nor adds a feature
style: markup, white space, formatting, missing semi-colons...
```

Please ensure your code is clear and readable and provide as much information as you can in the description.

> ⚠️ Your code and any changes made need to be covered with tests

> ⚠️ In case of need, you have to provide all documentation changes within your PR

## Testing

This is a mono repo so testing will be dependent on the specific folder you are in.  Please refer to the readme, test folder, and package.json commands for the testing specifics in the directory you are working in.  Reegarding contract, this project has test suites both in Solidity and JavaScript. We use [Hardhat](https://hardhat.org/) and [Foundry](https://book.getfoundry.sh/) frameworks. It is mandatory for all tests to be well described to make the code consistent and secure. To get more information about this topic, check the [Testing section on our wiki](https://github.com/fleekxyz/non-fungible-apps/wiki/%F0%9F%93%98-Getting-Started#testing). You can also treat existing test suites as your inspiration. They are located at the [test folder](/contracts/test).

## Getting help

Join us at our [Discord Server](https://discord.gg/fleek). Let's build a great community together!
