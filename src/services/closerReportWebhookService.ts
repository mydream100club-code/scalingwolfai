import { supabase } from '../lib/supabase';

interface CloserReportWebhookPayload {
  event: string;
  data: any;
  timestamp: string;
  user_id?: string;
}

class CloserReportWebhookService {
  private webhookUrl: string | undefined;

  constructor() {
    this.webhookUrl = import.meta.env.VITE_CLOSER_REPORT_WEBHOOK_URL;
  }

  async sendWebhook(payload: CloserReportWebhookPayload): Promise<void> {
    try {
      if (!this.webhookUrl) {
        console.log('Closer report webhook URL not configured. Skipping webhook:', payload.event);
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
        console.error('Closer report webhook failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending closer report webhook:', error);
    }
  }

  async trackCloserReportCreated(reportId: string, userId: string): Promise<void> {
    await this.sendWebhook({
      event: 'closer_report.created',
      data: { report_id: reportId },
      timestamp: new Date().toISOString(),
      user_id: userId,
    });
  }

  async trackCloserReportUpdated(reportId: string, userId: string): Promise<void> {
    await this.sendWebhook({
      event: 'closer_report.updated',
      data: { report_id: reportId },
      timestamp: new Date().toISOString(),
      user_id: userId,
    });
  }

  async trackCloserReportDeleted(reportId: string, userId: string): Promise<void> {
    await this.sendWebhook({
      event: 'closer_report.deleted',
      data: { report_id: reportId },
      timestamp: new Date().toISOString(),
      user_id: userId,
    });
  }

  private async logWebhook(payload: CloserReportWebhookPayload): Promise<void> {
    try {
      await supabase.from('webhook_logs').insert({
        event: payload.event,
        payload: payload.data,
        user_id: payload.user_id,
        created_at: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error logging closer report webhook:', error);
    }
  }
}

const closerReportWebhookService = new CloserReportWebhookService();
export default closerReportWebhookService;
