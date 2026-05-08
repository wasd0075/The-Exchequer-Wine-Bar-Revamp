import { LightningElement, wire, api } from 'lwc';
import getLatestContact from '@salesforce/apex/ContactController.getLatestContact';

export default class LatestContactDisplay extends LightningElement {
    @api recordId;
    contact;
    isModalOpen = false;

    @wire(getLatestContact)
    wiredContact({ error, data }) {
        if (data) {
            this.contact = data;
        } else {
            console.error(error);
        }
    }

    get fullName() {
        return `${this.contact?.FirstName || ''} ${this.contact?.LastName || ''}`;
    }

    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }
}
