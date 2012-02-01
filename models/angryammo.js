// Class AmmoDef
var AmmoDef = function( ){
	// physics
	this.bodyDef = new b2BodyDef;
	this.fixDef = new b2FixtureDef;
	this.fixDef.density = 2.0;
	this.fixDef.friction = 0.75;
	this.fixDef.restitution = 0.2;
	this.bodyDef.type = b2Body.b2_dynamicBody;
	this.fixDef.shape = new b2CircleShape( AMMO_WIDTH / 2 * METER_PER_PIXEL );
	//this.fixDef.shape.SetAsBox( AMMO_WIDTH * METER_PER_PIXEL, AMMO_HEIGHT * METER_PER_PIXEL );
	
	// game
};

var AngryAmmo = function( world, player, ammoDef ){
	// Creating physics components
	this.body = world.world.CreateBody( ammoDef.bodyDef );
	this.body.CreateFixture( ammoDef.fixDef );
	
	// Game stats
	this.player = player;
	this.speed = 0;
	this.sprite = new Game.spr('views/pig.png', AMMO_WIDTH, AMMO_HEIGHT, 1, 0);

	this.flying = false;
	this.initialize = function(x,y) {
		mibbuSetSpritePosition( this.sprite, x, y, Z_CHARACTERS-1);
		this.conflux();
		this.sprite.speed(6);
	}
	this.move = function( direction ){
		this.speed = direction * MOVE_SPEED;
		mibbuMoveSpritePosition( this.sprite, direction * MOVE_SPEED, 0, 0);  
		this.conflux();
	}
	this.confluence = function(){
		Confluence( this.body, this.sprite );
	}
	this.deltaconfluence = function(){
		DeltaConfluence( this.body, this.sprite );
	}
	this.conflux = function(){
		Conflux( this.body, this.sprite );
	}
    //Calculate mouse movement
    this.mouseMove = function(barnX, barnY) {
        //Have the actual ammo move with the mouse.
        this.sprite.x = mouseX - AMMO_WIDTH/2 ;
        this.sprite.y = mouseY - AMMO_HEIGHT/2 ;

        //Calculate distance of sprite from starting point.
        var distanceX = this.sprite.x-barnX;
		var distanceY = this.sprite.y-barnY;

        //Check to see if ammo is dragged too far.
		if (distanceX*distanceX+distanceY*distanceY>SHOT_RADIUS) {
			//Calculate angle of fire.
            var shotAngle=Math.atan2(distanceY,distanceX);

            //Keep sprite from moving farther than designated radius.
            this.sprite.x=barnX+Math.sqrt(SHOT_RADIUS)*Math.cos(shotAngle);
			this.sprite.y=barnY+Math.sqrt(SHOT_RADIUS)*Math.sin(shotAngle);
		}
    }
	this.show = function(camera){
		if( this.speed < 1 ){
			this.body.SetAngularVelocity(0);
		}
		this.deltaconfluence();
		camera.show(this.sprite);
		this.speed = this.body.GetLinearVelocity().x * PIXEL_PER_METER;
	}
	// Game world connection functions
	this.draw = function( ) { 
		// TODO: implement me!
	}
	this.destroy = function( ){
		// TODO: implement me! (all I need to do is remove this object from the game)
	}
	
	// Game mechanics macros
//	this.fire = function( velocity ){
//		this.speed = velocity.x * PIXEL_PER_METER;
//		this.body.SetLinearVelocity( velocity )
//	}

    //Function the handles the firing of the ammo
    this.fire = function(barnX,barnY) {
        //Can use to check if fired. Maybe useful for camera actions
        this.flying = true;

        //Calculate angle and distance from origin. To be used when
        //calculating firing velocity.
        var distanceX = this.sprite.x-barnX;
		var distanceY = this.sprite.y-barnY;
     	var distance = Math.sqrt(distanceX*distanceX+distanceY*distanceY);
        var birdAngle = Math.atan2(distanceY,distanceX);

        //Horizontal force
        var horizontalForce = -distance*Math.cos(birdAngle)/4;

        //Verticle force
        var verticalForce = -distance*Math.sin(birdAngle)/4;
        //Create the force.
        var vec = new b2Vec2(horizontalForce,verticalForce);

        //Apply an impulse to the ammo.
        this.body.ApplyImpulse(vec, this.body.GetWorldCenter());

        //Handle conflux of ammo.
        this.conflux();
    }
};

