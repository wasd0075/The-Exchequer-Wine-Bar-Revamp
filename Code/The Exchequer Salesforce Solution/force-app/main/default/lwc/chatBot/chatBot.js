import { LightningElement } from 'lwc';

export default class ChatBot extends LightningElement {
    hasRendered = false;

    renderedCallback() {
        if (this.hasRendered) return;
        this.hasRendered = true;

        const container = this.template.querySelector('.botContainer');

        if (container) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://nationalcollegeofireland2-dev-ed.develop.my.site.com/ESWTheExchequerService1744820141159/assets/js/bootstrap.min.js';
            script.onload = function () {
                try {
                    window.embeddedservice_bootstrap.settings.language = 'en_US';

                    window.embeddedservice_bootstrap.init(
                        '00Dd2000007fef0', // Replace with your actual Org ID
                        'The_Exchequer_Service', // Deployment Name / Bot API Name
                        'https://nationalcollegeofireland2-dev-ed.develop.my.site.com/ESWTheExchequerService1744820141159', // Deployment Endpoint
                        {
                            scrt2URL: 'https://nationalcollegeofireland2-dev-ed.develop.my.salesforce-scrt.com'
                        }
                    );
                } catch (err) {
                    console.error('Error initializing Embedded Messaging: ', err);
                }
            };

            container.appendChild(script);
        } else {
            console.error('Bot container not found.');
        }
    }
}
