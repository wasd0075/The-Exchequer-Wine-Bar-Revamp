import { LightningElement, track, wire } from 'lwc';
import getCampaigns from '@salesforce/apex/CampaignController.getCampaigns';
import getEventsForCampaign from '@salesforce/apex/CampaignController.getEventsForCampaign';
import getCampaignMembers from '@salesforce/apex/CampaignController.getCampaignMembers';
import CampImg from '@salesforce/resourceUrl/CampImg';

export default class CampaignDashboard extends LightningElement {
  @track campaigns = [];
  @track selectedCampaign;
  @track associatedEvents = [];
  @track campaignMembers = [];
  @track campaignImageUrl = CampImg;

  @wire(getCampaigns)
  wiredCampaigns({ error, data }) {
    if (data) {
      this.campaigns = data;
      this.selectedCampaign = data[0];
      this.fetchEvents(data[0].Id);
      this.fetchMembers(data[0].Id);
    } else if (error) {
      console.error(error);
    }
  }

  handleShowDetails(event) {
    const selectedId = event.target.dataset.id;
    const campaign = this.campaigns.find(camp => camp.Id === selectedId);
    this.selectedCampaign = campaign;
    this.fetchEvents(selectedId);
    this.fetchMembers(selectedId);
  }

  fetchEvents(campaignId) {
    getEventsForCampaign({ campaignId })
      .then(result => {
        this.associatedEvents = result;
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        this.associatedEvents = [];
      });
  }

  fetchMembers(campaignId) {
    getCampaignMembers({ campaignId })
      .then(result => {
        this.campaignMembers = result;
      })
      .catch(error => {
        console.error('Error fetching members:', error);
        this.campaignMembers = [];
      });
  }
}
