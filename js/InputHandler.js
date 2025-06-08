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
        this._handleKeyDown = this._handleKeyDown.bind(this);
        this._handleKeyUp = this._handleKeyUp.bind(this);

        this._addEventListeners();
    }

    _addEventListeners() {
        this.domElement.addEventListener('pointerdown', this._handlePointerDown);
        // Add pointermove and pointerup to window to capture drags outside the element
        window.addEventListener('pointermove', this._handlePointerMove);
        window.addEventListener('pointerup', this._handlePointerUp);

        window.addEventListener('keydown', this._handleKeyDown);
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
        const key = event.key.toLowerCase();

        if (key === 'escape' || key === 'esc') {
            if (this.isPointerDown) { // If currently aiming/dragging
                this.isPointerDown = false; // Cancel the drag
                
                // Notify GameController to cancel aiming (e.g., hide throw line, reset controls)
                if (this.gameController.cancelAiming) {
                    this.gameController.cancelAiming();
                }
                // Also update UI directly if needed (e.g., hide throw info)
                if (this.uiManager) {
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
        }
    }

    _handleKeyUp(event) {
        const key = event.key.toLowerCase();

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
        }
    }

    // Method to remove event listeners if InputHandler needs to be disposed
    dispose() {
        this.domElement.removeEventListener('pointerdown', this._handlePointerDown);
        window.removeEventListener('pointermove', this._handlePointerMove);
        window.removeEventListener('pointerup', this._handlePointerUp);
        window.removeEventListener('keydown', this._handleKeyDown);
        window.removeEventListener('keyup', this._handleKeyUp);
    }
}