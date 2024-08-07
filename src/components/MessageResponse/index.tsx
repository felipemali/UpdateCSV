import "./index.css";
import iconSucess from "../../assets/img/icon-success.svg";
import iconError from "../../assets/img/icon-error.svg";

type MessageResponseType = {
  status: boolean;
  message: string;
};
const MessageResponse = ({
  messageResponse,
}: {
  messageResponse: MessageResponseType;
}) => {
  // console.log(messageResponse);

  return (
    <div className="container-message-response">
      <span
        style={{
          color: messageResponse.status ? "green" : "red",
          fontSize: "19px",
          textAlign: "left",
        }}
        className="message-response"
      >
        {messageResponse.message}
      </span>
      <img src={messageResponse.status ? iconSucess : iconError} alt="sucess" />
    </div>
  );
};
export default MessageResponse;
