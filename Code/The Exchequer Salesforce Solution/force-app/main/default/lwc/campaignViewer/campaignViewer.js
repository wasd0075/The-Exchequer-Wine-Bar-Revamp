import { LightningElement, wire, track } from 'lwc';
import CAMP_IMAGE from '@salesforce/resourceUrl/CampImg';
import getActiveCampaigns from '@salesforce/apex/CampaignController.getActiveCampaigns';

export default class CampaignViewer extends LightningElement {
  @track campaigns = [];
  @track currentIndex = 0;
  @track currentCampaign = {};
  @track posterUrl = CAMP_IMAGE;

  @wire(getActiveCampaigns)
  wiredCampaigns({ error, data }) {
    if (data) {
      this.campaigns = data;
      this.setCampaignDetails(0);
    } else if (error) {
      console.error('Error fetching campaigns:', error);
    }
  }

  setCampaignDetails(index) {
    this.currentIndex = index;
    this.currentCampaign = this.campaigns[index];
  }

  showPrevious() {
    const prev = this.currentIndex > 0 ? this.currentIndex - 1 : this.campaigns.length - 1;
    this.setCampaignDetails(prev);
  }

  showNext() {
    const next = (this.currentIndex + 1) % this.campaigns.length;
    this.setCampaignDetails(next);
  }

  // 👇 Generate grid for the current campaign's month with highlights
  get calendarDays() {
    if (!this.currentCampaign.StartDate || !this.currentCampaign.EndDate) return [];

    const startDate = new Date(this.currentCampaign.StartDate);
    const endDate = new Date(this.currentCampaign.EndDate);
    const calendarMonth = startDate.getMonth();
    const calendarYear = startDate.getFullYear();

    const firstOfMonth = new Date(calendarYear, calendarMonth, 1);
    const lastOfMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();

    const days = [];

    for (let i = 1; i <= lastOfMonth; i++) {
      const currentDate = new Date(calendarYear, calendarMonth, i);
      const isoDate = currentDate.toISOString().split('T')[0];

      const isWithinRange = currentDate >= startDate && currentDate <= endDate;

      days.push({
        day: i,
        dateStr: isoDate,
        className: isWithinRange ? 'highlight' : 'day'
      });
    }

    return days;
  }

  get calendarTitle() {
    if (!this.currentCampaign.StartDate) return '';
    const date = new Date(this.currentCampaign.StartDate);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }
}
