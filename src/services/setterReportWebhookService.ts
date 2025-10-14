import { supabase } from '../lib/supabase';

interface SetterReportWebhookPayload {
  event: string;
  data: any;
  timestamp: string;
  user_id?: string;
}

class SetterReportWebhookService {
  private webhookUrl: string | undefined;

  constructor() {
    this.webhookUrl = import.meta.env.VITE_SETTER_REPORT_WEBHOOK_URL;
  }

  async sendWebhook(payload: SetterReportWebhookPayload): Promise<void> {
    try {
      if (!this.webhookUrl) {
        console.log('Setter report webhook URL not configured. Skipping webhook:', payload.event);
        return;
      }

      await this.logWebhook(payload);

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.error('Setter report webhook failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending setter report webhook:', error);
    }
  }

  async trackSetterReportCreated(reportId: string, userId: string): Promise<void> {
    await this.sendWebhook({
      event: 'setter_report.created',
      data: { report_id: reportId },
      timestamp: new Date().toISOString(),
      user_id: userId,
    });
  }

  async trackSetterReportUpdated(reportId: string, userId: string): Promise<void> {
    await this.sendWebhook({
      event: 'setter_report.updated',
      data: { report_id: reportId },
      timestamp: new Date().toISOString(),
      user_id: userId,
    });
  }

  async trackSetterReportDeleted(reportId: string, userId: string): Promise<void> {
    await this.sendWebhook({
      event: 'setter_report.deleted',
      data: { report_id: reportId },
      timestamp: new Date().toISOString(),
      user_id: userId,
    });
  }

  private async logWebhook(payload: SetterReportWebhookPayload): Promise<void> {
    try {
      await supabase.from('webhook_logs').insert({
        event: payload.event,
        payload: payload.data,
        user_id: payload.user_id,
        created_at: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error logging setter report webhook:', error);
    }
  }
}

const setterReportWebhookService = new SetterReportWebhookService();
export default setterReportWebhookService;
