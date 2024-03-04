"use client"
import { useEffect } from 'react';
import Talk from 'talkjs';
import { useRouter } from 'next/navigation'
import { usePathname, useSearchParams } from 'next/navigation'
import { useUser } from "@clerk/nextjs";
import * as React from "react";

export default function Chat({ mentorId, mentorName }) {
  console.log("mentorId mento page", mentorId)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { isLoaded, isSignedIn, user } = useUser();
  const [session, setSession] = React.useState(null);

  useEffect(() => {
    const initializeChat = async () => {
      if (!isLoaded) {
        console.log("useeeeer", user?.id);
        return;
      }

      await Talk.ready;

      const me = new Talk.User({
        id: user?.username,
        name: user?.username,
        email: user?.emailAddress,
        photoUrl: user?.imageUrl,
        role: 'default',
      });

      const session = new Talk.Session({
        appId: 't0cg10YR',
        me: me,
      });

      const other = new Talk.User({
        id: mentorId,
        name: mentorName,
        // email: mentorEmail,
        welcomeMessage: 'Hey, how can I help?',
      });

      const conversation = session.getOrCreateConversation(
        Talk.oneOnOneId(me, other)
      );
      conversation.setAttributes({
        subject: 'Counseling chat session',
      });
      conversation.setParticipant(me);
      conversation.setParticipant(other);

      const inbox = session.createInbox();
      inbox.select(conversation);
      inbox.mount(document.getElementById('talkjs-container'));
    };

    initializeChat();
  }, [isLoaded]);

  return <div id="talkjs-container" style={{ height: '500px', paddingTop: '40px' }} />;
}