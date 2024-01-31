# DailyQuests

DailyQuests is a Vue.js project focused on managing tasks in a Kanban-style board. The tasks can be viewed in a Weekly and Monthly View and in the Done Tasks view. To manage tasks more efficiently, tasks can be set a doDate. This way, unlike in other To Do apps, it is possible to plan ahead better. Another feature improve planning is the display of public holidays. This project integrates with the Nager.Date public holiday API to fetch and display public holidays based on the selected year and country.

Tasks can be moved between the columns and the doDate is automatically updated. When tasks weren't done and the due dates are in the past, they will automatically be moved to the current date.

The initial Kanban Board was created with the tutorial https://www.youtube.com/watch?v=Z5Bo4FIMSO4

## Team Members

Rodler Hanna, Gomaa Rawan

## URL to live application

https://daily-quests.vercel.app/#/

## Project Setup

First, clone the repository and install dependencies:

```bash
npm install
```

### Compile and Hot-Reload for Development

To start the development server:

```bash
npm run dev
```

### Type-Check, Compile and Minify for Production

To build the project for production:

```bash
npm run build
```

### Lint with ESLint

To lint the project files:

```bash
npm run lint
```

## Fetching Public Holidays API

The application uses the Nager.Date public holiday API to fetch public holiday information. This is done via the `holidayService.js` service, which makes HTTP requests to the API.

### Using the Holiday Service

To fetch public holidays:

```javascript
import { fetchPublicHolidays } from '@/services/holidayService'

const holidays = await fetchPublicHolidays(countryCode, year)
```

This function can be integrated into Vuex actions to manage the application's state related to public holidays.

## Automated Testing

Automated tests are written using Jest and Vue Test Utils.

### Running Tests

To run all tests:

```bash
npm run test
```

### Writing Tests

Tests are located in the `tests` directory. They are structured to mirror the `src` directory, with unit tests for components and Vuex store modules.

#### Example Test

```javascript
// Example test in Task.spec.js
import { shallowMount } from '@vue/test-utils'
import Task from '@/components/Task.vue'

describe('Task.vue', () => {
  it('renders task content', () => {
    // Test implementation
  })
})
```

## Conclusion

DailyQuests provides a user-friendly interface to manage tasks and view public holidays. The project is designed to be scalable and maintainable, with a focus on clean code and robust testing.
