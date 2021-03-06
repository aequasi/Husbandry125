// The game object
var Game = new mibbu(GAME_WIDTH, GAME_HEIGHT);
Game.fps();
//Game.canvasOff();
Game.init();
Game.hitsOn();
// Function joins together the physical stream with the spiritual (sprite) stream
// The physical world takes predominance over the spiritual one
// Remember, there is a 1:30 ratio between the physical model and the spiritual one

function CompleteConfluence( angrymodel ){
	angrymodel.absX = angrymodel.body.GetPosition().x * PIXEL_PER_METER;
	angrymodel.absY = angrymodel.body.GetPosition().y * PIXEL_PER_METER;
	angrymodel.absZ = angrymodel.sprite.z;
}

function CompleteConflux( angrymodel ){
	angrymodel.body.SetPosition(
		new b2Vec2(
			angrymodel.absX * METER_PER_PIXEL ,
			angrymodel.absY * METER_PER_PIXEL
		)
	);
}

function Confluence( physical, sprite ){ 
	mibbuSetSpritePosition( 
		sprite, 
		physical.GetPosition().x * PIXEL_PER_METER - sprite.width / 2, 
		physical.GetPosition().y * PIXEL_PER_METER - sprite.height / 2,
		sprite.z
	);
}

// Does confluence on an object's velocity.
// In other words, if physical displaces v then sprite displaces v * PIXEL_PER_METER
function DeltaConfluence( physical, sprite ){ 
	mibbuMoveSpritePosition( 
		sprite,
		physical.GetLinearVelocity().x * PIXEL_PER_METER * FRAME_INCREMENT ,
		physical.GetLinearVelocity().y * PIXEL_PER_METER * FRAME_INCREMENT ,
		0
	);
}

// Same as the above, but this time, the spiritual one takes dominance
function Conflux( physical, sprite ){ 

	physical.SetPosition( 
		new b2Vec2( 
			(sprite.x + sprite.width / 2)* METER_PER_PIXEL,
			(sprite.y + sprite.height / 2)* METER_PER_PIXEL
		) 
	);
}

