# WEB103 Project 4 - BOLT BUCKET

Submitted by: Joshua Holguin

About this web app: Custom Car Builder is a full-stack web app that allows users to customize their own car by selecting different options such as exterior color, wheels, roof, and interior. The total price updates dynamically as users make their selections, and they can save, view, edit, or delete their custom builds. The project uses React on the frontend and Node.js + Express + PostgreSQL on the backend.

Time spent: 20 hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->
- ✅ **The web app uses React to display data from the API.**
- ✅ **The web app is connected to a PostgreSQL database, with an appropriately structured `CustomItem` table.**
  - ✅  **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - ✅  **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**
- ✅ **Users can view **multiple** features of the `CustomItem` (e.g. car) they can customize, (e.g. wheels, exterior, etc.)**
- ✅ **Each customizable feature has multiple options to choose from (e.g. exterior could be red, blue, black, etc.)**
- ✅ **On selecting each option, the displayed visual icon for the `CustomItem` updates to match the option the user chose.**
- ✅ **The price of the `CustomItem` (e.g. car) changes dynamically as different options are selected *OR* The app displays the total price of all features.**
- ✅ **The visual interface changes in response to at least one customizable feature.**
- ✅ **The user can submit their choices to save the item to the list of created `CustomItem`s.**
- ✅ **If a user submits a feature combo that is impossible, they should receive an appropriate error message and the item should not be saved to the database.**
- ✅ **Users can view a list of all submitted `CustomItem`s.**
- ✅ **Users can edit a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- ✅ **Users can delete a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- ✅ **Users can update or delete `CustomItem`s that have been created from the detail page.**

## Video Walkthrough

![BoltBucket](https://github.com/user-attachments/assets/686a1c84-ddbf-4b07-b4f8-5850399fe700)



## Notes

- One challenge was making sure the image URLs stored in the database were returned in camelCase so they matched the frontend property names. This was solved by aliasing column names in SQL queries (e.g. exteriorimage AS "exteriorImage").
- Another challenge was setting up Render’s Postgres database and connecting it correctly with environment variables.
- Dynamic price calculation and updating the preview image required careful React state management.
## License

Copyright 2025 Joshua Holguin

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
