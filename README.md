# Rover Coding Project

Rover.com was destroyed in a terrible Amazon and GitHub accident.  Thankfully, no dogs were harmed, but we have to rebuild our site using data we retrieved from the Google search index.  We'd like to:

- Rebuild our sitter profiles and user accounts.
- Recreate a search ranking algorithm
- Build an appealing search results page

You can use any language and frameworks you’d like to complete this project, but we'll best be able to evaluate your project if you write it using Django or Rails. 

The work you create here should be representative of code that we'd expect to receive from you if you were hired tomorrow.  Our expectation is that you’ll write production quality code including tests.

This is not a trick project, so if you have any questions, don’t hesitate to ask.

## Rebuilding Profiles

We were able to write a script and scrape the Google index for all of the reviews customers have left of sitters.  We have saved that information in the attached .csv file. Design a database schema and import the provided data.

## Recreating the Search Ranking Algorithm

We need to recreate the ranking of sitters when they are displayed on the site.  Here’s the algorithm we use to rank sitters:

- For each sitter, we calculate Overall Sitter Rank.
- Overall Sitter Rank is a weighted combination of the Sitter Score and Ratings Score.
- Sitter Score is 5 times the percentage of the English alphabet that occurs in their first and last names.
- Ratings Score is the average of their stay ratings.
- When a sitter has no stays, their Overall Sitter Rank is equal to the Sitter Score.  When a sitter has 10 or more stays, their Overall Sitter Rank is equal to the Ratings Score.  When a sitter has 1 to 9 stays, then we transition from one score to the other by weighting the two scores by the number of stays, discounting the Sitter Score and increasing the Ratings Score.

## Building a Sitter List

We need to display the sitters on a page in order of rank.  This should be easy, simply render a list of sitters.  Each row should display one sitter with their name, photo and the average of their stay ratings.

## Filtering Sitters

Finally, we need to allow customers to filter out sitters on the page with poor average stay ratings.  Without making another request to the server, allow users to filter out sitters whose average ratings is below a user specified value.  It’s okay to use UI controls &mdash; sliders, checkboxes, etc &mdash; that limit the values users can enter.
