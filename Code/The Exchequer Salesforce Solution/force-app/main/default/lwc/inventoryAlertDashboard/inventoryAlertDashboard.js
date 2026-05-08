import { LightningElement, track, wire } from 'lwc';
import getCriticalInventory from '@salesforce/apex/InventoryController.getCriticalInventory';
import getTasksForInventory from '@salesforce/apex/InventoryController.getTasksForInventory';

export default class InventoryAlertDashboard extends LightningElement {
  @track criticalInventory = [];
  @track selectedItem;
  @track associatedTasks = [];

  @wire(getCriticalInventory)
  wiredInventory({ error, data }) {
    if (data) {
      this.criticalInventory = data;
      if (data.length > 0) {
        this.selectedItem = data[0];
        this.fetchTasks(data[0].Id);
      }
    } else if (error) {
      console.error('Error fetching inventory:', error);
    }
  }

  handleShowDetails(event) {
    const id = event.target.dataset.id;
    const item = this.criticalInventory.find(i => i.Id === id);
    this.selectedItem = item;
    this.fetchTasks(id);
  }

  fetchTasks(inventoryId) {
    getTasksForInventory({ inventoryId })
      .then(result => {
        this.associatedTasks = result;
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
        this.associatedTasks = [];
      });
  }

  get showAlert() {
    return this.selectedItem && 
           this.selectedItem.Expiry_In_Dates__c < 3 &&
           this.selectedItem.Waste_Units__c > 10;
  }
}
