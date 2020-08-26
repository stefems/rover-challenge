# Rover Coding Project

Rover.com was destroyed in a terrible Amazon Web Services and GitHub accident!
Thankfully, no dogs were harmed, but we will have to rebuild our site using
data we retrieved from the Google search index. 

Your task is to recreate a search ranking algorithm and compute search
scores for our sitters.

You'll do this by writing *a simple command-line program* that can be run
locally and that will input and output csv data.

Once you've finished your program, there is a short *discussion question*
to answer (see below) about how you would build this system in the real
world.

**Please use the language that you feel will best show your skills. Keep in
mind that if you are brought for an in-person interview, you will continue
building upon this solution. Don't use this project as an opportunity to learn
a new language; use what you know best so that you set yourself up for
success.**

The work you create here should be representative of code that we'd expect to
receive from you if you were hired tomorrow (proper abstractions, tests
for the scoring algorithm calculation, best practices, etc). 

Please include a README with instructions on how to setup and run your project
locally. 

Finally, if you have any questions, don't hesitate to ask.

### When you're done with the project...

When you're done with the project, push your work back into the repo. Then,
reply to the email you received from us letting us know you've pushed your
project.

## Rebuilding Sitter and Stay data

We were able to write a script and scrape the Google index for all of the
reviews customers have left for their stays with sitters.

We have saved that information in the attached CSV.

Your command-line program should import the data for Sitters and Stays to hold
in memory to use in the next step (Recreating the Search Ranking Algorithm).

You don't need to store the data in a database - save that for the discussion
question! 

## Recreating the Search Ranking Algorithm

Here's how the search ranking algorithm will work:

- For each sitter, we first calculate a Profile Score and a Ratings Score.
  These are then used to calculate the overall Search Score.

- Profile Score is 5 times the fraction of the English alphabet comprised by the
  distinct letters in what we've recovered of the sitter's name.

- Ratings Score is the average of their stay ratings.

- The Search Score is a weighted average of the Profile Score and Ratings
  Score, weighted by the number of stays. When a sitter has no stays, their
  Search Score is equal to the Profile Score. When a sitter has 10 or more
  stays, their Search Score is equal to the Ratings Score.

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

## Discussion Question

Imagine you are designing a production web application to compute the search scores
for sitters and to return a list of sitters for search results. How would you
do it?

Write your answer in a README inside your project github repo. Your answer
should be no more than a couple of paragraphs.

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
