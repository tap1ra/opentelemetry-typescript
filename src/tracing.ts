import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';

// OpenTelemetry SDKのセットアップ
const sdk = new NodeSDK({
  traceExporter: new ConsoleSpanExporter(), // トレースをコンソールに出力
  instrumentations: [getNodeAutoInstrumentations()], // 自動インストルメンテーション
});

try {
  sdk.start();
  console.log('OpenTelemetry initialized');
} catch (error) {
  console.error('Error initializing OpenTelemetry', error);
}

// アプリケーション終了時にクリーンアップ
process.on('SIGTERM', async () => {
  try {
    await sdk.shutdown();
    console.log('OpenTelemetry terminated');
  } catch (error) {
    console.error('Error shutting down OpenTelemetry', error);
  }
});
