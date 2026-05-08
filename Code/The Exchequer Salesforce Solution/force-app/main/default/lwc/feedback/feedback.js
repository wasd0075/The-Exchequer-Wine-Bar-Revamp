import { LightningElement, wire } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import feedbackStyle from '@salesforce/resourceUrl/feedback';

import getFeedbackList from '@salesforce/apex/FeedbackController.getFeedbackList';

export default class Feedback extends LightningElement {
  feedbackList = [];
  overallRating = '0.00';
  ratingCount = 0;
  ratingSummary = [0, 0, 0, 0, 0]; // index 0 = 1-star, index 4 = 5-star

  reviews = [];

  priorities = ['Low', 'Medium', 'High'];
  selectedPriority = '';

  connectedCallback() {
    loadStyle(this, feedbackStyle)
      .then(() => console.log('Feedback CSS loaded'))
      .catch((error) => console.error('Error loading feedback style:', error));
  }

  @wire(getFeedbackList)
  wiredFeedback({ error, data }) {
    if (data) {
      this.feedbackList = data;
      this.processRatings();
    } else if (error) {
      console.error('Error fetching feedback data:', error);
    }
  }

  processRatings() {
    let totalRating = 0;
    let ratingCount = 0;
    this.reviews = [];
    this.ratingSummary = [0, 0, 0, 0, 0]; // Reset

    this.feedbackList.forEach((item) => {
      const rating = Number(item.Rating__c);

      if (!isNaN(rating) && rating >= 1 && rating <= 5) {
        this.ratingSummary[rating - 1]++;
        totalRating += rating;
        ratingCount++;

        this.reviews.push({
          id: item.Id,
          text: '⭐'.repeat(rating) + ' – ' + item.Feedback_Comments__c,
          author: item.Customer__c || 'Anonymous',
        });
      }
    });

    this.overallRating = ratingCount > 0 ? (totalRating / ratingCount).toFixed(2) : '0.00';
    this.ratingCount = ratingCount;
  }

  get computedRatingBars() {
    return [5, 4, 3, 2, 1].map((stars, index) => {
      const count = this.ratingSummary[5 - stars]; // index matches label
      const percent = this.ratingCount > 0 ? Math.round((count / this.ratingCount) * 100) : 0;
      return {
        label: `${stars} Stars`,
        style: `width: ${percent}%`,
      };
    });
  }

  selectPriority(event) {
    this.selectedPriority = event.target.dataset.priority;

    const buttons = this.template.querySelectorAll('.priority-btn');
    buttons.forEach((btn) => btn.classList.remove('selected'));
    event.target.classList.add('selected');
  }

  handleSubmit(event) {
    event.preventDefault();

    const problem = this.template.querySelector('#problem').value;
    const department = this.template.querySelector('#department').value;
    const comments = this.template.querySelector('#comments').value;

    const feedbackData = {
      problem,
      department,
      priority: this.selectedPriority,
      comments,
    };

    console.log('Feedback Submitted:', JSON.stringify(feedbackData));
    // Optional: Add Apex method to insert this into Salesforce
  }
}
