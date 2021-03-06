# sim-core
Simulation framework for Smart and Secure Process Networks, in TypeScript

## Dependencies
aurelia-dependency-injection
aurelia-event-emittor
systemjs (for building and testing)

## Used By

* [Cryptographics Editor](https://github.com/cryptographix/cgfx-editor)

## Platform Support

This library can be used in the **browser** as well as on the **server**.

## Building The Code

To build the code, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. From the project folder, execute the following command:

  ```shell
  npm install
  ```
3. Ensure that [Gulp](http://gulpjs.com/) is installed. If you need to install it, use the following command:

  ```shell
  npm install -g gulp
  ```
4. You make need to install and configure jspm beforehand, this obtains the typescript defn files needed
to build successfully
  ```shell
  npm install -g jspm-cli
  jspm install -y
  ```
5. To build the code, you can now run:

  ```shell
  gulp build
  ```
6. You will find the compiled code in the `dist` folder, available in three module formats: AMD, CommonJS and ES6.
7. To run the tests, you can simply run:

  ```shell
  gulp test-node
  ```


