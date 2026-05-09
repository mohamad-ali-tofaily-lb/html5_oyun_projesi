give me a game design map

Here’s a clean **web game design map** for a 2D browser platform game:

# Web Game Design Map

## 1. Core Concept

**Game Title:** Oil Jump
**Genre:** 2D Platformer / Puzzle-Survival
**Platform:** Web Browser
**Target Audience:** Casual players / students / retro game fans

**Main Objective:**
Reach the exit door while managing limited health, where every jump consumes one life point.

---

## 2. Game Mechanics

### Player Controls

* **Move Left:** Arrow Left / A
* **Move Right:** Arrow Right / D
* **Jump:** Space / Arrow Up / W

### Core Rules

* Player starts with **3 hearts**
* Every jump consumes **1 heart**
* Falling off the map = Game Over
* Reaching the exit = Victory
* No jumping when hearts are depleted

---

## 3. Game Flow

```text
START SCREEN
     ↓
Press Any Key
     ↓
GAMEPLAY
     ↓
 ┌───────────────┬───────────────┐
 ↓               ↓               ↓
Reach Exit    Lose All Hearts   Fall Off Map
 ↓               ↓               ↓
WIN SCREEN    GAME OVER SCREEN
     ↓               ↓
Press Space to Restart
     ↓
GAMEPLAY
```

---

## 4. System Architecture

```text
index.html
│
├── constants.js
│   ├── Game states
│   ├── Physics settings
│   ├── Colors
│   ├── Player object
│   └── Level data
│
├── audio.js
│   └── Background music
│
├── render.js
│   ├── Background rendering
│   ├── Platform rendering
│   ├── Player rendering
│   ├── UI rendering
│   └── Screen overlays
│
├── logic.js
│   ├── Collision detection
│   ├── Movement updates
│   ├── Jump system
│   ├── Health management
│   ├── Win/Lose checks
│   └── Reset logic
│
└── game.js
    ├── Keyboard input
    ├── State handling
    ├── Main game loop
    └── Animation frame updates
```

---

## 5. Gameplay Components

### Player

* Position
* Velocity
* Width / Height
* Ground detection
* Health system

### Environment

* Platforms
* Background
* Exit door

### Camera

* Horizontal side-follow camera
* Smooth movement

### UI

* Heart indicators
* Instructions
* Start menu
* Victory screen
* Game over screen

---

## 6. Physics System

```text
Input Detection
      ↓
Apply Horizontal Movement
      ↓
Apply Jump Force
      ↓
Apply Gravity
      ↓
Update Position
      ↓
Check Platform Collision
      ↓
Resolve Movement
      ↓
Check Win/Lose Conditions
```

---

## 7. Visual Design

**Style:** Pixel / Retro minimalist

**Color Palette:**

* Warm orange background
* Black platform geometry
* White text overlays
* Stylized robot character
* Decorative hat accessory

---

## 8. Audio Design

* Looping background music
* Optional:

  * Jump sound effect
  * Victory sound
  * Death sound

---

## 9. Future Expansion Ideas

* Multiple levels
* Moving platforms
* Enemies
* Collectible hearts
* Timer challenge
* Score tracking
* Sound toggle
* Mobile touch controls

---

This is essentially the blueprint of the game's full design and implementation structure.

-------------------------------------------------------------------------------------------------------
how to maintain a proper view of the game on different devices?

To maintain a proper view of a web game across different devices, several responsive design techniques can be used:

### 1. Responsive Viewport Settings

Use the viewport meta tag so the game scales correctly on phones, tablets, and desktops:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

This ensures the browser matches the screen’s actual width.

---

### 2. Flexible Layout Positioning

Using CSS layout systems such as **Flexbox** helps center and align the game consistently regardless of screen size.

Example:

```css
body {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

This keeps the game properly positioned.

---

### 3. Canvas Scaling

If the game uses HTML canvas, maintain a fixed aspect ratio while allowing resizing:

```javascript
canvas.style.width = "100%";
canvas.style.maxWidth = "640px";
canvas.style.height = "auto";
```

This prevents distortion while adapting to smaller screens.

---

### 4. Relative Sizing Instead of Fixed Pixels

Use responsive units like:

* `%`
* `vw`
* `vh`
* `em`
* `rem`

instead of hardcoded pixel values for UI elements.

Example:

```css
font-size: 2vw;
```

---

### 5. Media Queries

Adjust layout for different device widths:

```css
@media (max-width: 768px) {
    canvas {
        width: 95%;
    }

    #ui {
        font-size: 12px;
    }
}
```

This improves readability on mobile devices.

---

### 6. Maintain Aspect Ratio

Prevent the game from stretching unnaturally by preserving its width-to-height ratio.

Example:

```css
canvas {
    aspect-ratio: 16 / 9;
}
```

---

### 7. Touch Support for Mobile

Desktop keyboard controls should be supplemented with touch buttons for mobile users.

Examples:

* Left button
* Right button
* Jump button

This improves usability on phones.

---

### 8. Performance Optimization

Different devices have different hardware capabilities. To maintain smooth gameplay:

* use efficient rendering
* limit unnecessary redraws
* optimize image/audio sizes
* rely on `requestAnimationFrame()` for smoother animations

---

### 9. Testing Across Devices

Always test on:

* desktop browsers
* tablets
* Android phones
* iPhones
* different screen resolutions

Browser developer tools can simulate multiple devices.

---

### Best Practice Summary

A well-maintained cross-device web game combines:
**responsive layout + canvas scaling + aspect ratio control + adaptive UI + touch support + performance optimization.**
-------------------------------------------------------------------------------------------------------
why can't the character jump?

A character may be unable to jump in a web platform game for several common reasons:

### 1. Ground Detection Fails

Jumping is usually allowed only when the character is considered “on the ground.”

If the collision system does not correctly detect contact with a platform, the jump condition never becomes true.

Example issue:

```javascript
if (player.onGround) {
    jump();
}
```

If `onGround` is never set correctly, jumping won’t work.

---

### 2. Input Detection Problems

The jump key might not be registered properly.

Possible causes:

* wrong key code
* missing event listener
* conflicting controls

Example:

```javascript
window.addEventListener('keydown', e => {
    keys[e.code] = true;
});
```

If the wrong key is checked, pressing jump does nothing.

---

### 3. Jump Force Too Weak

If the upward velocity is too small, gravity may cancel it immediately.

Example:

```javascript
player.velocityY = -5;
```

If gravity is stronger than the jump force, movement upward may be barely visible.

---

### 4. Gravity Applied Incorrectly

Applying gravity before jump logic or using an excessively large gravity value can prevent jumping.

Example:

```javascript
player.velocityY += gravity;
```

If gravity is too high, the player gets pulled down instantly.

---

### 5. Collision Logic Pushes Character Back

A faulty collision system may interpret jumping as a collision and force the character back into place.

This happens when side/top collision checks are not separated properly.

---

### 6. Resource-Based Restrictions

Some games limit jumping using stamina, energy, or health.

If the required resource is depleted, jumping becomes disabled.

Example:

```javascript
if (player.hearts > 0) {
    jump();
}
```

---

### 7. State Restrictions

Jumping may only be allowed during active gameplay.

If the game is in:

* start menu
* paused state
* game over
* victory screen

jump input may be ignored.

---

### 8. Input Reset Immediately

If the jump key state is cleared too quickly, the jump may never trigger.

Example:

```javascript
keys["Space"] = false;
```

Resetting input at the wrong time can cancel the action.

---

### Most Likely Root Causes

The most common reasons are:
**incorrect ground detection, input handling errors, collision bugs, or gameplay restrictions preventing jumps.**
-------------------------------------------------------------------------------------------------------
why isn't the character moving?

If a character is not moving in a web game, the issue is usually caused by one of these reasons:

### 1. Keyboard Input Not Being Detected

Movement depends on key presses being registered correctly.

Example:

```javascript
window.addEventListener('keydown', e => {
    keys[e.code] = true;
});
```

If:

* the event listener is missing,
* the wrong key codes are used,
* or input is blocked,

the character will remain still.

---

### 2. Movement Speed Is Zero

Even if input works, movement won’t happen if the horizontal speed is zero.

Example:

```javascript
player.velocityX = movementSpeed;
```

If `movementSpeed = 0`, there will be no visible movement.

---

### 3. Position Is Not Updated

Movement requires updating the character’s coordinates each frame.

Example:

```javascript
player.x += player.velocityX;
```

If this line is missing or never executed, the character appears frozen.

---

### 4. Game State Prevents Movement

Many games only allow movement during active gameplay.

If the current state is:

* start screen
* paused
* game over
* victory screen

movement logic may be skipped.

Example:

```javascript
if (gameState === PLAYING) {
    updatePlayer();
}
```

---

### 5. Collision System Blocks Movement

Incorrect collision handling can push the character back every frame.

For example:

* walls treated incorrectly
* side collisions misdetected
* overlapping platforms

This makes movement appear broken.

---

### 6. Physics Values Conflict

If movement is overwritten every frame:

```javascript
player.velocityX = 0;
```

and input never changes it properly, the character stays stationary.

---

### 7. Camera Creates Illusion of No Movement

The character may actually move, but camera positioning makes it look fixed.

This happens in side-scrolling games when the camera follows the player.

---

### 8. JavaScript Errors Stop Execution

A runtime error can prevent movement logic from running.

Examples:

* undefined variables
* typo in object names
* missing functions

Browser console usually reveals this.

---

### 9. Canvas Rendering Issue

Movement may happen internally, but if redraw logic fails, the screen won’t update visually.

Example:

```javascript
requestAnimationFrame(gameLoop);
```

Without proper rendering updates, movement is invisible.

---

### Most Common Causes

The usual reasons are:
**input not detected, position not updating, collision bugs, inactive game state, or JavaScript execution errors.**
-------------------------------------------------------------------------------------------------------
even though the character reaches the exit why can't it win?

If the character reaches the exit but the game does not register a win, the problem is usually one of these:

### 1. Collision Detection Failure

Winning often depends on detecting overlap between the character and the exit object.

Example:

```javascript
if (isColliding(player, exitDoor)) {
    gameState = WIN;
}
```

If the collision logic is incorrect, the win condition never triggers.

Possible issues:

* wrong width/height values
* incorrect object positions
* bad boundary calculations

---

### 2. Visual Position vs Actual Position Mismatch

The exit may appear to be in one location visually, but its actual collision box may be elsewhere.

This happens when rendering uses transformed coordinates (camera offsets, scaling, etc.) while collision checks use different values.

Result:
The player appears to touch the exit, but technically never collides with it.

---

### 3. Camera Offset Confusion

In scrolling games, objects are often drawn using camera-adjusted positions:

```javascript
drawX = object.x - cameraX;
```

But collision checks should use world coordinates, not screen coordinates.

Mixing these systems causes false misses.

---

### 4. Game State Changes Too Early

Another condition may trigger before the win logic.

Examples:

* player dies first
* health reaches zero
* falling condition activates

Example:

```javascript
if (health <= 0) gameState = GAME_OVER;
if (collidesWithExit) gameState = WIN;
```

If game over happens first, the win never occurs.

---

### 5. Exit Object Dimensions Are Wrong

The exit hitbox may be too small.

Example:

```javascript
const exit = {
    x: 800,
    y: 200,
    width: 10,
    height: 10
};
```

Visually the door looks large, but collision only checks a tiny invisible area.

---

### 6. Character Collision Box Is Incorrect

The player's visible sprite may be larger than its actual collision rectangle.

So it looks like contact occurs when the hitbox hasn’t actually reached the exit.

---

### 7. Win Logic Never Runs

If the update loop skips the win check, victory cannot happen.

Example:

```javascript
if (gameState === PLAYING) {
    updatePlayer();
}
```

If the character update doesn’t execute, win detection won’t happen.

---

### 8. Logic Order Problem

The win check might happen before the character’s position updates.

Wrong order:

```javascript
checkWin();
updatePosition();
```

Correct order:

```javascript
updatePosition();
checkWin();
```

---

### Most Likely Cause

The most common reason is a mismatch between **visual rendering positions and actual collision hitboxes**, especially in scrolling platform games.
-------------------------------------------------------------------------------------------------------
how to check for collision?

Collision detection in a 2D web game is commonly done using **Axis-Aligned Bounding Box (AABB)** collision checking. This method compares the rectangular boundaries of two objects.

### Basic Collision Check

If both objects are rectangles:

```javascript
function isColliding(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}
```

---

### How It Works

Two objects collide when:

* the left side of object A is before the right side of object B
* the right side of object A is after the left side of object B
* the top of object A is above the bottom of object B
* the bottom of object A is below the top of object B

Visual idea:

```text
Object A overlap Object B
+--------+
|        |
|   +--------+
|   |Overlap |
+---|--------+
    +--------+
```

If all overlap conditions are true → collision detected.

---

### Example Usage

Checking if the player touches a platform:

```javascript
if (isColliding(player, platform)) {
    console.log("Collision detected");
}
```

Checking win condition:

```javascript
if (isColliding(player, exitDoor)) {
    gameState = "win";
}
```

---

### Platform Collision Handling

For platform games, collision detection alone is not enough—you also need collision response.

Example:

```javascript
if (isColliding(player, platform)) {
    player.y = platform.y - player.height;
    player.onGround = true;
}
```

This places the player on top of the platform instead of letting them fall through.

---

### Side Collision Handling

To stop walking through walls:

```javascript
if (isColliding(player, wall)) {
    player.x -= player.velocityX;
}
```

This pushes the player back.

---

### Circle Collision (Alternative)

If using circular objects:

```javascript
function circleCollision(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < a.radius + b.radius;
}
```

---

### Best Method for Platform Games

For rectangular sprites and platforms, **AABB collision detection** is the simplest and most efficient solution.
-------------------------------------------------------------------------------------------------------
how to cancel double jumping?

To prevent double jumping in a platform game, the jump action should only be allowed when the character is touching the ground.

### Ground State Method

Use a boolean variable to track whether the player is standing on a platform.

Example:

```javascript id="gq20xv"
player.onGround = false;
```

When collision with the ground is detected:

```javascript id="7gqjyf"
player.onGround = true;
```

Then restrict jumping:

```javascript id="m5a3b9"
if (jumpKeyPressed && player.onGround) {
    player.velocityY = jumpForce;
    player.onGround = false;
}
```

---

### How It Works

1. Player starts on the ground → `onGround = true`
2. Jump happens → upward force applied
3. Immediately set:

```javascript id="ztwnzg"
player.onGround = false;
```

This blocks additional jumps while airborne.

4. Once the player lands again:

```javascript id="0s4qv6"
player.onGround = true;
```

Jump becomes available again.

---

### Logic Flow

```text id="m66m3u"
Press Jump
   ↓
Is player on ground?
   ↓
YES → Jump allowed
NO  → Ignore input
```

---

### Common Mistakes

**1. Forgetting to reset after jump**
If you don’t set:

```javascript id="gpkjrw"
player.onGround = false;
```

double jump remains possible.

---

**2. Incorrect collision detection**
If landing is never detected, the player may never be able to jump again.

---

**3. Input held down**
Holding the jump key may trigger repeated jumps unless input is managed properly.

You can reset the key after use:

```javascript id="n1f7my"
keys["Space"] = false;
```

---

### Alternative: Jump Counter

For more control:

```javascript id="d7itc3"
player.jumpCount = 0;
player.maxJumps = 1;
```

On jump:

```javascript id="9m8g7f"
if (player.jumpCount < player.maxJumps) {
    jump();
    player.jumpCount++;
}
```

On landing:

```javascript id="6gpc9w"
player.jumpCount = 0;
```

This also makes adding double-jump mechanics easy later
-------------------------------------------------------------------------------------------------------
how to draw hearts above the character

To draw hearts above the character, you first calculate the character’s on-screen position, then place the heart icons with an upward offset so they appear above the head.

Basic approach:

### 1. Get Character Screen Position

If the game uses camera scrolling, convert world position to screen position:

```javascript id="s9rwod"
const screenX = player.x - cameraX;
const screenY = player.y;
```

---

### 2. Decide Heart Size and Spacing

Set how large each heart should be and the gap between them:

```javascript id="n0o95e"
const heartSize = 10;
const spacing = 4;
```

---

### 3. Center Hearts Above Character

Calculate total width so the hearts stay centered:

```javascript id="lkqg7g"
const totalWidth = player.maxHearts * (heartSize + spacing) - spacing;
const startX = screenX + player.width / 2 - totalWidth / 2;
```

This ensures multiple hearts align neatly above the character.

---

### 4. Move Hearts Upward

Use a negative vertical offset:

```javascript id="w4e3a1"
const heartY = screenY - 32;
```

This places them above the character sprite.

---

### 5. Draw Each Heart

Loop through all hearts:

```javascript id="1npd94"
for (let i = 0; i < player.maxHearts; i++) {
    drawHeart(
        startX + i * (heartSize + spacing),
        heartY,
        heartSize
    );
}
```

---

### Result

This creates a row of hearts that:

* follow the character
* remain centered
* stay above the head
* move with camera scrolling

This is a common UI technique for health indicators attached directly to characters.

