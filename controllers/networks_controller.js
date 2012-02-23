

function loadAddGameFunction() {

    //If you are the player thats joining we'll do this
    AddGameFunction( "player join", function(data){

        //set basic stuff for creating you on screen
        var barnDef = new BarnDef();
        numOfPlayers = data["playerCount"];
        sessionId = data["sessionId"]
        playerCount = numOfPlayers - 1;

        //If there are other people, create them as well.
        //Create as many people as need be and set them at 300 pixel intervals
        for(var i = 0; i < numOfPlayers; i++){
            thePlayer = new AngryPlayer(i,sessionId,new PlayerDef() );
	        theBarn = new AngryBarn( theWorld, thePlayer, barnDef );
	        theBarn.initialize(300 * i, 300);
            actors[2*i] = theBarn;
            actors[2*i+1] = theBarn.ammo;
        }
        //Set the latest player as YOU
        playerBarn = actors[2*playerCount];
        theCamera.follow( playerBarn.ammo );

        //Dunno what this even does
	    bgcontrol = new BackgroundController();
	    bgcontrol.camera = theCamera;
        //increment total num of players
        playerCount++;
    });

    //Someone else joined so we'll hear about it i guess.
   AddGameFunction( "other player join", function(data){
    //create basic stuff for other player
    var barnDef = new BarnDef();
    numOfPlayers = data["playerCount"];
    sessionId = data["sessionId"];
    playerCount = numOfPlayers - 1;
    alert(playerCount);
    //make other player appear and in the game world.
    thePlayer = new AngryPlayer(playerCount,sessionId,new PlayerDef() );
	theBarn = new AngryBarn( theWorld, thePlayer, barnDef );
	theBarn.initialize(300 * playerCount, 300);
    actors[2*playerCount] = theBarn;
    actors[2*playerCount+1] = theBarn.ammo;

    //another player added
    playerCount++;
    });

    AddGameFunction("pig shoot",function(data){
      sessionId = data['sessionId'];
      hForce = data['shotData']['hForce'];
      vForce = data['shotData']['vForce'];
       var shotBarn;
        var vec = new b2Vec2(hForce,vForce);
        for(var i = 0; i<playerCount;i++)
        {
          if(actors[2*i].sessionId = sessionId)
          {
              shotBarn = actors[2*i];
          }
        }
        shotBarn.ammo.body.ApplyImpulse(vec, shotBarn.ammo.body.GetWorldCenter());

        //Handle conflux of ammo.
        shotBarn.ammo.conflux();
        shotBarn.ammo.flying = true;
        shotBarn.ammo.notHit = true;
    }) ;
}