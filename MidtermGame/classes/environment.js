class Environment {

    //
    constructor(character, enemies) {

        //
        this.noiseValue = 0;
        this.noiseScale = 0.02;

        //
        this.character = character;
        this.enemies   = enemies;

        this.item = new MagicItems(random(0,width),random(height/3,height),this.character);
        this.itemIndex = 0;

        this.screenNum = 1;

    }

    reviveItems() {
        if(parseInt(random(0,2)) == 1) {
            this.item.exist = true;
        }
    }

    checkHits(enemyIndex) {

        //character hitting enemy
        for(var i = 0; i < this.character.projectiles.length; i++){
            if(dist(this.character.projectiles[i].xPos,this.character.projectiles[i].yPos,this.enemies[enemyIndex].xPos,this.enemies[enemyIndex].yPos) < this.enemies[enemyIndex].size ) {
                this.enemies[enemyIndex].isAlive = false;
            }
        }

        for(var j = 0; j < this.character.fireArray.length; j++){
            if(dist(this.character.fireArray[j].xPos,this.character.fireArray[j].yPos,this.enemies[enemyIndex].xPos,this.enemies[enemyIndex].yPos) < this.enemies[enemyIndex].size ) {
                this.enemies[enemyIndex].isAlive = false;
            }
        }

    }

    checkPosition() {

        if(this.character.xPos > width) {
            offset += width;
            this.character.xPos = 0;

            for(var i = 0; i < numEnemies; i++) {
                console.log(i < this.screenNum)
                if(i < this.screenNum) { this.enemies[i].setSoldier(random(100,width),random(height/3 + 100,height-100),'Dark',true); }
                else { this.enemies[i].setSoldier(random(100,width),random(height/3 + 100,height-100),'Strong',false); }

            }

            this.screenNum++;

            console.log(this.screenNum);

        }
    }

    displayPresentEnvironment() {

        background(173,216,230);

        fill(76,70,50)
        rect(0,height/3,width,2*height/3)
        noStroke();

        fill(0,50,0);

        beginShape();

        var x;
        for (x = 0; x < width; x++ ) {

            var noiseValue = noise( offset + x/100 );
            var noiseHeight = map( noiseValue, 0, 1, 0,height/3);

            vertex(x,noiseHeight);

        }

        vertex(width,height/3);
        vertex(0,height/3);

        endShape();

        fill(0,150,0);

        beginShape();

        var x;
        for (x = 0; x < width; x++ ) {

            var noiseValue = noise( offset + x/100 );
            var noiseHeight = map( noiseValue, 0, 1,height/5,height/3);

            vertex(x,noiseHeight);

        }

        vertex(width,height/3);
        vertex(0,height/3);

        endShape();

        stroke(0);

        /*for(var i = 0; i < randomRects.length; i++){
      fill(86*rectColors[i][0],80*rectColors[i][1],60*rectColors[i][2]);
      rect(randomRects[i][0],randomRects[i][1],randomRects[i][2],randomRects[i][3])
    }*/


    }

    displayPastEnvironment() {

        background(255,248,220);

        fill(76,70,50)
        rect(0,height/3,width,2*height/3)
        noStroke();

        fill(139,69,19);

        beginShape();

        var x;
        for (x = 0; x < width; x++ ) {

            var noiseValue = noise( offset + x/100 );
            var noiseHeight = map( noiseValue, 0, 1, 0,height/3);

            vertex(x,noiseHeight);

        }

        vertex(width,height/3);
        vertex(0,height/3);

        endShape();

        fill(210,180,140);

        beginShape();

        var x;
        for (x = 0; x < width; x++ ) {

            var noiseValue = noise( offset + x/100 );
            var noiseHeight = map( noiseValue, 0, 1,height/5,height/3);

            //point( x, noiseHeight);

            vertex(x,noiseHeight);

        }

        vertex(width,height/3);
        vertex(0,height/3);

        endShape();

        stroke(0);

        /*for(var i = 0; i < randomRects.length; i++){
      fill(86*rectColors[i][0],80*rectColors[i][1],60*rectColors[i][2]);
      rect(randomRects[i][0],randomRects[i][1],randomRects[i][2],randomRects[i][3])
    }*/

    }

    display() {

        if(this.character.inPresent) {
            if (this.character.changeTimeMeter > 90) {
                background(255);
                this.character.changeTime();
            }

            else {

                this.displayPresentEnvironment();

                this.character.display();
                this.item.display();

                this.checkPosition();

                if(this.character.timeIsStopped) {
                    for(var i = 0; i < this.enemies.length; i++ ){
                        this.enemies[i].stoppedAndDisplay();
                        this.checkHits(i);
                    }
                }
                else {
                    for(var i = 0; i < this.enemies.length; i++ ){
                        this.enemies[i].moveAndDisplay();
                        this.checkHits(i);
                    }
                    this.reviveItems();

                }
            }

        }
        else if (this.character.changeTimeMeter > 90) {
            background(255);
            this.character.changeTime();
        }
        else {

            this.displayPastEnvironment();
            this.character.display();
            this.item.display();

            this.checkPosition();


        }
    }
}