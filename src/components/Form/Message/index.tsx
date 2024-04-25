import { messageData } from "..";
import "./index.css";

const Message = ({ message }: { message: messageData }) => (
  <p className="message">{!message?.status && message?.text}</p>
);

export default Message;
