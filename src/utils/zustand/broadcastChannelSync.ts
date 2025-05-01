/**
 * Creates Zustand middleware that synchronizes state across browser tabs
 * using the BroadcastChannel API.
 *
 * @param channelName - Unique name for the BroadcastChannel (e.g., 'auth', 'todos')
 * @returns Zustand middleware function
 */
const broadcastChannelSync = (channelName: string) => {
  let channel: BroadcastChannel | null = null;
  let isReceivingMessage = false;
  let currentVersion = Date.now();

  return (config: any) =>
    (
      setState: (partial: any, replace?: false) => void,
      getState: any,
      api: any
    ) => {
      // Initialize the store with the original config
      const store = config(
        (partial: any, replace?: false) => {
          // Only broadcast if not currently receiving a message
          if (!isReceivingMessage) {
            const currentState = getState();
            const nextState =
              typeof partial === "function" ? partial(currentState) : partial;

            // Prepare the message with version control
            const messageToSend = {
              version: Date.now(),
              payload: nextState,
              source: "broadcastChannelSync",
            };

            // Send the message through the BroadcastChannel
            channel?.postMessage(messageToSend);
          }

          // Update the local store
          setState(partial, replace);
        },
        getState,
        api
      );

      // Initialize BroadcastChannel on store creation
      if (typeof window !== "undefined") {
        try {
          channel = new BroadcastChannel(channelName);

          // Listen for messages from other tabs
          channel.onmessage = (event) => {
            const { version, payload, source } = event.data;
            if (source === "broadcastChannelSync" && version > currentVersion) {
              currentVersion = version;
              isReceivingMessage = true;
              setState(payload);
              isReceivingMessage = false;
            }
          };

          // Cleanup function to close the channel when store is destroyed
          const originalDestroy = api.destroy;
          api.destroy = () => {
            channel?.close();
            channel = null;
            originalDestroy();
          };
        } catch (err) {
          console.error("Failed to initialize BroadcastChannel:", err);
        }
      }

      return store;
    };
};

export default broadcastChannelSync;
