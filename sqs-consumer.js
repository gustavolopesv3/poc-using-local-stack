import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs';

const credentials = {
  accessKeyId: 'your-access-key-id',
  secretAccessKey: 'your-secret-access-key',
};

const sqsClient = new SQSClient({
  credentials,
  region: 'us-east-1',
  endpoint: 'http://localhost:4566',
});

const queueUrl = 'https://sqs.us-east-1.localhost.localstack.cloud:4566/000000000000/my-queue-local-stack';

async function receiveAndProcessMessages() {
  const receiveMessageParams = {
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 1,
    VisibilityTimeout: 10,
    WaitTimeSeconds: 20,
  };

  try {
    const data = await sqsClient.send(new ReceiveMessageCommand(receiveMessageParams));
    const messages = data.Messages || [];

    if (messages.length > 0) {
      messages.forEach(async (message) => {
        console.log('Mensagem recebida:', message.Body);

        const deleteMessageParams = {
          QueueUrl: queueUrl,
          ReceiptHandle: message.ReceiptHandle,
        };

        try {
          await sqsClient.send(new DeleteMessageCommand(deleteMessageParams));
        //   console.log('Mensagem excluída com sucesso.');
        } catch (deleteErr) {
          console.error('Erro ao excluir mensagem:', deleteErr);
        }
      });
    } else {
    //   console.log('Nenhuma mensagem disponível.');
    }
  } catch (err) {
    console.error('Erro ao receber mensagens:', err);
  }

  receiveAndProcessMessages();
}

receiveAndProcessMessages();
