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
  
    // Generate a unique ID for each browser session
    const sessionId = Math.random().toString(36).substring(2, 15);
  
    return new Talk.Session({
      appId: "t0cg10YR",
      me: new Talk.User({
        id: sessionId,
        name: `Guest ${sessionId}`,
        email: null,
        welcomeMessage: "Hello, I am a guest user",
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
    return <div>
      {/* TalkJS fills the available height of the container */}
      <style jsx>{`
            .chat-container {
                height: 500px;
                width: 400px;
            }
            `}</style>
      <div>Welcome to TalkJS on Next.js!</div>
      <div className="chat-container" ref={this.chatContainerRef}>loading chat...</div>
    </div>;
  }
}

export default Home;