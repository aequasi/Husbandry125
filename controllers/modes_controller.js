// Game controller for use in the maingame.js file

var gameMode;

var mousecontrol, bgcontrol;
var theWorld, thePlayer, theLand, theBarn, theCamera;
var actors, playerBarn;
var crosshair;
var playerCount;
var theMenu;
function InitializeMenuMode(){
	gameMode = MODE_MENU;
	theCamera = new AngryCamera();
	theMenu = new AngryMenu();
	theMenu.initialize();
	bgcontrol = new BackgroundController();
	bgcontrol.camera = theCamera;

}



function InitializeGameMode(){
	gameMode = MODE_GAME;
	actors = new Array(4);
    theCamera = new AngryCamera();
	theWorld = new AngryWorld();
	theWorld.initialize();
	theLand = theWorld.ground;
    crosshair = new Game.spr('views/crosshair.png', CROSSHAIR_WIDTH, CROSSHAIR_HEIGHT, 1, 0);
    crosshair.speed(0);
    mibbuSetSpritePosition(crosshair,-CROSSHAIR_WIDTH,-CROSSHAIR_HEIGHT,Z_CHARACTERS+1);


    //Send JoinGame request to client.js. It will send request to server.
    JoinGame();
    //initialze actors and store them in an array for easy access.
    //As ammo is kind of its own entity, reserve space next to the barns.
    /*for(var i = 0; i < PLAYER_COUNT; i++)
    {
        //Player create here. Once we change the player definition process
        //this will have to be changed probably.
        thePlayer = new AngryPlayer( i,new PlayerDef() );

	    theBarn = new AngryBarn( theWorld, thePlayer, barnDef );
	    theBarn.initialize(300 * i, 300);
        actors[2*i] = theBarn;
        actors[2*i+1] = theBarn.ammo;
    } */
     //right now define the first barn to be the one we focus on.

	
}

function LoopMenuMode(){
	if( gameMode == MODE_MENU ){
		if(theMenu.activeMenu == MENU_TITLE){
			if( CheckWithinBounds( theMenu.title, mouseX, mouseY ) ){ 
				theMenu.displayMainMenu();
			}
		}
		if(theMenu.activeMenu == MENU_MAIN){
			if( CheckWithinBounds( theMenu.join, mouseX, mouseY ) ){ 
				theMenu.join.frame(1);
				if( mouseDown ){
                    //game is loaded, so load the join game functions for the client/server
                    loadAddGameFunction();
					gameMode = MODE_GAME;
					DestroyMenuMode();
                    InitializeGameMode();
					return;
				}
			}
			else if( CheckWithinBounds( theMenu.signin, mouseX, mouseY ) ){ 
				theMenu.signin.frame(1);
			}
			else if( CheckWithinBounds( theMenu.shop, mouseX, mouseY ) ){ 
				theMenu.shop.frame(1);
				if( mouseDown ){ 
					theMenu.displayShopMenu();
				}
			}
			else{
				theMenu.join.frame(0);
				theMenu.shop.frame(0);
				theMenu.signin.frame(0);
			}
		}
		if(theMenu.activeMenu == MENU_SHOP){ 
			if( CheckWithinBounds( leftButton, mouseX, mouseY ) ){ 
				if( mouseDown ){
					theMenu.displayMainMenu();
					return;
				}
			}
		}
	}
}

function LoopGameMode(){
	// Step 0: Initialize physics as necessary

	// Step 1: Mass confluence
    for(var i = 0; i < playerCount; i++)
    {
        if(actors[i*2] != null)
        {actors[i*2].show(theCamera)}

        //If a pig is moving, let it move
        if(actors[i*2].walking)
        {
            actors[i*2].move(actors[i*2].direction);
        }
    }
    $("#debug").html("y velocity: " + playerBarn.body.GetLinearVelocity().y);

	theCamera.follow( playerBarn.ammo );
	bgcontrol.show(theCamera);
	
	var ammoFireFlag = false;
	// Step 2: Handle input
    if(!playerBarn.walking)
    {
        if(!playerBarn.ammo.flying && CheckWithinBounds( leftButton, mouseX, mouseY ) ){
		leftButton.frame(1);
		//playerBarn.move(-1);
        playerBarn.direction = -1;
        playerBarn.walking = true;
        MovePig(-1);
	    }
	    else if(!playerBarn.ammo.flying && CheckWithinBounds( rightButton, mouseX, mouseY ) ){
		rightButton.frame(1);
		//playerBarn.move(1);
        playerBarn.direction = 1;
        playerBarn.walking = true;
        MovePig(1);
	    }
        else if (CheckWithinBounds(playerBarn.cannonSprite,mouseX,mouseY) && mouseDown && !playerBarn.ammo.flying)
    {
        //Firstly just realign the mouse. Even if the mouse isn't moved,
        //Ammo should be pinned to mouse.
//         playerBarn.mouseSet();
        //open up listeners

       document.addEventListener("mousemove", handleAmmoMove, true);
        document.addEventListener("mouseup", handleAmmoRelease, true);

    }
    else if (CheckWithinBounds(playerBarn.sprite,mouseX,mouseY) && mouseDown && !playerBarn.ammo.flying)
    {
        //Firstly just realign the mouse. Even if the mouse isn't moved,
        //Ammo should be pinned to mouse.
//         playerBarn.mouseSet();
        //open up listeners

       document.addEventListener("mousemove", handleAmmoMove, true);
        document.addEventListener("mouseup", handleAmmoRelease, true);

    }
    }
    else if(playerBarn.walking && playerBarn.direction == -1 && !CheckWithinBounds( leftButton, mouseX, mouseY ) ){
		leftButton.frame(0);
		//playerBarn.move(-1);
        playerBarn.direction = -1;
        playerBarn.walking = false;
        MovePig(0);
	}
	else if(playerBarn.walking && playerBarn.direction == 1 && !CheckWithinBounds( rightButton, mouseX, mouseY ) ){
		rightButton.frame(0);
		//playerBarn.move(1);
        playerBarn.direction = 1;
        playerBarn.walking = false;
        MovePig(0);
	}

	else {
		leftButton.frame(0);
		rightButton.frame(0);

	}

     if (playerBarn.ammo.flying )
     {
         mibbuSetSpritePosition(crosshair,-CROSSHAIR_WIDTH,-CROSSHAIR_HEIGHT,0);
         var vec = new b2Vec2(0,0);
         $("#debug").html( "velocity y : " + playerBarn.ammo.body.GetLinearVelocity().y );

         if(playerBarn.ammo.body.GetLinearVelocity().x == 0 )
         {
             playerBarn.ammo.reset(playerBarn.cannonSprite.x,playerBarn.cannonSprite.y);
             ResetShot();
             playerBarn.resetJoint();

         }

     }

    theWorld.addContactListener({
        //Once a contact happens. This actually occurs more then we'd think
        //so leaving this blank till theres an actual use.
        BeginContact: function(idA, idB) {
        },

        //After collision concludes.
        PostSolve: function(idA, idB, impulse) {

        //if impulse meets the threshold and the two collision objects
        // have an id, do stuff.
        if (impulse < .1 || idA == null || idB == null) return;
        //Get the entities from the actors array
          var entityA = actors[idA];
          var entityB = actors[idB];
          //Find which entity is a projectile (the one that is looking to hit something)
          //Change that entity to being hit, and perform some function on the was hit entity.
          if(entityA.notHit )
          {
              if(idB % 2 == 0 && (idA - 1) != idB){
                  entityA.notHit = false;

              entityB.wasHit();
              }
          }
          else if(entityB.notHit)
          {
              if(idA % 2 == 0  && (idB - 1) != idA){
                  entityB.notHit = false;
                entityA.wasHit();
              }
          }

        }
      });
	// Step 3: Step... into the future
	theWorld.update();
}

function DestroyMenuMode(){
	theMenu.killEverything();
	delete theMenu;
}

function DestroyGameMode(){

}