//create new game with 500x500 canvas size
        var Game = new mibbu(500, 500);
        
	//uncomment line below for disabling 
	//
        Game.fps()              //show FPS counter
            .canvasOff()        //comment this line for disabling canvas and swiching to DOM rendering
            //.cssAnimationOff()//uncomment this in DOM mode to disable CSS3 Animations (only in webkit & Firefox Beta browsers)     
            .init()             //now init all the elements - before calling 
                                //init() funciton Mibbu didn't know if you want 
                                //to render it on canvas or using DOM   
        
	//create two sprites using reptile.png image, with
	//width & height of single frame equals to 200,
	//reptile.png has 8 frames ('7' if we count from '0') and
	//only 1 ('0') animation inside
//        var sprite = new Game.spr('img/reptile.png', 200, 200, 7, 0),
     //       sprite2 = new Game.spr('img/reptile.png', 200, 200, 7, 0),
            //create new background using bg.jpg file and set it's speed
	    //to 6, direction to SOUTH, and initial position to (0,0)
            //background = new Game.bg('views/bg.png', 6, "S", {x:0,y:0});
                var background = new Game.bg('views/bg.png', 6, "S", {x:0,y:0});

	//set position of 1st sprite to (100, 100) and
	//it's x-index to 2
    //then speed of redrwing the sprite frames
//        sprite.position(100, 100, 2).speed(4);

	//extend sprite object with some additional 
	//variables fr control movement etc.
	//it is up to you how you will achieve this - 
	//- it is not part of Mibbu
//    sprite.y = 100;
	//sprite.d = 1;
//	sprite.type = 0;

	//the same here
    //but we create variable for the speed of the animation
	//we will use it later
    //var speed = 4;
    
    //sprite2.speed(4).position(100, 300, 2);
//	sprite2.y = 300;
//	sprite2.d = -1;

	//resize second sprite and remember 
	//it's size in the file (functions like
	//size(), frames(), etc. return
	//their values when you call them
	//without parameters, like sprite2.size();
    //We use chaining in here, so to receive
    //size we have to use that dirty hack with
    //calling one function twice
//	var size = sprite2.size(100, 100).size();

	//start moving background
    //and setting random direction and speed
        //background.speed(~~(Math.random()*10)+1).dir(~~(Math.random()*180)).on();

	//start main game loop
       Game.on();
       //Game.start();

	//now we will create additional function
	//to be called on each frame of main game loop
	/*var additionalLoop = function(){
		if (sprite.y < 0) sprite.d*=-1;

		if (sprite2.y > 500-size.height) sprite2.d*=-1;

		sprite.y+=sprite.d*4;
		sprite2.y+=sprite2.d*2;

		//we move the sprites by changing it's
		//positions
		sprite.position(100, sprite.y);
		sprite2.position(100, sprite2.y);

	}

	//now add that function to the loop
    //and start checking for the collisions
	Game.hook(additionalLoop).hitsOn();



	//if 'sprite' will collide with 'sprite2' then:
	sprite.hit(sprite2, function(){
		//change it's type
		if (sprite.type === 0) {
			sprite.type = 1;
			sprite.change('img/reptile.png', 200, 200, 7, 0);

		} else {
			sprite.type = 0;				
			sprite.change('img/reptile2.png', 200, 200, 7, 0);
		}
		//resize it
		sprite.size(150, 150);

		//and change direction of it's movement
		//also - it is not the part of Mibbu
		sprite.d*=-1;
		sprite2.d*=-1;
	});

	//create callback for the second sprite
	//it will change the speed of animation
	//after every second full animation
	//hope I explained it clearly:)
	sprite2.callback(function(){
		speed++;
		sprite2.speed(speed);
	}, 2);*/
