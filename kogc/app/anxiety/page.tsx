// @ts-nocheck
'use client'
import * as React from "react";
import Talk from "talkjs";

class Home extends React.Component {
  constructor(props) {
    super(props);

    // TalkJS only works in the browser; ensure we're not trying to load TalkJS when
    // prerendering the HTML in Node.
    if (process.browser) {
      this.session = this.makeTalkSession();
    }
    this.chatContainerRef = React.createRef();
  }


  async makeTalkSession() {
    await Talk.ready;
  
    // Check if a session ID already exists in the local storage
    let sessionId = localStorage.getItem('sessionId');
  
    // If not, generate a new one and store it in the local storage
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15);
      localStorage.setItem('sessionId', sessionId);
    }
  
    return new Talk.Session({
      appId: "tgfZ9mSr",
      me: new Talk.User({
        id: sessionId,
        name: `Guest ${sessionId}`,
        email: null,
        welcomeMessage: "Hello, ",
      })
    });
  }
  async componentDidMount() {
    const session = await this.session;

    // this creates a conversation with just the current user in it. 
    // add more `setParticipant` calls here to amend the conversation.
    const conversation = session.getOrCreateConversation('4563832');
    const chatbox = session.createChatbox();
    chatbox.select(conversation, { asGuest: true });
    chatbox.mount(this.chatContainerRef.current);
  }

  render() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="text-2xl mb-2">Welcome to Chat Session</div>
        <p>Please be  mindfull of other and use appropriate language  </p>
        <div className="bg-white w-96 h-96 border border-gray-300 rounded shadow" ref={this.chatContainerRef}>
          loading chat...
        </div>
      </div>
    );
  }
}

export default Home;