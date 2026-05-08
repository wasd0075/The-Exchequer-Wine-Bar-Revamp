import { LightningElement, track } from 'lwc';
import ValentinesMenu from '@salesforce/resourceUrl/ValentinesMenu';
import ChristmasMenu from '@salesforce/resourceUrl/ChristmasMenu';

export default class MenuDisplay extends LightningElement {
    @track currentMenu = 'valentine';

    get menuImage() {
        return this.currentMenu === 'valentine' ? ValentinesMenu : ChristmasMenu;
    }

    get menuTitle() {
        return this.currentMenu === 'valentine' 
            ? "💘 Valentine's Special Menu" 
            : '🎄 Christmas Celebration Menu';
    }

    get menuDescription() {
        return this.currentMenu === 'valentine'
            ? 'Our exclusive romantic selections for your Valentine evening at The Exchequer Revamp.'
            : 'A joyful feast for the festive season with cozy gourmet specials.';
    }

    get valentineBtnClass() {
        return this.currentMenu === 'valentine' ? 'active-btn' : '';
    }

    get christmasBtnClass() {
        return this.currentMenu === 'christmas' ? 'active-btn' : '';
    }

    showValentineMenu() {
        this.currentMenu = 'valentine';
    }

    showChristmasMenu() {
        this.currentMenu = 'christmas';
    }
}
