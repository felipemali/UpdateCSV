// import { messageData } from "..";
import "./index.css";

const Message = ({ error }: { error: string | undefined }) => (
  <p className="message">{error}</p>
);

export default Message;
