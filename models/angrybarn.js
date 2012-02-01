// Class BarnDef
var BarnDef = function( ){
	// physics
	this.bodyDef = new b2BodyDef;
	this.fixDef = new b2FixtureDef;

	this.fixDef.density = 0.1;
	this.fixDef.friction = 0.50;
	this.fixDef.restitution = 0.2;
	this.bodyDef.type = b2Body.b2_dynamicBody;
	this.fixDef.shape = new b2PolygonShape;
	this.fixDef.shape.SetAsBox( (BARN_WIDTH )  * METER_PER_PIXEL, (BARN_HEIGHT ) * METER_PER_PIXEL  );
	
	// game
	this.maxspeed = 0.25;
	this.maxhp = 100;
	this.ammoDef = new AmmoDef();
};

// Class AngryBarn
var AngryBarn = function(world, player, barnDef) {
	// Initializing physics
	this.body = world.world.CreateBody( barnDef.bodyDef );
	this.body.CreateFixture( barnDef.fixDef );
	
	// Initializing game properties
	this.maxhp = barnDef.maxhp;
	this.currenthp = barnDef.maxhp;
//	this.image = barnDef.image;
	this.player = player;
	this.ammo = new AngryAmmo( world, player, barnDef.ammoDef );
	this.maxspeed = barnDef.maxspeed;
	this.mode = BARN_MODE_MOVE;
	
	// animation
	this.sprite = new Game.spr('views/pigbig.png', BARN_WIDTH, BARN_HEIGHT, 3, 0);
	this.cannonSprite = new Game.spr('views/cannon.png', CANNON_WIDTH, CANNON_HEIGHT, 1, 0);
	// Game world connection functions
	this.initialize = function(x,y) { 
		mibbuSetSpritePosition( this.sprite, x, y, Z_CHARACTERS);
		mibbuSetSpritePosition( this.cannonSprite, x+10, y-CANNON_HEIGHT, Z_CHARACTERS);
		this.cannonSprite.speed(0);
		this.sprite.speed(7);
		this.conflux();
		this.ammo.initialize(x + BARN_WIDTH, y);
	}
	this.destroy = function( ){
		// TODO: implement me! (all I need to do is remove this object from the game)
	}
	this.serialize = function( ){
		// TODO: implement me! (I need to serialize the properties in this function and save to db)
	}
	this.load = function(world, player){
		// TODO: implement me! ( I need to load from the db the player's vehicle )
	}
	// Game mechanics macros 
	this.move = function( direction ){
		mibbuMoveSpritePosition( this.sprite, direction * MOVE_SPEED, 0, 0); 
		mibbuMoveSpritePosition( this.cannonSprite, direction * MOVE_SPEED, 0, 0); 		
		this.conflux();
		this.ammo.move(direction);
	}
    this.mouseSet = function(){
      this.ammo.sprite.x = mouseX - AMMO_WIDTH/2;
      this.ammo.sprite.y = mouseY - AMMO_HEIGHT/2;
    }
	this.deltaconfluence = function(){
		DeltaConfluence( this.body, this.sprite );
		DeltaConfluence( this.body, this.cannonSprite );
		//mibbuMoveSpritePosition( this.cannonSprite,10,-CANNON_HEIGHT,0);
	}
	this.confluence = function(){
		Confluence( this.body, this.sprite );
		Confluence( this.body, this.cannonSprite );
		mibbuMoveSpritePosition( this.cannonSprite,10,-CANNON_HEIGHT,0);
	}
	this.conflux = function(){
		Conflux( this.body, this.sprite );
	}
	this.show = function( camera ){
		this.deltaconfluence();
		camera.show(this.sprite);
		camera.show(this.cannonSprite);
		this.ammo.show(camera);
	}
	this.fire = function( velocity ){
		this.ammo.fire( velocity );
	}
};


