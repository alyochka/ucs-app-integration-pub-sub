import { PubSub, Subscription } from '@google-cloud/pubsub'
import { PubSubMessageModel } from '#models/pub_sub'

export class GooglePubSubSubscription {
  constructor(subscriptionName: string) {
    this._subscription = new PubSub().subscription(subscriptionName)
  }
  private _subscription: Subscription

  async listenMessages(
    tableHandler: (obj: PubSubMessageModel<any>) => Promise<boolean>,
    console?: any
  ): Promise<void> {
    this._subscription.on('message', async (message: any) => {
      const data = JSON.parse(message.data.toString())

      const pubSubModel = new PubSubMessageModel(data.value, data.action, data.table, data.api)
      if (pubSubModel.api !== 'API2') {
        console.log('message received', data)
        await tableHandler(pubSubModel)
          .then(() => {
            message.ack()
          })
          .catch((err) => {
            if (err.routine === '_bt_check_unique') {
              message.ack()
            } else {
              console.warn('___________________________________________________')
              console.warn('Erro no PubSub (handle):' + JSON.stringify(data[0]))
              console.warn('Routine:' + err.routine)
              console.warn('Message:' + err.message)
              console.warn('Error:' + err)
            }
          })
      } else {
        message.ack()
      }
    })
  }
}
