<?php
// [Webhook URL]欄に表示されているURL
$webhook_url = 'https://hooks.slack.com/services/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';

// Slackに投稿するメッセージ
$msg = array(
    'username' => 'Slackテスト',
    'text' => 'Hello, Slack Incoming WebHooks.'
);
//他にも指定色々。https://api.slack.com/incoming-webhooks
$msg = json_encode($msg);
$msg = 'payload=' . urlencode($msg);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $webhook_url);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $msg);
curl_exec($ch);
curl_close($ch);
