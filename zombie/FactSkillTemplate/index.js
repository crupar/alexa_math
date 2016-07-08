/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing zombie survival tips.
 */
  var TIPS = [
    "Zombie survival tip number 1.  Fitness.  You need to be able to run and you need to be able to climb.  Keep in shape. or else you will have no chance of surviving.",
    "Zombie survival tip number 2.  Cities are bad.  Larger populations means more possible zombies.  Somewhere rural is a better option.",
    "Zombie survival tip number 3.  Safety first.  Wear your seatbelt.  Have a fire detector and fire extinguisher.  Just because there is a zombie apocalypse does not mean other bad things can not happen.",
    "Zombie survival tip number 4.  You are prey.  Act like it.  Know when to run.  Know when to hide.  Always plan and have multiple exits.",
    "Zombie survival tip number 5.  Do not rely on gas.  Gasoline oxidizes and goes bad.  It only takes a few months for it to do so.  With added fuel system stabilizers it will last around a year.  Get out of the city as fast as possible.",
    "Zombie survival tip number 6.  Water.  Water supplies will not be safe.  Bottled water runs out.  You will need to have a good micro filter to get rid of bacteria, viruses, and other contaminates.  Some chemical contaminations can be removed by distillation.",
    "Zombie survival tip number 7.  Noise like gunfire will attract attention.  Refrain from attracting unwanted attention.",
    "Zombie survival tip number 8.  Reusable projectiles like arrows are only reusable if you can retrieve the ammo.",
    "Zombie survival tip number 9.  Do not use melee weapons.  It looks cool but if the blood is contagious you will get infected.  If any zombie blood gets into your mouth or eyes you will be infected.  If you have any cuts or open sores you will get infected.  Keep your distance.",
    "Zombie survival tip number 10.  A headshot might not always be necessary.  Reducing a zombies mobility might be good enough to get away.",
    "Zombie survival tip number 11.  Learn to garden and farm.  If you plan to survive long term you will need an ongoing food source.",
    "Zombie survival tip number 12.  Learn first aid.  You never know when you will need it in a zombie apocalypse.",
     "Zombie survival tip number 13.  Collect needed tools early on.  Grab tools such as axes, shovels, hammers, hand saws, hand powered drills, screwdrivers and other things that do not need electricity or fuel.  Antiques will be indispensable when there isn’t electricity.",
     "Zombie survival tip number 14.  Befriend an Amish community ahead of time.  They know how to be more self sustaining than you, and are used to operating with out electricity and other modern conveniences.  They do not approve of violence so in return you could offer to be the one whom deals with the zombies.",
     "Zombie survival tip number 15.  It is not only zombies you need to worry about.  Do not assume other survivors are your friends.",
     "Zombie survival tip number 16.  A tin-can opener is important.  Nothing will frustrate you more when hungry than having a tin-can of food you can not open",
     "Zombie survival tip number 17.  Spices, herbs, and hot sauces can cover up many gross or bland foods.",
     "Zombie survival tip number 18.  Toilet paper!  Stockpile it.",
     "Zombie survival tip number 19.  Over kill is better than being killed.  There is no such thing as being too careful in a zombie survival apocalypse.",
     "Zombie survival tip number 20.  Twinkies will last forever.",
     "Zombie survival tip number 21.  Create a decontamination area that people must pass through to get into the safe zone.",
     "Zombie survival tip number 22.  The grass is most likely not greener elsewhere.  Do not wander randomly with the assumption somewhere is better.   It is also hard to transport all needed gear for survival.",
     "Zombie survival tip number 23.  Sanitation is not a luxury but a necessity.  Create an outhouse or even just a designated hole for waste disposal.  Wash your hands regularly.",
     "Zombie survival tip number 24.  Shave your head or at least keep your hair short.  Long hair is a liability.  It can be grabbed or get caught on things.  It is harder to keep clean.  Lice, fleas, and all kinds of other pests and parasites can find home in it easier than short hair.",
     "Zombie survival tip number 25.  Enjoy the little things in life.  Keep your spirits up!",
     "Zombie survival tip number 26.  Always have a quick to go bag packed with very important items.  If you have to leave somewhere quickly you do not want to forget or leave something necessary behind.",
     "Zombie survival tip number 27.  Be able to light a fire without matches or a lighter.  Get and learn to use a knife and fire steel.",
     "Zombie survival tip number 28.  Sleep whenever it is safe and you have time.",
     "Zombie survival tip number 29.  Medications.  Stockpile them.  Some medications are safe but just less potent when expired.  Others are hazardous when expired.",
     "Zombie survival tip number 30.  Learn to climb anything and everything.",
     "Zombie survival tip number 31. Create a safe compound with people you trust.  You are better off making an area safe and keeping it that way.  Stockpile gear and supplies.",
     "Zombie survival tip number 32.  Collect rain water. Distill and filter the water. Then pray it will be fine.",
     "Zombie survival tip number 33.  Stockpile soap, bleach, and other cleaning and disinfecting items.",
     "Zombie survival tip number 34.  Shoes.  Get some good shoes and get some extra pairs.  Shoes are not easy to make and you will need them to run.",
     "Zombie survival tip number 35.  Get a crank or solar radio.  Use it to check for important public messages or if help is coming.",
     "Zombie survival tip number 36.  Just because it is a zombie apocalypse does not mean everything else stops.  It will rain.  It will become winter.  Flooding, droughts, earthquakes, tornados, wildfires and all other natural disasters will occur like normal.",
     "Zombie survival tip number 37.  Brains.  Do not eat brains from any animal or human.",
     "Zombie survival tip number 38.  Be creative and resourceful.  Wire can be used as rope.  Empty jars can be used to store things.  Nails sticking out of a board could be used to slow down zombies.",
     "Zombie survival tip number 39.  Ladders can be pulled up but stairs can not.  Use ladders to secure higher up areas and destroy staircases.",
     "Zombie survival tip number 40.  Anything can be used as a makeshift barricade.",
     "Zombie survival tip number 41.  Do not get food poisoning.  Do not eat unsafe food or eat foods raw that should be cooked.  Puking while running is not advisable.",
     "Zombie survival tip number 42.  A boat.  If nothing else you can move to the middle of a fresh water lake until a rescue comes.  You can eat fish and use a water filtration system.  This will only work short term.",
     "Zombie survival tip number 43.  Water in water bottles does not last forever.  Plastics leech into the water with time.  This will make the water unsafe to drink.",
     "Zombie survival tip number 44.  Have someone keep watch during the night and day.  Rotate whom is sleeping and whom is keeping watch.",
     "Zombie survival tip number 45.  Darkness is very dangerous.  A working flashlight will help a little.",
     "Zombie survival tip number 46.  Do not go into places where there is only one exit.  It is a trap.",
     "Zombie survival tip number 47.  Live in the present but plan for the future.  You may need food now but you will also need it in a month or a years time.",
     "Zombie survival tip number 48.  Wax is great.  Wax can be used to seal food into cans.  It can be used as a fuel source.  It can be used to make items water resistant or water proof and you can use it as a rust inhibitor.",
     "Zombie survival tip number 49.  Duct tape.  You never know when duct tape will come in use.",
     "Zombie survival tip number 50.  Stay away from zoos.  Hungry animals are bad.  Zombie lions are worse.",
     "Zombie survival tip number 51.  Do not forget the importance of mirrors.  They can be placed so there are no blind corners, or to reflect sunlight into dark areas.",
     "Zombie survival tip number 52.  Zombie babies are terrifying but are not very mobile.  Zombie toddlers are terrifying, can move surprisingly fast, and they can fit through small holes.",
     "Zombie survival tip number 53.  I cannot become a zombie.  You can...",
  ];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
 var Tip = function () {
     AlexaSkill.call(this, APP_ID);
 };

 // Extend AlexaSkill
 Tip.prototype = Object.create(AlexaSkill.prototype);
 Tip.prototype.constructor = Tip;

 Tip.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
     //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
     // any initialization logic goes here
 };

 Tip.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
     //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
     handleNewTipRequest(response);
 };

 /**
  * Overridden to show that a subclass can override this function to teardown session state.
  */
 Tip.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
     //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
     // any cleanup logic goes here
 };

 Tip.prototype.intentHandlers = {
     "GetNewTipIntent": function (intent, session, response) {
         handleNewTipRequest(response);
     },

     "AMAZON.HelpIntent": function (intent, session, response) {
         response.ask("There is no help in a zombie apocalypse.  Luckily, for now, you can either ask me for a zombie survival tip or ask to exit.  Which would you prefer?");
     },

     "AMAZON.StopIntent": function (intent, session, response) {
         var speechOutput = "Good luck surviving the upcoming zombie apocalypse.  Goodbye.";
         response.tell(speechOutput);
     },

     "AMAZON.CancelIntent": function (intent, session, response) {
         var speechOutput = "Good luck surviving the zombie apocalypse.  Goodbye.";
         response.tell(speechOutput);
     }
 };

 /**
  * Gets a random new tip from the list and returns to the user.
  */
 function handleNewTipRequest(response) {
     // Get a random space fact from the space facts list
     var tipIndex = Math.floor(Math.random() * TIPS.length);
     var randomTip = TIPS[tipIndex];

     // Create speech output
     var speechOutput = randomTip;
     var cardTitle = "Your Tip";
     response.tellWithCard(speechOutput, cardTitle, speechOutput);
 }

 // Create the handler that responds to the Alexa Request.
 exports.handler = function (event, context) {
     // Create an instance of the SpaceGeek skill.
     var tip = new Tip();
     tip.execute(event, context);
 };
