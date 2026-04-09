// src/app/api/send-review/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const {
            foodRating,
            serviceRating,
            atmosphereRating,
            cityRating,
            saladsRating,
            foodFeedback,
            serviceFeedback,
            atmosphereFeedback,
            cityFeedback,
            saladsFeedback,
            isEnglish
        } = await request.json();

        const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_ID;

        if (!BOT_TOKEN || !ADMIN_CHAT_ID) {
            console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_ADMIN_ID');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        let message;
        if (isEnglish) {
            message = `🍽️ *LAZIZ HOUSE - NEW REVIEW*
━━━━━━━━━━━━━━━━━━━━

🍜 *Cuisine:* ${foodRating}/5
${foodFeedback ? `📝 ${foodFeedback}` : '📝 No comment'}

${saladsRating > 0 ? `🥗 *Salads:* ${saladsRating}/5
${saladsFeedback ? `📝 ${saladsFeedback}` : '📝 No comment'}

` : ''}🏛️ *Bukhara City:* ${cityRating}/5
${cityFeedback ? `📝 ${cityFeedback}` : '📝 No comment'}

⭐ *Service:* ${serviceRating}/5
${serviceFeedback ? `📝 ${serviceFeedback}` : '📝 No comment'}

🏠 *Atmosphere:* ${atmosphereRating}/5
${atmosphereFeedback ? `📝 ${atmosphereFeedback}` : '📝 No comment'}

━━━━━━━━━━━━━━━━━━━━
🕐 ${new Date().toLocaleString('en-US')}
🌐 Via Website`;
        } else {
            message = `🍽️ *LAZIZ HOUSE - НОВЫЙ ОТЗЫВ*
━━━━━━━━━━━━━━━━━━━━

🍜 *Кухня:* ${foodRating}/5
${foodFeedback ? `📝 ${foodFeedback}` : '📝 Без комментария'}

${saladsRating > 0 ? `🥗 *Салаты:* ${saladsRating}/5
${saladsFeedback ? `📝 ${saladsFeedback}` : '📝 Без комментария'}

` : ''}🏛️ *Город Бухара:* ${cityRating}/5
${cityFeedback ? `📝 ${cityFeedback}` : '📝 Без комментария'}

⭐ *Обслуживание:* ${serviceRating}/5
${serviceFeedback ? `📝 ${serviceFeedback}` : '📝 Без комментария'}

🏠 *Атмосфера:* ${atmosphereRating}/5
${atmosphereFeedback ? `📝 ${atmosphereFeedback}` : '📝 Без комментария'}

━━━━━━━━━━━━━━━━━━━━
🕐 ${new Date().toLocaleString('ru-RU')}
🌐 Через веб-сайт`;
        }

        const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: ADMIN_CHAT_ID,
                text: message,
                parse_mode: 'Markdown',
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Telegram API error:', data);
            return NextResponse.json(
                { error: 'Failed to send message to Telegram' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Review sent successfully'
        });

    } catch (error) {
        console.error('Error sending review:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}