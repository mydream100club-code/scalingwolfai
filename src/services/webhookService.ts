import { supabase } from '../lib/supabase';

interface WebhookPayload {
  event: string;
  data: any;
  timestamp: string;
  user_id?: string;
}

class WebhookService {
  private webhookUrl: string | undefined;

  constructor() {
    this.webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
  }

  async sendWebhook(payload: WebhookPayload): Promise<void> {
    try {
      // If webhook URL is not configured, just log and return
      if (!this.webhookUrl) {
        console.log('Webhook URL not configured. Skipping webhook:', payload.event);
        return;
      }

      // Log webhook to database for tracking
      await this.logWebhook(payload);

      // Send webhook to external service
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error('Webhook failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending webhook:', error);
    }
  }

  async trackLeadCreated(leadId: string, userId: string): Promise<void> {
    await this.sendWebhook({
      event: 'lead.created',
      data: { lead_id: leadId },
      timestamp: new Date().toISOString(),
      user_id: userId,
    });
  }

  async trackLeadStatusChanged(leadId: string, oldStatus: string, newStatus: string, userId: string): Promise<void> {
    await this.sendWebhook({
      event: 'lead.status_changed',
      data: { lead_id: leadId, old_status: oldStatus, new_status: newStatus },
      timestamp: new Date().toISOString(),
      user_id: userId,
    });
  }

  async trackLeadDeleted(leadId: string, userId: string): Promise<void> {
    await this.sendWebhook({
      event: 'lead.deleted',
      data: { lead_id: leadId },
      timestamp: new Date().toISOString(),
      user_id: userId,
    });
  }

  private async logWebhook(payload: WebhookPayload): Promise<void> {
    try {
      await supabase.from('webhook_logs').insert({
        event: payload.event,
        payload: payload.data,
        user_id: payload.user_id,
        created_at: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error logging webhook:', error);
    }
  }
}

const webhookService = new WebhookService();
export default webhookService;
