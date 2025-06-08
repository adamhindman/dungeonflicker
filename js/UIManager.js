export default class UIManager {
    constructor(restartGameCallback) {
        this.throwInfoDiv = document.getElementById("throw-info");
        this.discNamesList = document.getElementById("disc-names-list");
        this.rageButtonElement = document.getElementById("rage-button");
        this.fpsDisplayElement = document.getElementById("fps-counter");
        if (this.fpsDisplayElement) {
            this.fpsDisplayElement.style.display = 'none'; // Hidden by default
        }

        this.powersAreaElement = document.getElementById("powers-area");
        if (this.powersAreaElement) {
            this.currentTurnDiscNameElement = document.createElement("h3");
            this.currentTurnDiscNameElement.id = "current-turn-disc-name-display";
            // Styles for currentTurnDiscNameElement are now in main.css
            this.powersAreaElement.prepend(this.currentTurnDiscNameElement);

            // Create container for action buttons
            this.actionButtonsContainerElement = document.createElement("div");
            this.actionButtonsContainerElement.id = "action-buttons-container";
            this.powersAreaElement.appendChild(this.actionButtonsContainerElement);

            // Move the existing rage button into the new container if it exists
            if (this.rageButtonElement && this.actionButtonsContainerElement) {
                this.actionButtonsContainerElement.appendChild(this.rageButtonElement);
            }

        } else {
            this.currentTurnDiscNameElement = null;
            this.actionButtonsContainerElement = null; // Ensure it's null if powersAreaElement is not found
        }

        this.gameOverMessageContainer = null;
        this.gameOverMessageTextElement = null;
        this.playAgainButton = null; // Store the button reference

        this._createGameOverUI(restartGameCallback);
    }

    _createGameOverUI(restartGameCallback) {
        // Create container div
        this.gameOverMessageContainer = document.createElement("div");
        this.gameOverMessageContainer.id = "gameOverMessageContainer";
        Object.assign(this.gameOverMessageContainer.style, {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            color: "white",
            textAlign: "center",
            borderRadius: "10px",
            zIndex: "1000",
            display: "none", // Initially hidden
            fontFamily: "Arial, sans-serif",
        });

        const gameOverHeading = document.createElement("h1");
        gameOverHeading.textContent = "GAME OVER";
        Object.assign(gameOverHeading.style, {
            margin: "0 0 10px 0",
            fontSize: "2.5em",
        });

        this.gameOverMessageTextElement = document.createElement("p");
        this.gameOverMessageTextElement.id = "gameOverResultText";
        Object.assign(this.gameOverMessageTextElement.style, {
            margin: "0",
            fontSize: "1.5em",
        });

        this.gameOverMessageContainer.appendChild(gameOverHeading);
        this.gameOverMessageContainer.appendChild(this.gameOverMessageTextElement);

        this.playAgainButton = document.createElement("button");
        this.playAgainButton.textContent = "Play Again";
        Object.assign(this.playAgainButton.style, {
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "1em",
            color: "white",
            backgroundColor: "#555",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
        });

        this.playAgainButton.addEventListener("mouseover", () => {
            this.playAgainButton.style.backgroundColor = "#777";
        });
        this.playAgainButton.addEventListener("mouseout", () => {
            this.playAgainButton.style.backgroundColor = "#555";
        });

        this.playAgainButton.addEventListener("click", () => {
            this.hideGameOver(); // UIManager handles its own state
            if (restartGameCallback) {
                restartGameCallback(); // Call the callback provided by GameController
            }
        });

        this.gameOverMessageContainer.appendChild(this.playAgainButton);
        document.body.appendChild(this.gameOverMessageContainer);
    }

    showGameOver(playerWon) {
        if (this.gameOverMessageContainer && this.gameOverMessageTextElement) {
            this.gameOverMessageTextElement.textContent = playerWon ? "You win!" : "You lose!";
            this.gameOverMessageContainer.style.display = "block";
        }
    }

    hideGameOver() {
        if (this.gameOverMessageContainer) {
            this.gameOverMessageContainer.style.display = "none";
        }
    }

    updateThrowInfo(text, visible) {
        if (this.throwInfoDiv) {
            this.throwInfoDiv.textContent = text;
            this.throwInfoDiv.style.visibility = visible ? "visible" : "hidden";
        }
    }

    updateFPS(fps) {
        if (this.fpsDisplayElement) {
            this.fpsDisplayElement.textContent = `FPS: ${fps}`;
            // If updateFPS is called, it means the FPS counter should be visible
            this.fpsDisplayElement.style.display = 'inline-block'; // Or 'block' or 'inline' based on original CSS
        }
    }

    updateDiscNames(discs, currentDisc) {
        if (!this.discNamesList) return;
        this.discNamesList.innerHTML = ""; // Clear previous names

        const currentDiscName = currentDisc ? currentDisc.discName : null;

        discs.forEach(disc => {

            const listItem = document.createElement("li");
            let displayName = `${disc.discName} (HP: ${disc.hitPoints})`;

            // Create and style the color circle
            const colorCircle = document.createElement("span");
            colorCircle.classList.add('disc-color-indicator');
            
            // Convert the hex number color to a CSS hex string with fallback
            let colorString = '#808080'; // Default to gray if color is invalid
            if (typeof disc.initialColor === 'number' && isFinite(disc.initialColor)) {
                try {
                    // Ensure the number is non-negative before toString(16)
                    const colorValue = disc.initialColor >= 0 ? disc.initialColor : 0;
                    colorString = '#' + colorValue.toString(16).padStart(6, '0');
                } catch (e) {

                    // colorString remains default gray
                }
            } else {
                const discIdentifier = disc && disc.discName ? disc.discName : (disc && disc.kind ? disc.kind : 'Unknown Disc');
            }

            // Set dynamic background color
            colorCircle.style.backgroundColor = colorString;
            // Other styles for disc-color-indicator are in main.css

            listItem.appendChild(colorCircle); // Add the circle to the list item

            // Create a text node for the display name and append it after the circle
            const textNode = document.createTextNode(displayName);
            listItem.appendChild(textNode);

            // Apply classes for styling
            listItem.classList.add('turn-tracker-item');
            if (disc.dead) {
                listItem.classList.add('dead-disc');
            }
            if (disc.discName === currentDiscName) {
                listItem.classList.add('current-turn');
            }
            // Base styles and current-turn styles are in main.css
            this.discNamesList.appendChild(listItem);
        });
    }

    getActionButtonsContainer() {
        return this.actionButtonsContainerElement;
    }

    updateCurrentTurnDiscName(currentDisc) {
        if (this.currentTurnDiscNameElement) {
            if (currentDisc && currentDisc.discName) {
                if (typeof currentDisc.hitPoints === 'number' && typeof currentDisc.maxHitPoints === 'number') {
                    const currentHP = Math.max(0, currentDisc.hitPoints);
                    const maxHP = Math.max(0, currentDisc.maxHitPoints); // Ensure maxHP is also non-negative
                    const lostHP = Math.max(0, maxHP - currentHP);

                    const redHearts = '❤️'.repeat(currentHP);
                    const grayHearts = '🩶'.repeat(lostHP);

                    this.currentTurnDiscNameElement.textContent = `${currentDisc.discName} ${redHearts}${grayHearts}`.trim();
                    this.currentTurnDiscNameElement.classList.remove('element-hidden');
                } else {
                    // Fallback if maxHitPoints or hitPoints is not available or not a number
                    const fallbackHP = typeof currentDisc.hitPoints === 'number' ? currentDisc.hitPoints : 'N/A';
                    this.currentTurnDiscNameElement.textContent = `${currentDisc.discName} (HP: ${fallbackHP})`;
                    this.currentTurnDiscNameElement.classList.remove('element-hidden');
                    if (typeof currentDisc.maxHitPoints !== 'number') {
                         console.warn(`UIManager: Disc "${currentDisc.discName}" is missing or has invalid maxHitPoints property for heart display. Displaying fallback.`);
                    }
                    if (typeof currentDisc.hitPoints !== 'number') {
                        console.warn(`UIManager: Disc "${currentDisc.discName}" has invalid hitPoints property for heart display. Displaying fallback.`);
                    }
                }
            } else {
                this.currentTurnDiscNameElement.textContent = '';
                this.currentTurnDiscNameElement.classList.add('element-hidden');
            }
        }
    }

    updateRageButtonVisibility(visible, enabled, charges, maxCharges) {
        if (this.rageButtonElement) {
            this.rageButtonElement.style.display = visible ? "inline-block" : "none";
            this.rageButtonElement.disabled = !enabled;
            // Ensure charges and maxCharges are numbers before calling toFixed or similar
            const currentCharges = typeof charges === 'number' ? charges : 0;
            const maximumCharges = typeof maxCharges === 'number' ? maxCharges : 0;
            this.rageButtonElement.textContent = `Rage (${currentCharges}/${maximumCharges})`;
        }
    }

    // Method to attach event listeners to UI elements managed by UIManager
    // For now, only the Rage button needs an external handler.
    // The "Play Again" button's handler is internal to _createGameOverUI.
    setupRageButtonListener(handler) {
        if (this.rageButtonElement) {
            // Remove old listener if any to prevent duplicates, though GameController should manage this better by passing a bound function once.
            // For simplicity here, we assume it's okay to re-add if GameController re-initializes UIManager or calls this multiple times.
            // A more robust approach would be for GameController to pass a consistently bound function.
            this.rageButtonElement.removeEventListener('click', this._currentRageButtonHandler);
            this._currentRageButtonHandler = handler; // Store the handler if we need to remove it specifically later
            this.rageButtonElement.addEventListener('click', handler);
        }
    }
}