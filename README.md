# INSTALLATION INSTRUCTIONS
Open your Mac's terminal. Command + spacebar, search for 'Terminal', and open the first result.

Enter the following command

npm -v

into the terminal and hit enter. If the command is not found, please follow the instructions below for installing NPM and Node.

## NPM & Node installation
If you don't have NPM or Node.js you'll want to install the Node Version Manager. In the terminal, paste and run the following command:

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

If a popup window appears prompting you to install Xcode's command line developer tools, click the install button. If you need more help installing the Xcode command line tools, follow the link below. You can download these tools through the Apple Store, or manually if the Apple Store makes a fit about your OS version.
https://mac.install.guide/commandlinetools/

If you do not receive a popup but if the installation still fails with a message about needing Xcode, you'll still need to install the Xcode tools. Refer to the guide above. Once the command line tools are installed, close your terminal, re-open it, and run this command again to install the Node Version Manager (NVM). (Pasted again below.)

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

Once you successfully run the NVM installation command, run the following command to check your NVM version:

nvm -v

If the command is not recognized, you may need to close and force quit the terminal and re-open it to try again. If that still doesn't work, you may need to run the NVM installation script again, and this time look at the ouput to see if it recommends running a script. That script should look something like the following command. Run the recommended script, or the one below, and it should enable you to run the above command that checks the nvm version.

`export NVM_DIR="$HOME/.nvm" [ -s "$NVM_DIR/nvm.sh ] && \. "$NVM_DIR/nvm.sh"`

If at this point you are still unable to check your nvm version, follow the instructions found at this link: https://github.com/nvm-sh/nvm?tab=readme-ov-file#troubleshooting-on-macos

If the version check command works correctly you'll see a version number, meaning that you have NVM installed.

The next step is to get the correct versions of Node and NPM installed. Enter this command in the terminal:

nvm install 18.20.4

## Handling the ZIP
Once you've downloaded the ZIP file, use your Finder application to right-click the zip and select 'Open With' and then select 'Archive Utility'. This will create a new folder (now unzipped) in the same directory.

## Back in the Terminal
Once again using the terminal, navigate to the location of this newly created folder, likely inside your Downloads folder. Use this command to get to your Downloads folder.

cd Downloads/

Then you will need to cd into the name of the folder with

cd FOLDER_NAME_HERE

## Installing Node Modules
Now that you're in the root directory of the folder, run the following command to install the necessary dependencies needed to execute the code.

npm i

# GENERATING THE SITTERS.CSV
Once you've followed the installation instructions, enter the following command in your command line at the root directory:

npm run start

# RUNNING TESTS
Once you've followed the installation instructions, enter the following command in your command line at the root directory:

npm run test

# DISCUSSION QUESTION & ANSWER
Q: _Describe a technical implementation for the frontend you would use to display a list of sitters and their scores. How would the frontend manage state as users interact with a page?_

A: I'd choose React.js for the front-end framework. I would also use zustand for state management, providing a simple way for any particular component to update the front-end’s global store of sitters. This can help avoid potential complications from prop-drilling or tightly coupled components. If the website has a lot of globally-overlapping elements, like a menu bar, cookies alert, or notification banner, zustand would also help maintain a global state for ensuring these overlapping elements do not end up in inescapable or inaccessible situations. When it comes to the rest of the state management, I would prefer to use React’s built-in state hooks.<sup>1</sup> As for displaying a search result’s list of sitters and their scores, we first have to determine an effective pattern for loading the sitters from a back-end service. For live-reloading search results, the search bar should not send a sitters request on every keystroke: the fetch call should be “debounced” and wait for the user to pause their typing in order to ensure the API is not called an excessive number of times. The search results will be loaded from the API, stored in a state variable, and then the results will be rendered.<sup>2</sup> In order to ensure proper UI state while data is being loaded, a React Suspense component or additional state variables can be used to render a loading animation or placeholder content. A more detailed list of the functions used to carry this out might be as follows: SearchBarComponent has a debounced onUpdate function that calls an async APIHelperUtil function to load sitters data, the SearchBarComponent will receive a promise or pass in a callback function that will then call the global store’s setter function to update the list of sitters, and any component in the DOM tree that is using a getter function for the sitters will automatically update,<sup>3</sup> thereby rendering the search results in a possible SittersSearchResults component. The rendering of the search result’s sitters can include the standard values for each sitter: profile photo, name, average rating, etc, as specified by design. If the front-end provides a service for hiring and scheduling a sitter, zustand could also be used to maintain a grouping of state variables dedicated to the booking process. This booking process would need to utilize numerous API calls, but that might be outside the bounds of this question.

<sup>1</sup>: I’ve seen a few too many React projects using Redux when it wasn’t necessary, and in my opinion if you’re using a framework you should strive to develop patterns that utilize that framework’s core aspects.
<sup>2</sup>: rendered with the appropriate null/empty checks to ensure invalid data doesn’t end up in components or visible to the user.
<sup>3</sup>: zustand does not require any explicit observer model and instead will cause the component to rerender whenever one of the values defined in the getter is updated.

# Files Included

- index.ts : the file that is run by npm run start. It will output/replace the sitters.csv file.

- src/main.ts : the file that handles the CSV parsing, CSV output, and uses the classes to create and store a list of sitters and reviews in memory.
- src/rating.ts : the file that contains the Rating class.
- src/review.ts : the file that contains the Review class.
- src/sitter.ts : the file that contains the Sitter class.
- src/utils.ts : the file that contains util functions.

- test_csvs/ : the folder that contains CSVs useful for testing parsing and data errors.
- main.test.ts : the file that is run by npm run test. It contains all of the tests.

Misc Dev Files: these are configuration-related files that are not to be edited.
.gitignore
.nvmrc
.npmrc
eslint.config.mjs
jest.config.js
tsconfig.json
package-lock.json
package.json

# END OF CANDIDATE'S README, INITIAL README AS FOLLOWS

<hr>

# Rover Coding Project

Rover.com was destroyed in a terrible Amazon Web Services and GitHub accident!
Thankfully, no dogs were harmed, but we will have to rebuild our site using
data we retrieved from the Google search index. 

Your task is to recreate a search ranking algorithm and compute search
scores for our sitters.

# Requirements 

To recreate our search rankings, you'll create *a simple command-line program* that will read in and write out csv data. We ask that you also include tests that demonstrate your code is working as expected.

Additionally, there is a short **discussion question**
to answer (see below) about how you would build this system in the real
world.

Lastly, please include a README with instructions on how to setup and run your project
locally, as well as a copy of the output CSV you generate. Note that we are primarily Mac users. 

**Please use the language that you feel will best show your skills.** Keep in
mind that if you are brought for an in-person interview, you may be asked to continue
building upon this solution. Feel free to use whatever libraries or packages you wish. 

Finally, if you have any questions, don't hesitate to ask.

## Recreating the Search Ranking Algorithm
We were able to write a script and scrape the Google index for all of the
reviews customers have left for their stays with sitters. 

We have saved that information in the attached CSV.

Your command-line program should import the data to hold in memory (no need to use an actual database) and use it to recreate our search algorithm. At Rover, we write domain-driven code, so using an Object Oriented or other domain-centric approach will set you up for success in the in person interview. For example, one viable approach is modeling your data as if you were going to save it using a relational database.

If you are using a language that doesn't traditionally use an OO or domain-centric approach, please discuss this with the person who sent you this prompt in advance of beginning work, in order to have the best chance of success if you advance to the in person interview.

Here's how the search ranking algorithm will work:

- For each sitter, we first calculate a Profile Score and a Ratings Score.
  These are then used to calculate the overall Search Score, which is used for search rankings.

- The Profile Score is 5 times the fraction of the English alphabet comprised by the
  distinct letters in what we've recovered of the sitter's name. For example, the sitter name `Leilani R.` has 6 distinct letters.

- The Ratings Score is the average of their stay ratings.

- The Search Score is a weighted average of the Profile Score and Ratings
  Score. When a sitter has no stays, their Search Score is equal to the Profile Score. When a sitter has 10 or more
  stays, their Search Score is equal to the Ratings Score. The idea is that as a sitter gets more reviews, we will weigh the
  Ratings Score more heavily.

- Scores should contain exactly two decimal places.

## Output a list of Sitters

Your program should output a csv called `sitters.csv`, containing the following
columns:

* Sitter email (`email`)
* Sitter name (`name`)
* Profile Score (`profile_score`)
* Ratings Score (`ratings_score`)
* Search Score (`search_score`)

The csv should be sorted by Search Score (descending), sorting alphabetically on the
sitter name as a tie-breaker.

## Hint for Testing the Search Ranking Algorithm

Suppose there is a sitter whose Profile Score is 2.5 and who gets a rating of
5.0 with every stay. Then their Search Score should behave like this:

| Stay          | Search Score |
| ------------- | ------------- |
| 0 | 2.50
| 1 | 2.75
| 2 | 3.00
| 3 | 3.25
| 4 | 3.50
| 5 | 3.75
| 6 | 4.00
| 7 | 4.25
| 8 | 4.50
| 9 |  4.75
| 10 | 5.00
| 11 | 5.00
| 12 | 5.00

## Discussion Question

Imagine you are designing a Rover-like production web application based on the exercise you've just completed. The application will compute the search scores
for sitters, return a list of search results based on those scores, and display them to the user through a web UI. Please answer **ONE** of the following discussion questions about the approach you'd take:

- How would you adjust the calculation and storage of search scores in a production application?
- Describe a technical implementation for the frontend you would use to display a list of sitters and their scores. How would the frontend manage state as users interact with a page?
- What infrastructure choices might you make to build and host this project at scale? Suppose your web application must return fast search results with a peak of 10 searches per second. 
- Describe how you would approach API design for a backend service to provide sitter and rank data to a client/web frontend.

Write your answer in the README inside your project github repo. Please keep your answer concise, but provide as much detail as you feel is necessary; we're not looking for a thesis, just an understanding of how you think about solutions and how you convey your thoughts in the written word.

## When you're done with the project...

When you're done with the project, compress your project directory into a Zip file or similar, making sure to include the output file, `sitters.csv`. Then, reply to the email you received from us with your attachment.

# Evaluation 

### Checklist:
- [ ] Have you modeled the data ingested from the CSV in a way that would support storage in a relational database?
- [ ] Are Profile, Rating, and Search Scores computed correctly?
- [ ] Does the output file include all necessary columns, and is it in descending order based on Search Score? 
- [ ] Does the README include setup/running instructions (ideally for Mac)?
- [ ] Does the README include your answer to the Discussion Question?
- [ ] Have you included your CLI code, README, **and output file** in the Zip folder?
- [ ] Have you written tests to verify that your code is working as expected?

**Lastly:** The work you create here should be representative of code that we'd expect to
receive from you if you were hired tomorrow (proper abstractions, tests
for the scoring algorithm calculation, best practices, etc). 
