import { LightningElement, wire, track, api } from 'lwc';
import ChartJS from '@salesforce/resourceUrl/ChartJS';
import { loadScript } from 'lightning/platformResourceLoader';
import getFeedbackList from '@salesforce/apex/FeedbackController.getFeedbackList';

export default class FeedbackDashboard extends LightningElement {
  @track feedbackRecords = [];
  @track selectedFeedback;
  chart;
  chartInitialized = false;
  //@api feedbackRecords = [];

    @wire(getFeedbackList)
    wiredFeedback({ error, data }) {
        if (data) {
            this.feedbackRecords = data;
            this.selectedFeedback = data[0];

            if (this.chartInitialized) {
            this.renderChart(); // Render only when both chart and data are ready
            }
        } else if (error) {
            console.error(error);
        }
    }

  handleShowDetails(event) {
    const selectedId = event.target.dataset.id;
    this.selectedFeedback = this.feedbackRecords.find(fb => fb.Id === selectedId);
  }

  renderedCallback() {
    if (this.chartInitialized) return;
  
    Promise.all([loadScript(this, ChartJS)])
      .then(() => {
        this.chartInitialized = true;
        if (this.feedbackRecords.length > 0) {
          this.renderChart(); // only render if data already loaded
        }
      })
      .catch(error => {
        console.error('Chart.js failed to load', error);
      });
  }

  renderChart() {
    // Prepare data: group by FeedbackDate and average ratings
    const dailyRatings = {};

    this.feedbackRecords.forEach(feedback => {
      const date = feedback.Feedback_Date__c;
      if (!dailyRatings[date]) {
        dailyRatings[date] = { sum: 0, count: 0 };
      }
      dailyRatings[date].sum += parseInt(feedback.Rating__c);
      dailyRatings[date].count++;
    });

    const labels = Object.keys(dailyRatings);
    const data = labels.map(date => {
      const { sum, count } = dailyRatings[date];
      return (sum / count).toFixed(2);
    });

    const ctx = this.template.querySelector('.chartCanvas').getContext('2d');
    this.chart = new window.Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Average Rating',
          data: data,
          backgroundColor: '#0070d2'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 0,
            max: 5
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
}
