import { html } from "lit";

import LitWithoutShadowDom from "./LitWithoutShadowDom";

class ModalMessage extends LitWithoutShadowDom {
    render() {
        return html`
            <div class="modal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content border border-success border-3">
                        <div class="modal-body">
                            <p>Story successfully added. Click "Close" to go back to add story or click "View" to view the story.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">View</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('modal-message', ModalMessage);