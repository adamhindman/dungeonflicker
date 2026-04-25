export default class UIManager {
    constructor(restartGameCallback, recenterCameraCallback, focusCameraOnDiscCallback, restartLevelCallback) {
        this.throwInfoDiv = document.getElementById("throw-info");
        this.discNamesList = document.getElementById("disc-names-list");
        this.focusCameraOnDiscCallback = focusCameraOnDiscCallback;
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

            this.moveStatusChipElement = document.createElement("div");
            this.moveStatusChipElement.id = "move-status-chip";
            this.moveStatusChipElement.classList.add("element-hidden");
            this.powersAreaElement.appendChild(this.moveStatusChipElement);

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
            this.moveStatusChipElement = null;
            this.actionButtonsContainerElement = null; // Ensure it's null if powersAreaElement is not found
        }

        this.gameOverMessageContainer = null;
        this.gameOverMessageTextElement = null;
        this.playAgainButton = null; // Store the button reference
        this.cameraControlsButton = null;
        this.cameraControlsMenu = null;

        this._createGameOverUI(restartGameCallback, restartLevelCallback);
        this._createCameraControlsButton(recenterCameraCallback);

        this.floatingTextContainer = document.createElement("div");
        this.floatingTextContainer.id = "floating-text-container";
        Object.assign(this.floatingTextContainer.style, {
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: "1005",
            overflow: "hidden"
        });
        document.body.appendChild(this.floatingTextContainer);
        this.activeFloatingTexts = [];
    }

    dissolveBlackOverlay(onComplete) {
        const overlay = document.getElementById('black-overlay');
        if (!overlay) { if (onComplete) onComplete(); return; }
        overlay.style.opacity = '0';
        overlay.addEventListener('transitionend', () => {
            overlay.style.display = 'none';
            if (onComplete) onComplete();
        }, { once: true });
    }

    showBlackOverlay() {
        const overlay = document.getElementById('black-overlay');
        if (!overlay) return;
        overlay.style.transition = 'none';
        overlay.style.display = '';
        overlay.style.opacity = '1';
        void overlay.offsetHeight;
    }

    fadeBlackOverlayAfterDelay(delayMs = 1000, fadeMs = 600, onComplete) {
        const overlay = document.getElementById('black-overlay');
        if (!overlay) { if (onComplete) onComplete(); return; }

        window.setTimeout(() => {
            overlay.style.transition = `opacity ${fadeMs}ms ease-out`;
            overlay.style.opacity = '0';
            overlay.addEventListener('transitionend', () => {
                overlay.style.display = 'none';
                overlay.style.transition = '';
                if (onComplete) onComplete();
            }, { once: true });
        }, delayMs);
    }

    showFloatingText(disc, amount, isHealing) {
        const textElement = document.createElement("div");
        const displayAmount = Math.abs(amount);
        textElement.textContent = `${isHealing ? '+' : '-'}${displayAmount} HP`;
        Object.assign(textElement.style, {
            position: "absolute",
            color: isHealing ? "#4488ff" : "#ff4444",
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
            textShadow: "1px 1px 2px black, -1px -1px 2px black, 1px -1px 2px black, -1px 1px 2px black",
            transform: "translate(-50%, -50%)",
            opacity: "0",
            fontSize: "16px",
            whiteSpace: "nowrap",
            pointerEvents: "none"
        });

        this.floatingTextContainer.appendChild(textElement);

        this.activeFloatingTexts.push({
            element: textElement,
            disc: disc,
            startTime: performance.now(),
            duration: 2000, // 2 seconds
            startOffsetY: 2, // Starts slightly above the disc
            offsetX: (Math.random() - 0.5) * 1.5,
            offsetZ: (Math.random() - 0.5) * 1.5
        });
    }

    updateFloatingTexts(camera) {
        if (!camera) return;

        const now = performance.now();
        for (let i = this.activeFloatingTexts.length - 1; i >= 0; i--) {
            const ft = this.activeFloatingTexts[i];
            const elapsed = now - ft.startTime;
            const progress = elapsed / ft.duration;

            if (progress >= 1) {
                ft.element.remove();
                this.activeFloatingTexts.splice(i, 1);
                continue;
            }

            // Opacity: starts more transparent, gets solid, then fades out
            let opacity;
            if (progress < 0.2) {
                opacity = 0.3 + 0.7 * (progress / 0.2);
            } else {
                opacity = 1 - ((progress - 0.2) / 0.8);
            }

            const currentOffsetY = ft.startOffsetY + (progress * 4); // Rises higher
            const currentFontSize = 16 + (progress * 12); // Increases in font size

            if (ft.disc && ft.disc.mesh) {
                const pos = ft.disc.mesh.position.clone();
                pos.x += ft.offsetX;
                pos.y += currentOffsetY;
                pos.z += ft.offsetZ;

                pos.project(camera);

                const x = (pos.x * 0.5 + 0.5) * window.innerWidth;
                const y = (pos.y * -0.5 + 0.5) * window.innerHeight;

                if (pos.z < 1) {
                    ft.element.style.left = `${x}px`;
                    ft.element.style.top = `${y}px`;
                    ft.element.style.fontSize = `${currentFontSize}px`;
                    ft.element.style.opacity = opacity.toString();
                    ft.element.style.display = "block";
                } else {
                    ft.element.style.display = "none";
                }
            } else {
                // If disc is destroyed, let the text stay where it was but continue to animate font size and opacity
                ft.element.style.fontSize = `${currentFontSize}px`;
                ft.element.style.opacity = opacity.toString();
            }
        }
    }

    _createGameOverUI(restartGameCallback, restartLevelCallback) {
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

        const restartLevelButton = document.createElement("button");
        restartLevelButton.textContent = "Restart Level";
        Object.assign(restartLevelButton.style, {
            marginTop: "10px",
            marginLeft: "10px",
            padding: "10px 20px",
            fontSize: "1em",
            color: "white",
            backgroundColor: "#555",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
        });

        restartLevelButton.addEventListener("mouseover", () => {
            restartLevelButton.style.backgroundColor = "#777";
        });
        restartLevelButton.addEventListener("mouseout", () => {
            restartLevelButton.style.backgroundColor = "#555";
        });

        restartLevelButton.addEventListener("click", () => {
            this.hideGameOver();
            if (restartLevelCallback) {
                restartLevelCallback();
            }
        });

        this.gameOverMessageContainer.appendChild(restartLevelButton);
        document.body.appendChild(this.gameOverMessageContainer);
    }

    _createCameraControlsButton(recenterCameraCallback) {
        const wrapper = document.createElement('div');
        wrapper.id = 'camera-controls-wrapper';

        const menu = document.createElement('div');
        menu.id = 'camera-controls-menu';
        menu.innerHTML = `<ul>
            <li><kbd>R</kbd> Recenter</li>
            <li><kbd>Q</kbd>/<kbd>E</kbd> Rotate</li>
            <li><kbd>A</kbd>/<kbd>D</kbd> Pan</li>
            <li><kbd>W</kbd>/<kbd>S</kbd> Pan Up/Down</li>
            <li><kbd>Scroll</kbd> Zoom</li>
        </ul>`;

        const button = document.createElement('button');
        button.id = 'camera-controls-button';
        button.innerHTML = '<kbd>C</kbd> Camera Controls';

        button.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleCameraControlsMenu();
        });

        document.addEventListener('click', () => {
            this.closeCameraControlsMenu();
        });

        wrapper.appendChild(menu);
        wrapper.appendChild(button);
        document.body.appendChild(wrapper);

        this.cameraControlsButton = button;
        this.cameraControlsMenu = menu;
    }

    toggleCameraControlsMenu() {
        const open = this.cameraControlsMenu.classList.toggle('open');
        this.cameraControlsButton.classList.toggle('open', open);
        if (this._menuSoundCallback) this._menuSoundCallback();
    }

    closeCameraControlsMenu() {
        this.cameraControlsMenu.classList.remove('open');
        this.cameraControlsButton.classList.remove('open');
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
        }
    }

    updateDiscNames(discs, currentDisc) {
        if (!this.discNamesList) return;
        this.discNamesList.innerHTML = ""; // Clear previous names

        const currentDiscName = currentDisc ? currentDisc.discName : null;

        // Filter discs
        const playerDiscs = discs.filter(d =>
            d.type === 'player' &&
            d.kind !== 'Orb' &&
            d.kind !== 'HealingOrb' &&
            d.kind !== 'AnimatedDead' &&
            d.kind !== 'Bomb' &&
            d.kind !== 'RoguePotion'
        );
        const npcDiscs = discs.filter(d => d.type === 'NPC');

        // Helper function to create a disc list item
        const createDiscListItem = (disc) => {
            const listItem = document.createElement("li");
            listItem.addEventListener('click', () => {
                if (this.focusCameraOnDiscCallback) {
                    this.focusCameraOnDiscCallback(disc.discName);
                }
            });
            const hpDisplay = (typeof disc.hitPoints === 'number') ? disc.hitPoints : 'N/A';
            let displayName = `${disc.discName} (${hpDisplay} HP)`;

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
                // const discIdentifier = disc && disc.discName ? disc.discName : (disc && disc.kind ? disc.kind : 'Unknown Disc');
            }

            // Set dynamic background color
            colorCircle.style.backgroundColor = colorString;
            if (disc.dead) {
                colorCircle.style.backgroundColor = '#808080'; // Set to gray if dead
            }
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
            return listItem;
        };

        // Helper function to create a header
        const createHeaderListItem = (text) => {
            const headerItem = document.createElement("li");
            headerItem.textContent = text;
            headerItem.classList.add('tracker-section-header');
            return headerItem;
        };

        // Add Players section
        if (playerDiscs.length > 0) {
            this.discNamesList.appendChild(createHeaderListItem("Players"));
            playerDiscs.forEach(disc => {
                this.discNamesList.appendChild(createDiscListItem(disc));
            });
        }

        // Add Monsters section
        if (npcDiscs.length > 0) {
            this.discNamesList.appendChild(createHeaderListItem("Monsters"));
            npcDiscs.forEach(disc => {
                this.discNamesList.appendChild(createDiscListItem(disc));
            });
        }
    }

    getActionButtonsContainer() {
        return this.actionButtonsContainerElement;
    }

    updateCurrentTurnDiscName(currentDisc) {
        if (this.currentTurnDiscNameElement) {
            if (currentDisc && currentDisc.discName) {
                const isRogueSubDisc = currentDisc.kind === 'Bomb' || currentDisc.kind === 'RoguePotion';
                if (isRogueSubDisc) {
                    this.currentTurnDiscNameElement.textContent = currentDisc.discName;
                    this.currentTurnDiscNameElement.classList.remove('element-hidden');
                    this.updateMoveStatusChip(currentDisc);
                    return;
                }

                if (typeof currentDisc.hitPoints === 'number' && typeof currentDisc.maxHitPoints === 'number') {
                    const currentHP = Math.max(0, currentDisc.hitPoints);
                    const redHearts = '❤️'.repeat(currentHP);

                    // Clear existing content
                    this.currentTurnDiscNameElement.innerHTML = '';

                    // Add disc name
                    const nameNode = document.createTextNode(currentDisc.discName + ' ');
                    this.currentTurnDiscNameElement.appendChild(nameNode);

                    // Create a div for hearts
                    const heartsDiv = document.createElement('div');
                    heartsDiv.classList.add('hearts-container'); // Add class for styling
                    heartsDiv.style.display = 'inline-block'; // Keep hearts on the same line as name
                    heartsDiv.textContent = redHearts;
                    this.currentTurnDiscNameElement.appendChild(heartsDiv);

                    // Add Charges display for Barbarian
                    if (currentDisc.kind === 'Barbarian' && currentDisc.gameController) {
                        const chargesDiv = document.createElement('div');
                        chargesDiv.classList.add('mana-container');
                        chargesDiv.style.display = 'block';
                        chargesDiv.style.fontSize = '0.8em';
                        chargesDiv.style.marginTop = '4px';
                        const charges = currentDisc.gameController.barbarianController.rageCharges;
                        chargesDiv.textContent = `Charges: ${'⚡'.repeat(charges)}`;
                        this.currentTurnDiscNameElement.appendChild(chargesDiv);
                    }

                    // Add Mana display for Wizard
                    if (currentDisc.kind === 'Wizard' && currentDisc.gameController) {
                        const manaDiv = document.createElement('div');
                        manaDiv.classList.add('mana-container');
                        manaDiv.style.display = 'block';
                        manaDiv.style.fontSize = '0.8em';
                        manaDiv.style.marginTop = '4px';
                        manaDiv.textContent = `Mana: ${'🔵'.repeat(currentDisc.gameController.wizardController.mana)}`;
                        this.currentTurnDiscNameElement.appendChild(manaDiv);
                    }

                    // Add Mana display for Necromancer
                    if (currentDisc.kind === 'Necromancer' && currentDisc.gameController) {
                        const manaDiv = document.createElement('div');
                        manaDiv.classList.add('mana-container');
                        manaDiv.style.display = 'block';
                        manaDiv.style.fontSize = '0.8em';
                        manaDiv.style.marginTop = '4px';
                        manaDiv.textContent = `Mana: ${'💀'.repeat(currentDisc.gameController.necromancerController.mana)}`;
                        this.currentTurnDiscNameElement.appendChild(manaDiv);
                    }

                    // Add Charges display for Rogue
                    if (currentDisc.kind === 'Rogue' && currentDisc.gameController) {
                        const chargesDiv = document.createElement('div');
                        chargesDiv.classList.add('mana-container');
                        chargesDiv.style.display = 'block';
                        chargesDiv.style.fontSize = '0.8em';
                        chargesDiv.style.marginTop = '4px';
                        const charges = currentDisc.gameController.rogueController.charges;
                        chargesDiv.textContent = `Charges: ${'⚡'.repeat(charges)}`;
                        this.currentTurnDiscNameElement.appendChild(chargesDiv);
                    }

                    this.currentTurnDiscNameElement.classList.remove('element-hidden');
                    this.updateMoveStatusChip(currentDisc);
                } else {
                    // Fallback if maxHitPoints or hitPoints is not available or not a number
                    const fallbackHP = typeof currentDisc.hitPoints === 'number' ? currentDisc.hitPoints : 'N/A';
                    this.currentTurnDiscNameElement.textContent = `${currentDisc.discName} (HP: ${fallbackHP})`;
                    this.currentTurnDiscNameElement.classList.remove('element-hidden');
                    this.updateMoveStatusChip(currentDisc);
                    if (typeof currentDisc.maxHitPoints !== 'number') {
                    }
                    if (typeof currentDisc.hitPoints !== 'number') {
                    }
                }
            } else {
                this.currentTurnDiscNameElement.textContent = '';
                this.currentTurnDiscNameElement.classList.add('element-hidden');
                this.updateMoveStatusChip(null);
            }
        }
    }

    updateMoveStatusChip(currentDisc) {
        if (!this.moveStatusChipElement) return;

        if (!currentDisc || currentDisc.dead || currentDisc.type !== 'player') {
            this.moveStatusChipElement.classList.add('element-hidden');
            return;
        }
        if (currentDisc.kind === 'Bomb' || currentDisc.kind === 'RoguePotion' || currentDisc.kind === 'Orb' || currentDisc.kind === 'HealingOrb' || currentDisc.kind === 'AnimatedDead') {
            this.moveStatusChipElement.classList.add('element-hidden');
            return;
        }

        const gc = currentDisc.gameController;
        let moveUsed = !!currentDisc.hasThrown;
        if (gc && currentDisc.kind === 'Wizard') {
            moveUsed = !!gc.wizardController.hasMovedThisTurn;
        } else if (gc && currentDisc.kind === 'Necromancer') {
            moveUsed = !!gc.necromancerController.hasMovedThisTurn;
        }

        this.moveStatusChipElement.textContent = moveUsed ? 'Move used' : 'Move available';
        this.moveStatusChipElement.dataset.state = moveUsed ? 'used' : 'available';
        this.moveStatusChipElement.classList.remove('element-hidden');
    }

    updateRageButtonVisibility(visible, enabled, charges, maxCharges) {
        if (this.rageButtonElement) {
            this.rageButtonElement.style.display = visible ? "inline-block" : "none";
            this.rageButtonElement.disabled = !enabled;
            // Ensure charges and maxCharges are numbers before calling toFixed or similar
            const currentCharges = typeof charges === 'number' ? charges : 0;
            const maximumCharges = typeof maxCharges === 'number' ? maxCharges : 0;
            this.rageButtonElement.innerHTML = `<kbd>1</kbd> Rage`;
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
