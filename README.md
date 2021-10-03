# Search App | TESODEV Case Study

Web application made for case-study in the interview process of [TESODEV](https://www.tesodev.com/).

## [Live Preview](https://tesodev-search.netlify.app/)
## Requirements
- `node v14.17.3`
- `npm 6.14.10` or `yarn 1.22.11`
## Setup
1. Install required packages by  
  `yarn` or `npm install`

2. Then start development server by  
  `yarn start` or `npm run start`  
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Features

### Search

- User can search a word in main page, first 3 matching display in the popup under search box.

- If there are matching results more than 3, `Show more` option is displayed, when clicked user is redirected to listing page to see all the results.

- If there is no matching result `No record found..` text displayed to inform the user.

- Listing page uses **query parameters**, so user can share his/her search results by sending link.

- Pagination will be present in the listing page.
### Add new record

- You can add new records to database.

- Form inputs are validated with following criterias:  
  - Name Surname (only letters, min 4 – max 60 character)
  - Country (only letters, min 2 – max 40 character)
  - City (only letters, min 2 – max 40 character)
  - Email (basic email validation)

- Error messages displayed in the related input field.

- User can't submit form if validation fails.

### Fake Database

- Uses **localStorage** to imitiate database services with mockData.