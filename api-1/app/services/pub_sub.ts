import { PubSubActionEnum } from '#enums/pub_sub_action_enum'
import env from '#start/env'
import { GooglePubSubPublisher } from '#services/pub_sub_publisher'

export class PubSubService {
  static async sendToPubSub(
    object: object,
    action: PubSubActionEnum,
    table: 'users',
    api: 'API1' | 'API2'
  ) {
    try {
      console.log('sendToPubSub')
      const topic = env.get('GOOGLE_PUBSUB_TOPIC', '')
      const publisher = new GooglePubSubPublisher(topic)
      await publisher.publishMessage(object, action, table, api ?? 'API2')
    } catch (err) {
      console.error('Erro ao criar mensagem', err)
    }
  }
}
