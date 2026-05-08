import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import EXCHEQUER_IMG from '@salesforce/resourceUrl/ExchequerImg';

export default class ApplyForLoyalty extends NavigationMixin(LightningElement) {

    get backgroundStyle() {
        return `background-image: url('${EXCHEQUER_IMG}');
                background-size: cover;
                background-position: center;
                min-height: 400px;`;
    }

    handleClick() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Loyalty_User__c',
                actionName: 'new'
            }
        });
    }
}
