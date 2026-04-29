const SHEET_URL =
    'https://script.google.com/macros/s/AKfycbxncZtcrTbIr3-8c2ezm42bIOCedi_AGBkuqczXX5g-xCGjJiTvdDGQ3pkgu1KcABT6fA/exec';

export class FeedbackForm {
    constructor() {
        this._visible = false;
        this._build();
        this._addListeners();
    }

    _build() {
        this._toggle = document.createElement('span');
        this._toggle.id = 'feedback-toggle';
        this._toggle.textContent = '💬';
        this._toggle.title = 'Leave feedback (~)';
        document.body.appendChild(this._toggle);

        this._panel = document.createElement('div');
        this._panel.id = 'feedback-panel';
        this._panel.innerHTML = `
            <div id="feedback-header">
                <span>Leave Thy Feedback, Adventurer!</span>
                <span id="feedback-close">✕</span>
            </div>
            <form id="feedback-form" novalidate>
                <label class="feedback-label">Name <span class="feedback-optional">(optional)</span></label>
                <input id="feedback-name" type="text" maxlength="32" placeholder="Your name" autocomplete="off" />
                <label class="feedback-label">Comment <span class="feedback-required">*</span></label>
                <textarea id="feedback-comment" maxlength="1000" placeholder="" rows="4"></textarea>
                <div id="feedback-char-count">0 / 1000</div>
                <div id="feedback-status"></div>
                <button id="feedback-submit" type="submit">Send</button>
            </form>
        `;
        this._panel.hidden = true;
        document.body.appendChild(this._panel);

        this._closeBtn     = this._panel.querySelector('#feedback-close');
        this._nameInput    = this._panel.querySelector('#feedback-name');
        this._commentInput = this._panel.querySelector('#feedback-comment');
        this._charCount    = this._panel.querySelector('#feedback-char-count');
        this._status       = this._panel.querySelector('#feedback-status');
        this._submitBtn    = this._panel.querySelector('#feedback-submit');
        this._form         = this._panel.querySelector('#feedback-form');
    }

    _addListeners() {
        this._toggle.addEventListener('click', () => this.toggle());
        this._closeBtn.addEventListener('click', () => this.hide());

        this._commentInput.addEventListener('input', () => {
            this._charCount.textContent = `${this._commentInput.value.length} / 1000`;
        });

        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._submit();
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === '~') {
                e.preventDefault();
                this.toggle();
                return;
            }
            if (e.key === 'Escape' && this._visible) {
                this.hide();
            }
        });
    }

    toggle() { this._visible ? this.hide() : this.show(); }

    show() {
        this._visible = true;
        this._panel.hidden = false;
        this._status.textContent = '';
        this._status.className = '';
        this._nameInput.focus();
    }

    hide() {
        this._visible = false;
        this._panel.hidden = true;
    }

    async _submit() {
        const comment = this._commentInput.value.trim();
        if (!comment) {
            this._status.textContent = 'Comment is required.';
            this._status.className = 'feedback-error';
            this._commentInput.focus();
            return;
        }

        this._submitBtn.disabled = true;
        this._status.textContent = 'Sending…';
        this._status.className = '';

        try {
            await fetch(SHEET_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    name: this._nameInput.value.trim(),
                    comment,
                }).toString(),
            });
            this._status.textContent = 'Thanks for your feedback!';
            this._status.className = 'feedback-success';
            this._nameInput.value = '';
            this._commentInput.value = '';
            this._charCount.textContent = '0 / 1000';
            setTimeout(() => this.hide(), 1800);
        } catch {
            this._status.textContent = 'Failed to send. Please try again.';
            this._status.className = 'feedback-error';
        } finally {
            this._submitBtn.disabled = false;
        }
    }
}
