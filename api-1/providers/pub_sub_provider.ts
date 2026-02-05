import type { ApplicationService } from '@adonisjs/core/types'

export default class PubSubProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {}

  /**
   * The container bindings have booted
   */
  async boot() {}

  /**
   * The application has been booted
   */
  async start() {}

  /**
   * The process has been started
   */
  async ready() {
    // --------------PUBSUB----------------
    // Gets a pubsub subscription
    const pubsub = await import('#services/pub_sub_subscription')
    const subscription = new pubsub.GooglePubSubSubscription(
      process.env.GOOGLE_PUBSUB_SUBSCRIPTION!
    )

    // Listens on subscription and handles every message received
    const messageHandler = await import('#services/pub_sub_message_handler')
    subscription.listenMessages(new messageHandler.PubSubMessageHandler().handle)
  }

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {}
}
