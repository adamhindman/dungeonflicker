// dungeonflicker/js/InputHandler.js

export default class InputHandler {
    constructor(domElement, gameController, uiManager) {
        this.domElement = domElement; // Typically renderer.domElement
        this.gameController = gameController;
        this.uiManager = uiManager; // For UI updates like clearing throw info on Esc

        this.isPointerDown = false;
        this.pointerDownInitialPos = { x: 0, y: 0 }; // Store initial pointer down position for drag calculation

        // Bind methods to ensure 'this' context is correct
        this._handlePointerDown = this._handlePointerDown.bind(this);
        this._handlePointerMove = this._handlePointerMove.bind(this);
        this._handlePointerUp = this._handlePointerUp.bind(this);
        this._handlePointerHover = this._handlePointerHover.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);
        this._handleKeyUp = this._handleKeyUp.bind(this);

        this._addEventListeners();
    }

    _addEventListeners() {
        this.domElement.addEventListener('pointerdown', this._handlePointerDown);
        // Add pointermove and pointerup to window to capture drags outside the element
        window.addEventListener('pointermove', this._handlePointerMove);
        window.addEventListener('pointermove', this._handlePointerHover);
        window.addEventListener('pointerup', this._handlePointerUp);

        // Multiple listeners for keydown to ensure Escape is caught regardless of focus
        window.addEventListener('keydown', this._handleKeyDown, { capture: true });
        document.addEventListener('keydown', this._handleKeyDown, { capture: true });

        window.addEventListener('keyup', this._handleKeyUp);
        // Note: The window resize listener is still in GameController as it directly affects camera and renderer.
    }

    _handlePointerDown(event) {
        this.isPointerDown = true;
        this.pointerDownInitialPos.x = event.clientX;
        this.pointerDownInitialPos.y = event.clientY;

        // Pass the event and initial position to GameController
        // GameController will use this to determine which disc (if any) is selected,
        // and if it's the current player's turn for that disc.
        if (this.gameController.handlePointerDownInteraction) {
            this.gameController.handlePointerDownInteraction(event, this.pointerDownInitialPos);
        }
    }

    _handlePointerHover(event) {
        if (this.gameController.handlePointerHover) {
            this.gameController.handlePointerHover(event);
        }
    }

    _handlePointerMove(event) {
        if (!this.isPointerDown) return;

        // Pass the current event and the initial pointer down position to GameController
        // GameController will calculate drag vector, update aiming visuals, etc.
        if (this.gameController.handlePointerMoveInteraction) {
            this.gameController.handlePointerMoveInteraction(event, this.pointerDownInitialPos);
        }
    }

    _handlePointerUp(event) {
        if (!this.isPointerDown) return;
        this.isPointerDown = false;

        // Pass the final event and the initial pointer down position to GameController
        // GameController will calculate the throw, apply force, etc.
        if (this.gameController.handlePointerUpInteraction) {
            this.gameController.handlePointerUpInteraction(event, this.pointerDownInitialPos);
        }
    }

    _handleKeyDown(event) {
        if (event._handledByInputHandler) return;
        event._handledByInputHandler = true;

        const key = (event.key || '').toLowerCase();
        // console.log("InputHandler: KeyDown detected - key:", key, "original event.key:", event.key); // DETAILED DEBUG

        if (key === 'escape' || key === 'esc' || event.code === 'Escape' || event.keyCode === 27) {
            if (this.isPointerDown) {
                event.preventDefault();
                event.stopPropagation();
                this.isPointerDown = false;
                
                if (this.gameController && typeof this.gameController.cancelAiming === 'function') {
                    this.gameController.cancelAiming();
                }
                if (this.uiManager && typeof this.uiManager.updateThrowInfo === 'function') {
                   this.uiManager.updateThrowInfo("", false);
                }
            }
        }

        // Handle panning controls
        // GameController will manage the actual camera movement
        switch (key) {
            case 'w':
            case 'arrowup':
                if (this.gameController.setPanningState) this.gameController.setPanningState('up', true);
                break;
            case 's':
            case 'arrowdown':
                if (this.gameController.setPanningState) this.gameController.setPanningState('down', true);
                break;
            case 'a':
            case 'arrowleft':
                if (this.gameController.setPanningState) this.gameController.setPanningState('left', true);
                break;
            case 'd':
            case 'arrowright':
                if (this.gameController.setPanningState) this.gameController.setPanningState('right', true);
                break;
            case 'q':
                if (this.gameController.setCameraRotation) {
                    this.gameController.setCameraRotation(-1); // -1 for left
                }
                break;
            case 'e': // Changed from 'r'
                if (this.gameController.setCameraRotation) {
                    this.gameController.setCameraRotation(1);  // 1 for right
                }
                break;
            case 'r':
                if (this.gameController.recenterCamera) {
                    this.gameController.recenterCamera();
                }
                break;
            case ',':
            case '<':
                if (this.gameController.focusPrevAnimatedDead) {
                    this.gameController.focusPrevAnimatedDead();
                }
                break;
            case '.':
            case '>':
                if (this.gameController.focusNextAnimatedDead) {
                    this.gameController.focusNextAnimatedDead();
                }
                break;
            case ' ': {
                // Spacebar = end turn: click whichever end-turn button is currently visible
                event.preventDefault();
                const container = document.getElementById('action-buttons-container');
                if (container) {
                    const endTurnBtn = [...container.querySelectorAll('button')]
                        .find(b => b.id.includes('end-turn') && b.style.display !== 'none' && !b.disabled);
                    if (endTurnBtn) endTurnBtn.click();
                }
                break;
            }
            case '1':
            case '2':
            case '3':
            case '4':
            case '5': {
                // Numbered keys = action/spell buttons in visible order (excluding end-turn)
                const idx = parseInt(key) - 1;
                const container = document.getElementById('action-buttons-container');
                if (container) {
                    const actionBtns = [...container.querySelectorAll('button')]
                        .filter(b => !b.id.includes('end-turn') && b.style.display !== 'none' && !b.disabled);
                    if (actionBtns[idx]) actionBtns[idx].click();
                }
                break;
            }
        }
    }

    _handleKeyUp(event) {
        const key = (event.key || '').toLowerCase();

        // Extra safety: cancel if Escape is released
        if (key === 'escape' || key === 'esc' || event.code === 'Escape' || event.keyCode === 27) {
            if (this.isPointerDown) {
                this.isPointerDown = false;
                if (this.gameController && typeof this.gameController.cancelAiming === 'function') {
                    this.gameController.cancelAiming();
                }
                if (this.uiManager && typeof this.uiManager.updateThrowInfo === 'function') {
                   this.uiManager.updateThrowInfo("", false);
                }
            }
        }

        // Handle panning controls release
        switch (key) {
            case 'w':
            case 'arrowup':
                if (this.gameController.setPanningState) this.gameController.setPanningState('up', false);
                break;
            case 's':
            case 'arrowdown':
                if (this.gameController.setPanningState) this.gameController.setPanningState('down', false);
                break;
            case 'a':
            case 'arrowleft':
                if (this.gameController.setPanningState) this.gameController.setPanningState('left', false);
                break;
            case 'd':
            case 'arrowright':
                if (this.gameController.setPanningState) this.gameController.setPanningState('right', false);
                break;
            case 'q':
            case 'e':
                if (this.gameController.setCameraRotation) {
                    this.gameController.setCameraRotation(0); // Stop rotation
                }
                break;
        }
    }

    reset() {
        this.isPointerDown = false;
        this.pointerDownInitialPos = { x: 0, y: 0 };
        // No need to reset gameController panningKeys here as GameController should manage its own state.
        // This handler primarily manages its own direct interaction state.
    }

    // Method to remove event listeners if InputHandler needs to be disposed
    dispose() {
        this.domElement.removeEventListener('pointerdown', this._handlePointerDown);
        window.removeEventListener('pointermove', this._handlePointerMove);
        window.removeEventListener('pointermove', this._handlePointerHover);
        window.removeEventListener('pointerup', this._handlePointerUp);
        window.removeEventListener('keydown', this._handleKeyDown, { capture: true });
        document.removeEventListener('keydown', this._handleKeyDown, { capture: true });
        window.removeEventListener('keyup', this._handleKeyUp);
    }
}