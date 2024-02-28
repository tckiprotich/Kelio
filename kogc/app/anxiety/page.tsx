// @ts-nocheck
"use client"
import * as React from "react";
import Talk from "talkjs";
import { useUser } from "@clerk/nextjs";

const Home = () => {
  const chatContainerRef = React.useRef();
  const { isLoaded, isSignedIn, user } = useUser();
  const [session, setSession] = React.useState(null);

  React.useEffect(() => {
    const makeTalkSession = async () => {
      await Talk.ready;

      if (!isLoaded || !isSignedIn) {
        return null;
      }

      const sessionId = user.username;

      const newSession = new Talk.Session({
        appId: "tgfZ9mSr",
        me: new Talk.User({
          id: sessionId,
          name: `${sessionId}`,
          email: null,
          welcomeMessage: "Hello, ",
          role: 'default'
        })
      });

      setSession(newSession);
    };

    makeTalkSession();
  }, [isLoaded, isSignedIn, user]);

  React.useEffect(() => {
    const mountChat = async () => {
      if (session) {
        const conversation = session.getOrCreateConversation('4563832');
        const chatbox = session.createChatbox();
        chatbox.select(conversation, { asGuest: true });
        chatbox.mount(chatContainerRef.current);
      }
    };

    mountChat();
  }, [session]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="text-2xl mb-2">Welcome to Chat Session</div>
      <p>Please be mindful of others and use appropriate language</p>
      <div className="bg-white w-96 h-96 border border-gray-300 rounded shadow" ref={chatContainerRef}>
        loading chat...
      </div>
    </div>
  );
};

export default Home;