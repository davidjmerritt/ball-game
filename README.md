# Ball Game
by David J Merritt, 2019

This game was created in 3 iterations over 2 days.

## v0.1.0
For the first pass I wanted to create the MVP as fast as possible in order to prove out the concept.  The code quality very rough, but the basic design was in place, and all features accounted for.

<img src="img/ball_game_demo_v0_1_0_1080p_24fps.gif" width="375" height="667">

### Feedback
I then shared the project and got some notes.  I was pretty sure the assignment was complete, but I wanted to be sure that I had not missed anything. I also wanted to get feedback on new ideas that I thought of implementing in the next iteration.  Since I was pressed for time we flagged each feature with a priority score of 1 to 3.  1 being least important 3 being most important.  We did two passes of the prioritization and then added the results together.  The features with the highest cumulative priority were addressed fist.

### Improvements
- Improving the game interactions - Clicking the ball did not feel smooth.  The smaller balls seemed to be harder to click on and the player felt cheated.
- Checking that the speed of the balls dropping matched the requirements.
- Layout Tweaks

## v0.2.0
The second pass improved upon the mechanics and design of the first.  The goal being to make the most accurate representation of what was described in the wireframe and instructions as possible, while improving on the design to making the game fully playable.

<img src="img/ball_game_demo_v0_2_0_1080p_24fps.gif" width="375" height="667">

### Feedback
The second pass feedback was good. I felt confident that the features were all covered and that the game was engaging, as my wife continued to play even after I no longer required any more feedback.  Always a good sign 😊  

## v1.0.0
For the third pass I wanted to focus on features that would make the game stand out and deliver a bit more of a challenge. The features I had in mind were not really going to work with original code so I decided to refactor the entire project.  I took inspiration from javascript gaming frameworks I have used in the past and tried to build my own. I wanted to reduce the number of interval loops required to render the game into a single function that would update all sprites in the view at once. Making it both easier to add new features and keep the game running smoothly at a standard gaming frame rate of 60fps.  Further, my creative juices started to flow and I had new ideas on how expand the gameplay with a few new features.

You can play the game here: http://qubitfarm.com/ball-game

### New Features
- Change Layout of Controls - To optimize for mobile by moving the controls to the bottom of the screen to make it easier for players to start, pause and retry after a defeat.
- Add Levels - That exponential increase the speed of balls that are dropped.
- Add More Sound Effects
- Create Title Screen
- Create Game Over Screen
- Improve the Game Balance
- Add Goals

At first, I set the goal that to be: if you miss 3 balls the game would be over... but this was a little old hat. I instead opted for a different approach.  I am a fan of 8 and 16-bit Nintendo games.  So in place of to getting points for collecting balls by clicking on them, I opted for a life bar that would decrease when any slipped by. Larger balls give you less points but cause more damage and smaller ones, which are harder to click, give you more points and cause less damage.  If the user is able to max out the life bar they are rewarded with new sound effect each time new balls are captured.  The game is over when the life bar is depleted.  As the player improves the end game message changes based on the level they were able to reach.  The thought being, that players continue to challenge the game they will be rewarded with the new end messages.

### Features that didn't make it in 😢
- Effects - e.g. Wind that blows the balls around trigged at random intervals.
- Saved Game
- Leader Board
- Network Interaction - Head-to-head feature that allows 2 players to fight for ball clicks in realtime.
- Mute Button
- Special Power-ups - e.g. Screen Clearing Balls
- Custom Graphic Mouse Cursors

## Conclusion
Overall I am pretty happy with the way the game turned out and I had a lot of fun doing it!  The code got a little hackie towards the end as the deadline got closer. v1.0.0 is definitely a better frame for expanding the game in a lot of ways.  As a prototype I think it would serve very well as a foundation to continue developing the product based on new insights from user testing.  Thanks for reading this far and I hope you enjoyed playing!
