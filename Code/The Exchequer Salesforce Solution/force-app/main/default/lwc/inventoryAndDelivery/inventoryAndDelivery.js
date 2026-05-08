import { LightningElement, wire, track } from 'lwc';
import getInventoryItems from '@salesforce/apex/InventoryController.getInventoryItems';
import wineImage from '@salesforce/resourceUrl/WineImg';
import deliveryPoster from '@salesforce/resourceUrl/DelPos';

export default class InventoryAndDelivery extends LightningElement {
    @track inventoryItems = [];
    @track cart = [];
    deliveryPoster = deliveryPoster;
    wineImage = wineImage;

    @wire(getInventoryItems)
    wiredItems({ error, data }) {
        if (data) {
            this.inventoryItems = data.map(item => ({
                ...item,
                imageUrl: wineImage,
                quantity: 0
            }));
        } else if (error) {
            console.error('Error loading inventory:', error);
        }
    }

    handleAddToCart(event) {
        const itemId = event.target.dataset.id;
        const selectedItem = this.inventoryItems.find(i => i.Id === itemId);
        const existing = this.cart.find(i => i.Id === itemId);

        if (existing) {
            existing.quantity += 1;
            existing.total = (existing.quantity * existing.price).toFixed(2);
        } else {
            this.cart = [
                ...this.cart,
                {
                    Id: selectedItem.Id,
                    Name: selectedItem.Name,
                    price: selectedItem.Cost_Per_Unit__c,
                    quantity: 1,
                    category: selectedItem.Category__c,
                    total: selectedItem.Cost_Per_Unit__c.toFixed(2)
                }
            ];
        }

        this.cart = [...this.cart]; // Trigger reactivity
    }

    removeFromCart(event) {
        const itemId = event.target.dataset.id;
        this.cart = this.cart.filter(item => item.Id !== itemId);
    }

    get totalPrice() {
        return this.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2);
    }
}
