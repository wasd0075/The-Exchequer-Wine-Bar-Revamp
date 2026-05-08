import { LightningElement, track } from 'lwc';
import getLatestOpportunity from '@salesforce/apex/FeedbackController.getLatestOpportunity';

export default class FeedbackRecoveryPath extends LightningElement {
  @track currentStage = '';
  @track opportunity = {};
  @track stageGuidance = {};

  stages = [
    'Feedback Submitted',
    'Case Created',
    'Task Assigned',
    'Compensation Offered',
    'Awaiting Response',
    'Won Back',
    'Closed / Ignored'
  ];

  stageDescriptions = {
    'Feedback Submitted': {
      heading: 'Feedback Received',
      subtext: 'Customer feedback has been logged.'
    },
    'Case Created': {
      heading: 'Case Opened',
      subtext: 'A support case has been created based on feedback.'
    },
    'Task Assigned': {
      heading: 'Action In Progress',
      subtext: 'A follow-up task has been assigned internally.'
    },
    'Compensation Offered': {
      heading: 'Compensation Sent',
      subtext: 'An apology and offer has been sent to the customer.'
    },
    'Awaiting Response': {
      heading: 'Waiting on Customer',
      subtext: 'Customer has not yet responded.'
    },
    'Won Back': {
      heading: 'Customer Won Back.',
      subtext: 'CUSTOMER REDEEMED OFFER / SATISFIED'
    },
    'Closed / Ignored': {
      heading: 'Closed Without Resolution',
      subtext: 'Customer did not respond or declined the offer.'
    }
  };

  connectedCallback() {
    getLatestOpportunity()
      .then(result => {
        this.opportunity = result;
        this.currentStage = result.StageName;
        this.stageGuidance = this.stageDescriptions[result.StageName];
      })
      .catch(error => {
        console.error('Error fetching opportunity:', error);
      });
  }

  handleStageClick(event) {
    const clickedStage = event.target.value;
    this.currentStage = clickedStage;
    this.stageGuidance = this.stageDescriptions[clickedStage];
  }

  openOpportunityRecord() {
    window.open(`/lightning/r/Opportunity/${this.opportunity.Id}/view`, '_blank');
  }
}
