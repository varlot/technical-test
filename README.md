If you want to apply as a software engineer at Lalilo you are in the right spot!

<img src="https://s3-us-west-2.amazonaws.com/assets.lalilo.com/large_8149976d-a679-4c26-9d00-a464aa04cea4.jpg" width="500" height="332" alt="_DSC4652"></a>

# Your mission if you accept it...

Lalilo aims to give the most relevant exercises for children using our platform, so that each student can learn at the right pace.

To achieve this, our exercise choice algorithm must take into account pedagogical rules, students progress, and other domain-related constraints.

The goal of this technical test is to implement a simplified version of this algorithm.

## Problem definition

You should write a function that, given a student and her history, returns the next activity:

`function getMostRelevantActivity(student: Student) => activityId: number`

An **activity** is defined with the following attributes:

- `id`: A unique identifier (integer)

- `language`: The language of the exercise’s content. `FR` or `EN`

- `exercise_type`: The type of exercise such as: `complete_sentence` (fill an incomplete sentence that is read to the student given a few choices), `independent_reading` (read a book and answer comprehension questions), ...

- `skill`: The subject of the exercise. It can be a sound, a letter, a sight word etc...

- `level`: 0 is an easy exercise, 1 a bit harder, …

`activities.json` contains the list of all the activities available.

A **student** is defined by:

- `language`: the student’s working language. A student learning french will have the `FR` value.

- `traces`: A list of traces corresponding to the activities the student previously finished. Traces are chronologically ordered, the first one in the array being the latest. Each trace contains:

  - `activity_id`: An activity id.

  - `score`: The student's score for this exercise. If an exercise contains 4 questions and the student is right only for the first one, this score will be 0.25.

This test is split in a few levels. For each level, a new constraint is added to the choice algorithm.

You should start at level 1 and work your way up to higher levels. We expect you to work a couple of hours maximum on this exercise. You can propose unfinished work.

### Level 1: Simple progression

For now, we'll just follow the default exercises progression.

- _If a student answered perfectly to the last exercise, the next activity is the next one in the activities file._
- _Otherwise, try to find another activity with a lower level._
- _If it doesn’t exist, return the activity of the last finished exercise._

### Level 2: Avoid repetitions

Giving the same exercise many times in a row is not a good way to keep students engaged.

_Make sure a student never gets a given exercise_type twice in a row.
If no activity matches this constraint, ignore it and fallback to the level 1 algorithm_

### Level 3: Handling microphones

Some exercises require a microphone but some users don't have a microphone.

A new property in student objects now tells you if the student has a microphone or not.

_Make sure only students with a microphone can get an exercise with the `reading` template name. If no activity matches this constraint, throw an exception. This rule should be a priority over all other rules_

### Level 4: Discoveries

Lalilo now has discovery activities. They allow students to discover new letters, sounds or words they never worked on.

- Discovery activities only exist on activities which exercise_type is `discovery_generativity`, `discovery_grapheme_to_phoneme` or `discovery_sight_word`.
- Some skills have no discovery.
- Discoveries always result in a trace with a 1 score.

_When a student works for the first time on a given skill, make sure that, if this skill has a discovery, the discovery is given to the student first, and, right after the discovery, another activity with the same skill is given._

### Level 5: Assignments

We want to allow teachers to assign a skill to students.

- Student objects now have an assigned skill property
- When a student has an assignment, an activity matching the assignment should be given
- To validate an assignment, a student should finish 3 activities in a row with the right skill.
- If a discovery is necessary for an assigned skill, 4 exercises instead of 3 are required to validate the assignment (the discovery + 3 other exercises)

## Send us the results

- Use either **Javascript**, **Typescript** or **Python** to answer to this test
- Fork this project and write your code in the fork
- Create at least one commit per level
- In `report.md`, explain your design choices, the time you spent working on the project, what issues you had/what took you longer than expected
- Create a pull request
- **Focus on code quality and readability. Don't focus on finishing all of the levels**
