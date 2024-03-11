// @ts-nocheck
"use client"
import { useEffect } from 'react';
import Talk from 'talkjs';
import { useRouter } from 'next/navigation'
import { usePathname, useSearchParams } from 'next/navigation'
import { useUser } from "@clerk/nextjs";
import * as React from "react";
import { Chatbox } from '@talkjs/react';

export default function Chat({ mentorId, mentorName }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { isLoaded, isSignedIn, user } = useUser();
  // console.log("MYUSEER", user)
  const [session, setSession] = React.useState(null);

  useEffect(() => {
    const initializeChat = async () => {
      if (!isLoaded) {
        console.log("mtumishi",user);
        console.log(user?.username,)
        return;
      }

      await Talk.ready;

      const me = new Talk.User({
        id: mentorId,
        name: mentorName,
        role: 'default',
      });

      const session = new Talk.Session({
        appId: 't0cg10YR',
        me: me,
      });

      

      const other = new Talk.User({
        id: user?.username,
        name: user?.username,
        email: user?.emailAddress,
        role: 'mentee'
      });

      const conversation = session.getOrCreateConversation(
        Talk.oneOnOneId(me, other)
      );
      conversation.setParticipant(me);
      conversation.setParticipant(other);

      

      const inbox = session.createInbox();
      inbox.select(conversation);
      inbox.mount(document.getElementById('talkjs-container'));
      inbox.onCustomConversationAction('slackInvite', (event) => {       
          slackInvite("keliosharon@gmail.com");
        
      });
      inbox.onCustomConversationAction('anxiety', (event) => {       
        anxietyInvite("keliosharon@gmail.com");
      
    });
    
  

    
    };

    initializeChat();
  }, [isLoaded]);

  return <div id="talkjs-container" style={{ height: '500px', paddingTop: '40px' }} />;
}


async function slackInvite(userEmail) {
  console.log("Inviting user to Slack:", userEmail);
  const response = await fetch('http://localhost:3000/api/slack', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: userEmail }),
  });

  const data = await response.json();
  const inviteResults = data.inviteResults.map(result => {
    return result.success 
      ? `invited successfully.` 
      : `Failed to invite . Error: ${result.error}`;
  }).join('\n');
  alert(inviteResults);
  console.log(data);
}

async function anxietyInvite(userEmail) {
  console.log("Inviting user to Slack:", userEmail);
  const response = await fetch('http://localhost:3000/api/slack/anxiety', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: userEmail }),
  });

  const data = await response.json();
  const inviteResults = data.inviteResults.map(result => {
    return result.success 
      ? `invited successfully.` 
      : `Failed to invite . Error: ${result.error}`;
  }).join('\n');
  alert(inviteResults);
  console.log(data);
}