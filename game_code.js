const k = kaplay({
    global: true,
    fullscreen: true,
    scale: 1.25,
    debug: true
});

k.loadSprite("cloud", "assets/sprites/cloud.png");
k.loadSprite("grass4", "assets/sprites/grass4.png");
k.loadSprite("village_bg", "assets/sprites/village_bg.png");
k.loadSprite("blue_single", "assets/sprites/blue_single.png");
k.loadSprite("exit", "assets/sprites/exit.png");
k.loadSprite("exit2", "assets/sprites/exit2.png");
k.loadSprite("forest_bg", "assets/sprites/forest_bg.png");
k.loadSprite("snake", "assets/sprites/snake.png");
k.loadSprite("flower", "assets/sprites/flower.png");
k.loadSprite("cave_bg", "assets/sprites/cave_bg.png");
k.loadSprite("cave_inside", "assets/sprites/cave_inside.png");
k.loadSprite("cave_out2", "assets/sprites/cave_out2.png");
k.loadSprite("scorpian", "assets/sprites/scorpian.png");
k.loadSprite("ocean_side", "assets/sprites/ocean_side.png");
k.loadSprite("gem", "assets/sprites/gem.png");
k.loadSprite("seaplant", "assets/sprites/seaplant.png");
k.loadSprite("mountain", "assets/sprites/mountain.png");

let herbs_collected = 0
let current_scene = 'entrance';
// Add this near your other global variables
let playerHealth = 3; // Start with 2 health points (full life)
k.setGravity(800);
function setBlue(pos) {
    const runner = k.add([
        k.sprite("blue_single"),
        k.pos(pos),
        k.area(),
        k.body(),
        k.z(3),
    ])
    return runner;
}

function setupBlueControls(runner) {
    let canJump = true;  // Jump cooldown flag
    const JUMP_COOLDOWN = 0.5; // Seconds between jumps

    // Movement Controls
    k.onKeyDown('left', () => {
        runner.move(-200, 0);
        runner.flipX = true;
    });

    k.onKeyDown('right', () => {
        runner.move(200, 0);
        runner.flipX = false;
    });

    k.onKeyRelease(['left', 'right'], () => {
        runner.stop();
    });

    k.onKeyPress('space', () => {
        if (canJump && runner.isGrounded()) {
            canJump = false;
            runner.jump(350);
            k.wait(JUMP_COOLDOWN, () => canJump = true);
        }
    });

    k.onKeyPress('up', () => {
        if (canJump && runner.isGrounded()) {
            canJump = false;
            runner.jump(250);
            k.wait(JUMP_COOLDOWN, () => canJump = true);
        }
    });

    // Fall death check
    runner.onUpdate(() => {
        if (runner.pos.y >= 480) {
            k.go("lose");
        }
    });
}


function releaseSnakes(count, startX, startY, moveSpeed) {
    const snakes = [];

    for (let i = 1; i < (count + 1); i++) {
        const snake = k.add([
            k.sprite("snake"),
            k.pos(startX + (i * 25), startY),
            k.area(),
            k.anchor("bot"),
            k.body({ isStatic: false }),
            k.z(2),
            {
                moveSpeed: moveSpeed,
                direction: 50, // 1=right, -1=left
                healthDamage: 0.5,
                update() {
                    // Simple horizontal movement
                    this.move(this.direction, this.moveSpeed);

                    // Flip sprite based on direction
                    this.flipX = this.direction < 0;
                }
            },
            "enemy"
        ]);

        // Change direction when hitting walls/platforms
        snake.onCollide("platform", () => {
            snake.direction *= -1; // Reverse direction
        });

        snakes.push(snake);
    }

    return snakes;
}

function releaseScorpians(count, startX, startY, moveSpeed) {
    const scorpians = [];

    for (let i = 1; i < (count + 1); i++) {
        const scorpian = k.add([
            k.sprite("scorpian"),
            k.pos(startX + (i * 25), startY),
            k.area(),
            k.anchor("bot"),
            k.body({ isStatic: false }),
            k.z(2),
            {
                moveSpeed: moveSpeed,
                direction: 50, // 1=right, -1=left
                healthDamage: 0.5,
                update() {
                    // Simple horizontal movement
                    this.move(this.direction, this.moveSpeed);

                    // Flip sprite based on direction
                    this.flipX = this.direction < 0;
                }
            },
            "enemy"
        ]);

        // Change direction when hitting walls/platforms
        scorpian.onCollide("platform", () => {
            scorpian.direction *= -1; // Reverse direction
        });

        scorpians.push(scorpian);
    }

    return scorpians;
}

k.scene("tape00", () => {
    let message = "~Blue's Adventure~ \n \n Press A to begin.";
    k.setBackground([0, 0, 1]),

        k.add([
            k.text(message),
            k.pos(250, 250)
        ]);

    k.onKeyPress('a', () => {
        k.go('tape01')
    })

})
k.scene("tape01", () => {
    let message = "Morning! How can I help you? \n ... \n You need medicine? \n What's the issue?";
    k.setBackground([0, 0, 1]),

        k.add([
            k.text(message),
            k.pos(175, 250)
        ]);

    // Press any key to go back
    k.onKeyPress('a', () => {
        k.go("tape02")
    })
});

k.scene("tape02", () => {
    let message = "You're coughing blood? \n I hate to break it to you, \n but I don't have the \n ingredients to fix that.";
    k.setBackground([0, 0, 1]),

        k.add([
            k.text(message),
            k.pos(175, 250)
        ]);

    // Press any key to go back
    k.onKeyPress('a', () => {
        k.go("tape03")
    })
});

k.scene("tape03", () => {
    let message = "... \n Yes, it does seem dire. \n Well, you're going to need: \n 1. Ginger flowers \n 2. Scorpian salt \n 3. Crimson Seaweed";
    k.setBackground([0, 0, 1]),

        k.add([
            k.text(message),
            k.pos(100, 175)
        ]);

    // Press any key to go back
    k.onKeyPress('a', () => {
        k.go("tape04")
    })
});

k.scene("tape04", () => {
    let message = "... \n You're willing to do it?! \n  I won't stop you but \n be care- \n And he's gone...";
    k.setBackground([0, 0, 1]),

        k.add([
            k.text(message),
            k.pos(175, 200)
        ]);

    // Press any key to go back
    k.onKeyPress('a', () => {
        k.go("tape05")
    })
});

k.scene("tape05", () => {
    let message = "You run out of the apothecary \n and quickly pack your bag. \n Finally, there's something to do.";
    k.setBackground([0, 1, 1]),

        k.add([
            k.text(message),
            k.pos(175, 250)
        ]);

    // Press any key to go back
    k.onKeyPress('a', () => {
        k.go("entrance")
    })
});

k.scene("tape06", () => {
    let message = "The birds are chirping. \n You drink water from the stream. \n After a long nap \n on the fluffy grass, \n you begin your return to \n the apothecary...";
    k.setBackground([0, 1, 1]),

        k.add([
            k.text(message),
            k.pos(100, 200)
        ]);

    // Press any key to go back
    k.onKeyPress('a', () => {
        k.go("tape08")
    })
});
k.scene("tape08", () => {
    let message = "Did you really find all \n the ingredients? \n That's impressive to say \n the least. Say, do you \n want to\n work for me from \n now on?";
    k.setBackground([0, 1, 1]),

        k.add([
            k.text(message),
            k.pos(100, 200)
        ]);

    // Press any key to go back
    k.onKeyPress('a', () => {
        k.go("tape09")
    })
});

k.scene("tape09", () => {
    let message = "You remind the excited herbalist \n about your ratched throat. \n Ahh yes, well, \n how do you feel? \n";
    k.setBackground([0, 1, 1]),

        k.add([
            k.text(message),
            k.pos(100, 225)
        ]);

    // Press any key to go back
    k.onKeyPress('a', () => {
        k.go("tape10")
    })
});
k.scene("tape10", () => {
    let message = "You realize you throat \n is perfectly fine. \n But how?";
    k.setBackground([0, 1, 1]),

        k.add([
            k.text(message),
            k.pos(100, 200)
        ]);

    // Press any key to go back
    k.onKeyPress('a', () => {
        k.go("tape11")
    })
});

k.scene("tape11", () => {
    let message = "Did you drink any water \n on your journey?\n ... \n Well, now we now your issue. \n Drink more water. \n Catch more sunlight. \n You can do that if \n you work for me.";
    k.setBackground([0, 1, 1]),

        k.add([
            k.text(message),
            k.pos(100, 200)
        ]);

    // Press any key to go back
    k.onKeyPress('a', () => {
        k.go("tape12")
    })
});

k.scene("tape12", () => {
    let message = "You agree to her offer. \n Not because she insists \n but because \n the journey was fun.";
    k.setBackground([0, 1, 1]),

        k.add([
            k.text(message),
            k.pos(100, 250)
        ]);

    // Press any key to go back
    k.onKeyPress('a', () => {
        k.go("tape13")
    })
});

k.scene("tape13", () => {
    let message = "THE END. \n Press A to restart.";
    k.setBackground([0, 1, 1]),

        k.add([
            k.text(message),
            k.pos(100, 250)
        ]);

    // Press any key to go back
    k.onKeyPress('a', () => {
        k.go("tape01")
    })
});


k.scene("entrance", () => {
    // Background
    current_scene = 'entrance'
    const backing = k.add([
        k.sprite("village_bg"),
        k.pos(0, 0),
        k.scale(0.5)
    ]);

    // Platform Map
    const map = k.addLevel([
        '              ',
        '              ',
        '              ',
        '              ',
        '                      d ',
        '                     sss',
        '                 ',
        '           ssssss  ',
        '              ',
        '    sss          ',
        '              ',
        '          ccccccc   ',
        '      c        ',
        '              ',
        '   cccccccc        cccccc',
        '                    ',
        '    cccccccccccc'
    ],
        {
            tileWidth: 32,
            tileHeight: 32,
            tiles: {
                'c': () => [
                    k.sprite('grass4'),
                    k.area(),
                    k.anchor('bot'),
                    k.body({ isStatic: true }),
                    k.z(2),
                    "platform" // Tag for collision detection
                ],
                'd': () => [
                    k.sprite('exit2'),
                    k.area(),
                    k.anchor('bot'),
                    k.body({ isStatic: true }),
                    k.z(2),
                    "door" // Tag for collision detection
                ],
                's': () => [
                    k.sprite('cloud'),
                    k.area(),
                    k.anchor('bot'),
                    k.body({ isStatic: true }),
                    k.z(2),
                    "platform" // Tag for collision detection
                ]

            }
        });

    let canInteractWithDoor = false;

    // Player Character
    const runner = setBlue(350, 350)

    // Movement Controls
    setupBlueControls(runner)
    // Collision Detection
    runner.onCollideEnd("platform", (a) => {
    });

    // Door Interaction System
    runner.onCollide("door", () => {
        canInteractWithDoor = true;
        k.debug.log("Near door - press A to enter");
    });

    runner.onCollideEnd("door", () => {
        canInteractWithDoor = false;
        k.onKeyPress('a', () => {
            k.go('Level2')
        })
    });



});

k.scene("lose", () => {
    let message
    if (playerHealth === 0) {
        message = `Sudden Death!\nPress A to restart`;
    } else {
        message = "Uh oh!\nPress A to restart";
    }
    k.setBackground([0, 0, 1]),


        k.add([
            k.text(message),
            k.pos(250, 275)
        ]);

    // Press any key to go back
    k.onKeyPress('a', () => {
        k.go(current_scene)
    })
});

k.scene("Level2", () => {
    current_scene = 'Level2'
    // Background
    const backing2 = k.add([
        k.sprite("forest_bg"),
        k.pos(0, 0),
        k.scale(0.5)
    ]);
    let no_of_flowers = 0
    //let message = `Flowers collected: ${no_of_flowers}`;

    // Platform Map
    const forest_map = k.addLevel([
        '              ',
        '              ',
        '              ',
        '              ',
        '              ',
        '              ',
        '                 f ',
        '            cccccc  ',
        '              ',
        '       cc       ',
        '  c            ',
        '              ',
        '     f         ',
        '   cccccccc    ',
        '                     f  e',
        '    f          d    cccc ',
        '    cccccccccccccccc'
    ],
        {
            tileWidth: 32,
            tileHeight: 32,
            tiles: {
                'c': () => [
                    k.sprite('grass4'),
                    k.area(),
                    k.anchor('bot'),
                    k.body({ isStatic: true }),
                    k.z(2),
                    "platform" // Tag for collision detection
                ],
                'd': () => [
                    k.sprite('exit'),
                    k.area(),
                    k.anchor('bot'),
                    k.body({ isStatic: true }),
                    k.z(2),
                    "door1" // Tag for collision detection
                ],
                'e': () => [
                    k.sprite('exit2'),
                    k.area(),
                    k.anchor('bot'),
                    k.body({ isStatic: true }),
                    k.z(2),
                    "door2" // Tag for collision detection
                ],
                'f': () => [
                    sprite("flower"),
                    area(),
                    anchor("bot"),
                    "plant" // Tag for collision detection
                ],

            }
        });
    let canInteractWithDoor = false;

    // Release 5 snakes at different positions
    const snakes = releaseSnakes(3, 200, 200, 200);
    const snakes1 = releaseSnakes(2, 550, -200, 200);
    // Player Character
    const runner = setBlue(100, 100)

    // Movement Controls
    setupBlueControls(runner)

    // Collision Detection
    runner.onCollideEnd("platform", (a) => {
    });

    // Door Interaction System
    runner.onCollide("door1", () => {
        canInteractWithDoor = true;
        k.debug.log("Near door - press A to enter");
    });

    runner.onCollideEnd("door1", () => {
        canInteractWithDoor = false;
        k.onKeyPress('a', () => {
            k.go('entrance')
        })
    });

    runner.onCollide("door2", () => {
        canInteractWithDoor = true;
        k.debug.log("Near door - press A to enter");
    });

    runner.onCollideEnd("door2", () => {
        canInteractWithDoor = false;
        k.onKeyPress('a', () => {
            k.go('Level3')
        })
    });

    current_scene = 'Level2';
    playerHealth = 3; // Reset health when entering level


    let flowerText = add([
        text("Flowers collected: 0", { size: 24 }),
        pos(20, 20),
        fixed(),
        z(100)
    ]);

    let canCollect = true; // Flag to prevent multiple collections

    runner.onCollide("plant", (flower) => {
        // Single keypress handler (moved outside onCollide)
        onKeyPress("s", () => {
            if (canCollect && flower.exists()) { // Check if flower still exists
                canCollect = false; // Lock collection

                no_of_flowers++;
                flowerText.text = `Flowers collected: ${no_of_flowers}`;
                destroy(flower);

                // Brief cooldown to prevent rapid collection
                wait(0.3, () => canCollect = true);
            }
        });
    });

    // Enemy collision handler
    runner.onCollide("enemy", (enemy) => {
        playerHealth -= enemy.healthDamage;
        k.shake(5);

        if (playerHealth <= 0) {
            k.go("lose");
        } else {
            runner.invincible = true;
            runner.opacity = 0.5;
            k.wait(1, () => {
                runner.invincible = false;
                runner.opacity = 1;
            });
        }
    });

});


k.scene("Level3", () => {
    // Background
    current_scene = 'Level3'
    const backing = k.add([
        k.sprite("cave_bg"),
        k.pos(0, 0),
        k.scale(0.5)
    ]);

    // Platform Map
    const map3 = k.addLevel([
        '              ',
        '              ',
        '              ',
        '              ',
        '                        ',
        '   ssssss           sss',
        '                  ',
        '    sssss           ssss  ',
        '                   e',
        '       ss         ss',
        '              ',
        '           sssssss   ',
        '              ',
        '      d        ',
        '   ssssssss           ssss',
        '                   sss ',
        '            '
    ],
        {
            tileWidth: 32,
            tileHeight: 32,
            tiles: {
                'd': () => [
                    k.sprite('exit'),
                    k.area(),
                    k.anchor('bot'),
                    k.body({ isStatic: true }),
                    k.z(2),
                    "door1" // Tag for collision detection
                ],
                'e': () => [
                    k.sprite('exit2'),
                    k.area(),
                    k.anchor('bot'),
                    k.body({ isStatic: true }),
                    k.z(2),
                    "door2" // Tag for collision detection
                ],
                's': () => [
                    k.sprite('cloud'),
                    k.area(),
                    k.anchor('bot'),
                    k.body({ isStatic: true }),
                    k.z(2),
                    "platform" // Tag for collision detection
                ]

            }
        });

    let canInteractWithDoor = false;

    // Player Character
    const runner = setBlue(100, 400)

    // Movement Controls
    setupBlueControls(runner)
    // Collision Detection
    runner.onCollideEnd("platform", (a) => {
    });

    // Door Interaction System
    runner.onCollide("door1", () => {
        canInteractWithDoor = true;
        k.debug.log("Near door - press A to enter");
    });

    runner.onCollideEnd("door1", () => {
        canInteractWithDoor = false;
        k.onKeyPress('a', () => {
            k.go('Level2')
        })
    });

    // Door Interaction System
    runner.onCollide("door2", () => {
        canInteractWithDoor = true;
        k.debug.log("Near door - press A to enter");
    });

    runner.onCollideEnd("door2", () => {
        canInteractWithDoor = false;
        k.onKeyPress('a', () => {
            k.go('Level4')
        })
    });
});
k.scene("Level4", () => {
    current_scene = 'Level4'
    // Background
    const backing2 = k.add([
        k.sprite("cave_inside"),
        k.pos(0, 0),
        k.scale(0.5)
    ]);

    // Platform Map
    const forest_map = k.addLevel([
        '              ',
        '              ',
        '              ',
        '              ',
        '              ',
        '              ',
        '                  ',
        '                e',
        '        f   cccccc   ',
        '       cc       ',
        '  c            ',
        '              ',
        '   d  f         ',
        '   cccccccc    ',
        '                        f',
        '    f               ccc ',
        '    cccccccccccccccc'
    ],
        {
            tileWidth: 32,
            tileHeight: 32,
            tiles: {
                'c': () => [
                    k.sprite('cloud'),
                    k.area(),
                    k.anchor('bot'),
                    k.body({ isStatic: true }),
                    k.z(2),
                    "platform" // Tag for collision detection
                ],
                'd': () => [
                    k.sprite('exit'),
                    k.area(),
                    k.anchor('bot'),
                    k.body({ isStatic: true }),
                    k.z(2),
                    "door1" // Tag for collision detection
                ],
                'e': () => [
                    k.sprite('exit2'),
                    k.area(),
                    k.anchor('bot'),
                    k.body({ isStatic: true }),
                    k.z(2),
                    "door2" // Tag for collision detection
                ],
                'f': () => [
                    sprite("gem"),
                    area(),
                    anchor("bot"),
                    "plant" // Tag for collision detection
                ],

            }
        });
    let canInteractWithDoor = false;

    // Release 5 snakes at different positions
    const scorpians1 = releaseScorpians(1, 400, 200, 200);
    const scorpians2 = releaseScorpians(1, 200, 100, 100);
    const scorpians3 = releaseScorpians(1, 100, 200, 200);
    const scorpians4 = releaseScorpians(1, 300, -200, 100);
    // Player Character
    const runner = setBlue(100, 100)

    // Movement Controls
    setupBlueControls(runner)

    // Collision Detection
    runner.onCollideEnd("platform", (a) => {
    });

 
    // Door Interaction System
    runner.onCollide("door1", () => {
        canInteractWithDoor = true;
        k.debug.log("Near door - press A to enter");
    });

    runner.onCollideEnd("door1", () => {
        canInteractWithDoor = false;
        k.onKeyPress('a', () => {
            k.go('Level3')
        })
    });

    // Door Interaction System
    runner.onCollide("door2", () => {
        canInteractWithDoor = true;
        k.debug.log("Near door - press A to enter");
    });

    runner.onCollideEnd("door2", () => {
        canInteractWithDoor = false;
        k.onKeyPress('a', () => {
            k.go('Level5')
        })
    });
});
    playerHealth = 3; // Reset health when entering level

    // Create text object
    let flowerText = add([
        text("Gems collected: 0", { size: 24 }),
        pos(20, 20),
        fixed(),
        z(100)
    ]);

    let no_of_flowers = 0;
    let canCollect = true; // Flag to prevent multiple collections

    runner.onCollide("plant", (flower) => {
        // Single keypress handler (moved outside onCollide)
        onKeyPress("s", () => {
            if (canCollect && flower.exists()) { // Check if flower still exists
                canCollect = false; // Lock collection

                no_of_flowers++;
                flowerText.text = `Gems collected: ${no_of_flowers}`;
                destroy(flower);

                // Brief cooldown to prevent rapid collection
                wait(0.3, () => canCollect = true);
            }
        });
    });

    // Enemy collision handler
    runner.onCollide("enemy", (enemy) => {
        playerHealth -= enemy.healthDamage;
        k.shake(5);

        if (playerHealth <= 0) {
            k.go("lose");
        } else {
            runner.invincible = true;
            runner.opacity = 0.5;
            k.wait(1, () => {
                runner.invincible = false;
                runner.opacity = 1;
            });
        }
});



k.scene("Level5", () => {
    // Background
    current_scene = 'Level5'
    const backing = k.add([
        k.sprite("cave_out2"),
        k.pos(0, 0),
        k.scale(0.5)
    ]);

    // Platform Map
    const map3 = k.addLevel([
        '              ',
        '              ',
        '              ',
        '              ',
        '                      ',
        '                 sss',
        '                       d',
        '    sssss        ssssss  ',
        '              ',
        '       ss       ',
        '              ',
        '              ',
        '              ',
        '    e          ',
        '   ssssssss           ssss',
        '                   sss ',
        '            '
    ],
        {
            tileWidth: 32,
            tileHeight: 32,
            tiles: {
                'd': () => [
                    k.sprite('exit'),
                    k.area(),
                    k.anchor('bot'),
                    k.body({ isStatic: true }),
                    k.z(2),
                    "door1" // Tag for collision detection
                ],
                'e': () => [
                    k.sprite('exit2'),
                    k.area(),
                    k.anchor('bot'),
                    k.body({ isStatic: true }),
                    k.z(2),
                    "door2" // Tag for collision detection
                ],
                's': () => [
                    k.sprite('cloud'),
                    k.area(),
                    k.anchor('bot'),
                    k.body({ isStatic: true }),
                    k.z(2),
                    "platform" // Tag for collision detection
                ]

            }
        });

    let canInteractWithDoor = false;

    // Player Character
    const runner = setBlue(500, 300)

    // Movement Controls
    setupBlueControls(runner)
    // Collision Detection
    runner.onCollideEnd("platform", (a) => {
    });

    // Door Interaction System
    runner.onCollide("door1", () => {
        canInteractWithDoor = true;
        k.debug.log("Near door - press A to enter");
    });

    runner.onCollideEnd("door1", () => {
        canInteractWithDoor = false;
        k.onKeyPress('a', () => {
            k.go('Level4')
        })
    });

    // Door Interaction System
    runner.onCollide("door2", () => {
        canInteractWithDoor = true;
        k.debug.log("Near door - press A to enter");
    });

    runner.onCollideEnd("door2", () => {
        canInteractWithDoor = false;
        k.onKeyPress('a', () => {
            k.go('Level6')
        })
    });
});

k.scene("Level6", () => {
    current_scene = 'Level6'
    // Background
    const backing2 = k.add([
        k.sprite("ocean_side"),
        k.pos(0, 0),
        k.scale(0.5)
    ]);

    k.setGravity(850);
    // Platform Map
    const forest_map = k.addLevel([
        '              ',
        '              ',
        '              ',
        '              ',
        '              ',
        '      e             ',
        '    cccc             ',
        '                 ',
        '        f      ',
        '    cccccc          ',
        '  c            ',
        '              ',
        '   d   f        ',
        '  cc   c                 f',
        '          c    ccccc   cccc   ',
        '                   ccc ',
        '    '
    ],
        {
            tileWidth: 32,
            tileHeight: 32,
            tiles: {
                'c': () => [
                    k.sprite('cloud'),
                    k.area(),
                    k.anchor('bot'),
                    k.body({ isStatic: true }),
                    k.z(2),
                    "platform" // Tag for collision detection
                ],
                'd': () => [
                    k.sprite('exit'),
                    k.area(),
                    k.anchor('bot'),
                    k.body({ isStatic: true }),
                    k.z(2),
                    "door1" // Tag for collision detection
                ],
                'e': () => [
                    k.sprite('exit2'),
                    k.area(),
                    k.anchor('bot'),
                    k.body({ isStatic: true }),
                    k.z(2),
                    "door2" // Tag for collision detection
                ],
                'f': () => [
                    sprite("seaplant"),
                    area(),
                    anchor("bot"),
                    "plant" // Tag for collision detection
                ],

            }
        });
    let canInteractWithDoor = false;

    // Release 5 snakes at different positions
    const scorpians1 = releaseScorpians(1, 150, 200, 200);
    const scorpians2 = releaseScorpians(2, 400, 100, 100);
    const snakes1 = releaseSnakes(1, 100, 200, 200);
    const snakes2 = releaseSnakes(1, 300, -200, 100);
    // Player Character
    const runner = setBlue(350, 100)

    // Movement Controls
    setupBlueControls(runner)

    // Collision Detection
    runner.onCollideEnd("platform", (a) => {
    });

    // Door Interaction System
    runner.onCollide("door1", () => {
        canInteractWithDoor = true;
        k.debug.log("Near door - press A to enter");
    });

    runner.onCollideEnd("door1", () => {
        canInteractWithDoor = false;
        k.onKeyPress('a', () => {
            k.go('Level5')
        })
    });

    runner.onCollide("door2", () => {
        canInteractWithDoor = true;
        k.debug.log("Near door - press A to enter");
    });

    runner.onCollideEnd("door2", () => {
        canInteractWithDoor = false;
        k.onKeyPress('a', () => {
            k.go('Level7')
        })
    });

    playerHealth = 3; // Reset health when entering level

    // Create text object
    let flowerText = add([
        text("Seaweed collected: 0", { size: 24 }),
        pos(20, 20),
        fixed(),
        z(100)
    ]);

    let no_of_flowers = 0;
    let canCollect = true; // Flag to prevent multiple collections

    runner.onCollide("plant", (flower) => {
        // Single keypress handler (moved outside onCollide)
        onKeyPress("s", () => {
            if (canCollect && flower.exists()) { // Check if flower still exists
                canCollect = false; // Lock collection

                no_of_flowers++;
                flowerText.text = `Seaweed collected: ${no_of_flowers}`;
                destroy(flower);

                // Brief cooldown to prevent rapid collection
                wait(0.3, () => canCollect = true);
            }
        });
    });


    // Enemy collision handler
    runner.onCollide("enemy", (enemy) => {
        playerHealth -= enemy.healthDamage;
        k.shake(5);

        if (playerHealth <= 0) {
            k.go("lose");
        } else {
            runner.invincible = true;
            runner.opacity = 0.5;
            k.wait(1, () => {
                runner.invincible = false;
                runner.opacity = 1;
            });
        }
    });

});

k.scene("Level7", () => {
    // Background
    current_scene = 'Level7'
    const backing = k.add([
        k.sprite("mountain"),
        k.pos(0, 0),
        k.scale(0.5)
    ]);

    k.onKeyPress('a', () => {
        k.go('tape06')
    })

})

k.go("tape00");