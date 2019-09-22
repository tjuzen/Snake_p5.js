var s;
var scl = 20;
var reset = 0;
var food;
//var bomb;
var x = 0;
var y = 0;
var z = 0;
var turn = 0;
var frameratesnake =10;
var julien = 0;

function setup()
{
  createCanvas(600, 600);
  s = new Snake();
  frameRate(10);
  pickLocation();
  //pickBomb();
}

function pickLocation()
{
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function pickBomb()
{
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  bomb = createVector(floor(random(cols)), floor(random(rows)));
  bomb.mult(scl);
}

function draw()
{
  if (turn == 6 || turn == 12 || turn == 18)
   {
     background(random(255), random(255), random(255));
   }
  else
  {
    background(51);
  }
  text(turn, 10, 20);
  fill(0, 102, 153);
  if (s.eat(food))
  {
    pickLocation();
   // pickBomb();
  }
  s.death();
 // s.boum(bomb);
  if (reset != 1)
  {
      s.update();
  s.show();
  //Couleur du bloc
  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
  //Couleur de la bombe
 // fill(0, 0, 100);
  //rect(bomb.x, bomb.y, scl, scl);
  }

}

function keyPressed()
{
  if (reset == 1)
  {
    return ;
  } 
  if (keyCode === UP_ARROW)
  {
    s.dir(0, -1);
  }
  else if (keyCode === DOWN_ARROW)
  {
    s.dir(0, 1);
  }
  else if (keyCode === RIGHT_ARROW)
  {
    s.dir(1, 0);
  }
  else if (keyCode === LEFT_ARROW)
  {
    s.dir(-1, 0);
  }
}

function boumdeath()
{
    reset = 1;
    textSize(150);
    fill('red');
    text('BOUM', 0, 200);
}


function udied()
{
    reset = 1;
    textSize(20);
    text('U DIED', 50, 20);
    fill(0, 102, 153);
}

function mousePressed()
  {
      this.total = 0;
      this.tail = [];
      turn = 0;
      frameratesnake = 10;
      reset = 0;
      frameRate(10);
      pickLocation();
      s = new Snake();    
  }
  
function Snake()
{
  this.x = 0;
  this.y = 0;
  this.xspeed = 0;
  this.yspeed = 0;
  this.total = 0;
  this.previous_total = 0;
  this.tail = [];
  this.a = 0;
  this.b = 0;
  this.c = 0;
  
  this.eat = function (pos)
  {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1)
    {
        this.a += 110;
        this.b += 230;
        this.c += 25;
        if (this.a >= 255)
        { 
          this.a = this.a/2;
        }
        if (this.b >= 255)
        { 
          this.b = this.b/4;
        }
        if (this.c >= 255)
        { 
          this.c = this.c/2;
        }
      this.total++;
      turn++;
      julien++;
      if (frameratesnake < 15)
      {
        frameratesnake++;
      }
      if (turn == 6 || turn == 12 || turn == 18 || turn == 25 || turn == 40)
      {
        frameRate(20);
      }
      else 
      {
        if (frameratesnake < 25)
        {
          if (julien == 3)
          {
            frameratesnake++;
            julien = 0;
          }
        }
        frameRate(frameratesnake);
      }
      return true;
    }
    else
    {
      return false;
    }
  }
  
  this.boum = function (pos)
  {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1)
    {
      boumdeath();
    }
  }

  this.dir = function (x, y)
  {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.death = function ()
  {
    for (var i = 0; i < this.tail.length; i++)
    {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1)
      {
        udied();
      }
    }
  }

  this.update = function ()
  {
    for (var i = 0; i < this.tail.length - 1; i++)
    {
      this.tail[i] = this.tail[i + 1];
    }
    if (this.total >= 0)
    {
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  }

  this.show = function ()
  {
    // color for the snake, changing with the size
    if (turn == 6 || turn == 12 || turn == 18)
    {
      fill(random(255), random(255), random(255));
    }
    else
    {
      fill(this.a, this.b, this.c);
    }
    for (var i = 0; i < this.tail.length; i++)
    {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);
  }
}
