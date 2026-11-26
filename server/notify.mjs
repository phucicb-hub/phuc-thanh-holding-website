/**
 * Lead Notification Dispatcher
 * Dispatches new contact form submissions to Telegram, Webhooks (e.g. n8n), and Email.
 * Built resiliently with zero external dependencies using native Node 22 APIs.
 */

function escapeMarkdown(text) {
  if (!text) return '';
  return String(text).replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, '\\$1');
}

export async function sendTelegram(lead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  const timeStr = new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'medium',
    timeZone: 'Asia/Ho_Chi_Minh'
  }).format(new Date());

  const message =
    `🔔 *YÊU CẦU LIÊN HỆ MỚI \\#${lead.id || 'PTH'}*\n` +
    `━━━━━━━━━━━━━━━━━━━\n` +
    `👤 *Họ và tên:* ${escapeMarkdown(lead.name)}\n` +
    `📧 *Email:* ${escapeMarkdown(lead.email)}\n` +
    `📞 *Điện thoại:* ${escapeMarkdown(lead.phone || 'Chưa cung cấp')}\n` +
    `🏢 *Tổ chức:* ${escapeMarkdown(lead.organization || 'Chưa cung cấp')}\n` +
    `🎯 *Lĩnh vực:* ${escapeMarkdown(lead.field || 'Tư vấn chung')}\n` +
    `🌐 *Ngôn ngữ:* ${escapeMarkdown((lead.language || 'vi').toUpperCase())}\n\n` +
    `📝 *Nội dung:* \n_${escapeMarkdown(lead.message)}_\n` +
    `━━━━━━━━━━━━━━━━━━━\n` +
    `🕒 *Thời gian:* ${escapeMarkdown(timeStr)}\n` +
    `🔗 [Xem trong Quản trị](https://phucthanhholding.com/admin/lien-he)`;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'MarkdownV2',
      disable_web_page_preview: true,
    }),
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Telegram API responded ${res.status}: ${errText}`);
  }
  return true;
}

export async function sendWebhook(lead) {
  const webhookUrl = process.env.N8N_LEAD_WEBHOOK_URL;
  if (!webhookUrl) return false;

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: 'lead.created',
      lead,
      source: 'phucthanhholding.com',
      timestamp: new Date().toISOString(),
    }),
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) {
    throw new Error(`Webhook responded ${res.status}`);
  }
  return true;
}

export async function dispatchLeadNotifications(lead) {
  const results = await Promise.allSettled([
    sendTelegram(lead).catch((err) => {
      console.warn('[Notify] Telegram delivery failed:', err.message);
      return false;
    }),
    sendWebhook(lead).catch((err) => {
      console.warn('[Notify] Webhook delivery failed:', err.message);
      return false;
    }),
  ]);

  return {
    telegram: results[0].status === 'fulfilled' ? results[0].value : false,
    webhook: results[1].status === 'fulfilled' ? results[1].value : false,
  };
}
