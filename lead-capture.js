/**
 * Lead Capture System for Product Maker
 * Alternative to RD Station - Cost-effective solution
 * Uses Formspree for form handling and Google Sheets for storage
 */

class LeadCapture {
    constructor(config = {}) {
        this.config = {
            formspreeEndpoint: config.formspreeEndpoint || 'https://formspree.io/f/YOUR_FORM_ID',
            googleSheetsWebhook: config.googleSheetsWebhook || null,
            trackingEnabled: config.trackingEnabled !== false,
            autoCapture: config.autoCapture !== false,
            ...config
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.trackPageView();
        
        if (this.config.autoCapture) {
            this.setupAutoCapture();
        }
    }
    
    setupEventListeners() {
        // Track CTA clicks
        document.querySelectorAll('.cta-button, [data-track="cta"]').forEach(button => {
            button.addEventListener('click', (e) => {
                this.trackEvent('cta_click', {
                    button_text: e.target.textContent.trim(),
                    button_location: this.getElementLocation(e.target)
                });
            });
        });
        
        // Track scroll depth
        this.setupScrollTracking();
        
        // Track time on page
        this.startTimeTracking();
    }
    
    setupAutoCapture() {
        // Capture email from forms automatically
        document.querySelectorAll('input[type="email"]').forEach(input => {
            input.addEventListener('blur', (e) => {
                const email = e.target.value.trim();
                if (this.isValidEmail(email)) {
                    this.captureEmail(email, 'auto_capture');
                }
            });
        });
        
        // Exit intent capture
        this.setupExitIntent();
    }
    
    setupExitIntent() {
        let exitIntentShown = false;
        
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0 && !exitIntentShown) {
                exitIntentShown = true;
                this.showExitIntentModal();
            }
        });
    }
    
    showExitIntentModal() {
        const modal = this.createExitIntentModal();
        document.body.appendChild(modal);
        
        this.trackEvent('exit_intent_shown');
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 10000);
    }
    
    createExitIntentModal() {
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                display: flex;
                justify-content: center;
                align-items: center;
                font-family: 'Inter', sans-serif;
            ">
                <div style="
                    background: linear-gradient(135deg, #1a2332, #0f1419);
                    border: 2px solid #00f5ff;
                    border-radius: 20px;
                    padding: 40px;
                    max-width: 500px;
                    text-align: center;
                    color: white;
                    position: relative;
                ">
                    <button onclick="this.closest('div').remove()" style="
                        position: absolute;
                        top: 15px;
                        right: 20px;
                        background: none;
                        border: none;
                        color: #00f5ff;
                        font-size: 24px;
                        cursor: pointer;
                    ">×</button>
                    
                    <h3 style="
                        color: #00f5ff;
                        font-size: 1.8rem;
                        margin-bottom: 20px;
                        font-weight: 700;
                    ">🚀 Espere! Não perca esta oportunidade</h3>
                    
                    <p style="
                        font-size: 1.1rem;
                        margin-bottom: 25px;
                        opacity: 0.9;
                    ">Deixe seu email e receba <strong>5 prompts gratuitos</strong> antes de sair</p>
                    
                    <form id="exitIntentForm" style="margin-bottom: 20px;">
                        <input type="email" placeholder="Seu melhor email" required style="
                            width: 100%;
                            padding: 15px;
                            border: 2px solid rgba(0, 245, 255, 0.3);
                            border-radius: 10px;
                            background: rgba(255, 255, 255, 0.1);
                            color: white;
                            font-size: 1rem;
                            margin-bottom: 15px;
                        ">
                        
                        <button type="submit" style="
                            background: linear-gradient(45deg, #ff6b9d, #00f5ff);
                            color: white;
                            border: none;
                            padding: 15px 30px;
                            border-radius: 25px;
                            font-weight: 600;
                            cursor: pointer;
                            font-size: 1rem;
                            width: 100%;
                        ">QUERO OS 5 PROMPTS GRATUITOS</button>
                    </form>
                    
                    <p style="
                        font-size: 0.9rem;
                        opacity: 0.7;
                    ">Sem spam. Apenas conteúdo de valor.</p>
                </div>
            </div>
        `;
        
        // Handle form submission
        modal.querySelector('#exitIntentForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = e.target.querySelector('input[type="email"]').value;
            this.captureEmail(email, 'exit_intent');
            
            // Show success message
            modal.querySelector('div > div').innerHTML = `
                <div style="text-align: center; color: white;">
                    <h3 style="color: #00d4aa; margin-bottom: 20px;">✅ Email capturado!</h3>
                    <p>Você receberá os 5 prompts gratuitos em breve.</p>
                    <button onclick="this.closest('div').remove()" style="
                        background: #00d4aa;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 15px;
                        margin-top: 20px;
                        cursor: pointer;
                    ">Fechar</button>
                </div>
            `;
            
            setTimeout(() => modal.remove(), 3000);
        });
        
        return modal;
    }
    
    async captureEmail(email, source = 'unknown') {
        if (!this.isValidEmail(email)) {
            return false;
        }
        
        const leadData = {
            email: email,
            source: source,
            timestamp: new Date().toISOString(),
            page_url: window.location.href,
            user_agent: navigator.userAgent,
            referrer: document.referrer,
            utm_source: this.getUrlParameter('utm_source'),
            utm_medium: this.getUrlParameter('utm_medium'),
            utm_campaign: this.getUrlParameter('utm_campaign'),
            utm_content: this.getUrlParameter('utm_content'),
            utm_term: this.getUrlParameter('utm_term')
        };
        
        try {
            // Send to Formspree
            await this.sendToFormspree(leadData);
            
            // Send to Google Sheets if configured
            if (this.config.googleSheetsWebhook) {
                await this.sendToGoogleSheets(leadData);
            }
            
            // Track the capture
            this.trackEvent('lead_captured', {
                source: source,
                email_domain: email.split('@')[1]
            });
            
            // Store locally for deduplication
            this.storeLeadLocally(email, source);
            
            return true;
        } catch (error) {
            console.error('Lead capture failed:', error);
            return false;
        }
    }
    
    async sendToFormspree(leadData) {
        const response = await fetch(this.config.formspreeEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: leadData.email,
                source: leadData.source,
                page_url: leadData.page_url,
                timestamp: leadData.timestamp,
                utm_data: {
                    utm_source: leadData.utm_source,
                    utm_medium: leadData.utm_medium,
                    utm_campaign: leadData.utm_campaign,
                    utm_content: leadData.utm_content,
                    utm_term: leadData.utm_term
                }
            })
        });
        
        if (!response.ok) {
            throw new Error('Formspree submission failed');
        }
        
        return response.json();
    }
    
    async sendToGoogleSheets(leadData) {
        const response = await fetch(this.config.googleSheetsWebhook, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(leadData)
        });
        
        if (!response.ok) {
            throw new Error('Google Sheets submission failed');
        }
        
        return response.json();
    }
    
    storeLeadLocally(email, source) {
        const leads = JSON.parse(localStorage.getItem('pm_leads') || '[]');
        leads.push({
            email: email,
            source: source,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('pm_leads', JSON.stringify(leads));
    }
    
    setupScrollTracking() {
        let maxScroll = 0;
        let scrollMilestones = [25, 50, 75, 90, 100];
        let trackedMilestones = [];
        
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                
                scrollMilestones.forEach(milestone => {
                    if (scrollPercent >= milestone && !trackedMilestones.includes(milestone)) {
                        trackedMilestones.push(milestone);
                        this.trackEvent('scroll_depth', {
                            percent: milestone
                        });
                    }
                });
            }
        });
    }
    
    startTimeTracking() {
        this.startTime = Date.now();
        
        // Track time milestones
        const timeMilestones = [30, 60, 120, 300]; // seconds
        
        timeMilestones.forEach(seconds => {
            setTimeout(() => {
                this.trackEvent('time_on_page', {
                    seconds: seconds
                });
            }, seconds * 1000);
        });
        
        // Track time on page when leaving
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - this.startTime) / 1000);
            this.trackEvent('page_exit', {
                time_spent: timeSpent
            });
        });
    }
    
    trackEvent(eventName, properties = {}) {
        if (!this.config.trackingEnabled) return;
        
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                ...properties,
                product: '70_prompts',
                timestamp: new Date().toISOString()
            });
        }
        
        // Console log for debugging
        console.log('Event tracked:', eventName, properties);
    }
    
    trackPageView() {
        this.trackEvent('page_view', {
            page_title: document.title,
            page_location: window.location.href
        });
    }
    
    getElementLocation(element) {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        return {
            x: rect.left,
            y: rect.top + scrollTop,
            section: this.getElementSection(element)
        };
    }
    
    getElementSection(element) {
        const sections = ['header', 'hero', 'features', 'pricing', 'guarantee', 'footer'];
        
        for (let section of sections) {
            const sectionElement = document.querySelector(`.${section}, #${section}, [data-section="${section}"]`);
            if (sectionElement && sectionElement.contains(element)) {
                return section;
            }
        }
        
        return 'unknown';
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
}

// Auto-initialize if not manually configured
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        if (!window.leadCapture) {
            window.leadCapture = new LeadCapture({
                // Default configuration
                formspreeEndpoint: 'https://formspree.io/f/xpwzgvpn', // Replace with actual endpoint
                trackingEnabled: true,
                autoCapture: true
            });
        }
    });
}

// Export for manual initialization
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LeadCapture;
}
