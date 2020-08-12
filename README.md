# smartpost-kiosk

Kiosk UI for package(mail) management system. Kiosk is integrated with a locker (serial board) that controls the locks on the mailbox slots.

## Who will use
* customers - for dropoff
* customers - for pickup
* curiers   - for dropoff

## Getting Started

You will have to have a server component that has the following API endpoints
1. POST '/api/drop-off/scan-label'
2. GET '/api/slots'
3. PUT '/api/slots/{id}/allocate'
4. POST '/api/slots/{id}/release'
5. POST  '/api/pickup/scan-code'

### Prerequisites

* USB controlled lock that supports RS485 comunication interface

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.0

## Contributing

🤷 submit pull requests.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/pickup-kiosk/tags). 

## Authors

* **Odain Chevannes** - *Initial work* - HTML from webflow

See also the list of [contributors](https://github.com/pickup-kiosk/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

Hat tip to
* [simple-keyboard](https://github.com/hodgef/simple-keyboard) for really easy on-screen keyboard
* [serialport](https://github.com/serialport/node-serialport) for usb commands


