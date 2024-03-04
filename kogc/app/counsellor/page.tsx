'use client'
import { useCallback } from 'react';
import Talk from 'talkjs';
import { Session, Chatbox } from '@talkjs/react';
import { useUser } from "@clerk/nextjs";

function ChatComponent() {

  const { isLoaded, isSignedIn, user } = useUser();
  console.log('user', user);
  const syncUser = useCallback(
    () =>
      new Talk.User({
        id: "collins",
        name: "collins",
        email: user?.emailAddress,
        photoUrl: user?.imageUrl,
        role: 'default',
      }),
    []
  );

  const syncConversation = useCallback((session: any) => {
    // JavaScript SDK code here
    const conversation = session.getOrCreateConversation('welcome');

    const other = new Talk.User({
      id: 'frank',
      name: 'Frank',
      email: 'frank@example.com',
      photoUrl: 'https://talkjs.com/new-web/avatar-8.jpg',
      welcomeMessage: 'Hey, how can I help?',
      role: 'default',
    });
    conversation.setParticipant(session.me);
    conversation.setParticipant(other);

    return conversation;
  }, []);

  return (
    <Session appId="thVcwG7i" syncUser={syncUser}>
      <Chatbox
        syncConversation={syncConversation}
        style={{ width: '100%', height: '500px' }}
      ></Chatbox>
    </Session>
  );
}

export default ChatComponent;
