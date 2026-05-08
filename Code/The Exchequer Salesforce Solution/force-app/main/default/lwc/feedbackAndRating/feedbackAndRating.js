import { LightningElement, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getRatingStats from '@salesforce/apex/FeedbackRatingController.getRatingStats';
import getRecentReviews from '@salesforce/apex/FeedbackRatingController.getRecentReviews';

export default class FeedbackAndRating extends NavigationMixin (LightningElement) {

    @track totalReviews = 0;
    @track averageRating = 0;
    @track ratingCounts = {};
    @track barData = [];
    starArray = [];
    @track reviews = [];

    @wire(getRecentReviews)
    wiredReviews({ error, data }) {
        if (data) {
            this.reviews = data.map((review) => {
                const rating = parseInt(review.rating, 10);

                // Create stars array with unique keys
                const stars = Array(5).fill('☆').map((_, i) => ({
                    char: i < rating ? '★' : '☆',
                    key: `${review.name}-star-${i}`
                }));

                return {
                    ...review,
                    stars,
                    rating,
                    date: new Date(review.date).toLocaleDateString()
                };
            });
        } else if (error) {
            console.error('Error loading reviews:', error);
        }
    }
  
    connectedCallback() {
      getRatingStats().then(data => {
        this.totalReviews = data.totalReviews;
        this.averageRating = parseFloat(data.averageRating).toFixed(2);
        this.ratingCounts = data.ratings;
  
        const max = Math.max(...Object.values(this.ratingCounts));
        this.barData = Object.keys(this.ratingCounts)
          .sort((a, b) => b - a)
          .map(key => {
            const width = (this.ratingCounts[key] / max) * 100;
            return {
              label: key,
              style: `width:${width}%`,
            };
          });
  
        this.starArray = Array.from({ length: 5 }, (_, i) => (i < Math.round(this.averageRating) ? '★' : '☆'));
      });
    }

    getStarArray(count) {
        return Array.from({ length: 5 }, (_, i) => (i < count ? '★' : '☆'));
    }

    navigateToNewFeedback() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
            objectApiName: 'Feedback_and_Rating__c',
            actionName: 'new'
            }
        });
    }

    getStarChar(filled) {
      return filled ? '★' : '☆';
    }
  
}