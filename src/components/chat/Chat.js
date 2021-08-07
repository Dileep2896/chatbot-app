import { connect } from "react-redux";
import React, { useState, useEffect, useRef } from "react";

// Import action
import { userMessage, sendMessage } from "../../actions/watson";

const Chat = ({ chat, userMessage, sendMessage }) => {
  // Handle Users Message
  const [message, setMessage] = useState("");
  const endOfMessages = useRef(null);

  // Function To Scroll To The Bottom
  const scrollToBottom = () => {
    endOfMessages.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chat]);

  // Function That Handles Users Submission
  const handleClick = async (e) => {
    const code = e.keyCode || e.which;

    if (code === 13) {
      console.log(message);
      userMessage(message);
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="chat">
      <h1>ChatBot</h1>
      {/* Handle Messages */}
      <div className="historyContainer">
        {chat.length === 0
          ? ""
          : chat.map((msg) => <div className={msg.type}>{msg.message}</div>)}
        <div ref={endOfMessages}></div>
      </div>
      <span className="inputBox">
        {/* Input box */}
        <input
          id="chatbot"
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleClick}
          value={message}
        ></input>
      </span>
    </div>
  );
};

const mapStateToProps = (state) => ({
  chat: state.watson.messages,
});

export default connect(mapStateToProps, { userMessage, sendMessage })(Chat);
